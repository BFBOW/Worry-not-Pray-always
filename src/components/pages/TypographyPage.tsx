import React from 'react';
import { motion } from 'motion/react';
import { Type, Sparkles, Heart, Leaf } from 'lucide-react';

export default function TypographyPage() {
  const fonts = [
    {
      name: "Cinzel",
      class: "font-cinzel",
      vibe: "Noble, Spiritual, Established",
      description: "Inspired by first-century Roman inscriptions. It conveys a sense of sacred history and permanence.",
      sample: "Faith in Action • Community Service • Spiritual Growth"
    },
    {
      name: "Bodoni Moda",
      class: "font-bodoni",
      vibe: "High-Fashion, Editorial, Sharp",
      description: "Extreme contrast between thick and thin lines. The peak of sophisticated editorial typography.",
      sample: "Nourishing Body & Soul • A Sanctuary of Hope"
    },
    {
      name: "Fraunces",
      class: "font-fraunces",
      vibe: "Warm, Organic, Hand-Crafted",
      description: "A soft-serif with unique curvy details. It feels human and approachable, like a hand-made scrapbook.",
      sample: "Gathered in Love • Cultivating Kindness"
    },
    {
      name: "Playfair Display",
      class: "font-heading",
      vibe: "Classic, Elegant, Authoritative",
      description: "Your current heading font. A versatile and timeless serif that commands respect.",
      sample: "Guided by Faith • Serving the Whole Person"
    }
  ];

  return (
    <div className="bg-background min-h-screen py-20 px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Type className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h1 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-6 uppercase tracking-tighter">
              Typography <br />
              <span className="text-secondary italic font-normal">Showcase</span>
            </h1>
            <p className="font-paragraph text-xl text-textbody max-w-2xl mx-auto italic opacity-80">
              Exploring "slightly fancy" fonts to elevate the Sanctuary aesthetic.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {fonts.map((font, index) => (
            <motion.div
              key={font.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-8 md:p-12 rounded-sm border-l-4 border-l-secondary"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-2 block">The Vibe: {font.vibe}</span>
                  <h2 className={`${font.class} text-4xl md:text-6xl text-primary-foreground`}>{font.name}</h2>
                </div>
                <div className="max-w-xs text-right">
                  <p className="text-sm text-textlight italic">{font.description}</p>
                </div>
              </div>

              <div className="bg-primary/30 p-8 rounded-sm overflow-hidden border border-bordersubtle/20">
                <div className="mb-4 flex items-center gap-2 opacity-40">
                  <Sparkles size={14} className="text-secondary" />
                  <span className="text-[10px] uppercase tracking-widest">Marquee Preview</span>
                </div>
                <div className="overflow-hidden whitespace-nowrap">
                  <p className={`${font.class} text-3xl md:text-5xl text-secondary animate-pulse`}>
                    {font.sample}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-6 opacity-60">
                <div className="flex items-center gap-2">
                  <Heart size={14} />
                  <span className="text-xs uppercase tracking-widest">Compassion</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf size={14} />
                  <span className="text-xs uppercase tracking-widest">Growth</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-24 text-center">
          <div className="w-px h-24 bg-gradient-to-b from-secondary to-transparent mx-auto mb-8" />
          <p className="font-paragraph text-lg italic opacity-60">
            "Let your speech be always with grace, seasoned with salt..." — Colossians 4:6
          </p>
        </footer>
      </div>
    </div>
  );
}
