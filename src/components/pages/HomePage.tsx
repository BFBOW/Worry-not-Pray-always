import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Calendar, Users, BookOpen, ArrowRight, Leaf, Utensils, Mail, ShieldAlert, Recycle, GraduationCap, HeartPulse } from 'lucide-react';
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
      className="group relative p-8 border border-bordersubtle/30 bg-primary/50 hover:bg-secondary/10 transition-colors duration-500 rounded-sm overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        {icon}
      </div>
      <div className="relative z-10">
        <div className="mb-6 text-secondary inline-block p-3 bg-background/30 rounded-full border border-bordersubtle/20">
          {icon}
        </div>
        <h3 className="font-heading text-2xl text-primary-foreground mb-4">{title}</h3>
        <p className="font-paragraph text-textbody leading-relaxed mb-4">
          {description}
        </p>
        
        {features && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center text-sm text-textbody">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <Link to={link} className="flex items-center text-sm font-bold text-secondary uppercase tracking-widest group-hover:text-primary-foreground transition-colors">
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
      className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-bordersubtle/30 group hover:bg-white/5 transition-colors px-4"
    >
      <div className="flex items-start md:items-center gap-6 mb-4 md:mb-0">
        <span className="font-heading text-3xl text-secondary w-24">{date}</span>
        <div>
          <h4 className="font-heading text-xl text-primary-foreground group-hover:text-white transition-colors">{title}</h4>
          <p className="font-paragraph text-sm text-textbody mt-1">{location}</p>
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
        <span className="font-paragraph text-sm text-textbody bg-background/40 px-3 py-1 rounded-full border border-bordersubtle/20">{time}</span>
        <button className="p-2 rounded-full border border-bordersubtle/50 text-primary-foreground hover:bg-secondary hover:text-white hover:border-secondary transition-all">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

// --- Editorial Components ---

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-sm ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
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
    <section className="w-full py-24 lg:py-40 relative overflow-hidden">
      {/* Atmospheric Background Elements */}
      <div className={`absolute top-1/2 ${reverse ? 'left-0' : 'right-0'} -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-10`} />
      
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-32`}>
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ParallaxImage 
                src={image} 
                alt={title} 
                className="aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] shadow-2xl" 
              />
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: reverse ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs">{subtitle}</span>
                <div className="h-px w-12 bg-secondary/30" />
              </div>
              
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.85] mb-10 text-pop">
                {title.split(' ').slice(0, -1).join(' ')} <br />
                <span className="text-secondary italic font-normal">{title.split(' ').slice(-1)}</span>
              </h2>
              
              <p className="font-paragraph text-xl md:text-2xl text-textbody leading-relaxed mb-12 max-w-xl">
                {description}
              </p>

              {features && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      <span className="font-paragraph text-lg text-textbody/80">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              <Link 
                to={link}
                className="group inline-flex items-center gap-4 px-10 py-5 bg-secondary text-white font-paragraph text-lg font-bold uppercase tracking-widest rounded-sm hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/10 hover:-translate-y-1"
              >
                Explore Program
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="bg-background overflow-clip selection:bg-secondary selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row border-b border-bordersubtle/20">
        
        {/* Left Panel: Content */}
        <div className="w-full lg:w-1/2 bg-primary flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 relative z-10 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 hero-gradient z-0" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl relative z-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-secondary shadow-[0_0_10px_rgba(212,209,165,0.5)]"></span>
              <span className="font-paragraph text-sm uppercase tracking-[0.2em] text-secondary font-bold">Belleville Food Bank On Wheels</span>
            </div>
            
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.95] mb-8 text-pop">
              Nourishing <br />
              <span className="text-secondary italic">Body</span> & Soul
            </h1>
            
            <p className="font-paragraph text-xl text-textbody leading-relaxed mb-12 max-w-md">
              At BFBOW, we're a sanctuary where faith meets action. We provide essential sustenance, spiritual growth, and a compassionate community for all who needs it.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link 
                to="/find-support"
                className="group relative px-8 py-4 bg-buttonbackground text-buttonforeground font-paragraph text-sm uppercase tracking-widest overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">Find Support</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
              
              <Link 
                to="/events"
                className="group px-8 py-4 border border-bordersubtle text-primary-foreground font-paragraph text-sm uppercase tracking-widest hover:bg-bordersubtle/10 transition-colors"
              >
                View Calendar
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Panel: Image */}
        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-auto overflow-hidden bg-[#3A4A3A]">
          <motion.div 
            style={{ y }}
            className="absolute inset-0 w-full h-[120%]"
          >
            <Image 
              src="https://static.wixstatic.com/media/1560bb_7b29c69f0f9246ae8c7c3d647226d2aa~mv2.png?originWidth=1280&originHeight=704"
              alt="Fresh produce and community gathering"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-primary/20" />
          </motion.div>

          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-12 left-12 lg:left-12 glass-panel p-6 max-w-xs"
          >
            <span className="block font-heading text-secondary text-lg mb-1 font-bold">Next Distribution</span>
            <span className="block font-paragraph text-textbody text-sm mb-3 leading-relaxed">Join us this Saturday for our weekly community meal.</span>
            <Link to="/events" className="text-xs uppercase tracking-widest text-primary-foreground font-bold border-b-2 border-secondary pb-1 hover:text-white hover:border-white transition-colors">
              Get Details
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- MARQUEE SEPARATOR --- */}
      <div className="w-full bg-secondary py-4 overflow-hidden flex items-center">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap gap-12 px-6"
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="font-heading text-2xl text-secondary-foreground/90">Faith in Action</span>
              <span className="w-2 h-2 rounded-full bg-secondary-foreground/50" />
              <span className="font-heading text-2xl text-secondary-foreground/90">Community Service</span>
              <span className="w-2 h-2 rounded-full bg-secondary-foreground/50" />
              <span className="font-heading text-2xl text-secondary-foreground/90">Spiritual Growth</span>
              <span className="w-2 h-2 rounded-full bg-secondary-foreground/50" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- EDITORIAL MISSION OVERVIEW --- */}
      <section className="w-full pt-32 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-8 leading-tight">
              Serving the <br />
              <span className="text-secondary italic font-normal">Whole Person</span>
            </h2>
            <p className="font-paragraph text-2xl text-textbody leading-relaxed max-w-2xl mx-auto">
              Our ministry extends beyond the plate. We believe in nurturing the spirit just as we nourish the body, creating a cycle of sense of belonging, hope and renewal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- EDITORIAL BLOCKS (Z-PATTERN) --- */}
      
      <EditorialBlock 
        subtitle="Sustenance"
        title="Food Assistance Program"
        description="Ensures no one goes hungry by providing regular access to nutritious and culturally inclusive food for families in our community."
        image="https://images.unsplash.com/photo-1488459711635-de8672397f4c?q=80&w=2070&auto=format&fit=crop"
        link="/find-support"
        features={["Weekly distribution", "Tailored dietary options", "Serving 3,000+ families"]}
      />

      <EditorialBlock 
        subtitle="Crisis Relief"
        title="Emergency Support Program"
        description="Immediate relief for individuals in crisis, providing essentials like ready-to-eat meals and hygiene packages to get through tough times."
        image="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
        reverse
        link="/find-support"
        features={["Ready-to-eat meals", "Hygiene & baby care", "Homelessness support"]}
      />

      <EditorialBlock 
        subtitle="Sustainability"
        title="Food Rescue & Sustainability"
        description="Transforming surplus food into life-saving resources while protecting the environment from unnecessary waste and landfill impact."
        image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
        link="/who-we-are"
        features={["1.7M+ lbs rescued", "Greenhouse gas reduction", "Zero-waste mission"]}
      />

      <EditorialBlock 
        subtitle="Empowerment"
        title="Educational Programs"
        description="Providing skills and certifications for confidence and stable employment opportunities in our local community."
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
        reverse
        link="/events"
        features={["First Aid CPR Training", "Food Handling Certs", "Job Support Resources"]}
      />

      <EditorialBlock 
        subtitle="Connection"
        title="Community Engagement"
        description="Bringing people together to fight hunger and build a network of care and support through local partnerships and drives."
        image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1949&auto=format&fit=crop"
        link="/events"
        features={["Food & toy drives", "Local partnerships", "Faith-based excursions"]}
      />

      {/* --- FEATURE:FOOD FOR THE SPIRIT (Parallax Background) --- */}
      <section className="relative w-full py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/1560bb_e0ee9499fd6a4d288399e67c05a7b6d9~mv2.png?originWidth=1152&originHeight=576"
            alt="Open bible on a wooden table "
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Leaf className="w-12 h-12 text-secondary mx-auto mb-8" />
            <h2 className="font-heading text-4xl md:text-6xl text-primary-foreground mb-8 text-pop">
              Food for the Spirit
             </h2>
            <p className="font-paragraph text-2xl text-textbody mb-12 max-w-2xl mx-auto leading-relaxed">
              "Man shall not live by bread alone.Matthew 14:16
'But Jesus said, “They need not go away; you give them something to eat.”' The story of Jesus feeding the 5,000 appears in all four gospels (Mark 6, Luke 9, and John 6)" Join our digital ministry to receive daily devotionals, prayer requests, and bible study invitations directly to your phone or inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/spirit"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-paragraph font-semibold rounded-sm hover:bg-secondary/90 transition-colors"
              >
                <Mail className="w-5 h-5 mr-3" />
                Subscribe to Devotionals
              </Link>
              <Link 
                to="/spirit"
                className="inline-flex items-center justify-center px-8 py-4 border border-bordersubtle text-primary-foreground font-paragraph font-semibold rounded-sm hover:bg-white/5 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Join Bible Study
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- UPCOMING EVENTS (List Layout) --- */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-bordersubtle/20 pb-8">
          <div>
            <h2 className="font-heading text-4xl text-primary-foreground mb-4">Community Calendar</h2>
            <p className="font-paragraph text-textbody"> Please Join us at our upcoming gatherings and distributions.</p>
          </div>
          <Link to="/events" className="hidden md:flex items-center text-secondary hover:text-white transition-colors mt-4 md:mt-0">
            View Full Calendar <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col">
          <EventRow 
            date="OCT 12"
            title="Fall Harvest Distribution"
            location="Belleville Church Hall"
            time="10:00 AM - 2:00 PM"
          />
          <EventRow 
            date="OCT Date TBA"
            title="Virtual Bible Study: Hope"
            location="Online (Zoom)"
            time="7:00 PM - 8:30 PM"
          />
          <EventRow 
            date="NOV Date TBA"
            title="Community Thanksgiving Prep"
            location="Volunteer Center"
            time="9:00 AM - 4:00 PM"
          />
          <EventRow 
            date="NOV Date TBA"
            title="Wellness & Health Screening"
            location="Community Center Annex"
            time="11:00 AM - 3:00 PM"
          />
        </div>
        
        <div className="mt-8 md:hidden">
          <Link to="/events" className="flex items-center justify-center text-secondary hover:text-white transition-colors w-full py-4 border border-bordersubtle/30 rounded-sm">
            View Full Calendar <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* --- PARTNERS & IMPACT (Grid) --- */}
      <section className="w-full bg-[#2A382A] py-24 border-t border-bordersubtle/10">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-6">
                Stronger Together
              </h2>
              <p className="font-paragraph text-textbody mb-8 leading-relaxed">
                We are proud to work alongside dedicated organizations that share our passion, hope and vision of a hunger-free community. Through these partnerships, we extend our reach and deepen our impact.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-primary border border-bordersubtle/20 flex items-center justify-center h-32 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-heading text-xl text-center text-primary-foreground">Specialty<br/>Food Bank</span>
                </div>
                <div className="p-6 bg-primary border border-bordersubtle/20 flex items-center justify-center h-32 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-heading text-xl text-center text-primary-foreground">Local<br/>Farms Co-op</span>
                </div>
                <div className="p-6 bg-primary border border-bordersubtle/20 flex items-center justify-center h-32 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-heading text-xl text-center text-primary-foreground">Community<br/>Health Alliance</span>
                </div>
                <div className="p-6 bg-primary border border-bordersubtle/20 flex items-center justify-center h-32 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-heading text-xl text-center text-primary-foreground">Belleville<br/>Outreach</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-[500px] w-full overflow-hidden rounded-sm">
               <Image 
                src="https://static.wixstatic.com/media/1560bb_757b469d76bb425496a3a33d50d388f7~mv2.png?originWidth=768&originHeight=448"
                alt="Volunteers working together"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center p-12">
                <div className="max-w-xs">
                  <div className="text-5xl font-heading text-secondary mb-2">1,200+</div>
                  <div className="text-xl text-primary-foreground mb-6">Families Served Monthly</div>
                  <div className="h-px w-16 bg-secondary mb-6"></div>
                  <p className="text-textbody text-sm">Your donations make this possible. Every dollar contributes directly to purchasing fresh food and supplies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-8 text-pop">
              Thanks Be To Our God
            </h2>
            <p className="font-paragraph text-2xl text-textbody mb-12 max-w-2xl mx-auto">
              We couldn’t do this work without the grace of our God and the unwavering support of our community. Every dollar donated, every hour volunteered, and every meal provided is a testament to His love at work through all of us. We invite you to join this mission of faith and compassion. Together, we canand will continue to make a difference, one meal and one heart at a time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/donate"
                className="px-10 py-5 bg-secondary text-white font-paragraph text-lg font-semibold rounded-sm hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 hover:shadow-secondary/40 hover:-translate-y-1"
              >
                Donate Now
              </Link>
              <Link 
                to="/join-mission"
                className="px-10 py-5 bg-transparent border-2 border-bordersubtle text-primary-foreground font-paragraph text-lg font-semibold rounded-sm hover:border-primary-foreground hover:text-white transition-all"
              >
                Volunteer With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
