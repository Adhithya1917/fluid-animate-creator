
import { useEffect, useRef } from 'react';
import { Monitor, Smartphone, Brain, Search, Cpu, Share2 } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 card-hover opacity-0 translate-y-10 transition-all duration-700"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-shrink-0 rounded-lg p-3 bg-gradient-to-br from-slate-accent/20 to-purple-600/20">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-slate-light/70 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <Monitor className="w-8 h-8 text-slate-accent" />,
      title: "Web Development",
      description: "User-friendly websites tailored to your brand's identity and business goals."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-slate-accent" />,
      title: "App Development",
      description: "We build innovative mobile applications with advanced functionalities, ensuring efficiency, reliability."
    },
    {
      icon: <Brain className="w-8 h-8 text-slate-accent" />,
      title: "AI Solutions",
      description: "Enhance customer engagement with intelligent chatbots and virtual assistants."
    },
    {
      icon: <Search className="w-8 h-8 text-slate-accent" />,
      title: "SEO Services",
      description: "SEO services help businesses rank higher on Search Engines and attract quality traffic."
    },
    {
      icon: <Cpu className="w-8 h-8 text-slate-accent" />,
      title: "Automation",
      description: "Integrating AI-driven automation tools, reducing manual work for seamless performance."
    },
    {
      icon: <Share2 className="w-8 h-8 text-slate-accent" />,
      title: "Social Media Management",
      description: "Building a strong online presence, engage audiences, and drive real business growth."
    }
  ];

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
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto">
        <div
          ref={sectionRef}
          className="text-center mb-16 opacity-0 translate-y-10 transition-all duration-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-slate-accent mx-auto mb-6"></div>
          <p className="text-slate-light/70 max-w-2xl mx-auto">
            We provide end-to-end digital solutions tailored to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
