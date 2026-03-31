import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  Users, 
  ShieldCheck, 
  CheckCircle2,
  Info,
  Dog,
  UserPlus,
  Leaf,
  AlertCircle
} from 'lucide-react';
import { Image } from '../ui/image';
import { type SupportFormSubmission, type SupportPetSelection } from '../../lib/supportSubmission';
import { MagneticButton } from '../ui/MagneticButton';

interface FAQItemProps {
  question: string;
  answer: string;
  key?: number | string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-secondary/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-heading group-hover:text-secondary transition-colors italic text-primary-foreground">{question}</span>
        {isOpen ? <ChevronUp className="text-secondary" /> : <ChevronDown className="text-textbody/40" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-textbody/80 leading-relaxed font-paragraph italic">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FindSupportPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'warning' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const formData = new FormData(e.currentTarget);
    
    // Collect age ranges
    const ageRanges: string[] = [];
    formData.getAll('AGE_RANGES').forEach(val => ageRanges.push(String(val)));

    // Collect dietary prefs
    const dietaryPrefs: string[] = [];
    formData.getAll('DIETARY_PREFS').forEach(val => dietaryPrefs.push(String(val)));

    // Collect hygiene prefs
    const hygienePrefs: string[] = [];
    formData.getAll('HYGIENE_PREFS').forEach(val => hygienePrefs.push(String(val)));

    // Collect pets
    const pets: SupportPetSelection[] = [];
    const petTypes = ['Dog', 'Cat', 'Small Animal (Rabbit, Hamster, etc)'];
    petTypes.forEach(pet => {
      const isSelected = formData.getAll('PET_INFO').includes(pet);
      const qty = Number(formData.get(`PET_QTY_${pet}`));
      if (isSelected || qty > 0) {
        pets.push({ name: pet, quantity: qty || 0 });
      }
    });

    const rawPhone = String(formData.get('SMS') ?? '').replace(/[^\d]/g, '');
    const formattedPhone = rawPhone ? `+1${rawPhone}` : '';

    const submission: SupportFormSubmission = {
      firstName: String(formData.get('FIRSTNAME')),
      lastName: String(formData.get('LASTNAME')),
      email: String(formData.get('EMAIL')),
      phone: formattedPhone,
      postalCode: String(formData.get('POSTAL_CODE')),
      ageRanges,
      optIn: formData.get('OPT_IN') === 'true',
      pickupOthers: String(formData.get('PICKUP_OTHERS')),
      householdCount: formData.get('HOUSEHOLD_COUNT') ? Number(formData.get('HOUSEHOLD_COUNT')) : undefined,
      dietaryPrefs,
      dietaryNotes: String(formData.get('DIETARY_NOTES')),
      hygienePrefs,
      hygieneNotes: String(formData.get('HYGIENE_NEEDS')),
      pets,
      petDetails: String(formData.get('PET_DETAILS')),
      additionalInfo: String(formData.get('ADDITIONAL_INFO')),
      confirmAck: true,
      contactTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setSubmitMessage({ type: 'success', text: result.message || 'Application submitted successfully.' });
        if (e.currentTarget) e.currentTarget.reset();
      } else if (result.status === 'warning') {
        setSubmitMessage({ type: 'warning', text: result.message });
        if (e.currentTarget) e.currentTarget.reset();
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Submission failed. Please try again.' });
      }
    } catch (err: any) {
      setSubmitMessage({ type: 'error', text: 'A connection error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "Who can access the Belleville Food Bank On Wheels?",
      answer: "Our doors are open to anyone in need who has been referred to us. This includes individuals and families from various backgrounds, such as schools, social services, survivors of domestic violence, individuals experiencing homelessness, and the unemployed."
    },
    {
      question: "What should I bring with me when I visit?",
      answer: "Please bring a piece of identification and proof of address if possible. If you were referred by an organization, bringing that referral information is also helpful."
    },
    {
      question: "How often can I access food and services?",
      answer: "We typically provide bi-weekly healthy food boxes. Specific schedules can be discussed during your intake process."
    },
    {
      question: "Are there any fees or requirements to receive support?",
      answer: "There are no fees for our services to persons, families with food insecurities and individuals experiencing homelessness."
    }
  ];

  return (
    <div ref={containerRef} className="bg-background min-h-screen selection:bg-secondary selection:text-primary">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] py-20 flex items-center justify-center overflow-hidden border-b border-secondary/10">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://i.ibb.co/cc2h0D9S/help-1.jpg"
            alt="Find Support Hero"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/60 to-background" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Leaf className="w-12 h-12 text-secondary mx-auto mb-8 animate-pulse" />
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.85] mb-8 italic tracking-tighter">
              Help When You <br />
              <span className="text-secondary italic font-normal">Need</span> It
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-textbody max-w-2xl mx-auto leading-relaxed italic">
              At our Belleville Food Bank On Wheels, we understand that everyone faces challenges. Whether you need food for your family or help navigating challenging situations, we're here to offer support with dignity and care.
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

