import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-secondary/20 mt-auto">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl text-foreground mb-4">PetConnect</h3>
            <p className="font-paragraph text-base text-foreground/80">
              Connecting pet owners worldwide through shared experiences and community support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/communities" className="font-paragraph text-base text-foreground/80 hover:text-foreground transition-colors">
                Communities
              </Link>
              <Link to="/pet-map" className="font-paragraph text-base text-foreground/80 hover:text-foreground transition-colors">
                Pet Map
              </Link>
              <Link to="/gallery" className="font-paragraph text-base text-foreground/80 hover:text-foreground transition-colors">
                Gallery
              </Link>
              <Link to="/resources" className="font-paragraph text-base text-foreground/80 hover:text-foreground transition-colors">
                Resources
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading text-xl text-foreground mb-4">Support</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="font-paragraph text-base text-foreground/80 hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="font-paragraph text-base text-foreground/80 hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link to="/privacy" className="font-paragraph text-base text-foreground/80 hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="font-paragraph text-base text-foreground/80 hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-xl text-foreground mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-foreground rounded-full flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-foreground rounded-full flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-foreground rounded-full flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@petconnect.com"
                className="w-10 h-10 border border-foreground rounded-full flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary/20 text-center">
          <p className="font-paragraph text-sm text-foreground/70">
            © {new Date().getFullYear()} PetConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
