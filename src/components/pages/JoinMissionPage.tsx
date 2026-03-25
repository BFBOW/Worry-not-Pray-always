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
  Leaf
} from 'lucide-react';
import { Button } from '../ui/button';
import { Image } from '../ui/image';

export default function JoinMissionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] py-20 flex items-center justify-center overflow-hidden border-b border-bordersubtle/20">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
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
              Your organization has the power to create meaningful change. Together, we can rescue surplus food, distribute meals, and bring hope and a sense of belonging to thousands. 
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

      {/* Impact Section */}
      <section className="py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 border border-secondary/30 rounded-full text-secondary text-xs uppercase tracking-[0.2em] mb-6"
            >
              Your Impact Amplified
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading mb-6">Creating Real Change Together</h2>
            <p className="text-textbody max-w-2xl mx-auto text-xl">
              When you partner with us, your impact resonates far beyond our walls, amplifying hope and creating real change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                title: "Community Impact",
                desc: " Please join us in rescuing over 1.7 million pounds of food annually and supporting more than 3,000 families every month. Your partnership directly impacts local lives and demonstrates your commitment to social responsibility."
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Brand Recognition",
                desc: "Showcase your organization as a leader in community care and sustainability. Your involvement will be highlighted through our events, social media, and campaigns, strengthening your brand's reputation as a force for good."
              },
              {
                icon: <Users2 className="w-10 h-10" />,
                title: "We welcome and appreciate Employee Engagement",
                desc: "Provide your team with meaningful volunteer opportunities. Group volunteer days foster teamwork, boost morale, and inspire a shared sense of purpose within your organization."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-10 border border-bordersubtle/30 rounded-2xl hover:border-secondary transition-colors group"
              >
                <div className="text-secondary mb-8 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-heading mb-4">{item.title}</h3>
                <p className="text-textbody leading-relaxed">
                  {item.desc}
                </p>
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

      {/* Ways to Partner, Come Join Us! */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading mb-16">Ways to Partner</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
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
                We offer flexible and impactful ways for your business to partner with us, tailored to fit your goals and strengths. Please join us in creating a stronger, healthier, and more compassionate community.
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

              {/* Organization Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Organization Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Organization Name <span className="text-destructive">*</span>
                    </label>
                    <input required type="text" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Role / Affiliation <span className="text-destructive">*</span>
                    </label>
                    <input required type="text" placeholder="Ex: Owner, C-Level, Manager, etc" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
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

              {/* Partnership Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Partnership Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                      Partnership Type <span className="text-destructive">*</span>
                    </label>
                    <select required className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors appearance-none">
                      <option value="">Select an option</option>
                      <option>Sponsorship</option>
                      <option>Food Donation</option>
                      <option>Volunteer Program</option>
                      <option>Logistical Support</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Preferred Level of Involvement</label>
                    <select className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors appearance-none">
                      <option value="">Select an option</option>
                      <option>One-time project</option>
                      <option>Ongoing monthly support</option>
                      <option>Annual partnership</option>
                      <option>Event-based</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Estimated Resources</label>
                    <input type="text" placeholder="What can you estimate donating?" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Contribution Focus</label>
                    <input type="text" placeholder="How do you foresee contributing?" className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Additional Information</h3>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                    About Your Organization <span className="text-destructive">*</span>
                  </label>
                  <textarea required rows={4} placeholder="Briefly describe your organization's mission..." className="w-full bg-secondary/5 border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
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
