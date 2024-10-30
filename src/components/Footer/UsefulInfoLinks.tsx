// components/footer/UsefulInfoLinks.tsx
import React from "react";
import footerLinksData from "../../constants/footer";

const UsefulInfoLinks: React.FC = () => {
  return (
    <ul className="space-y-2 text-gray-400 mt-2">
      {footerLinksData.usefulInfoLinks.links.map((link, index) => (
        <li key={index}>
          <a target="_blank" href={link.url} className="hover:text-white">
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default UsefulInfoLinks;
