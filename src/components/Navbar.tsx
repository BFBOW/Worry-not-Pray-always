import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <header className="bg-primary border-b border-bordersubtle sticky top-0 z-40">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://i.ibb.co/JFr2RG02/logwithfiler50.png" 
                alt="Belleville Food Bank Logo" 
                className="h-12 w-auto"
                referrerPolicy="no-referrer"
              />
              <div className="font-heading text-2xl lg:text-3xl text-primary-foreground hidden sm:block">
                Belleville Food Bank On Wheels
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                className="font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/events" 
                className="font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Events
              </Link>
              <Link 
                to="/spirit" 
                className="font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Food for the Spirit
              </Link>
              <div className="relative group">
                <Link 
                  to="/find-support" 
                  className="font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors flex items-center gap-1"
                >
                  Find Support
                </Link>
                <div className="absolute left-0 top-full pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                  <div className="bg-primary border border-bordersubtle shadow-2xl rounded-sm py-2 min-w-[220px]">
                    <Link to="/find-support" className="block px-6 py-3 text-sm text-textbody hover:text-secondary hover:bg-white/5 transition-colors border-b border-white/5">Find Support Sign-up</Link>
                    <Link to="/find-support/specialized" className="block px-6 py-3 text-sm text-textbody hover:text-secondary hover:bg-white/5 transition-colors">Holistic Care Requests</Link>
                  </div>
                </div>
              </div>
              <Link 
                to="/who-we-are" 
                className="font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Who We Are
              </Link>
              <Link 
                to="/join-mission" 
                className="font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Join Our Mission
              </Link>
              <Link 
                to="/donate" 
                className="font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Donate
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-textbody hover:text-primary-foreground transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden py-6 space-y-4 border-t border-bordersubtle">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors py-2"
              >
                Home
              </Link>
              <Link 
                to="/events" 
                onClick={() => setIsMenuOpen(false)}
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors py-2"
              >
                Events
              </Link>
              <Link 
                to="/spirit" 
                onClick={() => setIsMenuOpen(false)}
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors py-2"
              >
                Food for the Spirit
              </Link>
              <Link 
                to="/find-support" 
                onClick={() => setIsMenuOpen(false)}
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors py-2"
              >
                Find Support
              </Link>
              <Link 
                to="/who-we-are" 
                onClick={() => setIsMenuOpen(false)}
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors py-2"
              >
                Who We Are
              </Link>
              <Link 
                to="/join-mission" 
                onClick={() => setIsMenuOpen(false)}
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors py-2"
              >
                Join Our Mission
              </Link>
              <Link 
                to="/donate" 
                onClick={() => setIsMenuOpen(false)}
                className="block font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors py-2"
              >
                Donate
              </Link>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