      {/* Everyone is Welcome with Slanted Split */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{ background: 'linear-gradient(110deg, #1A241A 50%, #243124 50.5%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="inline-flex p-3 bg-primary/40 backdrop-blur-md rounded-2xl text-secondary mb-6 border border-secondary/10">
                <Users size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-heading mb-6 italic text-primary-foreground">Everyone Is Welcome</h2>
              <p className="text-xl text-textbody leading-relaxed mb-8 italic font-paragraph">
                Our doors are open to anyone in need, regardless of age, background, or circumstance. "He answereth and saith unto them, He that hath two coats, let him impart to him that hath none; and he that hath meat, let him do likewise." — Luke 3:11.
              </p>
              <div className="bg-background/40 backdrop-blur-sm border border-secondary/10 p-8 rounded-3xl">
                <div className="text-4xl font-heading text-secondary mb-2 italic">250,000+</div>
                <p className="text-textbody font-paragraph italic">Meals are provided annually to ensure no one in our community goes hungry.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-20 group"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-video border border-secondary/10">
                <img 
                  src="https://i.ibb.co/qYnRwWFN/hwyni.webp"
                  alt="Everyone is Welcome"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-secondary/5 blur-[80px] -z-10 scale-110" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-secondary font-paragraph text-[10px] mb-4 opacity-60 uppercase tracking-[0.3em] font-bold"
            >
              Learn More About Support
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-heading italic text-primary-foreground">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Access Support Today */}
      <section className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-heading mb-8 opacity-20 uppercase tracking-[0.3em] italic">Access Support Today</h2>
            <p className="text-2xl text-textbody max-w-4xl mx-auto leading-relaxed font-paragraph italic">
              We're thrilled to support you and your family's needs with our bi-weekly healthy food boxes. Each box is filled with nourishing items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-background/20 rounded-2xl flex items-center justify-center text-secondary">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-heading italic">Compassionate Care</h3>
              <p className="text-textbody text-base leading-relaxed italic font-paragraph">
                At our food bank, we're here to help anyone in need who has been referred to us.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-background/20 rounded-2xl flex items-center justify-center text-secondary">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-heading italic">Dietary Respect</h3>
              <p className="text-textbody text-base leading-relaxed italic font-paragraph">
                We understand the importance of individual dietary restrictions. We respect cultural and social dietary requirements.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-background/20 rounded-2xl flex items-center justify-center text-secondary">
                <Info size={24} />
              </div>
              <h3 className="text-2xl font-heading italic">Secure & Private</h3>
              <p className="text-textbody text-base leading-relaxed italic font-paragraph">
               Please rest assured that any information you provide will be kept safe and secure and confidential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section id="support-form" className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/30 backdrop-blur-md border border-secondary/10 rounded-[3rem] p-8 md:p-16 shadow-2xl">
            <div className="text-center mb-16">
              <UserPlus className="mx-auto mb-6 text-secondary" size={64} />
              <h2 className="text-4xl md:text-5xl font-heading mb-4 italic text-primary-foreground">Signing Up</h2>
              <p className="text-textbody font-paragraph italic">
                Please fill out your membership application form to get started. Once submitted, a member of our Belleville Food Bank On Wheels Team will reach out shortly!
              </p>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit}>
              {/* Name Section */}
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-textbody">First Name <span className="text-destructive">*</span></label>
                    <input required name="FIRSTNAME" type="text" className="w-full bg-secondary/5 border border-secondary/20 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors text-primary-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-textbody">Last Name <span className="text-destructive">*</span></label>
                    <input required name="LASTNAME" type="text" className="w-full bg-secondary/5 border border-secondary/20 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Age Range Section */}
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Age Range</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['0-18', '19-30', '31-50', '51-64', '65+'].map((range) => (
                    <label key={range} className="flex items-center gap-3 p-3 bg-secondary/5 border border-secondary/20 rounded-xl cursor-pointer hover:border-secondary transition-colors">
                      <input 
                        type="checkbox" 
                        name="AGE_RANGES"
                        value={range}
                        className="w-4 h-4 accent-secondary"
                      />
                      <span className="text-sm text-textbody">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Contact Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-textbody">Email <span className="text-destructive">*</span></label>
                    <input required name="EMAIL" type="email" className="w-full bg-secondary/5 border border-secondary/20 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors text-primary-foreground" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-textbody">Phone Number</label>
                      <input name="SMS" type="tel" className="w-full bg-secondary/5 border border-secondary/20 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-textbody">Postal Code <span className="text-destructive">*</span></label>
                      <input required name="POSTAL_CODE" type="text" className="w-full bg-secondary/5 border border-secondary/20 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-colors text-primary-foreground uppercase" />
                    </div>
                  </div>
                </div>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-2xl border text-sm ${
                  submitMessage.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                  submitMessage.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' :
                  'bg-destructive/10 border-destructive/20 text-destructive'
                }`}>
                  <div className="flex items-center gap-3">
                    {submitMessage.type === 'success' && <CheckCircle2 size={20} />}
                    <span>{submitMessage.text}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <MagneticButton type="submit" disabled={isSubmitting} className="w-full py-8 text-sm">
                  {isSubmitting ? 'Submitting...' : 'Submit My Form'}
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
