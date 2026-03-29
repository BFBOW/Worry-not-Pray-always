import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, MapPin, Clock, Leaf } from 'lucide-react';
import { Button } from '../ui/button';
import { Image } from '../ui/image';
import { ImageMarquee } from '../ui/ImageMarquee';

export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const marqueeImages = [
    "https://i.ibb.co/FkDtD1Wc/IMG-5436.jpg",
    "https://i.ibb.co/sdBkSxhH/IMG-4988-Copy.jpg",
    "https://i.ibb.co/9ksZy1mY/IMG-5011-Copy.jpg",
    "https://i.ibb.co/9m2zRqRP/IMG-5022-Copy.jpg",
    "https://i.ibb.co/XfH2t4Y2/IMG-5033-Copy.jpg",
    "https://i.ibb.co/HD7SjpW1/IMG-5034-Copy.jpg",
    "https://i.ibb.co/HfWLZPxm/IMG-5037-Copy.jpg",
    "https://i.ibb.co/chFkkt3y/IMG-5040-Copy.jpg",
    "https://i.ibb.co/m5H71QzC/IMG-5042-Copy.jpg",
    "https://i.ibb.co/LDF35d5B/IMG-5050-Copy.jpg",
    "https://i.ibb.co/zhDndNDk/IMG-5051-Copy.jpg",
    "https://i.ibb.co/DHySzsdv/IMG-5057-Copy.jpg",
    "https://i.ibb.co/GQ3x7R7t/IMG-5090-Copy.jpg",
    "https://i.ibb.co/X0dBFXb/IMG-5117-Copy.jpg",
    "https://i.ibb.co/HD64vbLT/IMG-5121-Copy.jpg",
    "https://i.ibb.co/kVs1fmTT/IMG-5123-Copy.jpg",
    "https://i.ibb.co/bj4TZtmK/IMG-5157-Copy.jpg",
    "https://i.ibb.co/G49Rw5rz/IMG-5161.jpg",
    "https://i.ibb.co/r2nW8pbc/IMG-5176-Copy.jpg",
    "https://i.ibb.co/LzK0wBkv/IMG-5182.jpg",
    "https://i.ibb.co/bjjY54SZ/IMG-5191.jpg",
    "https://i.ibb.co/8gckZkJb/IMG-5211.jpg",
    "https://i.ibb.co/yF08knzR/IMG-5238-Copy.jpg",
    "https://i.ibb.co/wh25pMdk/IMG-5260.jpg",
    "https://i.ibb.co/svp76Znw/IMG-5318-Copy.jpg",
    "https://i.ibb.co/zT8Lmbb8/IMG-5319.jpg",
    "https://i.ibb.co/JF29jnGP/IMG-5321-Copy.jpg"
  ];

  const eventMarqueeImages = [
    "https://i.ibb.co/QjJtftTH/10daysfly.jpg",
    "https://i.ibb.co/5X8V0Xyj/commmuniy.jpg",
    "https://i.ibb.co/JFkCPJWT/event.jpg",
    "https://i.ibb.co/jkLZzXr8/eventfly.jpg",
    "https://i.ibb.co/zWnhP443/ffdf.jpg",
    "https://i.ibb.co/vvw9J2wz/flyer.jpg",
    "https://i.ibb.co/cSvnS1FY/journey.jpg",
    "https://i.ibb.co/FksBVjC6/penta.jpg",
    "https://i.ibb.co/mrx4qpNP/prayer.jpg",
    "https://i.ibb.co/BH6Nv488/summer-camp.jpg"
  ];

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const events = [
    {
      title: 'Weekly Food Distribution',
      date: 'Every Wednesday',
      time: '10:00 AM - 2:00 PM',
      location: 'Main Community Center - New Location TBA',
      desc: 'Join us for our weekly distribution of fresh produce, perishable, non-perishable and pantry staples to the community. Colossians 1:10 ESV / 5 helpful votes Helpful Not Helpful So as to walk in a manner worthy of the Lord, fully pleasing to him: bearing fruit in every good work and increasing in the knowledge of God; Colossians 1:10'
    },
    {
      title: 'Community Bible Study - Jesus said unto them, Go ye into all the world, and preach the gospel to every creature. He that believeth and is baptized shall be saved Mark 16:15-16 KJV',
      date: 'Every Tuesday',
      time: '6:30 PM - 8:00 PM',
      location: 'Belleville Food Bank On Wheels Chapel',
      desc: 'Come join us for a time of spiritual growth and fellowship as we dive into the scriptures together. Study to show thyself approved unto God, a workman that has nothing to be ashamed of, rightly dividing the word of truth” (2 Tim. 2:15'
    },
    {
      title: 'Volunteer Orientation',
      date: 'First TBA of Month',
      time: '9:00 AM - 11:00 AM',
      location: 'Hub Office',
      desc: "New to Belleville Food Bank On Wheels? We welcome you to join us and learn how you can make an impact in our community. Isaiah 58:10 — 'And if thou draw out thy soul to the hungry, and satisfy the afflicted soul; then shall thy light rise in obscurity, and thy darkness be as the noon day.' 2 Corinthians 9:7-8 — 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver. And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.'"
    }
  ];

  return (
    <div ref={containerRef} className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-4 flex items-center justify-center overflow-hidden border-b border-bordersubtle/20">
        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="w-full mb-4">
              <ImageMarquee images={marqueeImages} speed={70} />
            </div>

            <div className="relative w-full py-6 flex items-center justify-center overflow-hidden">
              {/* Background Marquee */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center">
                <ImageMarquee images={eventMarqueeImages} speed={35} reverse />
              </div>

              <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                <Leaf className="w-8 h-8 text-secondary mx-auto mb-4 animate-pulse" />
                <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.85] mb-4 uppercase tracking-tighter">
                  Community <br />
                  <span className="text-secondary italic font-normal">Gatherings</span>
                </h1>
                <p className="font-paragraph text-base md:text-lg text-textbody max-w-2xl mx-auto leading-relaxed italic">
                  Please join us for our community events, food distribution programs, and special gatherings. Every event is an opportunity to strengthen our community and share hope. God measures the heart by what we give; He that hath pity upon the poor lendeth unto the Lord; and that which he hath given will he pay him again." – Proverbs 19:17 (KJV)
                </p>
              </div>
            </div>

            <div className="w-full mt-4">
              <ImageMarquee images={marqueeImages} speed={70} />
            </div>

            <motion.div 
              style={{ opacity }}
              className="mt-4 flex justify-center"
            >
              <div className="w-px h-12 bg-gradient-to-b from-secondary to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-secondary/5 border border-bordersubtle rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center hover:border-secondary transition-colors"
            >
              <div className="bg-secondary text-secondary-foreground p-6 rounded-xl text-center min-w-[140px]">
                <div className="text-sm uppercase tracking-widest opacity-80 mb-1">Schedule</div>
                <div className="text-lg font-bold leading-tight">{event.date}</div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-2xl font-heading mb-4">{event.title}</h3>
                <p className="text-textbody text-lg mb-6">{event.desc}</p>
                <div className="flex flex-wrap gap-6 text-base text-textbody">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-secondary" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-secondary" />
                    {event.location}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto uppercase tracking-widest">
                  Register
                </Button>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
