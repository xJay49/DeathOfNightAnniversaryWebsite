import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Clock, Users, Sparkles, Play, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Logo Component
const DeathOfNightLogo = ({ className = "" }) => {
  return (
    <svg viewBox="0 0 800 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
          <stop offset="50%" style={{stopColor: '#cccccc', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#666666', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id="remasterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#8B0000', stopOpacity: 1}} />
          <stop offset="50%" style={{stopColor: '#DC143C', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#8B0000', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      <text 
        x="400" 
        y="100" 
        fontSize="72" 
        fontWeight="900" 
        fontFamily="Arial Black, sans-serif" 
        textAnchor="middle"
        fill="url(#textGradient)"
        filter="url(#glow)"
        style={{letterSpacing: '8px'}}
      >
        DEATH OF NIGHT
      </text>
      
      <text 
        x="402" 
        y="102" 
        fontSize="72" 
        fontWeight="900" 
        fontFamily="Arial Black, sans-serif" 
        textAnchor="middle"
        fill="#000000"
        opacity="0.5"
        style={{letterSpacing: '8px'}}
      >
        DEATH OF NIGHT
      </text>
      
      <g transform="translate(620, 50) rotate(15)">
        <text 
          x="0" 
          y="0" 
          fontSize="48" 
          fontWeight="900" 
          fontFamily="Impact, Arial Black, sans-serif" 
          fill="url(#remasterGradient)"
          stroke="#8B0000"
          strokeWidth="2"
          style={{letterSpacing: '4px'}}
        >
          REMASTER
        </text>
        <text 
          x="2" 
          y="2" 
          fontSize="48" 
          fontWeight="900" 
          fontFamily="Impact, Arial Black, sans-serif" 
          fill="#000000"
          opacity="0.6"
          style={{letterSpacing: '4px'}}
        >
          REMASTER
        </text>
      </g>
    </svg>
  );
};

// Event data
const eventData = {
  title: "Death of Night Remaster",
  releaseDate: "December 15, 2025",
  event: {
    name: "2nd Anniversary Celebration",
    date: "December 16, 2025 20:00:00 GMT+0100",
    description: "Join the Death of Night community for an exclusive look at the remaster, behind-the-scenes content, and special surprises."
  }
};

// Timeline data
const timelineData = [
  { year: "2021", title: "Original Release", description: "Death of Night created by FiveDead Interactive" },
  { year: "2023", title: "First Remaster", description: "Cyprus Games brings the remaster with graphics, menu, and gameplay revamps" },
  { year: "2025", title: "2nd Anniversary", description: "Celebrating two years with enhanced content and licensed features" }
];

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <motion.div
          key={unit}
          className="flex flex-col items-center bg-black/40 backdrop-blur-sm border border-red-900/30 rounded-lg p-4 min-w-[80px]"
          whileHover={{ scale: 1.05, borderColor: 'rgba(220, 38, 38, 0.6)' }}
        >
          <span className="text-4xl font-bold text-red-500">{value.toString().padStart(2, '0')}</span>
          <span className="text-xs uppercase text-gray-400 mt-1">{unit}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [showEventModal, setShowEventModal] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop" 
          alt="Death of Night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 60% 70%, white, transparent), radial-gradient(1px 1px at 50% 50%, white, transparent)',
          backgroundSize: '200px 200px, 300px 300px, 150px 150px',
          animation: 'float 20s linear infinite'
        }} />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center px-4 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <DeathOfNightLogo className="w-full max-w-4xl mx-auto drop-shadow-[0_0_50px_rgba(220,38,38,0.6)]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl md:text-3xl font-light text-gray-300 mb-8"
        >
          2nd Anniversary Event — December 16, 2025 at 20:00 CET
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.a
            href="https://www.youtube.com/watch?v=Ltzeu-m3HNU"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220, 38, 38, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all"
          >
            <Play size={20} /> Watch Trailer
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220, 38, 38, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEventModal(true)}
            className="bg-black/60 backdrop-blur-sm border-2 border-red-600 hover:bg-red-600/20 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all"
          >
            <Sparkles size={20} /> Join Anniversary Event
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-red-500"
        >
          <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-red-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.div>

      {showEventModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowEventModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600 rounded-lg p-8 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEventModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <Sparkles className="mx-auto mb-4 text-red-500" size={48} />
              <h3 className="text-2xl font-bold text-white mb-4">Join the Anniversary Event</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Download the Cyprus Games Launcher and install Death of Night to join the In-Game Winter & Anniversary Event.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEventModal(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all"
              >
                Got it!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            The Remaster
          </h2>
          <div className="h-1 w-24 bg-red-600 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Originally created by FiveDead Interactive in 2021, Death of Night was remastered by Cyprus Games in 2023. 
            Experience completely rebuilt graphics, revamped menus, enhanced gameplay mechanics, and exciting licensed content. 
            Every shadow deeper, every moment more intense.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Graphics Revamp", desc: "Completely rebuilt visuals with enhanced lighting and textures" },
            { title: "Menu Revamp", desc: "Redesigned interface for better user experience" },
            { title: "Licensed Content", desc: "Exciting new licensed features and in-game content" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(220, 38, 38, 0.3)' }}
              className="bg-black/40 backdrop-blur-sm border border-red-900/30 rounded-lg p-6 transition-all"
            >
              <h3 className="text-xl font-bold text-red-400 mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Anniversary Event Section
const AnniversarySection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            2nd Anniversary Celebration
          </h2>
          <div className="h-1 w-24 bg-red-600 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {eventData.event.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-red-400 mb-6">Event Begins In:</h3>
          <CountdownTimer targetDate={eventData.event.date} />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Calendar, title: "Year 3 Roadmap", desc: "Plans and updates for the upcoming year" },
            { icon: Sparkles, title: "Featured Outfits for Year 3", desc: "A look at new character customization" },
            { icon: Users, title: "A Little Surprise", desc: "Something special for our community" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gradient-to-br from-red-900/20 to-black/40 backdrop-blur-sm border border-red-900/30 rounded-lg p-6 text-center"
            >
              <item.icon className="mx-auto mb-4 text-red-500" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Timeline Component
const Timeline = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            Our Journey
          </h2>
          <div className="h-1 w-24 bg-red-600 mx-auto" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-red-500 to-red-600" />

          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`relative flex items-center mb-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'} ml-16 md:ml-0`}>
                <div className="bg-black/60 backdrop-blur-sm border border-red-900/30 rounded-lg p-6">
                  <span className="text-4xl font-bold text-red-500">{item.year}</span>
                  <h3 className="text-2xl font-bold text-white mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
              
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-black transform md:-translate-x-1/2 shadow-[0_0_20px_rgba(220,38,38,0.8)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Community Section
const CommunitySection = () => {
  const socialLinks = [
    { name: 'Discord', icon: '💬', url: 'https://discord.gg/ZY37GbykFY', color: 'hover:bg-indigo-600' },
    { name: 'Twitter/X', icon: '🐦', url: 'https://x.com/cyprusgames_dev', color: 'hover:bg-sky-600' },
    { name: 'YouTube', icon: '▶️', url: 'https://www.youtube.com/@cyprusgames', color: 'hover:bg-red-600' }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            Join the Community
          </h2>
          <div className="h-1 w-24 bg-red-600 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with thousands of Death of Night fans worldwide. Share your experience, 
            discover secrets, and be part of the darkness.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mb-16">
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className={`bg-black/60 backdrop-blur-sm border-2 border-red-900/30 ${social.color} rounded-lg p-8 text-center transition-all`}
            >
              <div className="text-5xl mb-3">{social.icon}</div>
              <div className="text-white font-bold">{social.name}</div>
            </motion.a>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { number: '5K+', label: 'Active Players' },
            { number: '5K+', label: 'Community Members' },
            { number: '80%', label: 'Positive Reviews' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gradient-to-br from-red-900/20 to-black/60 backdrop-blur-sm border border-red-900/30 rounded-lg p-8 text-center"
            >
              <div className="text-5xl font-bold text-red-500 mb-2">{stat.number}</div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black border-t border-red-900/30 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <DeathOfNightLogo className="h-10 mx-auto mb-6" />
          <motion.a
            href="https://deathofnight.net/"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220, 38, 38, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all"
          >
            Back to Main Page
          </motion.a>
        </div>
        <div className="border-t border-red-900/30 pt-8">
          <p className="text-gray-500 text-sm mb-2">
            © 2025 CYPRUS GAMES and Bluebox Entertainment
          </p>
          <p className="text-gray-600 text-xs">
            Death of Night — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function DeathOfNightWebsite() {
  return (
    <div className="bg-black text-white min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #dc2626 #000;
        }
        
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: #000;
        }
        
        *::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 4px;
        }
      `}</style>
      
      <HeroSection />
      <AboutSection />
      <AnniversarySection />
      <Timeline />
      <CommunitySection />
      <Footer />
    </div>
  );
}