import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto px-6 py-4">
        <div className="text-center text-gray-600">
          © {new Date().getFullYear()} Mindful Haven. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
