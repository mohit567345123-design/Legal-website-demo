import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Scale, Phone, Mail, MapPin, Clock, Menu, X, ChevronRight, Quote, Star } from 'lucide-react';
import { PRACTICE_AREAS, ATTORNEYS, TESTIMONIALS, OFFICE_HOURS, CONTACT_INFO } from './constants';
import { ContactModal } from './components/ContactModal';

const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Scale className={isScrolled ? 'text-navy-900' : 'text-white'} size={32} />
          <div className={`font-serif font-bold text-xl leading-tight ${isScrolled ? 'text-navy-900' : 'text-white'}`}>
            Anderson & Cole <span className="block text-xs font-sans tracking-widest uppercase opacity-70">Legal Firm</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Practice Areas', 'Our Attorneys', 'Why Choose Us', 'Testimonials'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-navy-900 hover:text-gold-500' : 'text-white/80 hover:text-white'
              }`}
            >
              {item}
            </a>
          ))}
          <button
            onClick={onContactClick}
            className="bg-gold-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gold-500/90 transition-all shadow-lg hover:shadow-gold-500/20"
          >
            Contact Us
          </button>
        </div>

        <button 
          className="md:hidden text-navy-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? 'text-navy-900' : 'text-white'} />}
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onContactClick }: { onContactClick: () => void }) => (
  <section className="relative h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1920"
        alt="Law Office"
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-navy-900/70" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <span className="inline-block text-gold-500 font-bold tracking-widest uppercase text-sm mb-4">
          Established Excellence
        </span>
        <h1 className="text-5xl md:text-7xl text-white font-bold mb-6 leading-tight">
          Trusted Legal Representation When You Need It Most
        </h1>
        <p className="text-xl text-white/80 mb-10 leading-relaxed">
          Anderson & Cole Legal provides experienced legal counsel for individuals and businesses across California. We fight for your rights with integrity and precision.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onContactClick}
            className="bg-gold-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-500/90 transition-all shadow-xl"
          >
            Schedule Consultation
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
            Learn More
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const PracticeAreas = () => (
  <section id="practice-areas" className="py-24 bg-navy-900/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Our Practice Areas</h2>
        <div className="w-20 h-1 bg-gold-500 mx-auto mb-6" />
        <p className="text-navy-900/60 max-w-2xl mx-auto">
          We specialize in a wide range of legal fields, providing expert representation tailored to your unique situation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRACTICE_AREAS.map((area, i) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group border border-navy-900/5"
          >
            <div className="w-14 h-14 bg-navy-900/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-navy-900 group-hover:text-white transition-colors">
              <ChevronRight size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{area.title}</h3>
            <p className="text-navy-900/60 leading-relaxed mb-6">
              {area.description}
            </p>
            <a href="#" className="inline-flex items-center text-gold-500 font-bold hover:gap-2 transition-all">
              Learn More <ChevronRight size={18} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Attorneys = () => (
  <section id="our-attorneys" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Our Attorneys</h2>
        <div className="w-20 h-1 bg-gold-500 mx-auto mb-6" />
        <p className="text-navy-900/60 max-w-2xl mx-auto">
          Meet the dedicated legal professionals who will be advocating for your interests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {ATTORNEYS.map((attorney, i) => (
          <motion.div
            key={attorney.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
              <img
                src={attorney.image}
                alt={attorney.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-navy-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm font-bold uppercase tracking-widest mb-1">{attorney.specialty}</p>
                  <p className="text-xs opacity-80">{attorney.experience}</p>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">{attorney.name}</h3>
            <p className="text-gold-500 font-medium text-sm">{attorney.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section id="why-choose-us" className="py-24 bg-navy-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            The Anderson & Cole Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Why Clients Trust Our Legal Expertise
          </h2>
          
          <div className="space-y-6">
            {[
              { title: '20+ Years Combined Experience', desc: 'Our partners bring decades of specialized knowledge to every case.' },
              { title: '1000+ Successful Cases', desc: 'A proven track record of securing favorable outcomes for our clients.' },
              { title: 'Free Initial Consultation', desc: 'Discuss your case with us at no cost and understand your legal options.' },
              { title: 'Client-First Approach', desc: 'We prioritize your needs and maintain open communication throughout.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center shrink-0">
                  <Star size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800"
            alt="Legal Gavel"
            className="rounded-2xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 bg-gold-500 p-8 rounded-2xl shadow-xl hidden md:block">
            <p className="text-4xl font-bold mb-1">98%</p>
            <p className="text-sm font-bold uppercase tracking-widest">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-navy-900/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
        <div className="w-20 h-1 bg-gold-500 mx-auto mb-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-navy-900/5 relative"
          >
            <Quote className="text-gold-500/20 absolute top-6 right-6" size={48} />
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-gold-500 text-gold-500" />)}
            </div>
            <p className="text-navy-900/70 italic mb-6 leading-relaxed">"{t.text}"</p>
            <p className="font-bold text-navy-900">— {t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-navy-900 text-white pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Scale className="text-gold-500" size={32} />
            <div className="font-serif font-bold text-xl leading-tight">
              Anderson & Cole <span className="block text-xs font-sans tracking-widest uppercase opacity-70">Legal Firm</span>
            </div>
          </div>
          <p className="text-white/60 leading-relaxed mb-6">
            Providing expert legal representation with a commitment to justice and client success across California.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-white/60">
              <MapPin size={20} className="text-gold-500 shrink-0" />
              <span>{CONTACT_INFO.address}</span>
            </li>
            <li className="flex gap-3 text-white/60">
              <Phone size={20} className="text-gold-500 shrink-0" />
              <span>{CONTACT_INFO.phone}</span>
            </li>
            <li className="flex gap-3 text-white/60">
              <Mail size={20} className="text-gold-500 shrink-0" />
              <span>{CONTACT_INFO.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Office Hours</h4>
          <ul className="space-y-4">
            <li className="flex justify-between text-white/60">
              <span>Mon – Fri</span>
              <span>{OFFICE_HOURS.weekdays}</span>
            </li>
            <li className="flex justify-between text-white/60">
              <span>Saturday</span>
              <span>{OFFICE_HOURS.saturday}</span>
            </li>
            <li className="flex justify-between text-white/60">
              <span>Sunday</span>
              <span>{OFFICE_HOURS.sunday}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Newsletter</h4>
          <p className="text-white/60 mb-4 text-sm">Stay updated with legal news and insights.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-gold-500"
            />
            <button className="bg-gold-500 text-white p-2 rounded-lg hover:bg-gold-500/90">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Anderson & Cole Legal. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onContactClick={() => setIsContactOpen(true)} />
      <main>
        <Hero onContactClick={() => setIsContactOpen(true)} />
        <PracticeAreas />
        <Attorneys />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
