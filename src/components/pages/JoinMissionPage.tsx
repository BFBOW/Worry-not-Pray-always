import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  CheckCircle2, 
  Handshake, 
  Target, 
  Award, 
  Users2, 
  Globe, 
  HeartHandshake,
  ArrowRight,
  Info,
  Leaf,
  BookOpen,
  Footprints,
  Lock,
  HeartPulse,
  Package,
  Megaphone,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Image } from '../ui/image';
import { PartnerFormSubmission } from '../../lib/partnerSubmission';

export default function JoinMissionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error' | 'warning';
    text: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const formData = new FormData(e.currentTarget);
    
    // Combine availability
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const availabilityParts: string[] = [];
    for (const day of days) {
      const enabled = formData.get(`availability_${day}_enabled`) === "on";
      const time = formData.get(`availability_${day}_time`)?.toString().trim();
      if (enabled && time) {
        const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
        availabilityParts.push(`${capitalizedDay}: ${time}`);
      }
    }

    const submission: PartnerFormSubmission = {
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      organizationName: formData.get("organizationName")?.toString(),
      role: formData.get("role")?.toString(),
      country: formData.get("country")?.toString() || "Canada",
      ministryInterests: formData.getAll("ministryInterests") as string[],
      availability: availabilityParts.join("; "),
      helpTypes: formData.getAll("helpTypes") as string[],
      involvementType: formData.get("involvementType")?.toString() || "",
      frequency: formData.get("frequency")?.toString() || "",
      backgroundInfo: formData.get("backgroundInfo")?.toString() || "",
      comments: formData.get("comments")?.toString(),
    };

    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      const text = await response.text();
      let result: any = {};

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = { status: 'error', error: 'Invalid server response.' };
      }

      if (result.status === 'success' || result.status === 'warning') {
        setSubmitMessage({
          type: result.status,
          text: result.message || 'Partnership form submitted successfully.'
        });
        formRef.current?.reset();
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (err) {
      setSubmitMessage({
        type: 'error',
        text: 'A network error occurred. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] py-20 flex items-center justify-center overflow-hidden border-b border-bordersubtle/20">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0 h-[120%]"
        >
          <Image 
            src="https://i.ibb.co/hRFMHqqQ/partner2.jpg"
            alt="Join Mission Hero"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-background" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Leaf className="w-12 h-12 text-secondary mx-auto mb-8 animate-pulse" />
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.85] mb-8 uppercase tracking-tighter text-pop">
              Partnerships That <br />
              Make a <span className="text-secondary italic font-normal">Difference</span>.
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-textbody max-w-2xl mx-auto leading-relaxed italic">
              Every heart and every hand has the power to create meaningful change. Together, we can rescue surplus food, distribute meals, and bring hope and a sense of belonging to thousands. 
            </p>
            <motion.div 
              style={{ opacity }}
              className="mt-16 flex justify-center"
            >
              <div className="w-px h-24 bg-gradient-to-b from-secondary to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Callings Section - Editorial Split Layout with Slanted Background */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{ background: 'linear-gradient(110deg, #3A4A3A 50%, #243124 50.5%)' }}
      >
        {/* Soft Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="inline-block px-4 py-1 border border-secondary/30 rounded-full text-secondary text-[10px] uppercase tracking-[0.3em] mb-8 font-bold">
                Individual Callings
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading mb-8 leading-[0.85] tracking-tighter text-pop">
                Answering the <br />
                <span className="text-secondary italic font-normal">Call to Serve</span>
              </h2>
              <p className="text-textbody/90 max-w-xl text-xl leading-relaxed mb-10 font-paragraph italic">
                Ministry is about more than just resources—it's about a collective mission to serve our community. Discover how your unique gifts and strengths can make a lasting impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Button className="px-8 py-6 text-sm uppercase tracking-widest font-bold group bg-secondary hover:bg-secondary/80 text-primary">
                  Explore Opportunities <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
                <div className="flex items-center gap-3 py-3">
                  <div className="w-10 h-px bg-secondary/40" />
                  <span className="text-[10px] uppercase tracking-widest text-secondary/60 font-bold">Join the Movement</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative max-w-lg lg:ml-auto lg:-mr-12"
            >
              <div 
                className="relative overflow-hidden group"
                style={{ 
                  maskImage: 'radial-gradient(circle, black 40%, transparent 85%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 85%)'
                }}
              >
                <Image 
                  src="https://i.ibb.co/Z6ZK7fR6/crosss.jpg"
                  alt="Service Calling"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 glass-panel p-6 rounded-xl border border-secondary/20 shadow-xl max-w-[200px] z-20">
                <p className="text-xs italic text-secondary leading-relaxed">
                  "As every man hath received the gift, even so minister the same one to another."
                </p>
                <p className="text-[10px] uppercase tracking-widest mt-2 font-bold opacity-60">— 1 Peter 4:10</p>
              </div>
              
              {/* Soft Glow behind image */}
              <div className="absolute inset-0 bg-secondary/10 blur-3xl -z-10 scale-110" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section (Partnerships) - Full-Bleed Editorial Block with Glows */}
      <section className="relative py-32 bg-primary overflow-hidden">
        {/* Background Decorative Numbers */}
        
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="https://i.ibb.co/hRFMHqqQ/partner2.jpg"
            alt="Impact Background"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        {/* Soft Halo Glows */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] -z-10 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10 translate-x-1/4 translate-y-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="inline-block px-4 py-1 border border-secondary/30 rounded-full text-secondary text-[10px] uppercase tracking-[0.3em] mb-8 font-bold">
              Organizational Impact
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-heading mb-8 leading-[0.8] tracking-tighter text-pop">
              Partnerships for the <br />
              <span className="text-secondary italic font-normal">Greater Good</span>
            </h2>
            <p className="text-textbody/80 max-w-3xl mx-auto text-xl leading-relaxed italic font-paragraph">
              When organizations partner with us, their impact resonates far beyond our walls, amplifying hope and creating systemic change.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                title: "Strategic Impact",
                desc: "Join us in rescuing over 1.7 million pounds of food annually. Your partnership directly impacts local lives and demonstrates your commitment to social responsibility."
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Brand Recognition",
                desc: "Showcase your organization as a leader in community care. Your involvement will be highlighted through our events and campaigns, strengthening your reputation."
              },
              {
                icon: <Handshake className="w-10 h-10" />,
                title: "Employee Engagement",
                desc: "Provide your team with meaningful volunteer opportunities. Group volunteer days foster teamwork and inspire a shared sense of purpose."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-10 rounded-2xl text-left border border-white/5 hover:border-secondary/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="text-secondary group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-textbody/70 text-base leading-relaxed font-paragraph italic">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section - Editorial Split Layout */}
      <section className="py-32 border-b border-bordersubtle/20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-secondary" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">Collaborators</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-heading mb-8 leading-[0.9] tracking-tighter">
                Partners Making <br />
                <span className="text-secondary italic font-normal">An Impact</span>
              </h2>
              <div className="space-y-6 mb-12">
                <p className="text-xl text-textbody/90 leading-relaxed font-paragraph italic">
                  The <span className="text-secondary font-semibold">Belleville Food Bank On Wheels</span> is proud to collaborate with businesses and organizations that share our vision of a hunger-free community.
                </p>
                <div className="p-8 bg-secondary/5 border-l-4 border-secondary rounded-r-xl">
                  <p className="text-base text-textbody/80 leading-relaxed italic">
                    "Please join the growing list of partners making a difference, and be part of a success story that transforms lives and strengthens communities."
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 glass-panel rounded-xl border border-secondary/20">
                <Info className="text-secondary shrink-0" size={20} />
                <p className="text-xs italic text-textlight leading-relaxed">
                  We are currently updating our partner showcase. Your organization could be featured here soon!
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { src: "https://i.ibb.co/C3K7tkQn/bsdac.jpg", alt: "Partner Logo 1" },
                { src: "https://i.ibb.co/84MPnGPs/where.png", alt: "Partner Logo 2" },
                { placeholder: true },
                { placeholder: true }
              ].map((logo, i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-8 overflow-hidden group hover:bg-white/10 hover:border-secondary/40 transition-all duration-500 shadow-xl hover:shadow-secondary/5"
                >
                  {logo.src ? (
                    <Image 
                      src={logo.src}
                      alt={logo.alt}
                      className="w-full h-full object-contain transition-all duration-500"
                    />
                  ) : (
                    <div className="text-center space-y-2 opacity-20 group-hover:opacity-40 transition-opacity">
                      <div className="w-12 h-12 border-2 border-dashed border-white rounded-full mx-auto flex items-center justify-center">
                        <Handshake size={20} />
                      </div>
                      <p className="text-[10px] uppercase tracking-widest font-bold">Your Logo</p>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ways to Serve & Partner - Systematic Numbered Grid */}
      <section className="py-32 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-heading mb-6 tracking-tighter leading-[0.9]">Ways to Get Involved</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-bordersubtle/20 rounded-3xl overflow-hidden shadow-2xl bg-background">
            {[
              { title: "Individual Service", desc: "Direct ministry through visits, teaching, and distribution.", num: "01" },
              { title: "Sponsorships", desc: "Financial support for specific programs or events.", num: "02" },
              { title: "Food Donations", desc: "Corporate food drives or surplus food rescue.", num: "03" },
              { title: "Volunteer Days", desc: "Team building through community service.", num: "04" }
            ].map((way, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-12 border-r border-b border-bordersubtle/20 last:border-r-0 group hover:bg-secondary/5 transition-colors"
              >
                {/* Large Background Number */}
                <div className="absolute top-4 right-6 text-7xl font-heading font-black text-secondary/5 select-none group-hover:text-secondary/10 transition-colors">
                  {way.num}
                </div>
                
                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-primary transition-all duration-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading mb-4 tracking-tight leading-tight">{way.title}</h4>
                    <p className="text-textbody/70 text-sm leading-relaxed font-paragraph italic">{way.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="partner-form" className="py-24 bg-secondary/5 border-t border-bordersubtle/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 md:p-16 shadow-2xl">
            <div className="text-center mb-16">
              <HeartHandshake className="mx-auto mb-6 text-secondary" size={64} />
              <h2 className="text-4xl font-heading mb-4 text-pop">Join Our Mission</h2>
              <p className="text-textbody font-medium">
                Whether you are an individual answering a calling or an organization looking to make an impact, we welcome you. Please join us in creating a stronger, healthier, and more compassionate community.
              </p>
            </div>

            <form ref={formRef} className="space-y-10" onSubmit={handleSubmit}>
              {/* Name Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      First Name <span className="text-destructive">*</span>
                    </label>
                    <input id="firstName" name="firstName" required type="text" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Last Name <span className="text-destructive">*</span>
                    </label>
                    <input id="lastName" name="lastName" required type="text" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input id="email" name="email" required type="email" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="w-20 bg-secondary/10 border border-bordersubtle/30 rounded-lg px-3 py-3 text-center text-sm flex items-center justify-center">
                        +1
                      </div>
                      <input id="phone" name="phone" required type="tel" className="flex-grow bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ministry Interest Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Ministry Interests</h3>
                <p className="text-xs text-textbody/60 italic">Select all areas where you feel called to serve:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Food Bank Distribution",
                    "Prison Ministry",
                    "Sick & Shut-in Visits",
                    "Bible Studies",
                    "Street Evangelism",
                    "Logistical Support",
                    "General Volunteering"
                  ].map((interest) => (
                    <label key={interest} className="flex items-center gap-3 p-4 bg-secondary/5 border border-bordersubtle/20 rounded-xl cursor-pointer hover:border-secondary transition-colors">
                      <input type="checkbox" name="ministryInterests" value={interest} className="w-5 h-5 accent-secondary" />
                      <span className="text-sm font-medium">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Organization Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Organization Details (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="organizationName" className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Organization Name
                    </label>
                    <input id="organizationName" name="organizationName" type="text" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Role / Affiliation
                    </label>
                    <input id="role" name="role" type="text" placeholder="Ex: Owner, C-Level, Manager, etc" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="country" className="text-xs uppercase tracking-widest font-bold">Country</label>
                  <div className="w-full bg-secondary/10 border border-bordersubtle/30 rounded-lg px-4 py-3 flex items-center gap-2">
                    <Globe size={16} className="text-secondary" />
                    <input id="country" name="country" type="hidden" value="Canada" />
                    <span>Canada</span>
                  </div>
                </div>
              </div>

              {/* Availability Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Availability Schedule</h3>
                <p className="text-xs text-muted-foreground italic">Please specify your available hours for each day (e.g., 9:00 AM - 12:00 PM)</p>
                <div className="space-y-3">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <div key={day} className="grid grid-cols-1 sm:grid-cols-[120px_1fr] items-center gap-4 p-3 bg-secondary/5 border border-bordersubtle/20 rounded-xl">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name={`availability_${day.toLowerCase()}_enabled`} className="w-4 h-4 accent-secondary" />
                        <span className="text-sm font-bold">{day}</span>
                      </label>
                      <input 
                        type="text" 
                        name={`availability_${day.toLowerCase()}_time`}
                        placeholder="Specify times (e.g. 10am - 2pm)" 
                        className="bg-transparent border-b border-bordersubtle/30 px-2 py-1 text-sm focus:border-secondary outline-none transition-colors w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* How You Can Help Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">How You Can Help</h3>
                <p className="text-xs text-muted-foreground">Please select the ways you or your organization would like to support our mission:</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "FINANCIAL SUPPORT",
                    "FOOD & RESOURCE DONATIONS",
                    "VOLUNTEER SERVICES (INDIVIDUAL OR TEAM)",
                    "LOGISTICAL & TRANSPORT ASSISTANCE",
                    "EVENT HOSTING & SUPPORT",
                    "OTHER"
                  ].map((option) => (
                    <label key={option} className="flex items-center gap-2 px-4 py-2 bg-secondary/5 border border-bordersubtle/30 rounded-full cursor-pointer hover:border-secondary transition-all has-[:checked]:bg-secondary has-[:checked]:text-white has-[:checked]:border-secondary">
                      <input type="checkbox" name="helpTypes" value={option} className="hidden" />
                      <span className="text-[10px] font-bold tracking-wider">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Partnership Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Involvement Details</h3>
                
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                    Involvement Type <span className="text-destructive">*</span>
                  </label>
                  <p className="text-[10px] text-muted-foreground italic">How would you like to be identified in our mission?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Individual Volunteer",
                      "Corporate Partner / Sponsor",
                      "Food Rescue Partner",
                      "Church or Ministry Partner",
                      "Logistical Support Provider",
                      "Other"
                    ].map((type) => (
                      <label key={type} className="flex items-center gap-3 p-3 bg-secondary/5 border border-bordersubtle/20 rounded-xl cursor-pointer hover:border-secondary transition-colors">
                        <input type="radio" name="involvementType" value={type} required className="w-4 h-4 accent-secondary" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <label className="text-xs uppercase tracking-widest font-bold">Preferred Frequency</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "One-time project",
                      "Weekly commitment",
                      "Bi-weekly support",
                      "Monthly support",
                      "Event-based only",
                      "Flexible / As needed"
                    ].map((freq) => (
                      <label key={freq} className="flex items-center gap-3 p-3 bg-secondary/5 border border-bordersubtle/20 rounded-xl cursor-pointer hover:border-secondary transition-colors">
                        <input type="radio" name="frequency" value={freq} className="w-4 h-4 accent-secondary" />
                        <span className="text-sm">{freq}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Tell Us More About Yourself or Your Organization</h3>
                <div className="space-y-2">
                  <label htmlFor="backgroundInfo" className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                    Briefly describe your background, mission, or any relevant information <span className="text-destructive">*</span>
                  </label>
                  <textarea id="backgroundInfo" name="backgroundInfo" required rows={4} placeholder="Tell us about your heart for service..." className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
                <div className="space-y-2">
                  <label htmlFor="comments" className="text-xs uppercase tracking-widest font-bold">Comments or Questions</label>
                  <textarea id="comments" name="comments" rows={3} placeholder="Anything else you'd like to share?" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-lg flex items-start gap-3 ${
                  submitMessage.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-500' :
                  submitMessage.type === 'warning' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500' :
                  'bg-destructive/10 border border-destructive/20 text-destructive'
                }`}>
                  {submitMessage.type === 'success' ? <CheckCircle2 className="mt-0.5 shrink-0" size={18} /> :
                   submitMessage.type === 'warning' ? <AlertCircle className="mt-0.5 shrink-0" size={18} /> :
                   <Info className="mt-0.5 shrink-0" size={18} />}
                  <p className="text-sm">{submitMessage.text}</p>
                </div>
              )}

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-8 text-lg uppercase tracking-[0.2em] font-bold shadow-xl shadow-secondary/20 group"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Ready to Join <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
