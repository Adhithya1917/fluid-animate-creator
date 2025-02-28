
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-darker py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-slate-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/logo 123.png" 
                alt="Slate Designers Logo" 
                className="h-8"
                style={{ objectFit: 'contain' }}
              />
              <span className="font-bold text-white text-xl">Slate Designers</span>
            </div>
            
            <p className="text-slate-light/70 mb-6">
              We create digital experiences that stand out. Our team of designers and developers build custom websites and applications that help businesses grow.
            </p>
            
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {['Web Development', 'App Development', 'AI Solutions', 'SEO Services', 'Automation', 'Social Media'].map((service) => (
                <li key={service}>
                  <a 
                    href="#services" 
                    className="text-slate-light/70 hover:text-slate-accent transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Our Team', 'Careers', 'Blog', 'Contact', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-slate-light/70 hover:text-slate-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-slate-light/70 mb-4">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-slate-accent focus:border-transparent transition-all"
              />
              <button 
                type="submit" 
                className="bg-slate-accent text-white px-4 py-2 rounded-r-lg hover:bg-slate-accent/80 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-light/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Slate Designers. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-light/70 hover:text-slate-accent transition-colors group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
