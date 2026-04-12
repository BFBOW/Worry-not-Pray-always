import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Palette, Sparkles, Heart, Lightbulb } from 'lucide-react';

const ConceptCard = ({ 
  title, 
  look, 
  why, 
  styling, 
  renderVerse 
}: { 
  title: string, 
  look: string, 
  why: string, 
  styling: string, 
  renderVerse: () => React.ReactNode 
}) => (
  <div className="p-10 rounded-3xl border border-bordersubtle/20 bg-primary/30 hover:bg-primary/40 transition-all group flex flex-col h-full">
    <div className="mb-8">
      <h3 className="font-heading text-3xl text-primary-foreground mb-2">{title}</h3>
      <div className="h-1 w-12 bg-secondary rounded-full" />
    </div>
    
    <div className="mb-10 flex-grow">
      {renderVerse()}
    </div>
    
    <div className="space-y-4 mt-auto">
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold mb-1">The Look</h4>
        <p className="text-textbody/70 text-sm leading-relaxed">{look}</p>
      </div>
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold mb-1">Why it Works</h4>
        <p className="text-textbody/70 text-sm leading-relaxed">{why}</p>
      </div>
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold mb-1">Styling</h4>
        <p className="text-textbody/70 text-sm leading-relaxed">{styling}</p>
      </div>
    </div>
  </div>
);

export default function SuggestionsPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  return (
    <div className="bg-background min-h-screen pt-24 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-secondary/10 rounded-full border border-secondary/20">
              <Sparkles className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-6 leading-tight">
            Spirit <span className="text-secondary italic">Suggestions</span>
          </h1>
          <p className="font-paragraph text-xl text-textbody max-w-2xl mx-auto leading-relaxed">
            A space for growth, feedback, and creative vision. We've curated four distinct concepts for how we present God's Word throughout the site.
          </p>
        </motion.div>
      </section>

      {/* --- PROPOSED CONCEPTS --- */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex items-center gap-4 mb-12">
          <Palette className="w-6 h-6 text-secondary" />
          <h2 className="font-heading text-3xl text-primary-foreground">Proposed Design Concepts</h2>
          <div className="h-px flex-grow bg-bordersubtle/20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ConceptCard 
            title="1. The Parchment Style"
            look="A soft, Warm Cream background (like aged paper) with the Deep Forest Green text inside."
            why="It introduces a 'bright' element to the page that isn't just white. It feels high-end, editorial, and very readable."
            styling="A small 'bubble' with very rounded corners and a tiny, soft shadow to make it look like it's floating slightly."
            renderVerse={() => (
              <div className="bg-cream p-8 rounded-[2.5rem] shadow-lg border border-black/5 transform hover:-translate-y-1 transition-transform duration-500">
                <p className="text-forest italic font-medium text-xl md:text-2xl leading-relaxed text-center">
                  "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future."
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-forest/60 text-center mt-4">— Jeremiah 29:11</p>
              </div>
            )}
          />

          <ConceptCard 
            title="2. The Olive Branch Style"
            look="Using a Warm Olive Sage (#A3A072) for the text itself, but placing it against a very faint, muted version of the same color as a background."
            why="It bridges the gap between our Forest Green and secondary Gold. It feels organic, sun-bleached, and peaceful."
            styling="No heavy borders—just the text and perhaps a single, very thin line at the top or bottom to set it apart."
            renderVerse={() => (
              <div className="bg-sage/5 py-8 border-t border-sage/20">
                <p className="text-sage italic font-medium text-xl md:text-2xl leading-relaxed text-center">
                  "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future."
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-sage/60 text-center mt-4">— Jeremiah 29:11</p>
                <div className="h-px w-1/4 bg-sage/20 mx-auto mt-8" />
              </div>
            )}
          />

          <ConceptCard 
            title="3. The Warm Amber Style"
            look="A color that is deeper and 'hotter' than the gold—think Burnt Amber or Deep Ochre."
            why="It is in the same family as your secondary gold color but has more 'soul' and weight. It brings warmth and energy to the page."
            styling="This color works best for the text itself, perhaps with a very light 'glow' or a cream background."
            renderVerse={() => (
              <div className="bg-cream/40 p-8 rounded-3xl backdrop-blur-sm border border-ochre/10">
                <p className="text-ochre italic font-medium text-xl md:text-2xl leading-relaxed text-center drop-shadow-[0_0_8px_rgba(179,125,46,0.15)]">
                  "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future."
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-ochre/60 text-center mt-4">— Jeremiah 29:11</p>
              </div>
            )}
          />

          <ConceptCard 
            title="4. The Ghost Sage Style"
            look="A Muted Sage background with Pure White text."
            why="It flips the hierarchy. Instead of dark text on light, you have light text on a medium-toned 'bubble.' It creates a modern, 'Zen' feel."
            styling="A 'pill' shape (completely rounded ends) for a more modern, dynamic look."
            renderVerse={() => (
              <div className="bg-sage p-10 rounded-full shadow-xl border border-white/10">
                <p className="text-white italic font-medium text-lg md:text-xl leading-relaxed text-center">
                  "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future."
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/70 text-center mt-4">— Jeremiah 29:11</p>
              </div>
            )}
          />
        </div>
      </section>

      {/* --- MINISTRY SUGGESTION BOX --- */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="glass-panel p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <MessageSquare className="w-32 h-32 text-secondary" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Lightbulb className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="font-heading text-3xl text-primary-foreground">Ministry Suggestion Box</h2>
            </div>

            <p className="font-paragraph text-lg text-textbody mb-8 leading-relaxed">
              Do you have an idea for a new outreach program, a Bible study topic, or a way we can better serve the Belleville community? Please share your thoughts with us.
            </p>

            {formStatus === 'sent' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary/10 border border-secondary/30 p-8 rounded-2xl text-center"
              >
                <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-2xl text-primary-foreground mb-2">Thank You!</h3>
                <p className="text-textbody">Your suggestion has been received. We appreciate your heart for this ministry.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-sm font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-secondary">Your Name (Optional)</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary transition-colors outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-secondary">Category</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary transition-colors outline-none appearance-none">
                      <option className="bg-primary">General Suggestion</option>
                      <option className="bg-primary">Outreach Idea</option>
                      <option className="bg-primary">Bible Study Topic</option>
                      <option className="bg-primary">Website Feedback</option>
                      <option className="bg-primary">Volunteer Opportunity</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-secondary">Your Suggestion</label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary transition-colors outline-none resize-none"
                    placeholder="Tell us what's on your heart..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full py-4 bg-secondary text-white font-bold uppercase tracking-widest rounded-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {formStatus === 'sending' ? 'Sending...' : (
                    <>
                      Submit Suggestion <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
