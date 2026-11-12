import type { Metadata } from 'next';
import { Prose } from '@/components/prose';

export const metadata: Metadata = {
  title: 'Single sign-on',
  description: 'Sign in with Entra ID, Okta, Keycloak or any OpenID Connect provider, with team roles from the ID token.',
};

export default function SsoPage() {
  return (
    <Prose>
      <h1>Single sign-on</h1>
      <p>
        Access in Lizard is by team. Each team is granted connections (read, or read and write), and each
        member has a role: <strong>reader</strong>, <strong>editor</strong> (can write where the team has
        write access) or <strong>manager</strong> (manages the team). Admins are the members of the
        built-in <code>admin</code> team. With SSO, your identity provider decides who is in which team.
      </p>

      <h2>Sign-in modes</h2>
      <table>
        <thead>
          <tr><th><code>LIZARD_AUTH_MODE</code></th><th>Sign-in</th><th>Team membership</th></tr>
        </thead>
        <tbody>
          <tr><td><code>password</code></td><td>Email and password; the first visitor creates the admin</td><td>Managed in Lizard</td></tr>
          <tr><td><code>sso</code></td><td><code>/login</code> goes straight to the provider</td><td>From the provider’s <code>roles</code> claim, read-only in Lizard</td></tr>
          <tr><td><code>hybrid</code></td><td>Password form plus a “Continue with …” button</td><td>SSO users from the provider, password users in Lizard</td></tr>
        </tbody>
      </table>
      <p>
        The default is <code>password</code>, or <code>sso</code> when <code>LIZARD_SSO_URL</code> is set.
        Lizard refuses to start on a contradictory pair.
      </p>

      <h2>Configuration</h2>
      <p>
        SSO is OpenID Connect (authorization code with PKCE), configured with one URL:
      </p>
      <pre>
        <code>{`LIZARD_SSO_URL=https://CLIENT_ID:CLIENT_SECRET@<issuer>?name=Keycloak&domain=acme.io
LIZARD_PUBLIC_URL=https://lizard.acme.io
COOKIE_SECURE=true`}</code>
      </pre>
      <ul>
        <li>The part after <code>@</code> is the issuer. It must serve <code>&lt;issuer&gt;/.well-known/openid-configuration</code>. HTTPS is required except for localhost.</li>
        <li><code>name</code> labels the sign-in button (default “SSO”).</li>
        <li><code>domain</code> restricts which email domains may sign in. Repeat it for more than one.</li>
        <li><code>scope</code> overrides the default <code>openid email profile</code>.</li>
        <li>Percent-encode <code>@ : / ? # %</code> in the client id and secret.</li>
      </ul>
      <p>
        Register <code>&lt;your Lizard URL&gt;/api/auth/sso/callback</code> as the redirect URI. Lizard
        derives its URL from <code>X-Forwarded-Proto</code> and <code>X-Forwarded-Host</code> unless{' '}
        <code>LIZARD_PUBLIC_URL</code> is set.
      </p>

      <h2>Roles claim</h2>
      <p>
        The provider assigns teams through a <code>roles</code> claim in the <strong>ID token</strong>: an
        array of strings, re-applied at every sign-in.
      </p>
      <table>
        <thead>
          <tr><th>Value</th><th>Result</th></tr>
        </thead>
        <tbody>
          <tr><td><code>admin</code></td><td>Member of the <code>admin</code> team</td></tr>
          <tr><td><code>finance:reader</code>, <code>:editor</code>, <code>:manager</code></td><td>The <code>finance</code> team with that role</td></tr>
        </tbody>
      </table>
      <ul>
        <li>Team names and roles match exactly, case included, and use the team’s <strong>name</strong>, not its label.</li>
        <li>Anything else is ignored and logged, never guessed: a team without a role, an unknown role, or a team that doesn’t exist.</li>
        <li>Memberships are replaced with exactly what the claim says on each sign-in, including removal from <code>admin</code>.</li>
        <li>A sign-in whose roles match no team is refused, so nobody gets an account without a Lizard role.</li>
        <li>If the claim is missing altogether, existing memberships are kept, so a broken mapping can’t wipe everyone’s teams.</li>
      </ul>

      <h2>Provider setup</h2>
      <h3>Microsoft Entra ID</h3>
      <p>
        Issuer: <code>https://login.microsoftonline.com/&lt;tenant-id&gt;/v2.0</code>. Define app roles
        (<code>admin</code>, <code>finance:reader</code>, …) on the app registration and assign them under
        Enterprise applications → Users and groups. Entra emits them as <code>roles</code> by default.
        Enable the optional <code>email</code> claim.
      </p>
      <h3>Okta</h3>
      <p>
        Issuer: <code>https://&lt;org&gt;.okta.com/oauth2/default</code>. Add a <code>roles</code> claim to
        the authorization server and include it in the ID token.
      </p>
      <h3>Keycloak</h3>
      <p>
        Issuer: <code>https://keycloak.acme.io/realms/&lt;realm&gt;</code>. Create client roles on the Lizard
        client, then add a User Client Role mapper under Client scopes → &lt;client&gt;-dedicated: token
        claim name <code>roles</code>, multivalued, with <strong>Add to ID token</strong> on. Verify it with
        Client scopes → Evaluate → Generated ID token.
      </p>
      <h3>Google</h3>
      <p>
        Google’s OIDC never sends roles or groups, so it can’t drive team membership on its own.
      </p>

      <h2>Account rules</h2>
      <ul>
        <li>Emails the provider marks unverified are refused.</li>
        <li>An SSO sign-in links to an existing account with the same email only when the provider marks it verified.</li>
        <li>A user disabled in Lizard can’t sign in. Roles are only read at sign-in, so disable a user in Lizard to cut access immediately.</li>
        <li>In <code>sso</code> mode, creating users, setting passwords and the first-run setup form are switched off.</li>
      </ul>
    </Prose>
  );
}
