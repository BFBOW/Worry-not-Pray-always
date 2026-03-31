import React from 'react';
import { motion } from 'motion/react';

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-32">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-heading text-secondary italic">Design Elements</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-70">
            A demonstration of the visual styles used to break up monotony and add depth to the deep green background.
          </p>
        </header>

        {/* 1. Subtle Textures and Patterns */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-heading text-primary-foreground">1. Subtle Textures and Patterns</h2>
            <p className="opacity-70">Adding tactile quality to flat surfaces.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Grainy Texture */}
            <div className="relative h-64 rounded-2xl bg-primary overflow-hidden border border-bordersubtle p-8 flex flex-col justify-end">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
              <h3 className="text-2xl font-heading text-secondary relative z-10">Grainy Texture</h3>
              <p className="text-sm opacity-60 relative z-10">A fractal noise overlay that mimics high-end paper.</p>
            </div>

            {/* Geometric Patterns */}
            <div className="relative h-64 rounded-2xl bg-primary overflow-hidden border border-bordersubtle p-8 flex flex-col justify-end">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23D4D1A5' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")` }} />
              <h3 className="text-2xl font-heading text-secondary relative z-10">Geometric Grid</h3>
              <p className="text-sm opacity-60 relative z-10">A faint cross-grid pattern for technical precision.</p>
            </div>
          </div>
        </section>

        {/* 2. Atmospheric Glows */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-heading text-primary-foreground">2. Atmospheric Glows</h2>
            <p className="opacity-70">Using soft radial gradients to create depth and focus.</p>
          </div>

          <div className="relative h-80 rounded-2xl bg-primary overflow-hidden border border-bordersubtle flex items-center justify-center text-center p-12">
            <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-3xl font-heading text-pop">Soft Halo Effect</h3>
              <p className="max-w-md opacity-70">Glows break up the solid color and suggest a source of light within the layout.</p>
            </div>
          </div>
        </section>

        {/* 3. Decorative Dividers */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-heading text-primary-foreground">3. Decorative Dividers</h2>
            <p className="opacity-70">Artistic ways to separate content sections.</p>
          </div>

          <div className="space-y-16">
            {/* Tapering Line */}
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-secondary/60">Tapering Line</p>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
            </div>

            {/* Vertical Rail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-48 border-l border-secondary/20 pl-8 flex items-center">
                <div className="absolute left-[-1px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary to-transparent" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-heading text-secondary">Vertical Rail</h3>
                  <p className="opacity-60">A thin line that guides the eye vertically.</p>
                </div>
              </div>
              
              {/* SVG Slant */}
              <div className="relative h-48 bg-primary/50 rounded-2xl overflow-hidden border border-bordersubtle">
                <svg className="absolute bottom-0 w-full h-12 text-primary fill-current" viewBox="0 0 1440 120" preserveAspectRatio="none">
                  <path d="M0,120 L1440,120 L1440,0 L0,120 Z" />
                </svg>
                <div className="p-8">
                  <h3 className="text-2xl font-heading text-secondary">Slanted Transition</h3>
                  <p className="opacity-60">Non-straight edges create dynamism.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Overlapping Elements */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-heading text-primary-foreground">4. Overlapping Elements</h2>
            <p className="opacity-70">Breaking the grid to create a layered, fluid feel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Overlap */}
            <div className="space-y-8">
              <div className="h-40 bg-primary-foreground/5 rounded-t-2xl border-x border-t border-bordersubtle" />
              <div className="relative -mt-20 px-8">
                <div className="aspect-video bg-secondary/20 rounded-xl border border-secondary/30 shadow-2xl flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/overlap/800/450" 
                    alt="Overlap demo" 
                    className="w-full h-full object-cover opacity-50"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute text-secondary font-heading italic text-xl">Image Overlap</span>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="relative h-64 bg-primary rounded-2xl border border-bordersubtle flex items-center justify-center">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-heading">Section Content</h3>
                <p className="opacity-60">Standard content area.</p>
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-primary font-heading italic text-center text-sm p-4 shadow-xl rotate-12 border-4 border-primary"
              >
                Floating Badge
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. Glassmorphism Accents */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-heading text-primary-foreground">7. Glassmorphism Accents</h2>
            <p className="opacity-70">Semi-transparent surfaces that feel light and modern.</p>
          </div>

          <div className="relative h-96 rounded-3xl overflow-hidden flex items-center justify-center p-12">
            {/* Background with some shapes to see through the glass */}
            <div className="absolute inset-0 bg-primary">
              <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/20 rounded-full" />
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-secondary/10 rotate-12" />
            </div>
            
            <div className="glass-panel p-12 rounded-2xl max-w-md text-center space-y-4 relative z-10">
              <h3 className="text-3xl font-heading text-secondary italic">Glass Panel</h3>
              <p className="opacity-80">
                This surface uses backdrop-blur to let the background colors bleed through while remaining perfectly legible.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Split Contrast Background */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-heading text-primary-foreground">8. Split Contrast Background</h2>
            <p className="opacity-70">Using two different background colors to create visual balance and hierarchy.</p>
          </div>

          <div className="relative h-[500px] rounded-3xl overflow-hidden border border-bordersubtle flex flex-col md:flex-row">
            {/* Left Side - Dark Green */}
            <div className="flex-1 bg-primary p-12 flex flex-col justify-center space-y-4">
              <h3 className="text-3xl font-heading text-secondary italic">Primary Space</h3>
              <p className="opacity-70">
                The standard deep green background provides a sense of stability and tradition.
              </p>
              <div className="h-1 w-12 bg-secondary/30" />
            </div>
            
            {/* Right Side - Lighter/Contrast */}
            <div className="flex-1 bg-[#3A4A3A] p-12 flex flex-col justify-center space-y-4 relative">
              {/* Subtle texture on the contrast side */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
              
              <h3 className="text-3xl font-heading text-primary-foreground">Contrast Space</h3>
              <p className="opacity-70">
                A slightly lighter or different shade creates a distinct zone for secondary information or highlighted content.
              </p>
              <div className="h-1 w-12 bg-primary-foreground/30" />
            </div>

            {/* Centered Overlap Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <div className="w-20 h-20 bg-secondary rounded-full border-8 border-background shadow-2xl flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* 9. Slanted Split Contrast */}
        <section className="space-y-12 pb-20">
          <div className="space-y-4">
            <h2 className="text-4xl font-heading text-primary-foreground">9. Slanted Split Contrast</h2>
            <p className="opacity-70">A dynamic diagonal split where one side is lighter and the other is darker.</p>
          </div>

          <div 
            className="relative h-[600px] rounded-3xl overflow-hidden border border-bordersubtle"
            style={{ 
              background: 'linear-gradient(110deg, #3A4A3A 50%, #243124 50.5%)'
            }}
          >
            {/* Content Over the Split */}
            <div className="relative z-10 h-full flex items-center px-12 md:px-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                <div className="space-y-6">
                  <h3 className="text-5xl md:text-7xl font-heading text-secondary italic leading-none">The <br/> Contrast</h3>
                  <p className="text-xl opacity-80 max-w-sm">
                    This slanted split creates a powerful visual tension that draws the eye across the page.
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <div className="w-64 h-64 rounded-full border border-secondary/20 flex items-center justify-center p-4">
                    <div className="w-full h-full rounded-full bg-secondary/5 backdrop-blur-sm border border-secondary/10 flex items-center justify-center text-center p-8">
                      <span className="font-heading text-secondary italic">Dynamic Balance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
