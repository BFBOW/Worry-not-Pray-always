import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Calendar, Users, BookOpen, ArrowRight, Leaf, Utensils, Mail, ShieldAlert, Recycle, GraduationCap, HeartPulse, Sparkles } from 'lucide-react';
import { Image } from '../ui/image';

// --- Types & Interfaces ---
interface ServiceCardProps {
  title: string;
  description: string;
  features?: string[];
  icon: React.ReactNode;
  index: number;
  link: string;
}

interface EventItemProps {
  date: string;
  title: string;
  location: string;
  time: string;
}

// --- Components ---

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, icon, index, link }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-8 border border-[#918151]/20 bg-[#1B2C1B]/50 hover:bg-[#918151]/10 transition-colors duration-500 rounded-sm overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        {icon}
      </div>
      <div className="relative z-10">
        <div className="mb-6 text-[#918151] inline-block p-3 bg-[#243124]/30 rounded-full border border-[#918151]/20">
          {icon}
        </div>
        <h3 className="font-heading text-2xl text-white mb-4 italic">{title}</h3>
        <p className="font-paragraph text-[#7D8C7D] leading-relaxed mb-4">
          {description}
        </p>
        
        {features && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center text-sm text-[#7D8C7D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#918151] mr-2 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <Link to={link} className="flex items-center text-sm font-bold text-[#918151] uppercase tracking-widest group-hover:text-white transition-colors italic">
          Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const EventRow: React.FC<EventItemProps> = ({ date, title, location, time }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-[#918151]/10 group hover:bg-white/5 transition-all px-4 hover:translate-x-1"
    >
      <div className="flex items-start md:items-center gap-6 mb-4 md:mb-0">
        <span className="font-heading text-3xl text-[#918151] w-24 italic">{date}</span>
        <div>
          <h4 className="font-heading text-xl text-white group-hover:text-[#918151] transition-colors italic">{title}</h4>
          <p className="font-paragraph text-sm text-[#7D8C7D] mt-1">{location}</p>
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
        <span className="font-paragraph text-sm text-[#7D8C7D] bg-[#243124]/40 px-3 py-1 rounded-full border border-[#918151]/20">{time}</span>
        <button className="p-2 rounded-full border border-[#918151]/50 text-white hover:bg-[#918151] hover:text-[#1B2C1B] hover:border-[#918151] transition-all">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-sm group/parallax ${className}`}>
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-[120%] transition-transform duration-700 ease-out group-hover/parallax:scale-105"
      >
        <Image src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

const EditorialBlock: React.FC<{
  title: string;
  subtitle: string;
  description: string;
  image: string;
  reverse?: boolean;
  link: string;
  features?: string[];
}> = ({ title, subtitle, description, image, reverse, link, features }) => {
  return (
    <section className="w-full py-0 relative overflow-hidden bg-[#1B2C1B]">
      {/* Atmospheric Background Elements */}
      <div className={`absolute top-1/2 ${reverse ? 'left-0' : 'right-0'} -translate-y-1/2 w-64 h-64 bg-[#918151]/5 rounded-full blur-[100px] -z-10`} />
      
      <div className="max-w-[85rem] mx-auto px-6">
        <div className={`py-12 md:py-20 flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12 relative group`}>
          
          {/* Image Side */}
          <div className="w-full lg:w-5/12 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20"
            >
              <ParallaxImage 
                src={image} 
                alt={title} 
                className="aspect-[4/3] shadow-2xl rounded-sm border border-white/5" 
              />
              <div className="absolute inset-0 bg-[#918151]/5 blur-2xl -z-10 scale-110" />
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, x: reverse ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#918151] font-bold tracking-[0.2em] uppercase text-[9px]">
                  {subtitle}
                </span>
                <div className="h-px w-6 bg-[#918151]/30" />
              </div>
              
              <h2 className="font-heading text-3xl md:text-4xl text-white leading-tight mb-4 italic">
                {title.split(' ').slice(0, -1).join(' ')} <br />
                <span className="text-[#918151]">{title.split(' ').slice(-1)}</span>
              </h2>
              
              <p className="font-paragraph text-base text-[#7D8C7D] leading-relaxed mb-6 max-w-lg">
                {description}
              </p>

              {features && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-[#918151] shrink-0" />
                      <span className="font-paragraph text-sm text-[#7D8C7D]/80">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              <Link 
                to={link}
                className="group inline-flex items-center gap-2 px-8 py-3 bg-[#918151] text-[#1B2C1B] font-paragraph text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-[#A6935C] transition-all shadow-lg shadow-[#918151]/10"
              >
                Explore Program
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function CoolDepthsHomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Moving picture effect for hero
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="bg-[#1B2C1B] overflow-clip selection:bg-[#918151] selection:text-[#1B2C1B]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex items-center border-b border-[#918151]/10 overflow-hidden">
        
        {/* Full Background Image with Subtle Movement */}
        <motion.div 
          style={{ scale: heroScale, y: heroY }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <Image 
            src="https://i.ibb.co/8DdJjNZs/jesus.jpg"
            alt="Nourishing Body and Soul"
            className="w-full h-full object-cover object-bottom"
          />
          {/* Cool Depth Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B2C1B] via-[#1B2C1B]/60 to-transparent" />
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-[#918151]"></span>
              <span className="font-paragraph text-sm uppercase tracking-[0.2em] text-[#918151] font-bold">Belleville Food Bank On Wheels</span>
            </div>
            
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white leading-[0.85] mb-8 italic tracking-tighter">
              Nourishing <br />
              <span className="text-[#918151]">Body</span> & Soul
            </h1>
            
            <p className="font-paragraph text-xl text-[#7D8C7D] leading-relaxed mb-12 max-w-md">
              At BFBOW, we're a sanctuary where faith meets action. We provide essential sustenance, spiritual growth, and a compassionate community for all who needs it.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link 
                to="/find-support"
                className="group relative px-10 py-5 bg-[#918151] text-[#1B2C1B] font-paragraph text-sm font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-transform hover:-translate-y-1"
              >
                <span className="relative z-10">Find Support</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
              
              <Link 
                to="/events"
                className="group px-10 py-5 border border-[#918151]/30 text-white font-paragraph text-sm font-bold uppercase tracking-widest hover:bg-[#918151]/10 transition-colors rounded-sm"
              >
                View Calendar
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 right-12 bg-[#243124]/80 backdrop-blur-xl border border-white/10 p-8 max-w-xs z-20 rounded-2xl"
        >
          <span className="block font-heading text-[#918151] text-xl mb-2 italic">Next Distribution</span>
          <p className="text-[#7D8C7D] text-sm mb-4 leading-relaxed">Join us this Saturday for our weekly community meal.</p>
          <Link to="/events" className="text-xs uppercase tracking-widest text-white font-bold border-b border-[#918151] pb-1 hover:text-[#918151] transition-colors">
            Get Details
          </Link>
        </motion.div>
      </section>

      {/* --- MARQUEE --- */}
      <div className="w-full bg-[#918151] py-6 overflow-hidden flex items-center">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex whitespace-nowrap gap-16 px-8"
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="font-heading italic text-2xl text-[#1B2C1B]">Faith in Action</span>
              <Sparkles className="w-4 h-4 text-[#1B2C1B]/40" />
              <span className="font-heading italic text-2xl text-[#1B2C1B]">Community Service</span>
              <Sparkles className="w-4 h-4 text-[#1B2C1B]/40" />
              <span className="font-heading italic text-2xl text-[#1B2C1B]">Spiritual Growth</span>
              <Sparkles className="w-4 h-4 text-[#1B2C1B]/40" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- MISSION OVERVIEW --- */}
      <section className="w-full py-32 text-center relative overflow-hidden bg-[#1B2C1B]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#918151]/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-[0.85] tracking-tighter italic">
              Serving the <br />
              <span className="text-[#918151]">Whole Person</span>
            </h2>
            <p className="font-paragraph text-xl text-[#7D8C7D] leading-relaxed max-w-2xl mx-auto">
              Our ministry extends beyond the plate. We believe in nurturing the spirit just as we nourish the body, creating a cycle of sense of belonging, hope and renewal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- EDITORIAL BLOCKS --- */}
      <EditorialBlock 
        subtitle="Sustenance & Crisis Relief"
        title="Food Assistance & Emergency Support"
        description="Ensuring no one goes hungry by providing regular access to nutritious food for families, while offering immediate relief for individuals in crisis."
        image="https://i.ibb.co/PGcNVvXM/delivery.jpg"
        link="/find-support"
        features={["Weekly distribution", "Tailored dietary options", "Ready-to-eat meals", "Hygiene & baby care", "Homelessness support"]}
      />

      <EditorialBlock 
        subtitle="Spiritual Care"
        title="Faith-Based Counseling"
        description="We offer individual and family counseling rooted in biblical principles. Our compassionate counselors provide a safe space to navigate life's challenges."
        image="https://i.ibb.co/ZzdQbF3q/photo-realistic-image-40-year-260nw-2615233105.webp"
        reverse
        link="/spirit"
        features={["Individual Spiritual Guidance", "Family & Marriage Support", "Grief & Loss Counseling", "Youth Mentorship"]}
      />

      {/* --- CTA SECTION --- */}
      <section className="w-full py-32 px-6 relative overflow-hidden bg-[#243124]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <h2 className="font-heading text-6xl md:text-8xl text-white italic leading-none tracking-tighter">
              READY TO <br/> <span className="text-[#918151]">EVOLVE?</span>
            </h2>
            <p className="font-paragraph text-xl text-[#7D8C7D] max-w-2xl mx-auto">
              We couldn’t do this work without the grace of our God and the unwavering support of our community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/donate"
                className="px-10 py-5 bg-[#918151] text-[#1B2C1B] font-paragraph text-base font-bold uppercase tracking-widest rounded-sm hover:bg-[#A6935C] transition-all shadow-2xl shadow-[#918151]/20 hover:-translate-y-1"
              >
                Donate Now
              </Link>
              <Link 
                to="/join-mission"
                className="px-10 py-5 bg-transparent border border-[#918151]/30 text-white font-paragraph text-base font-bold uppercase tracking-widest rounded-sm hover:border-white hover:text-[#918151] transition-all"
              >
                Volunteer With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
