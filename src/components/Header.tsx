import { Link, useLocation } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/communities', label: 'Communities' },
    { path: '/pet-map', label: 'Pet Map' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/resources', label: 'Resources' },
    { path: '/vets', label: 'Vets' },
  ];

  return (
    <header className="bg-background border-b border-secondary/20 sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl lg:text-3xl text-foreground hover:opacity-80 transition-opacity">
            PetConnect
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-base text-foreground hover:opacity-70 transition-opacity ${
                  location.pathname === link.path ? 'opacity-100' : 'opacity-80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
            ) : isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                    <User className="w-4 h-4 mr-2" />
                    {member?.profile?.nickname || 'Profile'}
                  </Button>
                </Link>
                <Button
                  onClick={actions.logout}
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                onClick={actions.login}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-secondary/20">
            <nav className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-paragraph text-base text-foreground hover:opacity-70 transition-opacity ${
                    location.pathname === link.path ? 'opacity-100' : 'opacity-80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              {isLoading ? (
                <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
              ) : isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-foreground text-foreground hover:bg-foreground hover:text-background">
                      <User className="w-4 h-4 mr-2" />
                      {member?.profile?.nickname || 'Profile'}
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      actions.logout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-foreground text-foreground hover:bg-foreground hover:text-background"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    actions.login();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
