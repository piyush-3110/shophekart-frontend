import Marquee from 'react-fast-marquee';
import Image from 'next/image';

const logos = [
  '/images/homepage/Partners/logo1.png',
  '/images/homepage/Partners/logo2.png',
  '/images/homepage/Partners/logo3.png',
  '/images/homepage/Partners/logo4.png',
  '/images/homepage/Partners/logo5.png',
  '/images/homepage/Partners/logo6.png',
  '/images/homepage/Partners/logo7.jpg',

];

const MarqueeComp: React.FC = () => {
  return (
    <div className="bg-black h-fit py-4 relative z-[2] w-full flex items-center overflow-hidden">
      <Marquee
        gradient={false} // Disable gradient effect
        speed={120} // Adjust speed here
        pauseOnHover={true} // Pause on hover
      >
        {logos.map((logo, index) => (
          <div key={index} className="flex-shrink-0 mx-4  md:mx-12">
            <Image src={logo} alt={`Partner Logo ${index + 1}`} className='md:w-32 w-24' width={128} height={80} />
          </div>
        ))}
        {logos.map((logo, index) => (
          <div key={index + 6} className="flex-shrink-0 mx-4 md:mx-12">
            <Image src={logo} alt={`Partner Logo ${index + 1}`} className='md:w-32 w-24' width={128} height={80} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeComp;
