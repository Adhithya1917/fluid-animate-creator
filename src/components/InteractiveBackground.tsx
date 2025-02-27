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
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
    const colors = ['#FF4BD8', '#A466FF', '#7B61FF', '#9C27B0', '#5E35B1'];
    
    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5, // Smaller particles
      speedX: (Math.random() - 0.5) * 0.15, // Reduced speed
      speedY: (Math.random() - 0.5) * 0.15, // Reduced speed
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.4 + 0.1 // Slightly reduced opacity
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
      if (velocity > 12) { // Increased threshold
        const colors = ['#FF4BD8', '#A466FF', '#7B61FF', '#9C27B0', '#5E35B1'];
        for (let i = 0; i < 2; i++) { // Reduced number of particles created
          particles.current.push({
            x: clientX,
            y: clientY,
            size: Math.random() * 3 + 1, // Smaller particles
            speedX: (Math.random() - 0.5) * 1, // Reduced speed
            speedY: (Math.random() - 0.5) * 1, // Reduced speed
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 0.6 // Reduced opacity
          });
          
          // Keep the particle count under control - reduced maximum
          if (particles.current.length > 150) {
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

    const animate = () => {
      if (!canvasRef.current) return;
      
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Update and draw particles
      particles.current.forEach((particle, index) => {
        // Update position - with reduced movement speed
        particle.x += particle.speedX * 0.7; // Further reduce movement
        particle.y += particle.speedY * 0.7;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX *= -0.8; // Reduce bounce energy
        }
        
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY *= -0.8; // Reduce bounce energy
        }
        
        // Mouse interaction - gentler attraction to mouse
        if (isMouseMoving) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150; // Reduced interaction range
          
          if (distance < maxDistance) {
            // Calculate force based on distance - reduced force
            const force = (maxDistance - distance) / maxDistance * 0.6;
            
            // Attract particles towards mouse - reduced attraction
            particle.speedX += (dx / distance) * force * 0.01;
            particle.speedY += (dy / distance) * force * 0.01;
            
            // Add less random movement
            particle.speedX += (Math.random() - 0.5) * 0.05;
            particle.speedY += (Math.random() - 0.5) * 0.05;
            
            // Limit speed - reduced maximum speed
            const maxSpeed = 1;
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
            if (currentSpeed > maxSpeed) {
              particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
              particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
            }
          }
        } else {
          // Gradually slow down particles more quickly when mouse is not moving
          particle.speedX *= 0.97;
          particle.speedY *= 0.97;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect particles that are close to each other - fewer connections
        particles.current.slice(index + 1).forEach((otherParticle, otherIndex) => {
          if (otherIndex % 3 !== 0) return; // Skip 2/3 of connections to improve performance
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) { // Reduced connection distance
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.15 * (1 - distance / 80); // Reduced opacity
            ctx.lineWidth = 0.3; // Thinner lines
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      // Draw glow around mouse when moving - reduced glow
      if (isMouseMoving) {
        const gradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 5,
          mousePosition.x, mousePosition.y, 80 // Smaller radius
        );
        gradient.addColorStop(0, 'rgba(255, 75, 216, 0.2)'); // Reduced opacity
        gradient.addColorStop(1, 'rgba(255, 75, 216, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(mousePosition.x, mousePosition.y, 80, 0, Math.PI * 2);
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
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default InteractiveBackground;
