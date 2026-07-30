import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WorldMapBg from './components/WorldMapBg';
import './App.css';

function App() {
  return (
    <div className="portfolio-app">
      {/* Animated World Map Canvas Background focused on Africa */}
      <WorldMapBg />

      {/* Glassmorphic Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
      </main>
    </div>
  );
}

export default App;
