import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Heart, 
  TrendingUp, 
  Utensils, 
  Leaf, 
  Users, 
  CreditCard, 
  Calendar, 
  Building2,
  ArrowRight,
  Mail,
  MapPin
} from 'lucide-react';
import { Button } from '../ui/button';
import { Image } from '../ui/image';

export default function DonatePage() {
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
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=2000"
            alt="Hands reaching into a box of food"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/30 to-background/80" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Leaf className="w-12 h-12 text-secondary mx-auto mb-8 animate-pulse" />
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.85] mb-8 uppercase tracking-tighter text-pop">
              Give Today, <br />
              <span className="text-secondary italic font-normal">Change</span> Tomorrow.
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-textbody max-w-2xl mx-auto leading-relaxed italic">
              Every dollar you give, helps us provide nutritious perishable and non-perishable meals and essential support to families and community individuals experiencing homelessness in need. With your generosity, we can turn hunger into hope.
            </p>
            <motion.div 
              style={{ opacity }}
              className="mt-16 flex justify-center"
            >
              <div className="w-px h-24 bg-gradient-to-b from-secondary to-transparent" />
            </motion.div>
          </motion.div>
          <div className="mt-12 text-center">
            <p className="font-paragraph text-xl text-textbody italic">
              What does Proverbs 19:17 say?
            </p>
            <p className="font-paragraph text-2xl text-secondary italic mt-4">
              Proverbs 19 vs 17: Whoever is generous to the poor lends to the Lord, and he will repay him for his deed.
            </p>
          </div>
        </div>
      </section>

      {/* Stretching Every Dollar Section */}
      <section className="py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 border border-secondary/30 rounded-full text-secondary text-xs uppercase tracking-[0.2em] mb-6"
            >
              Stretching Every Dollar
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading mb-6">Your contributions and generosity have a far-reaching impact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "$1 = 3 Meals",
                desc: "$1 can help provide 3 meals to families and community indivduals experiencing homelessness in need."
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Fresh Rescue",
                desc: "Your donations allow us to rescue and purchase fresh nutritious perishable and non-perishable food."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Sustainability",
                desc: "Your financial support ensures our programs remain sustainable and impactful." 
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Lasting Change",
                desc: "Your donation is the most effective way to make a lasting difference."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8 border border-bordersubtle/20 rounded-2xl text-center hover:border-secondary transition-colors"
              >
                <div className="text-secondary mb-6 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-heading mb-4">{item.title}</h3>
                <p className="text-textlight text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Gift Helps To Section */}
      <section className="py-24 border-b border-bordersubtle/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-heading mb-20 text-center">Your Gift Helps To</h2>
          
          <div className="space-y-12">
            {[
              {
                stat: "250,000+",
                label: "Meals Annually",
                title: "Provide over 250,000 meals annually",
                desc: "Each meal represents more than nourishment—it offers comfort, stability, a sense of belonging and hope to individuals experiencing homelessness and families during challenging times. Your generosity ensures no one in our community has to face hunger alone.",
                icon: <Utensils className="w-12 h-12" />
              },
              {
                stat: "380,000",
                label: "Pounds Rescued",
                title: "Rescue and distribute 380,000 annually pounds of food",
                desc: "By turning surplus food into sustenance, your donations help us fight waste and feed thousands. This not only fills empty plates but also supports a more sustainable future.",
                icon: <Leaf className="w-12 h-12" />
              },
              {
                stat: "Essential",
                label: "Resources",
                title: "Support families and community indivividuals experiencing homelessness with essential resources",
                desc: "Beyond food, your contributions help fund vital programs that empower individuals, from job training to community support initiatives. Together, we address the root causes of insecurity.",
                icon: <Users className="w-12 h-12" />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row gap-12 items-center bg-secondary/5 p-8 md:p-12 rounded-3xl border border-bordersubtle/20"
              >
                <div className="lg:w-1/3 text-center lg:text-left">
                  <div className="text-6xl font-heading text-secondary mb-2">{item.stat}</div>
                  <div className="text-sm uppercase tracking-[0.3em] text-textlight">{item.label}</div>
                </div>
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-background rounded-full text-secondary border border-bordersubtle/20">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-heading">{item.title}</h3>
                  </div>
                  <p className="text-textlight text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Options Section */}
      <section id="giving-options" className="relative py-24 bg-primary text-primary-foreground">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=2000"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-heading mb-8 opacity-40 uppercase tracking-[0.5em] text-pop"
            >
              Donate
            </motion.h2>
            <p className="text-2xl text-textbody max-w-3xl mx-auto leading-relaxed">
              We believe giving should be as meaningful as the impact it creates, so we've made it simple for you to support our mission in a way that works for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <CreditCard className="w-10 h-10" />,
                title: "One-Time Donation",
                desc: "Make a powerful and immediate difference today. Every dollar brings hope, nourishment, comfort, sense of belonging and dignity to those who need it most."
              },
              {
                icon: <Calendar className="w-10 h-10" />,
                title: "Monthly Giving",
                desc: "Join a dedicated community of donors committed to creating lasting change. With your ongoing support, we can ensure no family or indididuals experiencing food insecurities and homelessness is left behind."
              },
              {
                icon: <Building2 className="w-10 h-10" />,
                title: "Corporate Matching",
                desc: "Double the impact of your generosity through your employer's matching program, extending your gift to help more lives."
              }
            ].map((option, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-10 rounded-2xl hover:bg-white/10 transition-all group"
              >
                <div className="text-secondary mb-8 group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-heading mb-4 text-white text-pop">{option.title}</h3>
                <p className="text-textbody text-sm leading-relaxed mb-8">
                  {option.desc}
                </p>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-primary uppercase tracking-widest">
                  Select Option
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center max-w-3xl mx-auto">
            <p className="text-textbody italic">
              No matter how you choose to give, your contribution is a beacon of hope, transforming lives and strengthening our community. Together, we can create a future where no one faces hunger alone.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA / Contact Section */}
      <section className="py-24 border-t border-bordersubtle/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading mb-8">Want to Make a Difference?</h2>
            <p className="text-xl text-textlight mb-12 leading-relaxed">
              Your donation helps fill shelves, fridges, plates and hearts. Whether it's a one-time gift or ongoing support, every dollar plants seeds of hope for neighbors in need.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-secondary/5 border border-bordersubtle/20 p-8 rounded-2xl flex flex-col items-center">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-secondary mb-6 shadow-lg">
                  <Mail size={24} />
                </div>
                <h4 className="font-heading text-xl mb-4">E-Transfer</h4>
                <p className="text-textlight text-sm mb-2">Send transfers to:</p>
                <p className="font-bold text-lg text-foreground">TBD</p>
              </div>
              
              <div className="bg-secondary/5 border border-bordersubtle/20 p-8 rounded-2xl flex flex-col items-center">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-secondary mb-6 shadow-lg">
                  <MapPin size={24} />
                </div>
                <h4 className="font-heading text-xl mb-4">Physical Donations</h4>
                <p className="text-textlight text-sm mb-6 text-center">Visit our Contact page for drop-off details and hours.</p>
                <Button variant="outline" className="uppercase tracking-widest text-xs">
                  View Drop-off Details <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </div>

            <p className="text-2xl font-heading text-secondary italic">
              We sincerely apppreciate your support and thank you for helping us feed, teach, and empower our community — together. 🙏
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
