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
  Lock,
  MessageSquare,
  Footprints
} from 'lucide-react';
import { Button } from '../ui/button';
import { Image } from '../ui/image';

export default function PrisonMinistryPage() {
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
            src="https://i.ibb.co/8nSvRByM/prisonministry.jpg"
            alt="Prison Ministry Hero"
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
              Prison <br />
              <span className="text-secondary italic font-normal">Ministry</span>
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-textbody max-w-2xl mx-auto leading-relaxed italic">
              Sharing the message of redemption and hope with those in correctional facilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-primary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading mb-8 text-pop">Restoration & Hope</h2>
              <p className="text-lg text-textbody leading-relaxed mb-8 italic font-paragraph">
                "I was in prison and you came to visit me." — Matthew 25:36. Our prison ministry is dedicated to providing spiritual support, mentorship, and resources for successful reintegration into the community. We believe that no one is beyond the reach of God's grace.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Facility Visitations",
                  "Spiritual Mentorship",
                  "Re-entry Support",
                  "Family Connection"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-secondary w-5 h-5" />
                    <span className="text-textbody font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image 
                  src="https://i.ibb.co/8nSvRByM/prisonministry.jpg"
                  alt="Prison Outreach"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-xl border border-secondary/20 shadow-xl max-w-[240px]">
                <p className="text-xs italic text-secondary leading-relaxed">
                  "Remember those in prison as if you were their fellow prisoners."
                </p>
                <p className="text-[10px] uppercase tracking-widest mt-2 font-bold opacity-60">— Hebrews 13:3</p>
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
              <h2 className="text-3xl font-heading mb-4 text-pop">Inquiry Form</h2>
              <p className="text-textbody italic">
                Please use this form to inquire about our prison ministry services or to request support for a loved one.
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
                <h3 className="text-2xl font-heading mb-4">Inquiry Received</h3>
                <p className="text-textbody italic">
                  Thank you. A member of our prison ministry team will contact you shortly to discuss how we can help.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 bg-secondary hover:bg-secondary/80"
                >
                  Submit Another Inquiry
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
                    <label className="text-xs uppercase tracking-widest font-bold">Your Email</label>
                    <input required type="email" className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Type of Support Needed</label>
                  <select required className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors appearance-none">
                    <option value="">Select an option</option>
                    <option value="visitation">Facility Visitation Request</option>
                    <option value="mentorship">Spiritual Mentorship</option>
                    <option value="reentry">Re-entry Support</option>
                    <option value="family">Family Support Services</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Message / Details</label>
                  <textarea rows={4} placeholder="Please provide any relevant details..." className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 text-sm uppercase tracking-widest font-bold bg-secondary hover:bg-secondary/80"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
