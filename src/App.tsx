/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ComparisonStrip from './components/ComparisonStrip';
import FeaturesGrid from './components/FeaturesGrid';
import HowItWorks from './components/HowItWorks';
import InteractiveConsole from './components/InteractiveConsole';
import SchemaIntrospector from './components/SchemaIntrospector';
import SecuritySection from './components/SecuritySection';
import Quickstart from './components/Quickstart';
import CallToActionBand from './components/CallToActionBand';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans antialiased overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300 transition-colors duration-200">
      
      {/* Navigation Bar */}
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section with Product Mockup & Interactive Introspector */}
      <Hero />

      {/* "Why not X" Comparison Strip vs Directus/NocoDB & Forest Admin/Retool */}
      <ComparisonStrip />

      {/* 6 Core Feature Cards */}
      <FeaturesGrid />

      {/* 3-Step "How it works" Flow */}
      <HowItWorks />

      {/* Interactive AI Query Console Sandbox */}
      <InteractiveConsole />

      {/* Schema Introspector & Virtual Foreign Key Relationships */}
      <SchemaIntrospector />

      {/* Security, Compliance & Data Isolation */}
      <SecuritySection />

      {/* Quickstart Deployment & Docker Self-Hosting */}
      <Quickstart />

      {/* Final Call To Action Band */}
      <CallToActionBand />

      {/* Footer */}
      <Footer />

    </div>
  );
}
