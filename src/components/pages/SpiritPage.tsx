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
      <section className="relative w-full min-h-[50vh] py-20 flex items-center justify-center overflow-hidden border-b border-bordersubtle/20">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0 h-[130%]"
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
                <div className="space-y-12 mt-12">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs">Pathways to Peace</span>
                    <div className="h-px flex-grow bg-bordersubtle/20" />
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer relative"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-8 py-10 border-b border-bordersubtle/20 group-hover:border-secondary transition-all duration-500">
                      <span className="font-heading text-5xl md:text-6xl text-secondary/20 group-hover:text-secondary transition-colors duration-500 italic shrink-0">01</span>
                      <div className="flex-grow">
                        <h3 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-3 group-hover:text-secondary transition-colors duration-500">Prayer Warriors</h3>
                        <p className="font-paragraph text-textbody text-lg leading-relaxed max-w-xl">Our dedicated team is ready to stand in the gap for you. Submit your requests privately and join our circle of intercession.</p>
                      </div>
                      <div className="flex items-center gap-4 text-secondary font-bold uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                        <span>Submit Request</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group cursor-pointer relative"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-8 py-10 border-b border-bordersubtle/20 group-hover:border-secondary transition-all duration-500">
                      <span className="font-heading text-5xl md:text-6xl text-secondary/20 group-hover:text-secondary transition-colors duration-500 italic shrink-0">02</span>
                      <div className="flex-grow">
                        <h3 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-3 group-hover:text-secondary transition-colors duration-500">Bible Study</h3>
                        <p className="font-paragraph text-textbody text-lg leading-relaxed max-w-xl">Deepen your understanding of the Word through our guided community studies. Explore the scriptures in a supportive, faith-filled environment.</p>
                      </div>
                      <div className="flex items-center gap-4 text-secondary font-bold uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                        <span>View Schedule</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative py-12 border-b border-bordersubtle/20"
              >
                <div className="flex items-center gap-4 mb-8">
                  <Mail className="w-6 h-6 text-secondary" />
                  <h2 className="font-heading text-3xl text-primary-foreground text-pop">Weekly Manna</h2>
                </div>
                <p className="font-paragraph text-textbody mb-10 leading-relaxed text-lg">
                  Receive our most uplifting devotionals and community updates directly to your inbox.
                </p>
                <SignupForm />
              </motion.div>

              <div className="relative h-[500px] rounded-sm overflow-hidden group">
                <Image 
                  src="https://i.ibb.co/TDY4F7mm/ffts.jpg"
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
