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
          // Increased randomness for rotation and offset
          const rotations = ['rotate-1', 'rotate-2', 'rotate-3', 'rotate-[-1]', 'rotate-[-2]', 'rotate-[-3]', 'rotate-[1.5deg]', 'rotate-[-1.5deg]'];
          const rotation = rotations[index % rotations.length];
          
          const offsets = ['translate-y-0', 'translate-y-1', 'translate-y-2', 'translate-y-[-1]', 'translate-y-[-2]', 'translate-y-3', 'translate-y-[-3]'];
          const offset = offsets[index % offsets.length];
          
          const hasTape = index % 4 === 0;

          return (
            <div 
              key={index} 
              className={`flex-shrink-0 px-6 transition-all duration-700 hover:z-30 ${offset}`}
            >
              <div className={`relative p-3 pb-10 bg-[#fdfcf8] border-2 border-black/15 ring-1 ring-white/5 transition-all duration-700 hover:-translate-y-4 ${rotation} group/item overflow-hidden shadow-[0_8px_16px_-4px_rgba(0,0,0,0.4),0_4px_8px_-4px_rgba(0,0,0,0.3),0_25px_30px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_30px_-5px_rgba(0,0,0,0.5),0_15px_15px_-5px_rgba(0,0,0,0.3),0_0_50px_rgba(163,160,114,0.4)]`}>
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                
                {/* Persistent Floating Glow (Subtle) */}
                <div className="absolute inset-0 bg-secondary/5 blur-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-700" />

                {/* Tape Accent */}
                {hasTape && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-7 bg-white/30 backdrop-blur-sm border border-white/20 rotate-[-3deg] z-10 shadow-sm opacity-80" />
                )}

                <div className="w-44 h-32 md:w-64 md:h-44 overflow-hidden bg-gray-200 border border-black/5 relative">
                  <img 
                    src={src} 
                    alt={`Marquee image ${index}`} 
                    className="w-full h-full object-cover sepia-[0.2] brightness-90 saturate-[1.2] contrast-[1.1] transition-all duration-1000 group-hover/item:sepia-0 group-hover/item:brightness-100 group-hover/item:scale-110 group-hover/item:saturate-[1.3]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Film Grain on Image */}
                  <div className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                {/* Editorial Caption */}
                <div className="absolute bottom-2 left-0 right-0 px-4 flex items-center justify-between opacity-40 group-hover/item:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 font-bold">Archive No. {index + 100}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
