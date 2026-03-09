import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  UserPlus
} from 'lucide-react';
import { Button } from '../ui/button';

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
  const faqs = [
    {
      question: "Who can access the Belleville Food Bank On Wheels?",
      answer: "Our doors are open to anyone in need who has been referred to us. This includes individuals and families from various backgrounds, such as schools, social services, survivors of domestic violence, the homeless, and the unemployed."
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
      answer: "There are no fees for our services. We require a completed membership application and we prioritize those with demonstrated need or referrals."
    },
    {
      question: "What types of food does the Belleville Food Bank On Wheels provide?",
      answer: "We provide bi-weekly healthy food boxes filled with local produce, meats, and pantry staples. We also offer specialized options for various dietary restrictions."
    },
    {
      question: "Are there specific services for people with dietary restrictions?",
      answer: "Yes! We offer a wide range of options including gluten-free, diabetic-friendly, nut-free, vegan, vegetarian, and halal-based meals. We also cater to specific medical needs like hypertension or celiac disease."
    },
    {
      question: "Do you provide hygiene products?",
      answer: "Yes, we provide toiletries and hygiene products, though these are in limited supply. We aim to ensure those in need get access to these items at least once every 5 weeks."
    },
    {
      question: "Do you provide meals for homeless individuals?",
      answer: "Yes, we strive to provide nourishing and healthy food products to everyone, including those currently experiencing homelessness."
    },
    {
      question: "Are there programs for children?",
      answer: "We provide family-sized boxes and work with local schools to ensure children have access to the nutrition they need."
    },
    {
      question: "Do you support seniors?",
      answer: "Absolutely. We have specific programming and support needs dedicated to various age groups, including seniors, across our food bank community."
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 border-b border-bordersubtle/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-heading mb-8">Help When You <span className="text-secondary italic">Need</span> It</h1>
              <p className="text-xl text-textlight leading-relaxed mb-6">
                At the Belleville Food Bank On Wheels, we understand that everyone faces challenges. 
              </p>
              <p className="text-lg text-textlight/80 mb-10">
                Whether you need food for your family or help navigating tough situations, we're here to offer support with dignity and care. Through his grace, we can provide.
              </p>
              <Button 
                className="px-10 py-8 text-lg uppercase tracking-widest"
                onClick={() => document.getElementById('support-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply for Support
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Everyone is Welcome */}
      <section className="py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex p-3 bg-background rounded-full text-secondary mb-6 shadow-lg">
                <Users size={32} />
              </div>
              <h2 className="text-4xl font-heading mb-6">Everyone Is Welcome</h2>
              <p className="text-lg text-textlight leading-relaxed mb-8">
                Our doors are open to anyone in need, regardless of age, background, or circumstance. Whether you're a single parent, a senior, or a newcomer, we provide the resources you need to regain stability and hope.
              </p>
              <div className="bg-background border border-bordersubtle/30 p-8 rounded-2xl">
                <div className="text-4xl font-heading text-secondary mb-2">250,000+</div>
                <p className="text-textlight">Meals provided annually to ensure no one in our community goes hungry.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl aspect-video"
            >
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000"
                alt="Community support"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
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
              className="text-secondary font-heading text-xl mb-4 opacity-30 uppercase tracking-[0.5em]"
            >
              Learn More About Support
            </motion.div>
            <h2 className="text-4xl font-heading">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Access Support Today Info */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-heading mb-8 opacity-20 uppercase tracking-[0.3em]">Access Support Today</h2>
            <p className="text-xl text-textbody/80 max-w-4xl mx-auto leading-relaxed">
              We're thrilled to support you and your family's needs with our bi-weekly healthy food boxes. Each box is filled with nourishing items, including local produce, meats, toiletries, diet-friendly meals, and even pet food.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-secondary">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-heading">Compassionate Care</h3>
              <p className="text-textbody/60 text-sm leading-relaxed">
                At our food bank, we're here to help anyone in need who has been referred to us. Our clients come from various backgrounds, such as schools, social services, survivors of domestic violence, the homeless, and the unemployed.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-secondary">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-heading">Dietary Respect</h3>
              <p className="text-textbody/60 text-sm leading-relaxed">
                We understand the importance of individual dietary restrictions and respect cultural and social dietary requirements. We offer gluten-free, diabetic-friendly, nut-free, vegan, vegetarian, and halal options.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-secondary">
                <Info size={24} />
              </div>
              <h3 className="text-2xl font-heading">Secure & Private</h3>
              <p className="text-textbody/60 text-sm leading-relaxed">
                Rest assured that any information you provide will be kept safe and secure, accessible only to authorized senior personnel at BFBOW.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section id="support-form" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary/5 border border-bordersubtle/30 rounded-3xl p-8 md:p-16">
            <div className="text-center mb-16">
              <UserPlus className="mx-auto mb-6 text-secondary" size={64} />
              <h2 className="text-4xl font-heading mb-4">Signing Up</h2>
              <p className="text-textlight">
                Please fill out your membership application form to get started. Once submitted, a member of our Belleville Food Bank On Wheels team will review your information and reach out shortly!
              </p>
            </div>

            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              {/* Name Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Name</h3>
                <p className="text-xs text-textlight italic">Please provide your first and last name</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">First Name <span className="text-destructive">*</span></label>
                    <input required type="text" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Last Name <span className="text-destructive">*</span></label>
                    <input required type="text" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
              </div>

              {/* DOB Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Date of Birth</h3>
                <p className="text-xs text-textlight leading-relaxed">
                  Though adding your birthday is not mandatory we strongly recommend adding your D.O.B for our larger distribution partners for additional support needs and programming dedicated to various age groups.
                </p>
                <input type="date" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
              </div>

              {/* Contact Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Contact Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Email <span className="text-destructive">*</span></label>
                    <input required type="email" placeholder="jane.doe@email.com" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                    <div className="flex items-center gap-2 mt-2">
                      <input type="checkbox" id="news" className="accent-secondary" />
                      <label htmlFor="news" className="text-xs text-textlight">Sign up for news and updates</label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold">Phone Number</label>
                      <input type="tel" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold">Postal Code <span className="text-destructive">*</span></label>
                      <input required type="text" placeholder="L1E1V8" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors uppercase" />
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
                    <select className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors appearance-none">
                      <option value="">Select an option</option>
                      <option>No, just my household</option>
                      <option>Yes, another person/household</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">People in household</label>
                    <input type="number" min="1" className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors" />
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
                      <input type="checkbox" id={diet} className="accent-secondary" />
                      <label htmlFor={diet} className="text-xs text-textlight">{diet}</label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Additional Preferences</label>
                  <textarea rows={3} className="w-full bg-background border border-bordersubtle/30 rounded-lg px-4 py-3 focus:border-secondary outline-none transition-colors"></textarea>
                </div>
              </div>

              {/* Hygiene Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Nurturing & Hygiene Products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Soap/Body Wash', 'Shampoo', 'Toothpaste', 'Deodorant', 'Feminine Hygiene', 'Diapers', 'Baby Wipes'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <input type="checkbox" id={item} className="accent-secondary" />
                      <label htmlFor={item} className="text-xs text-textlight">{item}</label>
                    </div>
                  ))}
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
                        <input type="checkbox" id={pet} className="accent-secondary" />
                        <label htmlFor={pet} className="text-sm">{pet}</label>
                      </div>
                      <input type="number" placeholder="Qty" className="w-20 bg-secondary/5 border border-bordersubtle/30 rounded px-3 py-1 text-sm outline-none focus:border-secondary" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirmation Section */}
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-secondary border-b border-secondary/20 pb-2">Confirmation & Acknowledgment</h3>
                <div className="space-y-4">
                  {[
                    "I confirm that the information provided is accurate to the best of my knowledge.",
                    "I understand that food and hygiene items are subject to availability.",
                    "I agree to the storage of my data for the purpose of providing support services.",
                    "I acknowledge that BFBOW authorized personnel will handle my information securely."
                  ].map((agreement, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <input required type="checkbox" id={`agree-${i}`} className="mt-1 accent-secondary" />
                      <label htmlFor={`agree-${i}`} className="text-xs text-textlight leading-relaxed">{agreement}</label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full py-8 text-lg uppercase tracking-[0.2em] font-bold shadow-xl shadow-secondary/20 group">
                Submit My Form <CheckCircle2 className="ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
