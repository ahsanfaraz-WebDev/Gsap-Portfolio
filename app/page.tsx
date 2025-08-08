"use client"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import WorkExperienceSection from "@/components/work-experience-section"
import WordsThatInspireSection from "@/components/words-that-inspire-section"
import ParticleBackground from "@/components/particle-background"

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <WorkExperienceSection />
        <WordsThatInspireSection />
      </main>
    </div>
  )
}
