"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navItems = [
  { name: "HOME", href: "#hero" },
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "EXPERIENCE", href: "#work-experience" },
  { name: "INSPIRE", href: "#inspire" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      // Check if scrolled for navbar styling
      setIsScrolled(window.scrollY > 50);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("ahsanfaraza674@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-500 pointer-events-none ${
        isScrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className={`backdrop-blur-md pointer-events-auto transition-all duration-500 ${
            isScrolled 
              ? "bg-black/40 border border-white/20 rounded-full px-6 py-2 shadow-lg shadow-black/30" 
              : "bg-transparent px-6 py-2"
          }`}
          layout
        >
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Ahsan Faraz Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center flex-1 justify-center transition-all duration-500 ${
              isScrolled ? "space-x-8" : "space-x-10"
            }`}>
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative font-medium transition-all duration-300 group nav-item font-[Urbanist] tracking-wide ${
                    isScrolled ? "text-sm" : "text-sm"
                  } ${
                    activeSection === item.href.substring(1)
                      ? "text-white active"
                      : "text-white/80 hover:text-white"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: activeSection === item.href.substring(1) ? 1 : 0 
                    }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Email Button */}
            <motion.div className="hidden lg:block relative">
              <motion.button
                onClick={copyEmail}
                onMouseEnter={() => setIsEmailHovered(true)}
                onMouseLeave={() => setIsEmailHovered(false)}
                className={`bg-white text-black rounded-full font-medium transition-all duration-300 hover:bg-white/90 hover:shadow-lg relative overflow-hidden ${
                  isScrolled ? "px-4 py-1.5 text-xs" : "px-4 py-1.5 text-xs"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Default Email Text */}
                <motion.span
                  className="flex items-center justify-center"
                  animate={{ 
                    y: emailCopied ? -30 : (isEmailHovered ? -30 : 0),
                    opacity: emailCopied ? 0 : (isEmailHovered ? 0 : 1)
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  ahsanfaraza674@gmail.com
                </motion.span>

                {/* Hover Text - Copy this email */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    y: emailCopied ? -30 : (isEmailHovered ? 0 : 30),
                    opacity: emailCopied ? 0 : (isEmailHovered ? 1 : 0)
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Copy size={14} className="mr-1.5" />
                  Copy this email
                </motion.span>

                {/* Copied Text */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    y: emailCopied ? 0 : 30,
                    opacity: emailCopied ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Check size={14} className="mr-1.5" />
                  Copied!
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-white/80 hover:bg-white/10"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-black/30 pointer-events-auto"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium font-[Urbanist] tracking-wide transition-all duration-300 ${
                      activeSection === item.href.substring(1)
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                ))}

                {/* Mobile Email */}
                <div className="pt-2 border-t border-white/10">
                  <motion.button
                    onClick={copyEmail}
                    className="block w-full text-center bg-white text-black px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/90 relative overflow-hidden"
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      animate={{ y: emailCopied ? -25 : 0, opacity: emailCopied ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ahsan.faraz@gmail.com
                    </motion.span>
                    <motion.span
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ y: emailCopied ? 0 : 25, opacity: emailCopied ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check size={16} className="mr-1.5" />
                      Copied!
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Navbar Line Animation Styles */}
      <style jsx>{`
        .nav-item {
          position: relative;
          padding: 8px 16px;
          background-position-x: 390px;
          transition: background-position-x 0.9s linear, color 0.45s;
        }

        .nav-item:hover {
          background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEi%0D%0AIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhs%0D%0AaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0%0D%0AaD0iMzkwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDM5MCA1MCIgZW5hYmxlLWJhY2tn%0D%0Acm91bmQ9Im5ldyAwIDAgMzkwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZmlsbD0i%0D%0Abm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGlt%0D%0AaXQ9IjEwIiBkPSJNMCw0Ny41ODVjMCwwLDk3LjUsMCwxMzAsMAoJYzEzLjc1LDAsMjguNzQtMzgu%0D%0ANzc4LDQ2LjE2OC0xOS40MTZDMTkyLjY2OSw0Ni41LDI0My42MDMsNDcuNTg1LDI2MCw0Ny41ODVj%0D%0AMzEuODIxLDAsMTMwLDAsMTMwLDAiLz4KPC9zdmc+Cg==") no-repeat center bottom;
          animation: navLine 1s ease-out;
        }

        @keyframes navLine {
          0% {
            background-position-x: 390px;
          }
          100% {
            background-position-x: 0px;
          }
        }
      `}</style>
    </motion.nav>
  );
}
