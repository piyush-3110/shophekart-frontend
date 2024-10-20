// components/footer/HomeLinks.tsx
import React from 'react';
import footerLinksData from '../../constants/footer';

const HomeLinks: React.FC = () => {
  return (
    <ul className="space-y-2 text-gray-400 mt-2">
      {footerLinksData.homeLinks.links.map((link, index) => (
        <li key={index}>
          <a href={link.url} className="hover:text-white">{link.text}</a>
        </li>
      ))}
    </ul>
  );
};

export default HomeLinks;
