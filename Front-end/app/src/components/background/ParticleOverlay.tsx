// import React, { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

// interface Particle {
//   x: number;
//   y: number;
//   size: number;
//   speedX: number;
//   speedY: number;
//   opacity: number;
// }

// const ParticleOverlay: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const particles = useRef<Particle[]>([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     const createParticles = () => {
//       particles.current = Array.from({ length: 50 }, () => ({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         size: Math.random() * 2 + 1,
//         speedX: (Math.random() - 0.5) * 0.5,
//         speedY: (Math.random() - 0.5) * 0.5,
//         opacity: Math.random() * 0.5 + 0.2
//       }));
//     };

//     const animate = () => {
//       if (!ctx || !canvas) return;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       particles.current.forEach((particle, index) => {
//         particle.x += particle.speedX;
//         particle.y += particle.speedY;

//         // // Recycle particle when it goes off the canvas
//         // if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
//         //   particles.current[index] = {
//         //     x: Math.random() * canvas.width,
//         //     y: Math.random() * canvas.height,
//         //     size: Math.random() * 2 + 1,
//         //     speedX: (Math.random() - 0.5) * 0.5,
//         //     speedY: (Math.random() - 0.5) * 0.5,
//         //     opacity: Math.random() * 0.5 + 0.2
//         //   };
//         // }

//         // Draw particle
//         // ctx.beginPath();
//         // ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
//         // ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
//         // ctx.fill();
//         // ctx.closePath();
//     //   });

//     //   requestAnimationFrame(animate);
//     // };

//     // resizeCanvas();
//     // createParticles();
//     // animate();

//     window.addEventListener('resize', resizeCanvas);
//     return () => window.removeEventListener('resize', resizeCanvas);
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 1 }}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         zIndex: 1,
//         pointerEvents: 'none',
//         background: `linear-gradient(45deg,rgb(39, 13, 13),rgb(32, 31, 31),rgb(17, 17, 28))`
//       }}
//     >
//       <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
//     </motion.div>
//   );
// };

// export default ParticleOverlay;
