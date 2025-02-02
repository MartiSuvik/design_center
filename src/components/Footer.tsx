import React, { useEffect, useState } from 'react';
import { LogInIcon as LogoIcon } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Show footer when user is near bottom (within 100px)
      const isNearBottom = scrollTop + windowHeight > documentHeight - 100;
      setIsVisible(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer 
      className={`fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 shadow-lg transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
{/* Logo */}
<div className="flex items-center space-x-2">
  <img 
    src="https://res.cloudinary.com/dnddesigncenter/image/upload/D_D_h52kdi.svg" 
    alt="D&D Design Logo" 
    className="w-10 h-10" 
  />
</div>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} All Rights Reserved
          </p>

          {/* Contact Button */}
          <button 
            className="px-6 py-2 bg-[#C5A267] text-white text-sm rounded-md hover:bg-[#B49157] transition-colors duration-200"
            onClick={() => window.location.href = 'mailto:contact@dddesign.com'}
          >
            Contact Us
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;