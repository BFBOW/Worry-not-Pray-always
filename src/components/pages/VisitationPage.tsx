import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Users, 
  Leaf, 
  CheckCircle2, 
  ArrowRight, 
  Info,
  UserPlus,
  ShieldCheck,
  Home,
  Hospital,
  PhoneCall
} from 'lucide-react';
import { Button } from '../ui/button';
import { Image } from '../ui/image';

export default function VisitationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-24 flex items-center justify-center overflow-hidden border-b border-bordersubtle/20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://i.ibb.co/998Qc5Hk/sickpray.jpg"
            alt="Visitation Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Leaf className="w-12 h-12 text-secondary mx-auto mb-8 animate-pulse" />
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.85] mb-8 uppercase tracking-tighter text-pop">
              Visitation <br />
              <span className="text-secondary italic font-normal">Ministry</span>
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-textbody max-w-2xl mx-auto leading-relaxed italic">
              No one should feel forgotten. Our visitation team brings the ministry to those who are shut-in, sick, or hospitalized.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-primary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image 
                  src="https://i.ibb.co/998Qc5Hk/sickpray.jpg"
                  alt="Visitation Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-panel p-6 rounded-xl border border-secondary/20 shadow-xl max-w-[240px]">
                <p className="text-xs italic text-secondary leading-relaxed">
                  "Whatever you did for one of the least of these brothers and sisters of mine, you did for me."
                </p>
                <p className="text-[10px] uppercase tracking-widest mt-2 font-bold opacity-60">— Matthew 25:40</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-heading mb-8 text-pop">A Tangible Connection</h2>
              <p className="text-lg text-textbody leading-relaxed mb-8 italic font-paragraph">
                Our visitation team provides prayer, companionship, and a tangible connection to the community for those unable to attend in person. We believe in the power of presence and the comfort of God's love shared through human connection.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Hospital className="w-5 h-5" />, text: "Hospital Bedside Visits" },
                  { icon: <Home className="w-5 h-5" />, text: "Home Visits for Shut-ins" },
                  { icon: <Users className="w-5 h-5" />, text: "Nursing Home Outreach" },
                  { icon: <PhoneCall className="w-5 h-5" />, text: "Phone Call Ministry" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-secondary">{item.icon}</div>
                    <span className="text-textbody font-medium text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5">
            <div className="text-center mb-12">
              <UserPlus className="mx-auto mb-6 text-secondary" size={48} />
              <h2 className="text-3xl font-heading mb-4 text-pop">Request a Visit</h2>
              <p className="text-textbody italic">
                Please fill out this form to request a visit for yourself or a loved one.
              </p>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-secondary w-10 h-10" />
                </div>
                <h3 className="text-2xl font-heading mb-4">Request Received</h3>
                <p className="text-textbody italic">
                  Thank you. Our visitation team will review your request and reach out as soon as possible.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 bg-secondary hover:bg-secondary/80"
                >
                  Submit Another Request
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Your Name</label>
                    <input required type="text" className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Your Phone Number</label>
                    <input required type="tel" className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Person to Visit (If different)</label>
                  <input type="text" className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Location of Visit</label>
                  <select required className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors appearance-none">
                    <option value="">Select an option</option>
                    <option value="home">Home Visit</option>
                    <option value="hospital">Hospital Visit</option>
                    <option value="nursing-home">Nursing Home Visit</option>
                    <option value="phone">Phone Call Only</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Additional Details / Prayer Requests</label>
                  <textarea rows={4} className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 text-sm uppercase tracking-widest font-bold bg-secondary hover:bg-secondary/80"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
