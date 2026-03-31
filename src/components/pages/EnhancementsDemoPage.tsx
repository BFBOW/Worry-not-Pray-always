import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, MousePointer2, Layers, Zap, Eye, Box } from 'lucide-react';

// --- Helper Components ---

const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative px-8 py-4 bg-secondary text-primary font-heading italic rounded-full overflow-hidden group ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </span>
      <motion.div 
        className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full"
      />
    </motion.button>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-secondary rounded-full pointer-events-none z-[9999] hidden lg:block"
      animate={{ 
        x: mousePos.x - 16, 
        y: mousePos.y - 16,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? "rgba(242, 125, 38, 0.1)" : "transparent"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

const RevealCard = ({ title, description, icon: Icon, index }: { title: string, description: string, icon: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="p-8 bg-primary border border-bordersubtle/30 rounded-3xl group hover:border-secondary/50 transition-colors relative overflow-hidden"
      style={{ boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.05), inset 0 -2px 4px rgba(0,0,0,0.2)' }}
    >
      <div className="relative z-10">
        <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
        <h3 className="text-2xl font-heading text-primary-foreground mb-4 italic">{title}</h3>
        <p className="text-textbody/70 leading-relaxed">{description}</p>
      </div>
      {/* Tactile Inner Shadow Effect */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default function EnhancementsDemoPage() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scaleSpring = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 1.1]));

  return (
    <div className="bg-background min-h-screen selection:bg-secondary selection:text-primary">
      <CustomCursor />

      {/* 1. Hero with Parallax & Text Masking */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: yParallax, scale: scaleSpring }}
          className="absolute inset-0 -z-10"
        >
          <img 
            src="https://picsum.photos/seed/editorial/1920/1080?blur=2" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </motion.div>

        <div className="text-center space-y-8 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1 border border-secondary/30 rounded-full text-secondary text-sm tracking-widest uppercase mb-6">
              Visual Enhancements Lab
            </span>
            <h1 className="text-8xl md:text-[12rem] font-heading leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-secondary bg-[length:200%_auto] animate-gradient-x italic">
              BFBOW
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-textbody/60 max-w-2xl mx-auto font-light"
          >
            A demonstration of world-class editorial design patterns, 
            pushing the boundaries of depth, motion, and tactile feedback.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-12"
          >
            <MagneticButton>Explore the Lab</MagneticButton>
          </motion.div>
        </div>

        {/* Floating Halo Glows */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10" 
        />
      </section>

      {/* 2. Staggered Reveal Grid with Tactile Cards */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-heading text-primary-foreground italic">The <br/> Experience</h2>
            <p className="text-textbody/60 max-w-md">
              Every interaction is designed to feel intentional, using staggered reveal animations to create rhythm.
            </p>
          </div>
          <div className="text-8xl font-heading text-secondary/10 italic select-none">01</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RevealCard 
            index={0}
            title="Magnetic Pull"
            description="Buttons and interactive elements that subtly attract the cursor, creating a physical connection."
            icon={MousePointer2}
          />
          <RevealCard 
            index={1}
            title="Tactile Depth"
            description="Using inner shadows and subtle gradients to make UI elements feel like physical objects."
            icon={Box}
          />
          <RevealCard 
            index={2}
            title="Glassmorphism"
            description="Layered frosted glass effects that maintain context while providing focus."
            icon={Layers}
          />
          <RevealCard 
            index={3}
            title="Momentum"
            description="Smooth transitions and spring-based physics that mimic real-world movement."
            icon={Zap}
          />
          <RevealCard 
            index={4}
            title="Visual Reveal"
            description="Images and content that zoom or shift on hover to provide immediate feedback."
            icon={Eye}
          />
          <RevealCard 
            index={5}
            title="Atmosphere"
            description="Dynamic lighting and grain textures that add warmth and personality."
            icon={Sparkles}
          />
        </div>
      </section>

      {/* 3. Glassmorphism & Slanted Split Integration */}
      <section className="relative py-40 overflow-hidden">
        {/* Slanted Split with Gradient */}
        <div 
          className="absolute inset-0 -z-20"
          style={{ background: 'linear-gradient(110deg, #3A4A3A 50%, #243124 50.5%)' }}
        />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-6xl md:text-8xl font-heading text-primary-foreground italic leading-none">
                Refined <br/> <span className="text-secondary">Aesthetics</span>
              </h2>
              <p className="text-xl text-textbody/70 leading-relaxed max-w-lg">
                By combining sharp diagonal splits with soft glassmorphism, we create a visual language that is both precise and approachable.
              </p>
              <div className="pt-4">
                <MagneticButton className="bg-primary text-secondary border border-secondary/20">
                  Learn More
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5 p-12 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-center space-y-6 relative z-10">
                  <div className="w-24 h-24 bg-secondary rounded-full mx-auto flex items-center justify-center text-primary shadow-2xl shadow-secondary/20">
                    <Sparkles size={40} />
                  </div>
                  <h3 className="text-3xl font-heading text-primary-foreground italic">Glass Interface</h3>
                  <p className="text-textbody/60">Hover to see the light shift across the surface.</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 border border-secondary/20 rounded-full animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Color Palette Exploration - Copper & Cool Earth Tones */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-heading text-primary-foreground italic">The <br/> Palette</h2>
            <p className="text-textbody/60 max-w-md">
              Moving away from warm oranges toward refined coppers and cool-toned earth tones for a more sophisticated, boutique feel.
            </p>
          </div>
          <div className="text-8xl font-heading text-secondary/10 italic select-none">02</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {name: "Aged Brass", hex: "#918151", desc: "The signature greenish-gold metallic. Zero orange tones.", text: "text-primary"},
            {name: "Forest Charcoal", hex: "#1A241A", desc: "The deep, cool green-black foundation.", text: "text-white"},
            {name: "Deep Sea Slate", hex: "#1B262C", desc: "A rich, cool blue-gray with immense depth.", text: "text-white"},
            {name: "Midnight Indigo", hex: "#1E2A38", desc: "A dark, atmospheric blue for cool contrast.", text: "text-white"},
            {name: "Cool Spruce", hex: "#2D4F4F", desc: "A deep green-blue bridge between tones.", text: "text-white"},
          ].map((color, i) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-64 rounded-3xl overflow-hidden border border-bordersubtle/20"
            >
              <div 
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundColor: color.hex }}
              />
              <div className={`relative z-10 h-full p-8 flex flex-col justify-end ${color.text}`}>
                <h4 className="text-xl font-heading italic mb-2">{color.name}</h4>
                <p className="text-sm opacity-70 leading-tight">{color.desc}</p>
                <code className="mt-4 text-[10px] uppercase tracking-widest opacity-50">{color.hex}</code>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Practical Application - Cool Depth Editorial Layout */}
      <section className="py-32 bg-[#1B262C] relative overflow-hidden">
        {/* Subtle Gradient Overlay to Green */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B262C] via-[#1B262C] to-[#1A241A] opacity-80" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Typography & Accents */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  className="h-px bg-[#918151]"
                />
                <h2 className="text-7xl md:text-8xl font-heading text-white italic leading-[0.9] tracking-tighter">
                  Cool <br/> <span className="text-[#918151]">Depths</span>
                </h2>
              </div>
              
              <div className="space-y-8 border-l border-[#2D4F4F] pl-8">
                <p className="text-xl text-[#7D8C7D] leading-relaxed italic font-light">
                  "The intersection of deep water and dense forest creates a sanctuary of calm."
                </p>
                <p className="text-white/40 leading-relaxed">
                  By layering <span className="text-white">Deep Sea Slate</span> with our signature <span className="text-[#918151]">Aged Brass</span>, we achieve a cool, immersive atmosphere that feels sophisticated without the warmth of brown or the flatness of gray.
                </p>
                <div className="pt-4">
                  <button className="group flex items-center gap-4 text-[#918151] font-heading italic text-lg">
                    <span>Explore the Depths</span>
                    <div className="w-12 h-px bg-[#918151] group-hover:w-20 transition-all duration-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Subtle Layering */}
            <div className="lg:col-span-7 relative">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-white/5 relative group">
                <img 
                  src="https://picsum.photos/seed/deep-water/1200/800" 
                  alt="Deep Water Texture" 
                  className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle Cool Spruce Overlay */}
                <div className="absolute inset-0 bg-[#2D4F4F]/20 mix-blend-overlay" />
                
                {/* Integrated Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-[#1B262C] to-transparent">
                  <div className="flex items-center gap-6">
                    <div className="w-px h-12 bg-[#918151]" />
                    <div className="space-y-1">
                      <h4 className="text-white font-heading italic text-2xl">Midnight Indigo</h4>
                      <p className="text-[#7D8C7D] text-sm">A cool, atmospheric bridge between tones.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Decorative Element */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border border-[#918151]/20 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 border border-[#918151]/10 rounded-full flex items-center justify-center">
                  <Sparkles size={20} className="text-[#918151]/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. The Vibe Expansion - Complementary Tones & Textures */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-heading text-primary-foreground italic">The <br/> Expansion</h2>
            <p className="text-textbody/60 max-w-md">
              Expanding the "Aged Brass" aesthetic with complementary tones and tactile textures that evoke a sense of history and craftsmanship.
            </p>
          </div>
          <div className="text-8xl font-heading text-secondary/10 italic select-none">04</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* New Tones */}
          <div className="space-y-8">
            <h3 className="text-3xl font-heading text-primary-foreground italic border-b border-bordersubtle/30 pb-4">Cool Depths</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Deep Sea Slate", hex: "#1B262C", desc: "A rich, cool blue-gray with immense depth." },
                { name: "Midnight Indigo", hex: "#1E2A38", desc: "A dark, atmospheric blue for cool contrast." },
                { name: "Cool Spruce", hex: "#2D4F4F", desc: "A deep green-blue bridge between tones." },
                { name: "Parchment", hex: "#E8E4D9", desc: "A warm, high-end off-white for balance." },
              ].map((color) => (
                <div key={color.name} className="p-6 rounded-2xl border border-bordersubtle/20 flex flex-col gap-4">
                  <div className="w-full h-12 rounded-lg" style={{ backgroundColor: color.hex }} />
                  <div>
                    <h4 className="font-heading italic text-primary-foreground">{color.name}</h4>
                    <p className="text-xs text-textbody/50">{color.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tactile Textures */}
          <div className="space-y-8">
            <h3 className="text-3xl font-heading text-primary-foreground italic border-b border-bordersubtle/30 pb-4">Tactile Textures</h3>
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-[#1A241A] border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="relative z-10 space-y-4">
                  <h4 className="text-xl font-heading text-white italic">Micro-Grain Overlay</h4>
                  <p className="text-[#7D8C7D] text-sm leading-relaxed">
                    A subtle film grain adds a "printed" quality to the screen, reducing the digital harshness and making the colors feel more organic.
                  </p>
                </div>
              </div>
              
              <div className="p-8 rounded-3xl bg-[#E8E4D9] border border-black/5 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/linen-canvas.png')]" />
                <div className="relative z-10 space-y-4">
                  <h4 className="text-xl font-heading text-primary italic">Linen Canvas</h4>
                  <p className="text-textbody/60 text-sm leading-relaxed">
                    Using subtle repeating patterns like linen or canvas creates a "tactile" background that responds beautifully to light and shadow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA with Slam-in Animation */}
      <section className="py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 2, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="space-y-12"
        >
          <h2 className="text-7xl md:text-[10rem] font-heading text-primary-foreground italic leading-none tracking-tighter">
            READY TO <br/> <span className="text-secondary">EVOLVE?</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton>Start the Journey</MagneticButton>
            <button className="px-8 py-4 border border-bordersubtle rounded-full text-textbody hover:bg-primary transition-colors font-heading italic">
              View Documentation
            </button>
          </div>
        </motion.div>
      </section>

      {/* Grain Overlay (Global but reinforced here) */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
