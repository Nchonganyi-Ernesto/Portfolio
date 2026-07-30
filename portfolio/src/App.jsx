import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorldMapBg from './components/WorldMapBg';
import './App.css';

function App() {
  return (
    <div className="portfolio-app">
      {/* Animated World Map Canvas Background focused on Africa */}
      <WorldMapBg />

      {/* Glassmorphic Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
