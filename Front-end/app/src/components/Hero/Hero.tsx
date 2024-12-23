import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import DynamicBackground from "../background/DynamicBackground";
import HeroContent from "./HeroContent";
import MarketDashboard from "./MarketDashboard";
import MarketMetrics from "./MarketMetrics";
import MarketVisuals from "./MarketVisuals";
import StockTicker from "./StockTicker";
import { heroSections } from "./HeroData";

const Hero = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = (latest: number) => {
      const sectionHeight = window.innerHeight;
      const currentIndex = Math.floor(latest / sectionHeight);
      if (currentIndex !== currentSection && currentIndex < heroSections.length) {
        setCurrentSection(currentIndex);
      }
    };

    return scrollY.onChange(handleScroll);
  }, [scrollY, currentSection]);

  return (
    <div className="relative">
      {/* Fixed Background */}
      <DynamicBackground sections={[]} currentSection={0} />
      {/* Stock Ticker */}
      <div className="fixed top-0 left-0 w-full z-20 bg-black/50 backdrop-blur-sm py-3">
        <StockTicker />
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Content Area */}
          <div className="lg:col-span-8">
            {heroSections.map((section, index) => (
              <motion.section
                key={index}
                className="min-h-screen pt-20"
                initial={{ opacity: 1 }} // Ensure it starts visible
                animate={{ opacity: currentSection === index ? 1 : 0 }} // Keep opacity logic, no transition
              >
                {/* Hero Content */}
                <div className="mb-12">
                  <HeroContent />
                </div>

                {/* Market Metrics */}
                <div className="mb-12">
                  <MarketMetrics />
                </div>

                {/* Market Visuals */}
                <div>
                  <MarketVisuals />
                </div>
              </motion.section>
            ))}
          </div>

          {/* Right Sidebar - Market Dashboard */}
          <div className="lg:col-span-4">
            <div className="sticky top-20">
              <MarketDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
