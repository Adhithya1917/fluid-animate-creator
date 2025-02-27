import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const lastMousePosition = useRef({ x: 0, y: 0 });

  // Set up the canvas and initialize particles
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize particles - reduced particle count and speed for stability
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 80); // Even fewer particles
    const colors = ['#FF4BD8', '#A466FF', '#7B61FF', '#9C27B0', '#5E35B1'];
    
    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5, // Smaller particles
      speedX: (Math.random() - 0.5) * 0.08, // Drastically reduced speed
      speedY: (Math.random() - 0.5) * 0.08, // Drastically reduced speed
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.3 + 0.1 // More reduced opacity
    }));

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      setIsMouseMoving(true);
      
      // Calculate mouse velocity
      const dx = clientX - lastMousePosition.current.x;
      const dy = clientY - lastMousePosition.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      
      // Add new particles on fast mouse movement - but fewer than before
      if (velocity > 15) { // Higher threshold for particle creation
        const colors = ['#FF4BD8', '#A466FF', '#7B61FF', '#9C27B0', '#5E35B1'];
        for (let i = 0; i < 1; i++) { // Only create 1 particle at a time
          particles.current.push({
            x: clientX,
            y: clientY,
            size: Math.random() * 2 + 1, // Even smaller particles
            speedX: (Math.random() - 0.5) * 0.5, // Reduced speed
            speedY: (Math.random() - 0.5) * 0.5, // Reduced speed
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 0.4 // Reduced opacity
          });
          
          // Keep the particle count under control - reduced maximum
          if (particles.current.length > 100) {
            particles.current.shift();
          }
        }
      }
      
      lastMousePosition.current = { x: clientX, y: clientY };
      
      // Reset the moving flag after a short delay
      clearTimeout(window.setTimeout(() => {}, 0));
      setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Draw background theme elements - static cosmic theme
    const drawBackgroundTheme = () => {
      // Create deep space gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
      bgGradient.addColorStop(0, 'rgba(13, 5, 41, 0.3)');
      bgGradient.addColorStop(1, 'rgba(8, 3, 24, 0.3)');
      
      // Draw subtle cosmic dust
      const starCount = 50;
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * dimensions.width;
        const y = Math.random() * dimensions.height;
        const radius = Math.random() * 1.5; // Very small stars
        const opacity = Math.random() * 0.2 + 0.1; // Very subtle
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
      
      // Add a few distant nebula effects - very subtle
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * dimensions.width;
        const y = Math.random() * dimensions.height;
        const radius = Math.random() * 100 + 50;
        
        const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const color = i % 2 === 0 ? 'rgba(164, 102, 255, 0.03)' : 'rgba(255, 75, 216, 0.02)';
        nebulaGradient.addColorStop(0, color);
        nebulaGradient.addColorStop(1, 'rgba(8, 3, 24, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = nebulaGradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      if (!canvasRef.current) return;
      
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Draw the background theme first
      drawBackgroundTheme();
      
      // Update and draw particles
      particles.current.forEach((particle, index) => {
        // Update position - with even more reduced movement speed
        particle.x += particle.speedX * 0.5; // Further reduce movement
        particle.y += particle.speedY * 0.5;
        
        // Bounce off edges with significantly reduced energy
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX *= -0.7; // Further reduce bounce energy
        }
        
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY *= -0.7; // Further reduce bounce energy
        }
        
        // Mouse interaction - extremely gentle attraction to mouse
        if (isMouseMoving) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120; // Even more reduced interaction range
          
          if (distance < maxDistance) {
            // Calculate force based on distance - minimal force
            const force = (maxDistance - distance) / maxDistance * 0.3;
            
            // Attract particles towards mouse - minimal attraction
            particle.speedX += (dx / distance) * force * 0.005;
            particle.speedY += (dy / distance) * force * 0.005;
            
            // Almost no random movement
            particle.speedX += (Math.random() - 0.5) * 0.02;
            particle.speedY += (Math.random() - 0.5) * 0.02;
            
            // Tight speed limit
            const maxSpeed = 0.5;
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
            if (currentSpeed > maxSpeed) {
              particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
              particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
            }
          }
        } else {
          // Rapidly slow down particles when mouse is not moving
          particle.speedX *= 0.95;
          particle.speedY *= 0.95;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect particles that are close to each other - even fewer connections
        particles.current.slice(index + 1).forEach((otherParticle, otherIndex) => {
          if (otherIndex % 4 !== 0) return; // Skip 3/4 of connections to improve performance
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 70) { // Even more reduced connection distance
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.1 * (1 - distance / 70); // Further reduced opacity
            ctx.lineWidth = 0.2; // Even thinner lines
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      // Draw glow around mouse when moving - very subtle glow
      if (isMouseMoving) {
        const gradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 5,
          mousePosition.x, mousePosition.y, 60 // Even smaller radius
        );
        gradient.addColorStop(0, 'rgba(255, 75, 216, 0.15)'); // Further reduced opacity
        gradient.addColorStop(1, 'rgba(255, 75, 216, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(mousePosition.x, mousePosition.y, 60, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, mousePosition, isMouseMoving]);

  return (
    <>
      {/* Static Background Theme Elements */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-dark to-slate-darker">
        {/* Large gradient orbs that add depth */}
        <div className="absolute top-0 right-0 w-[80vw] h-[40vh] bg-purple-900/5 rounded-full filter blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[80vw] h-[40vh] bg-slate-accent/5 rounded-full filter blur-[120px] transform -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[50vw] h-[50vh] bg-indigo-900/5 rounded-full filter blur-[80px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Interactive Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-1"
      />
    </>
  );
};

export default InteractiveBackground;
