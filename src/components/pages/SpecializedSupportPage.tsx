import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Users, 
  Leaf, 
  CheckCircle2, 
  UserPlus,
  MessageSquare,
  Cross,
  Home,
  Lock,
  BookOpen,
  HeartPulse
} from 'lucide-react';
import { Button } from '../ui/button';
import { Image } from '../ui/image';

export default function SpecializedSupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service) 
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      {/* Dynamic Background Pieces */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 120, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]"
        />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full py-24 flex items-center justify-center overflow-hidden border-b border-bordersubtle/20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://i.ibb.co/cc2h0D9S/help-1.jpg"
            alt="Support Hero"
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
              Holistic Care <br />
              <span className="text-secondary italic font-normal">Requests</span>
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-textbody max-w-2xl mx-auto leading-relaxed italic">
              Compassionate support for your spiritual, emotional, and social needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-primary/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 transition-all duration-500"
            >
              <MessageSquare className="text-secondary mb-6 w-10 h-10" />
              <h3 className="text-2xl font-heading mb-4">Faith-Based Counseling</h3>
              <p className="text-textbody text-sm leading-relaxed italic font-paragraph">
                Individual and family guidance rooted in biblical principles to navigate life's challenges.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 transition-all duration-500"
            >
              <HeartPulse className="text-secondary mb-6 w-10 h-10" />
              <h3 className="text-2xl font-heading mb-4">Visitation Ministry</h3>
              <p className="text-textbody text-sm leading-relaxed italic font-paragraph">
                Bringing companionship and prayer to those who are sick, shut-in, or in care facilities.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 transition-all duration-500"
            >
              <Lock className="text-secondary mb-6 w-10 h-10" />
              <h3 className="text-2xl font-heading mb-4">Prison Ministry</h3>
              <p className="text-textbody text-sm leading-relaxed italic font-paragraph">
                Sharing hope and redemption with those in correctional facilities and their families.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 transition-all duration-500"
            >
              <Cross className="text-secondary mb-6 w-10 h-10" />
              <h3 className="text-2xl font-heading mb-4">Prayer Request</h3>
              <p className="text-textbody text-sm leading-relaxed italic font-paragraph">
                Submit your prayer needs to our dedicated team for intercession and support.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 transition-all duration-500"
            >
              <BookOpen className="text-secondary mb-6 w-10 h-10" />
              <h3 className="text-2xl font-heading mb-4">Bible Study</h3>
              <p className="text-textbody text-sm leading-relaxed italic font-paragraph">
                Join our community in exploring the Word of God for spiritual growth and wisdom.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unified Request Form */}
      <section 
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(110deg, #3A4A3A 50%, #243124 50.5%)' }}
      >
        {/* Soft Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5">
            <div className="text-center mb-12">
              <UserPlus className="mx-auto mb-6 text-secondary" size={48} />
              <h2 className="text-3xl font-heading mb-4 text-pop">Request Support</h2>
              <p className="text-textbody italic">
                Please select the services you need and provide your details. We are here for you.
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
                  Thank you. A member of our team will contact you shortly.
                </p>
                <Button 
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedServices([]);
                  }}
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
                  <label className="text-xs uppercase tracking-widest font-bold">Contact Email / Phone</label>
                  <input required type="text" className="w-full bg-primary/20 border border-white/10 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                </div>
                
                {/* Multiple Choice Menu for Services */}
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest font-bold block mb-2">Services Requested (Select all that apply)</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'counseling', label: 'Faith-Based Counseling', icon: <MessageSquare size={16} /> },
                      { id: 'visitation', label: 'Sick or shut-in, hospital, or nursing home visitation request', icon: <HeartPulse size={16} /> },
                      { id: 'prison', label: 'Prison Ministry', icon: <Lock size={16} /> },
                      { id: 'prayer', label: 'Prayer Request', icon: <Cross size={16} /> },
                      { id: 'bible-study', label: 'Bible Study', icon: <BookOpen size={16} /> }
                    ].map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 text-left ${
                          selectedServices.includes(service.id)
                            ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20'
                            : 'bg-primary/20 border-white/10 text-textbody hover:border-secondary/50'
                        }`}
                      >
                        <div className={`p-2 rounded-full ${selectedServices.includes(service.id) ? 'bg-white/20' : 'bg-secondary/10 text-secondary'}`}>
                          {service.icon}
                        </div>
                        <span className="font-paragraph font-medium">{service.label}</span>
                        {selectedServices.includes(service.id) && (
                          <CheckCircle2 size={18} className="ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Message / Specific Needs</label>
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
