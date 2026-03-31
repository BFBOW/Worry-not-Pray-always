import React from 'react';

interface ImageMarqueeProps {
  images: string[];
  speed?: number; // duration in seconds
  reverse?: boolean;
}

export const ImageMarquee: React.FC<ImageMarqueeProps> = ({ 
  images, 
  speed = 40, 
  reverse = false 
}) => {
  // Duplicate the images to create a seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden py-4 group border-y border-bordersubtle/10">
      {/* Refined side gradients - widened and softened */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

      <div 
        className={`flex w-max animate-marquee ${reverse ? 'flex-row-reverse' : ''}`}
        style={{ 
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal'
        }}
      >
        {duplicatedImages.map((src, index) => {
          // Increased randomness for a more "tossed" look
          const rotations = ['rotate-1', 'rotate-[-1]', 'rotate-2', 'rotate-[-2]', 'rotate-3', 'rotate-[-3]'];
          const rotation = rotations[index % rotations.length];
          
          const offsets = ['translate-y-2', 'translate-y-[-2]', 'translate-y-4', 'translate-y-[-4]', 'translate-y-0'];
          const offset = offsets[index % offsets.length];
          
          const hasTape = index % 3 === 0;

          return (
            <div 
              key={index} 
              className={`flex-shrink-0 px-6 transition-all duration-500 hover:z-30 ${offset}`}
            >
              <div className={`relative p-3 pb-10 bg-[#F9F9F7] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5),0_20px_40px_-15px_rgba(0,0,0,0.3)] ring-1 ring-black/20 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),0_0_20px_rgba(163,160,114,0.2)] ${rotation} group/item`}>
                
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                
                {/* Persistent Floating Glow (Tan-Green) */}
                <div className="absolute inset-0 bg-secondary/10 blur-2xl -z-10 opacity-40 group-hover/item:opacity-100 transition-opacity" />
                
                {/* Tape Accent */}
                {hasTape && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/30 backdrop-blur-md border border-white/20 rotate-[-3deg] z-10 shadow-sm flex items-center justify-center">
                    <div className="w-full h-px bg-black/5" />
                  </div>
                )}

                <div className="w-44 h-32 md:w-64 md:h-44 overflow-hidden bg-gray-200 border border-black/10">
                  <img 
                    src={src} 
                    alt={`Marquee image ${index}`} 
                    className="w-full h-full object-cover sepia-[0.2] brightness-[0.9] saturate-[1.2] contrast-[1.05] transition-all duration-700 group-hover/item:sepia-0 group-hover/item:brightness-100 group-hover/item:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Film Grain Overlay on Image */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                </div>

                {/* Editorial Caption */}
                <div className="absolute bottom-2 left-0 right-0 px-4 flex items-center justify-between opacity-60 group-hover/item:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40">Archive {index % 100 + 100}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_5px_rgba(163,160,114,0.8)]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
