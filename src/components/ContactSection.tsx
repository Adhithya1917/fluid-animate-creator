
import { useState, useRef, FormEvent } from 'react';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-slate-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-slate-accent mx-auto mb-6"></div>
          <p className="text-slate-light/70 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear about it. Get in touch with us and let's create something amazing together.
          </p>
        </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-center w-full">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 animate-fade-in h-fit w-full">
                <h3 className="text-2xl font-bold mb-6 text-center">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-accent/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-slate-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-light/70 mb-1">Email Us</h4>
                      <a href="mailto:hello@slatedesigners.com" className="text-lg hover:text-slate-accent transition-colors">
                        Slatedesigners@gmail.com
                      </a>
                    </div>
                  </div>
                
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-accent/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-slate-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-light/70 mb-1">Call Us</h4>
                      <a href="tel:+15551234567" className="text-lg hover:text-slate-accent transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-accent/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-slate-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-light/70 mb-1">Visit Us</h4>
                      <p className="text-lg">
                        Thandalam, Chennai<br />
                        Tamil Nadu, India - 602105
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-light/70 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-accent focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
              
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-light/70 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-accent focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-light/70 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-accent focus:border-transparent transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>
              
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-light/70 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-accent focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
              
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-hover w-full bg-gradient-to-r from-slate-accent to-purple-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
    </section>
  );
};

export default ContactSection;
