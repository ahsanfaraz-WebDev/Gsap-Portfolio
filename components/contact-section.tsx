"use client"
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "./TitleHeader";
import ContactExperience from "./models/contact/ContactExperience";

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      // Reset form and stop loading
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error); // Optional: show toast
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  return (
    <section id="contact" className="flex items-center justify-center min-h-screen py-16 lg:py-20">
      <div className="w-full h-full max-w-7xl mx-auto px-5 md:px-10">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="💬 Have questions or ideas? Let's talk! 🚀"
        />
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-16">
          <div className="xl:col-span-5">
            <div className="flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name" className="block text-white mb-2 font-medium">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-2 font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="group relative w-full"
                  disabled={loading}
                >
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-500 hover:bg-white hover:text-black hover:border-white hover:shadow-2xl hover:shadow-white/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    
                    <div className="relative flex items-center justify-center gap-3">
                      <span className="text-lg font-bold tracking-wide">
                        {loading ? "Sending..." : "Send Message"}
                      </span>
                      {!loading && (
                        <svg 
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )}
                      {loading && (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="w-full h-full hover:cursor-grab rounded-3xl overflow-hidden border border-white/20" style={{ backgroundColor: '#FF9B00' }}>
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
