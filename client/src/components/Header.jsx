import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  return (
    <header className="bg-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Mindful Haven" className="h-10 w-10" />
            <Link to="/" className="text-xl font-semibold text-gray-900 tracking-tight">
              Mindful Haven
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-primary p-3 transition-colors">About</Link>
            <Link to="/features" className="text-sm font-medium text-gray-600 hover:text-primary p-3 transition-colors">Features</Link>
            <Link to="/enterprise" className="text-sm font-medium text-gray-600 hover:text-primary p-3 transition-colors">Enterprise</Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-primary p-3 transition-colors">Pricing</Link>
            <Link to="/blog" className="text-sm font-medium text-gray-600 hover:text-primary p-3 transition-colors">Blog</Link>
          </div>
          <div className="flex items-center">
            <SignedOut>
              <div className="hidden md:flex items-center">
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-gray-600 hover:text-primary p-3  transition-colors">Sign in</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-primary text-white text-sm font-medium rounded-full px-6 py-2.5 hover:bg-primary-dark transition-all shadow-sm">Get in touch</button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <div className="md:hidden">
              {/* Mobile menu button */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
