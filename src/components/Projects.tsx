import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import gsap from 'gsap';

interface Category {
  id: number;
  title: string;
  image: string;
  hasContent: boolean;
}

interface Style {
  id: number;
  name: string;
  icon: JSX.Element;
}

interface Photo {
  id: number;
  url: string;
  category: string;
  style: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: 'Kitchen',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Kitchen/kitchen_modern_5.jpg',
    hasContent: true
  },
  {
    id: 2,
    title: 'Living Room',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Living%20Room/livingroom_traditional_5.avif',
    hasContent: true
  },
  {
    id: 3,
    title: 'Bedroom',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Bedroom/bedroom_modern_1.avif',
    hasContent: true
  },
  {
    id: 4,
    title: 'Dining Room',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/3e48fefc776aeb5c41fc951ab88a7d85_xgf8bc.jpg',
    hasContent: false
  },
  {
    id: 5,
    title: 'Lightning',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/led-lighting-1_0_sklvzy.jpg',
    hasContent: false
  },
  {
    id: 6,
    title: 'Bathroom',
    image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/Greenery-as-fresh-bathroom-decor-ideas-by-Decorilla-designer-Casey-H._i7fhfe.jpg',
    hasContent: false
  }
];

const styles: Style[] = [
  {
    id: 1,
    name: 'Modern',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="12" y1="3" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Traditional',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 000 20M2 12h20" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Art Deco',
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  }
];

const getPhotos = (category: string, style: string): Photo[] => {
  // Handle "Art Deco" -> "ardeco"
  const styleFolder = style === 'Art Deco' ? 'ardeco' : style.toLowerCase();

  // Handle spaces in category names (e.g., "Living Room" -> "livingroom")
  const categoryFolder = category; // Keep spaces as-is for folder names
  const categoryNameForImage = category.toLowerCase().replace(/ /g, ''); // Remove spaces for image name

  return Array.from({ length: 10 }, (_, i) => {
    // Construct the image name based on the exact naming convention
    const imageName = `${categoryNameForImage}_${styleFolder}_${i + 1}`; // e.g., "livingroom_traditional_1"
    const publicId = `${categoryFolder}/${imageName}`; // e.g., "Living Room/livingroom_traditional_1"

    return {
      id: i + 1,
      url: `https://res.cloudinary.com/dnddesigncenter/image/upload/${publicId}.avif`,
      category,
      style,
    };
  });
};

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo('.projects-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3 }
      );

      tl.fromTo('.project-category',
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2,
        },
        '-=0.5'
      );

      setHasAnimated(true);
    }
  }, [hasAnimated]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(categories.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(categories.length / 3)) % Math.ceil(categories.length / 3));
  };

  const handleCategoryClick = (category: Category) => {
    if (category.hasContent) {
      setSelectedCategory(category);
      setLoadedImages(new Set());
    }
  };

  const handleStyleClick = (style: Style) => {
    if (selectedCategory) {
      setSelectedStyle(style);
      setPhotos(getPhotos(selectedCategory.title, style.name));
      setCurrentPhotoIndex(0);
    }
  };

  const handleClose = () => {
    setSelectedStyle(null);
    setSelectedCategory(null);
    setCurrentPhotoIndex(0);
    setPhotos([]);
    setLoadedImages(new Set());
  };

  const handleImageLoad = (url: string) => {
    setLoadedImages(prev => new Set([...prev, url]));
  };

  const handleImageError = (url: string) => {
    console.error(`Failed to load image: ${url}`);
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(url);
      return newSet;
    });
  };

  return (
    <section id="projects" className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="projects-title text-4xl font-serif text-center mb-12">
          Our Projects
        </h2>

        <div className={`relative transition-all duration-500 ${selectedCategory ? 'filter blur-lg' : ''}`}>
          <div className="relative overflow-hidden px-6 md:px-0">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`project-category w-1/3 flex-shrink-0 px-4 cursor-pointer ${
                    category.hasContent ? '' : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="project-card relative h-64 overflow-hidden rounded-lg">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-serif">{category.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="nav-arrow nav-arrow-prev"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="nav-arrow nav-arrow-next"
              aria-label="Next projects"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {selectedCategory && !selectedStyle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-5xl px-4">
              <button
                onClick={handleClose}
                className="absolute top-0 right-0 p-2 text-white hover:text-gray-300 transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex justify-center space-x-8">
                {styles.map((style, index) => (
                  <div
                    key={style.id}
                    className="w-64 h-64 bg-[#F5E6D3] rounded-lg p-8 cursor-pointer transform transition-all duration-500 hover:shadow-xl"
                    style={{
                      animation: `slideUp 0.5s ease-out ${index * 0.1}s forwards`,
                      opacity: 0,
                      transform: 'translateY(50px)',
                    }}
                    onClick={() => handleStyleClick(style)}
                  >
                    <div className="h-full flex flex-col items-center justify-center space-y-4">
                      {style.icon}
                      <span className="text-xl text-gray-800 font-sans">{style.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedStyle && photos.length > 0 && (
          <div className="fixed inset-0 z-50 bg-white">
            <div className="h-full flex flex-col">
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-2xl font-serif">
                  {selectedCategory?.title} - {selectedStyle.name}
                </h3>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-0">
                  <img
                    src={photos[currentPhotoIndex].url}
                    alt=""
                    className={`w-full h-full object-contain transition-opacity duration-500 ${
                      loadedImages.has(photos[currentPhotoIndex].url) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(photos[currentPhotoIndex].url)}
                    onError={() => handleImageError(photos[currentPhotoIndex].url)}
                  />
                  {!loadedImages.has(photos[currentPhotoIndex].url) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C5A267] border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="h-24 bg-gray-100">
                <div className="h-full flex items-center px-4 space-x-2 overflow-x-auto">
                  {photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className={`h-16 w-24 flex-shrink-0 cursor-pointer transition-all duration-300 ${
                        currentPhotoIndex === index ? 'ring-2 ring-[#C5A267]' : ''
                      }`}
                      onClick={() => setCurrentPhotoIndex(index)}
                    >
                      <img
                        src={photo.url}
                        alt=""
                        className={`h-full w-full object-cover transition-opacity duration-300 ${
                          loadedImages.has(photo.url) ? 'opacity-100' : 'opacity-50'
                        }`}
                        onLoad={() => handleImageLoad(photo.url)}
                        onError={() => handleImageError(photo.url)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;