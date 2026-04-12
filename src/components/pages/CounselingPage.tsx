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
  MessageSquare,
  Cross
} from 'lucide-react';
import { Button } from '../ui/button';
import { Image } from '../ui/image';

export default function CounselingPage() {
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
            src="https://i.ibb.co/ZzdQbF3q/photo-realistic-image-40-year-260nw-2615233105.webp"
            alt="Counseling Hero"
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
              Faith-Based <br />
              <span className="text-secondary italic font-normal">Counseling</span>
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-textbody max-w-2xl mx-auto leading-relaxed italic">
              Find spiritual clarity and emotional healing through biblical principles. Our compassionate counselors provide a safe space to navigate life's challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-primary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading mb-8 text-pop">Healing Through Faith</h2>
              <p className="text-lg text-textbody leading-relaxed mb-8 italic font-paragraph">
                "When the Spirit of truth comes, he will guide you into all the truth." — John 16:13. We believe that spiritual well-being is the foundation for emotional and mental health. Our counseling services are designed to help you reconnect with God's purpose for your life.
              </p>
              <div className="space-y-4">
                {[
                  "Individual Spiritual Guidance",
                  "Family & Marriage Support",
                  "Grief & Loss Counseling",
                  "Youth Mentorship"
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
                  src="https://i.ibb.co/ZzdQbF3q/photo-realistic-image-40-year-260nw-2615233105.webp"
                  alt="Counseling Session"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-xl border border-secondary/20 shadow-xl max-w-[240px]">
                <p className="text-xs italic text-secondary leading-relaxed">
                  "I will instruct you and teach you and will counsel you with my eye upon you."
                </p>
                <p className="text-[10px] uppercase tracking-widest mt-2 font-bold opacity-60">— Psalm 32:8</p>
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
              <h2 className="text-3xl font-heading mb-4 text-pop">Request Counseling</h2>
              <p className="text-textbody italic">
                Please fill out this form to request a counseling session. All information is kept strictly confidential.
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
                  Thank you for reaching out. A member of our counseling team will contact you shortly.
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
                    <label className="text-xs uppercase tracking-widest font-bold">First Name</label>
                    <input required type="text" className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Last Name</label>
                    <input required type="text" className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Email Address</label>
                  <input required type="email" className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Type of Counseling</label>
                  <select required className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors appearance-none">
                    <option value="">Select an option</option>
                    <option value="individual">Individual Spiritual Guidance</option>
                    <option value="family">Family & Marriage Support</option>
                    <option value="grief">Grief & Loss Counseling</option>
                    <option value="youth">Youth Mentorship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Message / Brief Description</label>
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
