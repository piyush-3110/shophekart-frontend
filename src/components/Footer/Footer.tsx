// components/footer/Footer.tsx
import React from 'react';
import Newsletter from './Newsletter';
import FooterInfo from './FooterInfo';
import HomeLinks from './HomeLinks';
import UsefulInfoLinks from './UsefulInfoLinks';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white px-4  md:px-16">
      <Newsletter />
      <div className="flex justify-between flex-wrap items-start gap-5 md:gap-0  py-6 mx-auto ">
        <div>
        <FooterInfo />
        </div>
        <div>
        <h4 className="font-semibold text-white">HOME</h4>
        <HomeLinks />
      </div>
    <div>
      <h4 className="font-semibold text-white">USEFUL INFORMATION</h4>
        <UsefulInfoLinks/>
      </div>

      </div>
    </footer>
  );
};

export default Footer;
