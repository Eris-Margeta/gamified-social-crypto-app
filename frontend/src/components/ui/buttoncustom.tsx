import  { ReactNode } from 'react';
import stickerBombImage from '@/assets/stickerbomb.webp';

interface ButtonWithBackgroundProps {
  children: ReactNode;
}

export const ButtonWithBackground = ({ children }: ButtonWithBackgroundProps) => (
  <a
    href="https://midnightapes.com"
    target="_blank"
    rel="noopener noreferrer"
    className="relative animate-glowslo text-white font-bold  mt-[25vh] px-4 rounded-xl focus:outline-none focus:shadow-outline mx-auto block transition-colors  w-full pl-6 pr-6 py-4 inset-0"
    style={{
      zIndex: 1,
    }}
  >
 
    <span 
      className="absolute top-0 left-0 right-0 bottom-0 rounded-xl w-full pl-6 pr-6 py-4 inset-0" 
      style={{
        backgroundImage: `url(${stickerBombImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(25%)',
        zIndex: -1,
      }}
    />
   
    <span className="relative z-10">
      {children}
    </span>
  </a>
);
