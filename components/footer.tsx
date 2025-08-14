"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, Twitter, ArrowUp } from "lucide-react";

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "GitHub", icon: Github, href: "https://github.com" },
  ];

  const navigationLinks = [
    { name: "HOME", href: "#hero" },
    { name: "ABOUT", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "EXPERIENCE", href: "#work-experience" },
    { name: "INSPIRE", href: "#inspire" },
    { name: "CONTACT", href: "#contact" }
  ];

  const servicesLinks = [
    { name: "Web Development", href: "#web-dev" },
    { name: "UI/UX Design", href: "#design" },
    { name: "Frontend Development", href: "#frontend" },
    { name: "Backend Development", href: "#backend" },
    { name: "Mobile Apps", href: "#mobile" },
    { name: "Consulting", href: "#consulting" }
  ];

  return (
    <footer className="relative text-white overflow-hidden" style={{ backgroundColor: '#1E201E' }}>
      {/* Bubbles Animation - Only render on client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/20 animate-bubble"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: `${0.3 + Math.random() * 0.5}rem`,
                  height: `${0.3 + Math.random() * 0.5}rem`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 6}s`,
                }}
              />
            ))}
          </div>
          
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute inset-0">
              <defs>
                <pattern id="triangles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <polygon points="50,10 90,80 10,80" fill="white" opacity="0.1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#triangles)" />
            </svg>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-12 gap-8">
            
            {/* Brand Section - Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-12 lg:col-span-4"
            >
              {/* Logo from Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="Ahsan Faraz Logo"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold tracking-wide">AHSAN FARAZ</h3>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-sm mb-8 max-w-sm">
                Empowering developers with advanced tools and technologies to create exceptional digital experiences and innovative solutions.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Back to Top Below Social */}
              <motion.button
                onClick={scrollToTop}
                className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  BACK TO TOP
                </span>
              </motion.button>
            </motion.div>

            {/* Background Geometric Lines */}
            <div className="col-span-12 lg:col-span-2 flex items-center justify-center relative">
              {/* Enhanced arrow-like geometric patterns */}
              
            </div>

            {/* Navigation Links - Right Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-12 lg:col-span-3"
            >
              <h4 className="text-lg font-semibold text-white mb-6">Navigation</h4>
              <div className="space-y-3">
                {navigationLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Services - Far Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-12 lg:col-span-3"
            >
              <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
              <div className="space-y-3">
                {servicesLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="bg-white py-2 relative" style={{ backgroundColor: '#F5F0CD' }}>
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm font-medium text-black">
              Copyright © 2025, ahsanfaraz. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bubble {
          0% {
            transform: translateY(100%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-200px) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-bubble {
          animation: bubble linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
