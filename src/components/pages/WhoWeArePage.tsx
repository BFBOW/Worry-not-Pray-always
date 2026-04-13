import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Heart, 
  History, 
  Quote, 
  TrendingUp, 
  Utensils, 
  ShieldCheck, 
  Leaf, 
  BookOpen, 
  Users, 
  Calendar,
  CheckCircle2,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Image } from '../ui/image';

// --- Editorial Components ---

const TeamMarquee = () => {
  const row1 = [
    "https://i.ibb.co/MySXL9NQ/d5c6c379-b51e-4b4f-85e2-6ad91ae18947.webp",
    "https://i.ibb.co/xKvBYNrw/e3a412a0-b4a3-473b-b39a-f90f4af5ddc4.webp",
    "https://i.ibb.co/R4HBXRrL/e3301a0c-8bbb-4ae1-a257-5d731afd16ff.webp",
    "https://i.ibb.co/8g9FR8vN/f4d137cf-2677-4829-90a8-c4b971a3f048.webp",
    "https://i.ibb.co/yF3mWVrR/fc93081a-8e95-4b62-8181-be6886859196.webp",
    "https://i.ibb.co/S7910cS6/0da8ee09-2074-42c9-9a7b-50afccbf8534.webp",
    "https://i.ibb.co/0VyJCj9j/1c3e81ac-60bc-4259-87e1-11f32147143c.webp",
    "https://i.ibb.co/x8FcrqhP/1cc00514-b1f0-4dfd-a127-9cdb49a89fff.webp",
    "https://i.ibb.co/qLGVTjkD/2afe86f5-7df8-4370-8f1e-1d71ddec4d41.webp",
    "https://i.ibb.co/zVwJHSTb/3ca5737a-b9ab-4ac1-b744-d22445739e00.webp",
    "https://i.ibb.co/DDxYpHqf/5b3e0b12-8eeb-403c-be4f-3b938b1c77db.webp",
    "https://i.ibb.co/DHjHY63v/5c9ee2ca-6f92-40a5-a0f6-59b5e418d8fa.webp",
    "https://i.ibb.co/pBN7jhKJ/5ef52f62-4d86-4f86-90d0-4d11ecfeb64c.webp",
    "https://i.ibb.co/Vb0HkZy/8e080ff2-a942-43c3-b9d7-9c1b6bc73e5e.webp"
  ];
  const row2 = [
    "https://i.ibb.co/DhBv9C4/20ee3561-7f2c-4ffa-8d07-c7103f48d688.webp",
    "https://i.ibb.co/HDjrfGDg/29bf776b-a3b9-4f86-a069-f27171db5b11.webp",
    "https://i.ibb.co/wF2zZpxz/29e750c1-a22c-4550-893f-827a73faa29d.webp",
    "https://i.ibb.co/yc3Ndnjm/55fdd256-0e98-48b2-9562-cde787940929.webp",
    "https://i.ibb.co/d4SVX7Kb/312b7b10-1f6a-4b41-a822-54919ac514f0.webp",
    "https://i.ibb.co/Qjd46jhy/505f07ec-6f69-4446-81e7-097d6d9d65fa.webp",
    "https://i.ibb.co/mrNgsJh2/2377f121-e736-4435-a40a-fdcc24458c9d.webp",
    "https://i.ibb.co/0pXvsT3g/3873cfa6-e172-44d9-b22b-0111f798b5c2.webp",
    "https://i.ibb.co/CKGsKJwq/3958cf9e-4547-4322-a391-c4ebc294cad3.webp",
    "https://i.ibb.co/DHHvj07p/5743d7dd-5274-4b95-97d2-6d638ed1d99d.webp",
    "https://i.ibb.co/4w1Gxy8V/7989e09b-0e1f-41e1-8698-45afb2aeeec2.webp",
    "https://i.ibb.co/ZzMmHbwW/8323e6c5-7bb4-43da-9f7d-6a599526c5ed.webp",
    "https://i.ibb.co/4RCgBkdK/38820fe0-240d-40f9-ad01-dce285d6b492.webp",
    "https://i.ibb.co/RGM1b2nc/98801d33-b99a-4a4e-92b5-3b1b93fa1afd.webp"
  ];
  const row3 = [
    "https://i.ibb.co/NgjWdfDn/526857d5-c01d-48f1-b390-a8de8811dcbe.webp",
    "https://i.ibb.co/j9QVrjZg/42726269-9e28-4179-b180-d90525ed38fd.webp",
    "https://i.ibb.co/9kk0q7vM/69179655-ddcd-438a-a0d7-c819330105fe.webp",
    "https://i.ibb.co/XZJhXk0V/a8ac465d-a7ae-4574-8814-1e8aae77f2c9.webp",
    "https://i.ibb.co/bh6Jgyh/a396e73f-4abc-4023-ae2e-7628f0cc93ac.webp",
    "https://i.ibb.co/Q3q8Ndkf/b5bc0b95-bd27-477e-8a12-61854d6e33a3.webp",
    "https://i.ibb.co/Kxjqpp1p/b78cef94-1776-4c5e-89b3-1230d55865ec.webp",
    "https://i.ibb.co/B5ZgTWgM/b90db9b2-c029-4bd4-b1cf-e6ab8220b022.webp",
    "https://i.ibb.co/cKDDh6JR/b61409b6-12c0-477e-8c45-73cada3d10bf.webp",
    "https://i.ibb.co/nVRhDq6/bd9387b1-7979-4153-8370-1130ce38f131.webp",
    "https://i.ibb.co/6c0scmt6/cc23a8eb-4e00-46c7-9e01-4f4eaf9e8350.webp",
    "https://i.ibb.co/8DfzpR7x/cc32b658-7e6a-48fc-889e-d97ad72646fe.webp",
    "https://i.ibb.co/1fD5RZV8/d0e73a81-c542-4dff-b6d3-9374f1ff27c4.webp",
    "https://i.ibb.co/yB5M5GRs/d3cf9959-2d86-4070-a4d4-d4800be50e52.webp"
  ];

  const MarqueeRow = ({ images, direction = "left", speed = 40 }: { images: string[], direction?: "left" | "right", speed?: number }) => {
    return (
      <div className="flex overflow-hidden gap-4 py-2">
        <motion.div
          animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: speed }}
          className="flex gap-4 whitespace-nowrap"
        >
          {[...images, ...images].map((img, i) => {
            const widths = ["w-48", "w-64", "w-80", "w-56"];
            const width = widths[i % widths.length];
            return (
              <div key={i} className={`relative ${width} h-48 rounded-xl overflow-hidden border border-white/10 shadow-lg shrink-0`}>
                <Image src={img} alt="Team member" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4 py-8 relative">
      {/* Side Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <MarqueeRow images={row1} direction="left" speed={60} />
      <MarqueeRow images={row2} direction="right" speed={50} />
      <MarqueeRow images={row3} direction="left" speed={70} />
    </div>
  );
};

export default function WhoWeArePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div ref={containerRef} className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] py-20 flex items-center justify-center overflow-hidden border-b border-bordersubtle/20">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://i.ibb.co/JjsmyMLV/breadoflife.png"
            alt="Who We Are Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Leaf className="w-12 h-12 text-secondary mx-auto mb-8 animate-pulse" />
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.9] mb-8 uppercase tracking-tighter text-pop">
              Guided by Faith, <br />
              <span className="text-secondary italic font-normal">Nourishing</span> with Love
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-textbody max-w-2xl mx-auto leading-relaxed italic">
              "Let brotherly love continue" — Hebrews 13:1. Our mission has always been about more than food. It’s about restoring dignity, offering hope, and sharing God’s love.
            </p>
            <p className="mt-4 font-paragraph text-lg text-secondary italic max-w-xl mx-auto">
              "Then he took the five loaves and the two fishes, and looking up to heaven, he blessed them, and brake, and gave to the disciples to set before the multitude. And they did eat, and were all filled: and there was taken up of fragments that remained to them twelve baskets." — Luke 9:16-17
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Quote className="absolute -top-10 -left-10 w-20 h-20 text-secondary/10" />
            <h2 className="text-4xl md:text-5xl font-heading mb-6 italic text-secondary">
              “The Need is Great, The Need is Real.”
            </h2>
            <p className="text-xl font-heading uppercase tracking-widest opacity-60">
              — Marcia White - Whitby Specialty Food Bank
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Section with Image Overlap */}
      <section className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="inline-flex p-3 bg-secondary/10 rounded-full text-secondary mb-4">
                <History size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-heading mb-6 text-pop">Changing by Faith.</h2>
              <p className="text-lg text-textlight leading-relaxed mb-6">
                TBD
              </p>
              
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-secondary">Key Milestones</h3>
                {[
                  { year: '20xx', text: 'Opened our first standalone location.' },
                  { year: '2018', text: 'Partnered with Second Harvest to expand food rescue efforts.' },
                  { year: '2023', text: 'Distributed over 48,428 meals in six months, thanks to community support.' }
                ].map((milestone, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="text-2xl font-heading text-secondary shrink-0">{milestone.year}</div>
                    <div className="h-px bg-bordersubtle/30 flex-grow mt-4" />
                    <p className="text-textlight max-w-xs">{milestone.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm italic text-secondary/70 border-l-2 border-secondary/30 pl-4">
                "Then he took the five loaves and the two fishes, and looking up to heaven, he blessed them, and brake, and gave to the disciples to set before the multitude. And they did eat, and were all filled: and there was taken up of fragments that remained to them twelve baskets." — Luke 9:16-17
              </p>
              <p className="mt-8 text-xl font-heading italic text-secondary">
                Through each step, our focus has remained on serving with dignity and love.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-20 lg:-mr-20"
            >
              <div className="relative group max-w-lg lg:ml-auto">
                <div className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent),linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [mask-composite:intersect]">
                  <Image 
                    src="https://i.ibb.co/BVwBgYxx/crosss.jpg"
                    alt="Community history"
                    className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105 sepia-[0.6]"
                  />
                </div>
                {/* Soft Glow behind image - Brass/Tan-Green Halo */}
                <div className="absolute inset-0 bg-secondary/20 blur-[100px] -z-10 scale-150 opacity-40 group-hover:opacity-70 transition-opacity duration-1000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Serve Section */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="https://i.ibb.co/235BQRyM/why.png"
            alt="Why We Serve Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-heading mb-8 opacity-40 uppercase tracking-[0.5em] text-pop"
            >
              Why We Serve
            </motion.h2>
            <h3 className="text-4xl font-heading mb-6">Hunger is More Than a Lack of Food</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                text: "Food bank usage in the Greater Toronto Area (GTA) has reached unprecedented, record-high levels, with over 4.1 million visits recorded between April 2024 and March 2025—an 18% increase from the previous year and a 340% increase since 2019.",
                icon: <TrendingUp className="text-secondary" />,
                accent: "Record High"
              },
              {
                text: "Over 1 in 10 Torontonians now rely on food banks, with 1 in 4 clients being children and over half of surveyed households missing meals to pay for other expenses.",
                icon: <Users className="text-secondary" />,
                accent: "1 in 10 Rely"
              },
              {
                text: "In 2022, 18% of Canadian families reported experiencing some level of food insecurity, an increase from 16% in 2021.",
                icon: <AlertCircle className="text-secondary" />,
                accent: "18% Insecurity"
              },
              {
                text: "Approximately 18.7% of Ontario households faced food insecurity, reflecting a growing concern within the province.",
                icon: <AlertCircle className="text-secondary" />,
                accent: "Ontario Crisis"
              },
              {
                text: "In the fiscal year ending June 2024, food bank visits in Toronto surpassed 2.5 million, marking a 51% increase compared to the previous year.",
                icon: <TrendingUp className="text-secondary" />,
                accent: "51% Increase"
              },
              {
                text: "In 2022, 41% of female lone-parent families in Canada experienced food insecurity, underscoring significant disparities.",
                icon: <Heart className="text-secondary" />,
                accent: "Vulnerable Families"
              },
              {
                text: "Key 2024-2025 Toronto Food Bank Statistics: Total Visits: Over 4.1 million visits, representing a 340% surge since 2019.",
                icon: <TrendingUp className="text-secondary" />,
                accent: "340% Surge"
              },
              {
                text: "Monthly Average: Over 344,000 visits per month in 2025, up from ~78,000 in 2019.",
                icon: <Calendar className="text-secondary" />,
                accent: "Rising Average"
              },
              {
                text: "First-Time Clients: More than 112,000 new, first-time individuals used food banks.",
                icon: <Users className="text-secondary" />,
                accent: "New Clients"
              },
              {
                text: "Client Profile: 1 in 4 users are children, and 18% of households with children reported they went hungry at least once a week.",
                icon: <Users className="text-secondary" />,
                accent: "Child Hunger"
              },
              {
                text: "Employment & Income: Nearly 46% of food bank users live in households with at least one employed person, highlighting the gap between wages and living costs.",
                icon: <TrendingUp className="text-secondary" />,
                accent: "Working Poor"
              },
              {
                text: "Common Causes: High food prices, unaffordable housing (median rental costs of $1,300/month), and inadequate income supports.",
                icon: <AlertCircle className="text-secondary" />,
                accent: "Root Causes"
              },
              {
                text: "The situation remains a 'food insecurity emergency,' with 59% of visits coming from returning clients, indicating a long-term, structural crisis rather than temporary distress.",
                icon: <AlertCircle className="text-secondary" />,
                accent: "Emergency"
              },
              {
                text: "The 2025 Who's Hungry report emphasizes that the majority of visits are now driven by the need for consistent, recurring support.",
                icon: <BookOpen className="text-secondary" />,
                accent: "Recurring Need"
              },
              {
                type: "sources",
                title: "Data Sources & Reports",
                links: [
                  { label: "CBC News: Who's Hungry 2025", url: "https://www.cbc.ca/news/canada/toronto/whos-hungry-2025-toronto-food-banks-9.6952657" },
                  { label: "Daily Bread: Who's Hungry Report", url: "https://www.dailybread.ca/research-and-advocacy/research/whos-hungry-report/" },
                  { label: "CP24: Rising Poverty in Ontario", url: "https://www.cp24.com/local/toronto/2025/12/01/food-banks-are-breaking-under-the-weight-of-rising-poverty-in-ontario-new-report-says/" }
                ],
                icon: <BookOpen className="text-secondary" />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group p-8 rounded-2xl border transition-all duration-500 ${
                  'type' in item && item.type === 'sources' 
                    ? "bg-secondary/5 border-secondary/20 hover:bg-secondary/10 p-6" 
                    : "bg-white/5 border-white/10 hover:border-secondary/50 hover:bg-white/[0.08]"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-secondary/10 rounded-xl">
                    {item.icon}
                  </div>
                  {'accent' in item && (
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary px-3 py-1 bg-secondary/20 rounded-full border border-secondary/30 shadow-[0_0_10px_rgba(212,209,165,0.2)]">
                      {item.accent}
                    </span>
                  )}
                </div>

                {'type' in item && item.type === 'sources' ? (
                  <div>
                    <h4 className="font-heading text-lg mb-4 text-primary-foreground">{item.title}</h4>
                    <div className="flex flex-col gap-3">
                      {item.links.map((link, li) => (
                        <a 
                          key={li}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-black/20 rounded-xl border border-white/5 hover:border-secondary/30 hover:bg-black/40 transition-all group/link"
                        >
                          <ExternalLink size={12} className="text-secondary shrink-0 group-hover/link:scale-110 transition-transform" />
                          <span className="text-xs text-textbody group-hover/link:text-secondary transition-colors line-clamp-1">{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-textbody leading-relaxed text-lg italic font-paragraph">
                    {item.text.includes(':') ? (
                      <>
                        <span className="font-bold text-primary-foreground not-italic">{item.text.split(':')[0]}:</span>
                        {item.text.split(':').slice(1).join(':')}
                      </>
                    ) : (
                      item.text
                    )}
                  </p>
                )}
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-2xl pointer-events-none" />
              </motion.div>
            ))}
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h4 className="text-2xl font-heading text-secondary mb-6">AT BFBOW.</h4>
            <p className="text-2xl text-textbody leading-relaxed">
              We believe in addressing these challenges with compassion, providing not only meals but also a sense of belonging and care. Every meal shared is a step toward breaking the cycle of poverty.
            </p>
            <p className="mt-6 text-xl italic text-secondary/80 font-heading">
              "Because I delivered the poor that cried, and the fatherless, and him that had none to help him. The blessing of him that was ready to perish came upon me: and I caused the widow's heart to sing for joy." — Job 29:12-13
            </p>
          </div>
        </div>
      </section>

      {/* Faith Section with Slanted Split */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{ background: 'linear-gradient(110deg, #3A4A3A 50%, #243124 50.5%)' }}
      >
        {/* Soft Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-secondary font-heading text-xl mb-8 opacity-80 uppercase tracking-[0.2em]"
            >
              "And do not forget to do good and to share with others, for with such sacrifices God is pleased"
              <br />
              <span className="text-sm mt-4 block">— Hebrews 13:16</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-heading mb-8 text-pop">Faith That Moves Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-heading text-secondary italic">Guided by Faith, Empowered by Action</h3>
              <p className="text-textlight leading-relaxed">
                Our work is inspired by the teachings of Christ and the belief that faith without action is incomplete. At our Belleville Food Bank On Wheels, we turn prayer into purpose and love into service. Every box packed, every meal shared, and every life touched is a testament to God’s calling.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-heading text-secondary italic">Faith in Action, Love in Every Meal</h3>
              <p className="text-textlight leading-relaxed">
                We believe that true faith is demonstrated through serving others. That’s why our programs are rooted in compassion and inclusivity, offering:
              </p>
              <ul className="space-y-4 text-sm text-textlight">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary" /> Over 48,428 meals distributed in the last six months.</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary" /> 516,813 pounds of rescued food repurposed.</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary" /> Programs for children, seniors, and the homeless.</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-heading text-secondary italic">Welcoming Everyone With Open Hearts</h3>
              <p className="text-textlight leading-relaxed">
                Inspired by Proverbs 19:17 “Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done.”—we serve all people, regardless of background, faith, or circumstance.
              </p>
              <p className="text-textlight italic">
                We’ve built a community where no one feels alone, and every act of service reflects the unconditional love of Christ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteers Section */}
      <section className="relative py-24 bg-primary text-primary-foreground mb-24">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="https://i.ibb.co/NgRFZ4gn/IMG-5076-Copy.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-secondary mb-6">Volunteers Making The Difference</h3>
              <h2 className="text-4xl md:text-6xl font-heading mb-8 leading-tight">Powered by Volunteer Spirit</h2>
              <p className="text-2xl text-textbody mb-10 leading-relaxed">
                Be Apart of Something Bigger. Our volunteers are the backbone of everything we do:
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-secondary/20 rounded-xl text-secondary">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading text-white mb-2">850+ hours</h4>
                    <p className="text-textbody">Contributed weekly to sorting, packing, and distributing food.</p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-secondary/20 rounded-xl text-secondary">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading text-white mb-2">3,000+ Families</h4>
                    <p className="text-textbody">Volunteers ensure these families receive the support they need each week.</p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-secondary/20 rounded-xl text-secondary">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading text-white mb-2">Strengthening Community</h4>
                    <p className="text-textbody">Every act of service strengthens our community and shares hope with those in need.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://i.ibb.co/VWpfMp5x/vs.png"
                alt="Volunteers working together"
                className="w-full h-full auto block opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dedicated Team Section */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="https://i.ibb.co/8gtLwMHZ/colalgebg.jpg"
            alt="Team Background"
            className="w-full h-full object-contain object-top brightness-110 contrast-110"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-heading mb-4 text-primary-foreground">Our Dedicated Team</h2>
              <h3 className="text-2xl font-heading text-secondary italic mb-8">The Hearts Behind the Mission</h3>
              <p className="text-xl text-textbody max-w-3xl mx-auto leading-relaxed mb-12">
                At our Belleville Food Bank On Wheels, our team is united by a shared passion for service. From our leadership to our volunteers, every member brings dedication, compassion, and faith to their role. Together, we make a difference every day.
              </p>
            </motion.div>
          </div>
          
          <TeamMarquee />
          
          <p className="mt-8 text-center text-textbody italic font-paragraph text-lg">
            United by faith, driven by compassion, and dedicated to serving our community with love.
          </p>
        </div>
      </section>
    </div>
  );
}
