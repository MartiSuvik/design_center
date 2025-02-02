import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Collections = () => {
  const sectionRef = useScrollAnimation({ stagger: 0.2 });

  return (
    <section id="collections" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Section */}
          <div className="relative aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              loading="lazy"
            >
              <source src="https://res.cloudinary.com/dnddesigncenter/video/upload/v1738173254/loop_video_e0ofbl.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-6xl font-serif">COLLECTIONS</h2>
              <p className="text-[#B49157] uppercase tracking-wider">HOME PHILOSOPHY</p>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Unique pieces with an endless beauty. Explore our collections designed to grace every room in your home, 
              where each space tells its own story through carefully curated elements that reflect your personal style.
            </p>
            
            <button className="px-8 py-3 bg-[#B49157] text-white text-sm uppercase tracking-wider hover:bg-[#A38047] transition-colors duration-200">
              Discover Our Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;