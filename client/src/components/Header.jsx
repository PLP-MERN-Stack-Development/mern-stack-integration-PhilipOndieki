import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  return (
    <header className="bg-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Mindful Haven Logo" className="h-8 w-auto" />
            <Link to="/" className="text-2xl font-bold text-gray-800 ml-2">
              Mindful Haven
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <Link to="/about" className="text-gray-600 hover:text-gray-800 px-3 py-2">About</Link>
            <Link to="/features" className="text-gray-600 hover:text-gray-800 px-3 py-2">Features</Link>
            <Link to="/enterprise" className="text-gray-600 hover:text-gray-800 px-3 py-2">Enterprise</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-800 px-3 py-2">Pricing</Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-800 px-3 py-2">Blog</Link>
          </div>
          <div className="flex items-center">
            <SignedOut>
              <div className="hidden md:flex items-center">
                <SignInButton mode="modal">
                  <button className="text-gray-600 hover:text-gray-800 px-3 py-2">Sign in</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-gray-800 text-white rounded-md px-4 py-2 ml-4 hover:bg-gray-700">Get in touch</button>
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
