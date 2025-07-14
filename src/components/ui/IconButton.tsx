import React from 'react';
import { playLockSound } from '@/lib/utils';

interface IconButtonProps {
  icon: React.ReactNode; // SVG icon component or element
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  playSound?: boolean; // New prop to control sound
}

/**
 * IconButton - A button with a brushed metallic background, engraved icon, and neon hover effect.
 * - Pass any SVG icon as the `icon` prop.
 * - Neon engraving appears on hover.
 */
const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, ariaLabel, className, playSound = true }) => {
  const handleClick = () => {
    if (playSound) {
      playLockSound();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`icon-btn-metallic ${className || ''}`}
      onClick={handleClick}
      aria-label={ariaLabel}
      type="button"
    >
      <span className="icon-btn-inner">{icon}</span>
    </button>
  );
};

export default IconButton;

// --- CSS (add to your CSS module or global styles) ---
// .icon-btn-metallic {
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   width: 56px;
//   height: 56px;
//   border-radius: 50%;
//   border: none;
//   background: linear-gradient(120deg, #bfc3c7 0%, #6e7074 100%);
//   box-shadow: 0 4px 24px 0 rgba(0,0,0,0.25), 0 1.5px 0 #fff inset;
//   position: relative;
//   overflow: hidden;
//   cursor: pointer;
//   transition: box-shadow 0.2s, background 0.2s;
// }
// .icon-btn-metallic:before {
//   content: '';
//   position: absolute;
//   inset: 0;
//   background: repeating-linear-gradient(120deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 8px);
//   pointer-events: none;
//   z-index: 1;
// }
// .icon-btn-inner {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 2;
// }
// .icon-btn-inner svg {
//   width: 28px;
//   height: 28px;
//   fill: none;
//   stroke: #bfc3c7;
//   stroke-width: 2.2;
//   filter: drop-shadow(0 1px 0 #fff8) drop-shadow(0 -1px 0 #0004);
//   transition: stroke 0.2s, filter 0.2s;
// }
// .icon-btn-metallic:hover .icon-btn-inner svg {
//   stroke: #fff;
//   filter: drop-shadow(0 0 8px #fff) drop-shadow(0 0 2px #aef6ff);
// }
// .icon-btn-metallic:active {
//   box-shadow: 0 2px 8px 0 rgba(0,0,0,0.35), 0 1.5px 0 #fff inset;
//   background: linear-gradient(120deg, #aeb2b6 0%, #5e6064 100%);
// } 