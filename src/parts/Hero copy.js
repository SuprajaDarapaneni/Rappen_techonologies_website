/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Button from "../elements/Button";

// Animated Organization Logo with multiple gradients
const OrganizationLogo = () => (
  <div className="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="140"
      viewBox="0 0 100 100"
      className="drop-shadow-2xl animate-pulse"
    >
      <defs>
        <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667EEA" />
          <stop offset="50%" stopColor="#764BA2" />
          <stop offset="100%" stopColor="#F093FB" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="45" stroke="url(#logoGradient1)" strokeWidth="5" fill="white" filter="url(#glow)" />
      <text x="50%" y="50%" fontSize="20" fontWeight="bold" textAnchor="middle" fill="url(#logoGradient1)" dy=".3em">
        Rapen
      </text>
    </svg>
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-xl animate-ping"></div>
  </div>
);

// Animated Software Development Icon
const SoftwareDevelopmentIcon = () => (
  <div className="relative group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      className="drop-shadow-xl transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
    >
      <defs>
        <linearGradient id="devGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667EEA" />
          <stop offset="100%" stopColor="#764BA2" />
        </linearGradient>
      </defs>
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="url(#devGradient)" />
      <path d="M8 12h8M10 9l-2 3 2 3M14 9l2 3-2 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1" fill="none" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '20s' }} />
    </svg>
    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
  </div>
);

// Animated Training Icon
const TrainingIcon = () => (
  <div className="relative group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      className="drop-shadow-xl transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
    >
      <defs>
        <linearGradient id="trainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="url(#trainGradient)" />
      <path d="M8 12h8M8 16h8M12 8v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none" className="animate-pulse" />
    </svg>
    <div className="absolute -inset-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
  </div>
);

// Animated Placement Icon
const PlacementIcon = () => (
  <div className="relative group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      className="drop-shadow-xl transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
    >
      <defs>
        <linearGradient id="placeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="url(#placeGradient)" />
      <path d="M12 8v8M8 12h8M10 10l2 2 2-2M10 14l2 2 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8l4 4-4 4-4-4z" stroke="white" strokeWidth="1" fill="none" className="animate-pulse" />
    </svg>
    <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
  </div>
);

// Floating particles animation
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 10 + Math.random() * 20,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
          }}
        />
        <FloatingParticles />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Side - Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <Fade direction="down" triggerOnce>
                <div className="mb-8 flex justify-center lg:justify-start">
                  <OrganizationLogo />
                </div>
              </Fade>

              <Fade direction="up" delay={200} triggerOnce>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  {process.env.REACT_APP_ORGANIZATION_HERO_TITLE || 'Empowering Your Business Through Technology'}
                </h1>
              </Fade>

              <Fade direction="up" delay={400} triggerOnce>
                <p className="font-light text-xl lg:text-2xl text-gray-200 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                  {process.env.REACT_APP_ORGANIZATION_HERO_SUBTITLE || 'We specialize in software development, training, and job placements, providing the tools for your success.'}
                </p>
              </Fade>

              <Fade direction="up" delay={600} triggerOnce>
                <Button
                  href="/project"
                  type="link"
                  className="group inline-flex items-center px-10 py-5 text-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-110 hover:from-purple-700 hover:to-pink-700 hover:rotate-1"
                >
                  {process.env.REACT_APP_ORGANIZATION_HERO_BUTTON || 'Explore Our Services'}
                  <svg
                    className="ml-3 w-6 h-6 transform transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </Fade>
            </div>

            {/* Right Side - Service Cards */}
            <div className="w-full lg:w-1/2">
              <Fade direction="right" delay={800} triggerOnce>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="group">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 transform hover:scale-105 hover:bg-white/20 hover:rotate-3 hover:shadow-2xl">
                      <div className="flex justify-center mb-6">
                        <SoftwareDevelopmentIcon />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Software Development</h3>
                      <p className="text-gray-200 leading-relaxed">
                        Tailored software solutions designed to scale your business.
                      </p>
                    </div>
                  </div>

                  <div className="group">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 transform hover:scale-105 hover:bg-white/20 hover:-rotate-3 hover:shadow-2xl">
                      <div className="flex justify-center mb-6">
                        <TrainingIcon />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Training</h3>
                      <p className="text-gray-200 leading-relaxed">
                        Comprehensive training to master the latest technologies.
                      </p>
                    </div>
                  </div>

                  <div className="group">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 transform hover:scale-105 hover:bg-white/20 hover:rotate-3 hover:shadow-2xl">
                      <div className="flex justify-center mb-6">
                        <PlacementIcon />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Placement</h3>
                      <p className="text-gray-200 leading-relaxed">
                        Connecting talent with top employers for success.
                      </p>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(10px); }
          66% { transform: translateY(20px) translateX(-10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}