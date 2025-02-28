
import { useRef, useEffect } from 'react';
import { Trophy, Users, Clock, Bookmark } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const Stat = ({ icon, value, label, delay }: StatProps) => {
  return (
    <div 
      className="flex flex-col items-center text-center opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-1 gradient-text">{value}</h3>
      <p className="text-slate-light/70">{label}</p>
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.add('translate-y-0');
            observer.unobserve(entry.target);
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

  return (
    <section 
      id="about" 
      className="py-20 px-6 bg-gradient-to-b from-slate-darker to-slate-dark relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-slate-accent/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div 
          ref={sectionRef} 
          className="max-w-3xl mx-auto text-center mb-16 opacity-0 translate-y-10 transition-all duration-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
          <div className="w-20 h-1 bg-slate-accent mx-auto mb-6"></div>
          <p className="text-slate-light/70">
            We're a team of passionate designers and developers dedicated to creating exceptional digital experiences that help businesses thrive in the modern world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div 
            className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl opacity-0 animate-scale-in"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
              alt="Our Team" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="space-y-6">
            <div 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              <h3 className="text-2xl font-bold mb-3">Who We Are</h3>
              <p className="text-slate-light/70 mb-4">
                At Slate Designers, we blend creativity with technical expertise to deliver digital solutions that not only look great but also perform exceptionally well.
              </p>
              <p className="text-slate-light/70">
                Our team of experts specializes in creating user-centered designs that engage users and drive conversions. With years of experience in the industry, we understand what makes digital products successful.
              </p>
            </div>
            
            <div 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
              <h3 className="text-2xl font-bold mb-3">Our Approach</h3>
              <ul className="space-y-3">
                {[
                  "User-centered design approach",
                  "Agile development methodology",
                  "Continuous learning and improvement",
                  "Data-driven decision making"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-1 rounded-full bg-slate-accent/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-slate-accent rounded-full"></div>
                    </div>
                    <span className="text-slate-light/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default AboutSection;
