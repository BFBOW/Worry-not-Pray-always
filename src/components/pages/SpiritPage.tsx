import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Mail, MessageSquare, Sparkles, RefreshCw, Leaf, Heart, Shield, ArrowRight } from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import SignupForm from '../SignupForm';
import { Image } from '../ui/image';

const Spirit: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [devotional, setDevotional] = useState<any>(null);
  const [topic, setTopic] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const generateNewDevotional = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    const result = await geminiService.generateDevotional(topic);
    setDevotional(result);
    setLoading(false);
  };

  return (
    <div ref={containerRef} className="bg-background min-h-screen selection:bg-secondary selection:text-white overflow-hidden">
      
      {/* --- UNIQUE FULL-WIDTH HERO --- */}
      <section className="relative w-full min-h-[70vh] py-20 flex items-center justify-center overflow-hidden border-b border-bordersubtle/20">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop"
            alt="Sacred scriptures"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-background" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Leaf className="w-12 h-12 text-secondary mx-auto mb-8 animate-pulse" />
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.85] mb-8 uppercase tracking-tighter text-pop">
              Food for the <br />
              <span className="text-secondary italic font-normal">Spirit</span>
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-textbody max-w-2xl mx-auto leading-relaxed italic">
              "Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God."
              <span className="block mt-4 text-sm not-italic uppercase tracking-widest">— Matthew 4:4</span>
            </p>
            <motion.div 
              style={{ opacity }}
              className="mt-16 flex justify-center"
            >
              <div className="w-px h-24 bg-gradient-to-b from-secondary to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- DYNAMIC MARQUEE --- */}
      <div className="w-full bg-secondary py-6 overflow-hidden flex items-center border-y border-bordersubtle/20 relative z-20">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap gap-16 px-8"
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="font-heading text-3xl text-secondary-foreground/90 italic">Daily Bread</span>
              <span className="w-3 h-3 rotate-45 bg-secondary-foreground/30" />
              <span className="font-heading text-3xl text-secondary-foreground/90 italic">Spiritual Growth</span>
              <span className="w-3 h-3 rotate-45 bg-secondary-foreground/30" />
              <span className="font-heading text-3xl text-secondary-foreground/90 italic">Divine Guidance</span>
              <span className="w-3 h-3 rotate-45 bg-secondary-foreground/30" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- MAIN INTERACTIVE GRID --- */}
      <section className="w-full max-w-[120rem] mx-auto px-8 md:px-16 lg:px-24 py-24 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Generator (Editorial Style) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-secondary font-bold tracking-[0.3em] uppercase text-sm">AI Ministry</span>
                <div className="h-px flex-grow bg-bordersubtle/30" />
              </div>
              <h2 className="font-heading text-5xl md:text-6xl text-primary-foreground mb-8 text-pop">
                A Word for <br />
                <span className="text-secondary italic font-normal">Your Season</span>
              </h2>
              <p className="font-paragraph text-textbody text-xl mb-12 leading-relaxed max-w-xl">
                Whether you are walking through a valley or standing on a mountaintop, God's Word has a specific promise for you. Enter your current heart-state below.
              </p>

              <form onSubmit={generateNewDevotional} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-transparent rounded-sm blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="What's on your heart? (e.g. Loneliness, Joy, Waiting)"
                    className="flex-grow bg-primary/40 border border-bordersubtle/30 px-8 py-6 rounded-sm font-paragraph text-primary-foreground placeholder:text-textbody/20 focus:outline-none focus:border-secondary transition-all text-lg"
                  />
                  <button
                    disabled={loading}
                    className="px-10 py-6 bg-secondary text-white font-paragraph font-bold uppercase tracking-widest rounded-sm hover:bg-secondary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-xl shadow-secondary/10"
                  >
                    {loading ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        Generate
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>

            <AnimatePresence mode="wait">
              {devotional ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="relative p-12 md:p-20 border border-bordersubtle/30 glass-panel rounded-sm backdrop-blur-sm shadow-2xl"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-5 text-secondary">
                    <Leaf size={160} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-px bg-secondary shadow-[0_0_10px_rgba(212,209,165,0.5)]" />
                      <span className="text-secondary font-bold uppercase tracking-widest text-xs">Today's Devotional</span>
                    </div>
                    
                    <h3 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-8 italic leading-tight text-pop">{devotional.title}</h3>
                    
                    <div className="mb-12 p-8 bg-background/60 border-l-4 border-secondary rounded-r-sm">
                      <p className="font-paragraph text-xl text-primary-foreground leading-relaxed italic">
                        "{devotional.verse}"
                      </p>
                    </div>

                    <div className="space-y-10 font-paragraph text-textbody leading-relaxed text-xl">
                      <p className="first-letter:text-5xl first-letter:font-heading first-letter:text-secondary first-letter:mr-3 first-letter:float-left">
                        {devotional.content}
                      </p>
                      
                      <div className="p-8 border-y border-bordersubtle/20 bg-white/5 italic text-secondary">
                        <span className="block text-xs font-bold uppercase tracking-widest mb-4 not-italic opacity-60">Reflection</span>
                        "{devotional.reflection}"
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="font-heading text-sm uppercase tracking-[0.3em] text-primary-foreground mb-6">A Prayer for You</h4>
                        <p className="italic text-textbody text-2xl border-l-2 border-bordersubtle/30 pl-8">"{devotional.prayer}"</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => { setDevotional(null); setTopic(''); }}
                      className="mt-16 flex items-center gap-3 text-secondary font-bold uppercase tracking-widest text-sm hover:text-primary-foreground transition-colors group"
                    >
                      <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                      Seek another word
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-10 border border-bordersubtle/20 glass-panel rounded-sm group relative overflow-hidden cursor-pointer"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                      <Heart size={120} />
                    </div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      className="inline-block"
                    >
                      <Heart className="w-12 h-12 text-secondary mb-8 transition-colors group-hover:text-secondary-foreground" />
                    </motion.div>
                    
                    <h3 className="font-heading text-3xl text-primary-foreground mb-4 group-hover:text-secondary transition-colors">Prayer Warriors</h3>
                    <p className="font-paragraph text-textbody mb-8 leading-relaxed text-lg">Our dedicated team is ready to stand in the gap for you. Submit your requests privately.</p>
                    
                    <div className="flex items-center text-sm uppercase tracking-[0.2em] text-secondary font-bold group-hover:text-primary-foreground transition-colors">
                      <span className="relative">
                        Submit Request
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary group-hover:w-full transition-all duration-300" />
                      </span>
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform duration-300" />
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-10 border border-bordersubtle/20 glass-panel rounded-sm group relative overflow-hidden cursor-pointer"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
                      <Shield size={120} />
                    </div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, y: [0, -5, 0] }}
                      className="inline-block"
                    >
                      <Shield className="w-12 h-12 text-secondary mb-8 transition-colors group-hover:text-secondary-foreground" />
                    </motion.div>
                    
                    <h3 className="font-heading text-3xl text-primary-foreground mb-4 group-hover:text-secondary transition-colors">Bible Study</h3>
                    <p className="font-paragraph text-textbody mb-8 leading-relaxed text-lg">Deepen your understanding of the Word through our guided community studies.</p>
                    
                    <div className="flex items-center text-sm uppercase tracking-[0.2em] text-secondary font-bold group-hover:text-primary-foreground transition-colors">
                      <span className="relative">
                        View Schedule
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary group-hover:w-full transition-all duration-300" />
                      </span>
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform duration-300" />
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Sidebar (Sticky & Dynamic) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-12">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative p-12 glass-panel rounded-sm overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
                <Mail className="w-12 h-12 text-secondary mb-8" />
                <h2 className="font-heading text-3xl text-primary-foreground mb-6 text-pop">Weekly Manna</h2>
                <p className="font-paragraph text-textbody mb-10 leading-relaxed">
                  Receive our most uplifting devotionals and community updates directly to your inbox.
                </p>
                <SignupForm />
              </motion.div>

              <div className="relative h-[500px] rounded-sm overflow-hidden group">
                <Image 
                  src="/ffts.jpg"
                  alt="Community fellowship"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent p-10 flex flex-col justify-end">
                  <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-4">Our Community</span>
                  <h3 className="font-heading text-3xl text-primary-foreground mb-4">Better Together</h3>
                  <p className="text-textbody text-sm leading-relaxed">
                    Faith is a journey best shared. Join us in person or online to grow in grace and knowledge.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- ATMOSPHERIC QUOTE SECTION --- */}
      <section className="relative w-full py-40 lg:py-60 overflow-hidden border-t border-bordersubtle/10">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop"
            alt="Peaceful horizon"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary text-6xl font-heading mb-8 block">"</span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-12 leading-tight italic text-pop">
              Your word is a lamp to my feet and a light to my path.
            </h2>
            <div className="h-px w-24 bg-secondary mx-auto mb-6" />
            <span className="font-paragraph text-sm uppercase tracking-[0.4em] text-secondary opacity-60">Psalm 119:105</span>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Spirit;
