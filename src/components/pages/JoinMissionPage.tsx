import React, { useRef } from 'react';
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
  Megaphone
} from 'lucide-react';
import { Button } from '../ui/button';
import { Image } from '../ui/image';

export default function JoinMissionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

      {/* Service Callings Section */}
      <section className="py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 border border-secondary/30 rounded-full text-secondary text-xs uppercase tracking-[0.2em] mb-6"
            >
              Individual Callings
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading mb-6">Answering the Call to Serve</h2>
            <p className="text-textbody max-w-2xl mx-auto text-xl">
              Ministry is about more than just resources—it's about a collective mission to serve our community. Discover how your unique gifts and strengths can make a lasting impact.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section (Partnerships) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 border border-secondary/30 rounded-full text-secondary text-xs uppercase tracking-[0.2em] mb-6"
            >
              Organizational Impact
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading mb-6">Partnerships for the Greater Good</h2>
            <p className="text-textbody max-w-2xl mx-auto text-xl">
              When organizations partner with us, their impact resonates far beyond our walls, amplifying hope and creating systemic change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Target className="w-12 h-12" />,
                title: "Strategic Impact",
                desc: "Join us in rescuing over 1.7 million pounds of food annually. Your partnership directly impacts local lives and demonstrates your commitment to social responsibility."
              },
              {
                icon: <Award className="w-12 h-12" />,
                title: "Brand Recognition",
                desc: "Showcase your organization as a leader in community care. Your involvement will be highlighted through our events and campaigns, strengthening your reputation."
              },
              {
                icon: <Handshake className="w-12 h-12" />,
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
                className="space-y-6"
              >
                <div className="text-secondary">
                  {item.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading tracking-tight">{item.title}</h3>
                  <p className="text-textbody leading-relaxed opacity-80">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section (General Statement as requested to exclude names) */}
      <section className="py-24 border-b border-bordersubtle/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-heading mb-8">Partners Making An Impact</h2>
              <p className="text-xl text-textbody leading-relaxed mb-8">
                The <span className="text-foreground font-semibold">Belleville Food Bank On Wheels</span> is proud to collaborate with businesses and organizations that share our vision of a hunger-free community. Together, we've accomplished incredible milestones.
              </p>
              <p className="text-textbody mb-10">
               Please join the growing list of partners making a difference, and be part of a success story that transforms lives and strengthens communities.
              </p>
              <div className="flex items-center gap-4 p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                <Info className="text-secondary shrink-0" />
                <p className="text-sm italic text-textlight">
                  We are currently updating our partner showcase. Your organization could be featured here soon!
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-square bg-white border border-bordersubtle rounded-2xl flex items-center justify-center p-4 overflow-hidden">
                <Image 
                  src="https://i.ibb.co/60SzHczz/wsfb.jpg"
                  alt="WSFB Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="aspect-square bg-secondary/5 border border-dashed border-bordersubtle rounded-2xl flex items-center justify-center p-8 text-center">
                <p className="text-xs uppercase tracking-widest opacity-40">Your Logo Here</p>
              </div>
              <div className="aspect-square bg-secondary/5 border border-dashed border-bordersubtle rounded-2xl flex items-center justify-center p-8 text-center">
                <p className="text-xs uppercase tracking-widest opacity-40">Your Logo Here</p>
              </div>
              <div className="aspect-square bg-secondary/5 border border-dashed border-bordersubtle rounded-2xl flex items-center justify-center p-8 text-center">
                <p className="text-xs uppercase tracking-widest opacity-40">Your Logo Here</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ways to Serve & Partner */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading mb-16">Ways to Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "Individual Service", desc: "Direct ministry through visits, teaching, and distribution." },
              { title: "Sponsorships", desc: "Financial support for specific programs or events." },
              { title: "Food Donations", desc: "Corporate food drives or surplus food rescue." },
              { title: "Volunteer Days", desc: "Team building through community service." }
            ].map((way, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center text-secondary mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-heading mb-4">{way.title}</h4>
                <p className="text-textbody text-base max-w-xs">{way.desc}</p>
              </div>
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

            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              {/* Name Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      First Name <span className="text-destructive">*</span>
                    </label>
                    <input required type="text" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Last Name <span className="text-destructive">*</span>
                    </label>
                    <input required type="text" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input required type="email" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="w-20 bg-secondary/10 border border-bordersubtle/30 rounded-lg px-3 py-3 text-center text-sm flex items-center justify-center">
                        +1
                      </div>
                      <input required type="tel" className="flex-grow bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
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
                      <input type="checkbox" className="w-5 h-5 accent-secondary" />
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
                    <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Organization Name
                    </label>
                    <input type="text" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Role / Affiliation
                    </label>
                    <input type="text" placeholder="Ex: Owner, C-Level, Manager, etc" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Country</label>
                  <div className="w-full bg-secondary/10 border border-bordersubtle/30 rounded-lg px-4 py-3 flex items-center gap-2">
                    <Globe size={16} className="text-secondary" />
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
                        <input type="checkbox" className="w-4 h-4 accent-secondary" />
                        <span className="text-sm font-bold">{day}</span>
                      </label>
                      <input 
                        type="text" 
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
                      <input type="checkbox" className="hidden" />
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
                        <input type="checkbox" className="w-4 h-4 accent-secondary" />
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
                        <input type="checkbox" className="w-4 h-4 accent-secondary" />
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
                  <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                    Briefly describe your background, mission, or any relevant information <span className="text-destructive">*</span>
                  </label>
                  <textarea required rows={4} placeholder="Tell us about your heart for service..." className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Comments or Questions</label>
                  <textarea rows={3} placeholder="Anything else you'd like to share?" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
              </div>

              <Button className="w-full py-8 text-lg uppercase tracking-[0.2em] font-bold shadow-xl shadow-secondary/20 group">
                Ready to Join <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
