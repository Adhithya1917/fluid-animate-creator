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

    // Initialize particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150);
    const colors = ['#FF4BD8', '#A466FF', '#7B61FF', '#9C27B0', '#5E35B1'];
    
    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.1
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
      
      // Add new particles on fast mouse movement
      if (velocity > 10) {
        const colors = ['#FF4BD8', '#A466FF', '#7B61FF', '#9C27B0', '#5E35B1'];
        for (let i = 0; i < 3; i++) {
          particles.current.push({
            x: clientX,
            y: clientY,
            size: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 0.8
          });
          
          // Keep the particle count under control
          if (particles.current.length > 200) {
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
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY *= -1;
        }
        
        // Mouse interaction - attract particles when mouse is moving
        if (isMouseMoving) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          
          if (distance < maxDistance) {
            // Calculate force based on distance
            const force = (maxDistance - distance) / maxDistance;
            
            // Attract particles towards mouse
            particle.speedX += (dx / distance) * force * 0.02;
            particle.speedY += (dy / distance) * force * 0.02;
            
            // Add some random movement
            particle.speedX += (Math.random() - 0.5) * 0.1;
            particle.speedY += (Math.random() - 0.5) * 0.1;
            
            // Limit speed
            const maxSpeed = 2;
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
            if (currentSpeed > maxSpeed) {
              particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
              particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
            }
          }
        } else {
          // Gradually slow down particles when mouse is not moving
          particle.speedX *= 0.99;
          particle.speedY *= 0.99;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect particles that are close to each other
        particles.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.2 * (1 - distance / 100);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      // Draw glow around mouse when moving
      if (isMouseMoving) {
        const gradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 5,
          mousePosition.x, mousePosition.y, 100
        );
        gradient.addColorStop(0, 'rgba(255, 75, 216, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 75, 216, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(mousePosition.x, mousePosition.y, 100, 0, Math.PI * 2);
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
