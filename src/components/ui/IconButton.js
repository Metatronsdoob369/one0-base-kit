import { jsx as _jsx } from "react/jsx-runtime";
import { playLockSound } from '@/lib/utils';
/**
 * IconButton - A button with a brushed metallic background, engraved icon, and neon hover effect.
 * - Pass any SVG icon as the `icon` prop.
 * - Neon engraving appears on hover.
 */
const IconButton = ({ icon, onClick, ariaLabel, className, playSound = true }) => {
    const handleClick = () => {
        if (playSound) {
            playLockSound();
        }
        if (onClick) {
            onClick();
        }
    };
    return (_jsx("button", { className: `icon-btn-metallic ${className || ''}`, onClick: handleClick, "aria-label": ariaLabel, type: "button", children: _jsx("span", { className: "icon-btn-inner", children: icon }) }));
};
export default IconButton;
