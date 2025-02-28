import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      const heroImage = heroRef.current.querySelector('.hero-image') as HTMLElement;
      if (heroImage) {
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="hero-background relative min-h-screen pt-28 pb-16 flex items-center"
      ref={heroRef}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full filter blur-3xl animate-pulse opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-slate-accent/20 rounded-full filter blur-3xl animate-pulse opacity-20" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
                Minimizing Effort and <span className="gradient-text">Maximizing Value</span>
              </h1>
              <p className="text-lg text-slate-light/80 mt-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A sophisticated digital services agency, blending AI-driven innovation with design, development, and automation. 
              We craft seamless, intelligent solutions that elevate brands with effortless precision.
              </p>
            </div>
            
            <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <a 
                href="#services" 
                className="button-hover inline-block bg-gradient-to-r from-slate-accent to-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Explore
              </a>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="hero-image relative w-full max-w-lg transition-transform ease-out animate-float">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                alt="Web Design" 
                className="rounded-2xl shadow-2xl object-cover animate-fade-in opacity-0"
                style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
                onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
              />
              
              {/* Floating elements */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                  alt="Code" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-full h-full bg-slate-accent/30 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold gradient-text">UX</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 -translate-y-1/2 -left-16 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="w-6 h-6 bg-slate-accent/50 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
