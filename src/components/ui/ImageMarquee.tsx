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
          const rotation = index % 2 === 0 ? 'rotate-1' : 'rotate-[-1]';
          const offset = index % 3 === 0 ? 'translate-y-1' : index % 3 === 1 ? 'translate-y-[-1]' : 'translate-y-0';
          const hasTape = index % 4 === 0;

          return (
            <div 
              key={index} 
              className={`flex-shrink-0 px-4 transition-all duration-500 hover:z-30 ${offset}`}
            >
              <div className={`relative p-2 pb-8 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${rotation} group/item`}>
                {/* Tape Accent */}
                {hasTape && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 backdrop-blur-md border border-white/20 rotate-[-2deg] z-10 shadow-sm" />
                )}

                <div className="w-40 h-28 md:w-56 md:h-36 overflow-hidden bg-gray-100">
                  <img 
                    src={src} 
                    alt={`Marquee image ${index}`} 
                    className="w-full h-full object-cover sepia-[0.15] brightness-95 saturate-[1.1] transition-all duration-700 group-hover/item:sepia-0 group-hover/item:brightness-100 group-hover/item:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Editorial Caption */}
                <div className="absolute bottom-1.5 left-0 right-0 px-3 flex items-center justify-between opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Sanctuary Vol. {index % 10 + 1}</span>
                  <div className="w-1 h-1 rounded-full bg-secondary" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
