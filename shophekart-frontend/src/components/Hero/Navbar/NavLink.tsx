import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a href={href} className="text-black hover:text-blue-500">
      {children}
    </a>
  );
};

export default NavLink;