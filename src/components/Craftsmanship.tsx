import React from 'react';
import AnimatedSection from './AnimatedSection';

const Craftsmanship = () => {
  return (
    <section id="italian-craftsmanship" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <AnimatedSection>
              <h2 className="text-4xl font-serif">Italian Excellence</h2>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="text-gray-600 leading-relaxed">
                Our commitment to Italian craftsmanship is reflected in every detail of our work. 
                With generations of expertise, our artisans blend traditional techniques with 
                contemporary innovation to create spaces that transcend time.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <p className="text-gray-600 leading-relaxed">
                Each project is a testament to our dedication to quality, utilizing the finest 
                materials and time-honored methods to bring your vision to life.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={600}>
              <button className="px-8 py-3 bg-[#C5A267] text-white rounded hover:bg-[#B49157] transition-colors duration-200">
                Learn More
              </button>
            </AnimatedSection>
          </div>
          
          <AnimatedSection className="relative h-96" delay={300}>
            <div 
              className="absolute inset-0 bg-cover bg-center rounded-lg transform transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: 'url("https://res.cloudinary.com/dnddesigncenter/image/upload/The-Most-Exquisite-Italian-Craftsmanship-_jymdai.jpg")'
              }}
            ></div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;