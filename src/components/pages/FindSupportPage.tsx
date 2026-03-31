import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  Users, 
  ShieldCheck, 
  CheckCircle2,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Info,
  Dog,
  UserPlus,
  Leaf,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Image } from '../ui/image';
import { type SupportFormSubmission, type SupportPetSelection } from '../../lib/supportSubmission';

interface FAQItemProps {
  question: string;
  answer: string;
  key?: number | string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-bordersubtle/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-heading group-hover:text-secondary transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="text-secondary" /> : <ChevronDown className="text-textlight" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-textlight leading-relaxed">
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
      answer: "Our doors are open to anyone in need who has been referred to us. This includes individuals and families from various backgrounds, such as schools, social services, survivors of domestic violence, individuals experiencing homelessness, and the unemployed. Revelation 7:16-17 — 'They shall hunger no more, neither thirst any more; neither shall the sun light on them, nor any heat. For the Lamb which is in the midst of the throne shall feed them, and shall lead them unto living fountains of waters: and God shall wipe away all tears from their eyes.'"
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
      answer: "There are no fees for our services to persons,families with food insecurities and individuals experiencing homlessness; however, for Churches and Social Services Cmmunity Groups distributing to their selective teams. We require a completed membership application which include a small mountly fee or dontations and we prioritize those with demonstrated need or referrals."
    },
    {
      question: "What types of food does our Belleville Food Bank On Wheels provide?",
      answer: "We provide bi-weekly healthy food boxes filled with local produce, meats, perishable, non-perishable and pantry staples. We also offer specialized options for various dietary restrictions."
    },
    {
      question: "Are there specific services for people with dietary restrictions?",
      answer: "Yes! We offer a wide range of options including gluten-free, diabetic-friendly, nut-free, vegan, vegetarian, and halal-based meals-when available. We also cater to specific medical needs like hypertension or celiac disease."
    },
    {
      question: "Do you provide hygiene products?",
      answer: "Yes, we provide toiletries and hygiene products, though these are in limited supply. We aim to ensure those in need get access to these items at least once every 5 weeks-when available."
    },
    {
      question: "Do you provide meals for homeless individuals?",
      answer: "Absolutely! we strive to provide nourishing and healthy perishable and non-perishable food items to everyone, including those of us who are currently experiencing homelessness."
    },
    {
      question: "Are there programs for children?",
      answer: "We provide family-sized boxes and work with local schools to ensure children have access to the nutrition they need."
    },
    {
      question: "Do you support seniors?",
      answer: "Absolutely! We have specific programming and support needs dedicated to various age groups, including seniors, across our food bank community."
    }
  ];

  return (
    <div ref={containerRef} className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] py-20 flex items-center justify-center overflow-hidden border-b border-bordersubtle/20">
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
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.85] mb-8 uppercase tracking-tighter text-pop">
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
              <div className="inline-flex p-3 bg-background rounded-full text-secondary mb-6 shadow-lg border border-bordersubtle/20">
                <Users size={32} />
              </div>
              <h2 className="text-4xl font-heading mb-6 text-pop">Everyone Is Welcome</h2>
              <p className="text-xl text-textbody leading-relaxed mb-8 italic font-paragraph">
                Our doors are open to anyone in need, regardless of age, background, or circumstance. "He answereth and saith unto them, He that hath two coats, let him impart to him that hath none; and he that hath meat, let him do likewise." — Luke 3:11. Whether you're a single parent, a senior, or a newcomer, we provide the resources you need to regain stability, a sense of belonging and hope.
              </p>
              <div className="bg-background/50 backdrop-blur-sm border border-white/5 p-8 rounded-2xl">
                <div className="text-4xl font-heading text-secondary mb-2">250,000+</div>
                <p className="text-textbody">Meals are provided annually to ensure no one in our community goes hungry.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-20 lg:-mr-20"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video border border-white/5">
                <img 
                  src="https://i.ibb.co/qYnRwWFN/hwyni.webp"
                  alt="Everyone is Welcome"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Soft Glow behind image */}
              <div className="absolute inset-0 bg-secondary/5 blur-3xl -z-10 scale-110" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-secondary font-heading text-xl mb-4 opacity-50 uppercase tracking-[0.5em] font-bold"
            >
              Learn More About Support
            </motion.div>
            <h2 className="text-4xl font-heading text-pop">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Access Support Today Info with Glows */}
      <section className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Soft Halo Glows */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] -z-10 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10 translate-x-1/4 translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-heading mb-8 opacity-40 uppercase tracking-[0.3em] text-pop">Access Support Today</h2>
            <p className="text-2xl text-textbody max-w-4xl mx-auto leading-relaxed font-medium italic font-paragraph">
              We're thrilled to support you and your family's needs with our bi-weekly healthy food boxes. Each box is filled with nourishing items, including local produce, meats, toiletries, perishable and non-perishable diet-friendly meals, and even pet food.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-secondary">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-heading">Compassionate Care</h3>
              <p className="text-textbody text-base leading-relaxed italic font-paragraph">
                At our food bank, we're here to help anyone in need who has been referred to us. Our clients come from various backgrounds, such as schools, social services, new comers, survivors of domestic violence, individuals experiencing homelessness, and the unemployed.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-secondary">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-heading">Dietary Respect</h3>
              <p className="text-textbody text-base leading-relaxed italic font-paragraph">
                We understand the importance of individual dietary restrictions. We respect cultural and social dietary requirements. We offer gluten-free, diabetic-friendly, nut-free, vegan, vegetarian, perishable, non-perishable and halal options.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-secondary">
                <Info size={24} />
              </div>
              <h3 className="text-2xl font-heading">Secure & Private</h3>
              <p className="text-textbody text-base leading-relaxed italic font-paragraph">
               Please rest assured that any information you provide will be kept safe and secure and confidential, accessible only to authorized senior personnel at BFBOW.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section id="support-form" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-background border border-bordersubtle/30 rounded-3xl p-8 md:p-16 shadow-2xl">
            <div className="text-center mb-16">
              <UserPlus className="mx-auto mb-6 text-secondary" size={64} />
              <h2 className="text-4xl font-heading mb-4 text-pop">Signing Up</h2>
              <p className="text-textbody font-medium">
                Please fill out your membership application form to get started. Once submitted, a member of our Belleville Food Bank On Wheels Team will review your information and reach out shortly!
              </p>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit}>

              {/* Name Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Name</h3>
                <p className="text-xs text-textlight italic">Please provide your first and last name</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">First Name <span className="text-destructive">*</span></label>
                    <input required name="FIRSTNAME" type="text" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Last Name <span className="text-destructive">*</span></label>
                    <input required name="LASTNAME" type="text" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
              </div>

              {/* Age Range Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Age Range</h3>
                <p className="text-xs text-textbody/60 leading-relaxed">
                  Please select the age range(s) applicable to you. This helps us and our distribution partners tailor support and programming to various age groups in our community.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['0-18', '19-30', '31-50', '51-64', '65+'].map((range) => (
                    <div key={range} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id={`age-${range}`}
                        name="AGE_RANGES"
                        value={range}
                        className="accent-secondary"
                      />
                      <label htmlFor={`age-${range}`} className="text-xs text-textbody/60">{range}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Contact Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Email <span className="text-destructive">*</span></label>
                    <input required name="EMAIL" type="email" placeholder="jane.doe@email.com" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                    <div className="flex items-center gap-2 mt-2">
                      <input type="checkbox" id="news" name="OPT_IN" value="true" className="accent-secondary" />
                      <label htmlFor="news" className="text-xs text-textlight">Sign up for news and updates</label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold">Phone Number</label>
                      <input name="SMS" type="tel" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold">Postal Code <span className="text-destructive">*</span></label>
                      <input required name="POSTAL_CODE" type="text" placeholder="L1E1V8" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors uppercase" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Household Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Household Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Picking up for others?</label>
                    <select name="PICKUP_OTHERS" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors appearance-none">
                      <option value="">Select an option</option>
                      <option value="No, just my household">No, just my household</option>
                      <option value="Yes, another person/household">Yes, another person/household</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">People in household</label>
                    <input name="HOUSEHOLD_COUNT" type="number" min="1" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
              </div>

              {/* Dietary Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Dietary Restrictions</h3>
                <p className="text-xs text-textlight leading-relaxed">
                  Please select any dietary restrictions or statements most applicable to your household.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Gluten-Free', 'Diabetic-Friendly', 'Nut-Free', 'Vegan', 'Vegetarian', 'Halal', 'Hypertension', 'Celiac', 'No Restrictions'].map((diet) => (
                    <div key={diet} className="flex items-center gap-2">
                      <input type="checkbox" id={diet} name="DIETARY_PREFS" value={diet} className="accent-secondary" />
                      <label htmlFor={diet} className="text-xs text-textlight">{diet}</label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Additional Preferences</label>
                  <textarea name="DIETARY_NOTES" rows={3} className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
              </div>

              {/* Hygiene & Clothing Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Nurturing, Hygiene & Clothing</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Soap/Body Wash', 'Shampoo', 'Toothpaste', 'Deodorant', 'Feminine Hygiene', 'Diapers', 'Baby Wipes', 'Clothing Items'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <input type="checkbox" id={item} name="HYGIENE_PREFS" value={item} className="accent-secondary" />
                      <label htmlFor={item} className="text-xs text-textlight">{item}</label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Additional Preferences (Hygiene/Clothing)</label>
                  <textarea name="HYGIENE_NEEDS" rows={2} placeholder="Sizes, specific needs, etc." className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
              </div>

              {/* Pets Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2 flex items-center gap-2">
                  <Dog size={16} /> Pets and Animals
                </h3>
                <p className="text-xs text-textlight leading-relaxed">
                  Please select the pet you have and the amount so we can provide supplies when on hand.
                </p>
                <div className="space-y-4">
                  {['Dog', 'Cat', 'Small Animal (Rabbit, Hamster, etc)'].map((pet) => (
                    <div key={pet} className="flex items-center justify-between gap-4 p-4 bg-background border border-bordersubtle/20 rounded-xl">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id={pet} name="PET_INFO" value={pet} className="accent-secondary" />
                        <label htmlFor={pet} className="text-sm">{pet}</label>
                      </div>
                      <input name={`PET_QTY_${pet}`} type="number" placeholder="Qty" className="w-20 bg-secondary/5 border border-bordersubtle/30 rounded px-3 py-1 text-sm outline-none focus:border-secondary" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Pet Details (Types, Ages, Special Needs)</label>
                  <textarea name="PET_DETAILS" rows={2} placeholder="Please provide more details about your pets..." className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Additional Information</h3>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Is there anything else we should know?</label>
                  <textarea name="ADDITIONAL_INFO" rows={3} placeholder="Any other details that might help us support you better..." className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
              </div>

              {/* Confirmation Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Confirmation & Acknowledgment</h3>
                <div className="space-y-4">
                  {[
                    "I confirm that the information provided is accurate to the best of my knowledge.",
                    "I understand that food, clothing, hygiene and other specialty items are subject to availability.",
                    "I agree to the storage of my data for the purpose of providing support services.",
                    "I acknowledge that BFBOW authorized personnel will handle my information securely."
                  ].map((agreement, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <input required type="checkbox" id={`agree-${i}`} name="CONFIRM_ACK" value={agreement} className="mt-1 accent-secondary" />
                      <label htmlFor={`agree-${i}`} className="text-xs text-textlight leading-relaxed">{agreement}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1. THE SUBMIT BUTTON (Changes text when submitting) */}
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-8 text-lg uppercase tracking-[0.2em] font-bold shadow-xl shadow-secondary/20 group"
              >
                {isSubmitting ? 'Submitting...' : 'Submit My Form'} 
                {!isSubmitting && <CheckCircle2 className="ml-2 group-hover:scale-110 transition-transform" />}
              </Button>

              {/* Status Messages */}
              {submitMessage && (
                <div className={`mt-6 p-4 rounded-lg border text-sm ${
                  submitMessage.type === 'success' ? 'bg-secondary/10 border-secondary text-secondary' :
                  submitMessage.type === 'warning' ? 'bg-amber-500/10 border-amber-500 text-amber-600' :
                  'bg-destructive/10 border-destructive text-destructive'
                }`}>
                  <div className="flex items-center gap-3">
                    {submitMessage.type === 'success' && <CheckCircle2 size={20} />}
                    {submitMessage.type === 'warning' && <AlertCircle size={20} />}
                    {submitMessage.type === 'error' && <AlertCircle size={20} />}
                    <span>{submitMessage.text}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
