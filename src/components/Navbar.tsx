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
              <Link 
                to="/find-support" 
                className="font-paragraph text-base text-textbody hover:text-primary-foreground transition-colors"
              >
                Find Support
              </Link>
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
              <Link 
                to="/enhancements" 
                className="font-paragraph text-base text-secondary hover:text-secondary/80 transition-colors font-heading italic"
              >
                Enhancements
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
              <Link 
                to="/enhancements" 
                onClick={() => setIsMenuOpen(false)}
                className="block font-paragraph text-base text-secondary hover:text-secondary/80 transition-colors py-2 font-heading italic"
              >
                Enhancements
              </Link>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
