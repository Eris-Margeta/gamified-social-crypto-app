import { useEffect, useRef } from "react";
import closedDoorsImage from "@/assets/myr-entry.png";
import "@/styles/myr-entry-overlay.css";

interface MyrEntryOverlayProps {
  className?: string;
  startFadeOut: boolean;
}

export const MyrEntryOverlay = ({ className, startFadeOut }: MyrEntryOverlayProps) => {
  const overlayRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (startFadeOut) {

      document.body.style.overflow = "hidden";

      const fadeOutTimer = setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.transition = "opacity 0.5s";
          overlayRef.current.style.opacity = "0";
        }
      
      }, 1500);

      return () => {
        clearTimeout(fadeOutTimer);
   
      };
    }
  }, [startFadeOut]);

  return (
    <img
      ref={overlayRef}
      src={closedDoorsImage}
      alt="Closed Doors"
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 15,
        opacity: "1",
      }}
    />
  );
};
