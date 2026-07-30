export interface DBTable {
  name: string;
  rowCount: number;
  columns: { name: string; type: string; isPk?: boolean; isFk?: boolean; refTable?: string; refCol?: string; isVirtualFk?: boolean; }[];
}

export interface DBSchema {
  name: string;
  tables: DBTable[];
}

export interface DBConnection {
  id: string;
  name: string;
  type: 'postgres' | 'mysql' | 'mongodb';
  host: string;
  database: string;
  status: 'connected' | 'error' | 'connecting';
  schemas: DBSchema[];
}

export interface AIQuerySample {
  id: string;
  label: string;
  prompt: string;
  target: 'single' | 'federated';
  connections: string[];
  sql: string;
  dialect: 'postgres' | 'duckdb' | 'mongodb' | 'mysql';
  explanation: string;
  columns: string[];
  chartType: 'bar' | 'line' | 'pie' | 'grid';
  xAxis: string;
  yAxis: string;
  rows: Record<string, any>[];
  auditLog: {
    durationMs: number;
    rowsCount: number;
    rolesUsed: string;
    guardPassed: boolean;
  };
}

export const INITIAL_CONNECTIONS: DBConnection[] = [
  {
    id: 'users_db',
    name: 'users_db',
    type: 'postgres',
    host: 'pg-prod-us.internal',
    database: 'production_users',
    status: 'connected',
    schemas: [
      {
        name: 'public',
        tables: [
          {
            name: 'users',
            rowCount: 24500,
            columns: [
              { name: 'id', type: 'uuid', isPk: true },
              { name: 'email', type: 'varchar(255)' },
              { name: 'plan', type: 'varchar(50)' },
              { name: 'created_at', type: 'timestamp with time zone' },
              { name: 'status', type: 'varchar(20)' }
            ]
          },
          {
            name: 'user_profiles',
            rowCount: 24500,
            columns: [
              { name: 'user_id', type: 'uuid', isPk: true, isFk: true, refTable: 'users', refCol: 'id' },
              { name: 'first_name', type: 'varchar(100)' },
              { name: 'last_name', type: 'varchar(100)' },
              { name: 'avatar_url', type: 'varchar(500)' },
              { name: 'country_code', type: 'varchar(2)' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'orders_db',
    name: 'orders_db',
    type: 'postgres',
    host: 'pg-orders-eu.internal',
    database: 'production_orders',
    status: 'connected',
    schemas: [
      {
        name: 'public',
        tables: [
          {
            name: 'orders',
            rowCount: 87400,
            columns: [
              { name: 'id', type: 'integer', isPk: true },
              { name: 'user_id', type: 'uuid', isVirtualFk: true, refTable: 'users_db.public.users', refCol: 'id' },
              { name: 'total_amount', type: 'numeric(12,2)' },
              { name: 'currency', type: 'varchar(3)' },
              { name: 'status', type: 'varchar(50)' },
              { name: 'created_at', type: 'timestamp' }
            ]
          },
          {
            name: 'order_items',
            rowCount: 194300,
            columns: [
              { name: 'id', type: 'integer', isPk: true },
              { name: 'order_id', type: 'integer', isFk: true, refTable: 'orders', refCol: 'id' },
              { name: 'product_sku', type: 'varchar(100)', isVirtualFk: true, refTable: 'inventory_db.default.products', refCol: 'sku' },
              { name: 'quantity', type: 'integer' },
              { name: 'unit_price', type: 'numeric(12,2)' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'billing_db',
    name: 'billing_db',
    type: 'mysql',
    host: 'mysql-billing-primary',
    database: 'stripe_sync_billing',
    status: 'connected',
    schemas: [
      {
        name: 'stripe_sync',
        tables: [
          {
            name: 'invoices',
            rowCount: 45200,
            columns: [
              { name: 'id', type: 'varchar(128)', isPk: true },
              { name: 'customer_email', type: 'varchar(255)' },
              { name: 'amount_usd', type: 'decimal(10,2)' },
              { name: 'status', type: 'varchar(50)' },
              { name: 'due_date', type: 'date' },
              { name: 'order_id', type: 'varchar(64)', isVirtualFk: true, refTable: 'orders_db.public.orders', refCol: 'id' }
            ]
          },
          {
            name: 'payouts',
            rowCount: 520,
            columns: [
              { name: 'id', type: 'varchar(128)', isPk: true },
              { name: 'amount', type: 'decimal(12,2)' },
              { name: 'currency', type: 'varchar(3)' },
              { name: 'arrival_date', type: 'date' },
              { name: 'status', type: 'varchar(32)' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'inventory_db',
    name: 'inventory_db',
    type: 'mongodb',
    host: 'mongo-replica.atlas',
    database: 'stock_catalog',
    status: 'connected',
    schemas: [
      {
        name: 'default',
        tables: [
          {
            name: 'products',
            rowCount: 1200,
            columns: [
              { name: 'id', type: 'objectId', isPk: true },
              { name: 'sku', type: 'string' },
              { name: 'name', type: 'string' },
              { name: 'price', type: 'number' },
              { name: 'stock', type: 'number' },
              { name: 'category', type: 'string' }
            ]
          }
        ]
      }
    ]
  }
];

export const MOCK_QUERIES: AIQuerySample[] = [
  {
    id: 'q1',
    label: 'Cross-DB user revenue report',
    prompt: 'Show users, total orders, and sum of invoice amounts across users_db, orders_db, and billing_db',
    target: 'federated',
    connections: ['users_db', 'orders_db', 'billing_db'],
    sql: `SELECT 
  u.email AS user_email, 
  COUNT(o.id) AS total_orders, 
  SUM(i.amount_usd) AS revenue_usd
FROM users_db.public.users u
JOIN orders_db.public.orders o ON u.id = o.user_id
JOIN billing_db.stripe_sync.invoices i ON o.id = CAST(i.order_id AS INTEGER)
WHERE i.status = 'paid'
GROUP BY u.email
ORDER BY revenue_usd DESC
LIMIT 8;`,
    dialect: 'duckdb',
    explanation: 'Automatically detected active virtual foreign keys linking orders to users and invoices to orders. Loaded read-only snapshots of invoices, orders, and users into the DuckDB query virtual canvas and computed the federated join with index scans.',
    columns: ['user_email', 'total_orders', 'revenue_usd'],
    chartType: 'bar',
    xAxis: 'user_email',
    yAxis: 'revenue_usd',
    rows: [
      { user_email: 'sarah.k@google.com', total_orders: 14, revenue_usd: 12450.00 },
      { user_email: 'alex.marston@netflix.com', total_orders: 9, revenue_usd: 8120.50 },
      { user_email: 'dave.l@stripe.com', total_orders: 11, revenue_usd: 7540.00 },
      { user_email: 'emma.watson@github.com', total_orders: 8, revenue_usd: 6980.00 },
      { user_email: 'john.smith@microsoft.com', total_orders: 7, revenue_usd: 5400.00 },
      { user_email: 'elena.rodriguez@vercel.com', total_orders: 5, revenue_usd: 4890.20 },
      { user_email: 'kenji.tanaka@sony.co.jp', total_orders: 6, revenue_usd: 4200.00 },
      { user_email: 'priya.sharma@tata.com', total_orders: 4, revenue_usd: 3100.50 }
    ],
    auditLog: {
      durationMs: 42,
      rowsCount: 8,
      rolesUsed: 'lizard_read (DuckDB Sandbox)',
      guardPassed: true
    }
  },
  {
    id: 'q2',
    label: 'Monthly signups by plan',
    prompt: 'Plot the weekly signups for users grouped by pricing tiers (Enterprise vs Pro vs Free)',
    target: 'single',
    connections: ['users_db'],
    sql: `SELECT 
  DATE_TRUNC('month', created_at) AS signup_month, 
  plan, 
  COUNT(*) AS signup_count
FROM public.users
GROUP BY signup_month, plan
ORDER BY signup_month ASC;`,
    dialect: 'postgres',
    explanation: 'Executed on users_db database using standard Postgres dialect. Scans the public.users index on created_at and aggregates user signups grouped by subscription plan level.',
    columns: ['signup_month', 'plan', 'signup_count'],
    chartType: 'line',
    xAxis: 'signup_month',
    yAxis: 'signup_count',
    rows: [
      { signup_month: '2026-01', plan: 'Enterprise', signup_count: 45 },
      { signup_month: '2026-01', plan: 'Pro', signup_count: 310 },
      { signup_month: '2026-01', plan: 'Free', signup_count: 1200 },
      { signup_month: '2026-02', plan: 'Enterprise', signup_count: 58 },
      { signup_month: '2026-02', plan: 'Pro', signup_count: 420 },
      { signup_month: '2026-02', plan: 'Free', signup_count: 1450 },
      { signup_month: '2026-03', plan: 'Enterprise', signup_count: 72 },
      { signup_month: '2026-03', plan: 'Pro', signup_count: 580 },
      { signup_month: '2026-03', plan: 'Free', signup_count: 1890 },
      { signup_month: '2026-04', plan: 'Enterprise', signup_count: 98 },
      { signup_month: '2026-04', plan: 'Pro', signup_count: 750 },
      { signup_month: '2026-04', plan: 'Free', signup_count: 2400 },
      { signup_month: '2026-05', plan: 'Enterprise', signup_count: 120 },
      { signup_month: '2026-05', plan: 'Pro', signup_count: 910 },
      { signup_month: '2026-05', plan: 'Free', signup_count: 3200 }
    ],
    auditLog: {
      durationMs: 15,
      rowsCount: 15,
      rolesUsed: 'lizard_read (Direct Postgres IP)',
      guardPassed: true
    }
  },
  {
    id: 'q3',
    label: 'Latest unpaid high value invoices',
    prompt: 'Find unpaid invoices above $1000 and check user email status',
    target: 'single',
    connections: ['billing_db'],
    sql: `SELECT 
  id, 
  customer_email, 
  amount_usd, 
  status, 
  due_date
FROM stripe_sync.invoices
WHERE status = 'unpaid' AND amount_usd > 1000
ORDER BY amount_usd DESC
LIMIT 5;`,
    dialect: 'mysql',
    explanation: 'Executed on billing_db. Runs high-performance filter for unpaid invoices with amount greater than $1000. Uses indexing on status and amount fields to complete in 8ms.',
    columns: ['id', 'customer_email', 'amount_usd', 'status', 'due_date'],
    chartType: 'pie',
    xAxis: 'customer_email',
    yAxis: 'amount_usd',
    rows: [
      { id: 'in_924a8', customer_email: 'billing@spacex.com', amount_usd: 8500.00, status: 'unpaid', due_date: '2026-07-25' },
      { id: 'in_812b1', customer_email: 'acc@uber.com', amount_usd: 4200.00, status: 'unpaid', due_date: '2026-07-28' },
      { id: 'in_754c0', customer_email: 'finance@openai.com', amount_usd: 3500.00, status: 'unpaid', due_date: '2026-08-02' },
      { id: 'in_642d9', customer_email: 'dev@retool.com', amount_usd: 1200.00, status: 'unpaid', due_date: '2026-07-15' },
      { id: 'in_511e4', customer_email: 'operations@flexport.com', amount_usd: 1050.00, status: 'unpaid', due_date: '2026-07-10' }
    ],
    auditLog: {
      durationMs: 8,
      rowsCount: 5,
      rolesUsed: 'lizard_read (MySQL)',
      guardPassed: true
    }
  },
  {
    id: 'q4',
    label: 'MongoDB Stock Alert',
    prompt: 'Check Mongo inventory collections for items with stock below 100 in products',
    target: 'single',
    connections: ['inventory_db'],
    sql: `db.products.find(
  { "stock": { "$lt": 100 } },
  { "name": 1, "sku": 1, "stock": 1, "category": 1 }
).sort({ "stock": 1 }).limit(6)`,
    dialect: 'mongodb',
    explanation: 'Queried MongoDB stock_catalog db through the Lizard Document Proxy. Automatically converted filter operator structure and executed direct Mongo Query. Returned 6 documents.',
    columns: ['sku', 'name', 'stock', 'category'],
    chartType: 'grid',
    xAxis: 'name',
    yAxis: 'stock',
    rows: [
      { sku: 'SKU-M3-CHIP', name: 'M3 Max Custom Silicon SoC', stock: 12, category: 'Hardware' },
      { sku: 'SKU-RE-SENS', name: 'Haptic Resonance Sensor V4', stock: 24, category: 'Sensors' },
      { sku: 'SKU-OP-FIBER', name: 'Optical Transceiver 100Gbps', stock: 48, category: 'Networking' },
      { sku: 'SKU-LI-BAT', name: 'High-Density Li-Ion Pack 50Ah', stock: 65, category: 'Power' },
      { sku: 'SKU-BR-CONT', name: 'Brushless ESC Controller 40A', stock: 78, category: 'Hardware' },
      { sku: 'SKU-TH-PASTE', name: 'Thermal Interface compound 8W/mK', stock: 92, category: 'Consumables' }
    ],
    auditLog: {
      durationMs: 19,
      rowsCount: 6,
      rolesUsed: 'lizard_read (MongoDB Atlas)',
      guardPassed: true
    }
  }
];
