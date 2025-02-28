/*import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayTimerRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      description: "A complete e-commerce solution with payment integration, inventory management, and customer analytics."
    },
    {
      id: 2,
      title: "Healthcare App",
      category: "App Development",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      description: "Mobile application for healthcare providers to manage patient records and schedules."
    },
    {
      id: 3,
      title: "AI Customer Service",
      category: "AI Solutions",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      description: "Intelligent chatbot system that handles customer inquiries with natural language processing."
    },
    {
      id: 4,
      title: "Digital Marketing Campaign",
      category: "SEO & Social Media",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      description: "Comprehensive digital marketing strategy that increased organic traffic by 200%."
    }
  ];

  const startAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (isAutoplay) {
      startAutoplay();
    } else {
      stopAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [isAutoplay, projects.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAutoplay(true);
            entry.target.classList.add('opacity-100');
            entry.target.classList.add('translate-y-0');
          } else {
            setIsAutoplay(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handlePrevious = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <section 
      id="projects" 
      className="py-20 px-6 bg-slate-darker relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-slate-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10 opacity-0 translate-y-10 transition-all duration-700">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-slate-accent mx-auto mb-6"></div>
          <p className="text-slate-light/70 max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-out h-[500px]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="relative overflow-hidden h-[200px] md:h-full">
                      <img 
                        src={project.image}
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-darker/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 bg-slate-accent/90 text-white text-xs font-medium py-1 px-3 rounded-full">
                        {project.category}
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-slate-light/70 mb-6">{project.description}</p>
                      <div>
                        <a 
                          href="#" 
                          className="inline-block text-slate-accent font-medium hover:underline"
                        >
                          View Case Study
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoplay(false);
                  setActiveIndex(index);
                }}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-slate-accent w-6" : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-all z-10"
            onClick={handlePrevious}
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-all z-10"
            onClick={handleNext}
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;*/
