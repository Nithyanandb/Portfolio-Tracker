import React, { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
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
    <div className="relatives lg:p-0 xs:pt-20">
      {/* Fixed Background */}
      <DynamicBackground sections={[]} currentSection={0} />
      {/* Stock Ticker */}
      <div className="fixed top-0 left-0 w-full z-20 bg-black/50 backdrop-blur-sm py-3">
        <StockTicker />
      </div>

      {/* Main Content Grid */}
      <div className="container lg:mx-auto xs:p-1 xs:w-full xs:px-0 lg:px-12 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 xs:gap-30">
          <div className="lg:col-span-8">
            <div className="min-h-screen lg:pt-20 xs:p-0">
              <div className="mb-12">
                <HeroContent />
              </div>

              {/* Market Metrics */}
              <div className="mb-12 xs:mb-0 xs:p-0">
                <MarketMetrics />
              </div>
            </div>
      
            {/* Market Visuals */}
            <div>
              <MarketVisuals />
            </div>
          
            {/* Right Sidebar - Market Dashboard */}
          </div>
            <div className="lg:col-span-4" style={{width:'470px'}}>
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
