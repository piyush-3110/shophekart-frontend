import Marquee from 'react-fast-marquee';
import Image from 'next/image';

const logos = [
  '/images/homepage/partners/logo1.png',
  '/images/homepage/partners/logo2.png',
  '/images/homepage/partners/logo3.png',
  '/images/homepage/partners/logo4.png',
  '/images/homepage/partners/logo5.png',
  '/images/homepage/partners/logo6.png',
];

const MarqueeComp: React.FC = () => {
  return (
    <div className="bg-black h-[15vh] w-full flex items-center overflow-hidden">
      <Marquee
        gradient={false} // Disable gradient effect
        speed={120} // Adjust speed here
        pauseOnHover={true} // Pause on hover
      >
        {logos.map((logo, index) => (
          <div key={index} className="flex-shrink-0  mx-12">
            <Image src={logo} alt={`Partner Logo ${index + 1}`} className='w-32' width={128} height={80} />
          </div>
        ))}
        {logos.map((logo, index) => (
          <div key={index + 6} className="flex-shrink-0 mx-12">
            <Image src={logo} alt={`Partner Logo ${index + 1}`} className='w-32' width={128} height={80} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeComp;
