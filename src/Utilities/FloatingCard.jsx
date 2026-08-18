import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

const FloatingCard = React.memo(function FloatingCard({
  id,
  title,
  subtitle,
  icon: Icon,
  initialPos = { top: '20%', left: '10%' },
  zIndex = 10,
  onBringToFront,
  onDoubleClick,
  className = '',
}) {
  const cardRef = useRef(null);
  const onBringToFrontRef = useRef(onBringToFront);
  onBringToFrontRef.current = onBringToFront;

  useEffect(() => {
    if (!cardRef.current) return;

    let draggableInstance = null;
    const animId = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      draggableInstance = Draggable.create(cardRef.current, {
        type: 'x,y',
        cursor: 'grab',
        activeCursor: 'grabbing',
        allowEventDefault: true,
        onPress: function () {
          if (cardRef.current) {
            cardRef.current.style.zIndex = 9999;
          }
          if (onBringToFrontRef.current) {
            onBringToFrontRef.current(id);
          }
        },
      });
    });

    return () => {
      cancelAnimationFrame(animId);
      if (draggableInstance && draggableInstance[0]) {
        draggableInstance[0].kill();
      }
    };
  }, [id]);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.zIndex = zIndex;
    }
  }, [zIndex]);

  return (
    <div
      ref={cardRef}
      onDoubleClick={onDoubleClick}
      style={{
        position: 'absolute',
        top: initialPos.top,
        left: initialPos.left,
        zIndex,
      }}
      className={`home-card glass-card px-3 sm:px-4 py-2 sm:py-3 rounded-2xl cursor-grab active:cursor-grabbing select-none flex items-center space-x-2.5 sm:space-x-3 pointer-events-auto hover:border-[#D4FF00]/60 transition-all duration-200 shadow-[0_4px_25px_rgba(0,0,0,0.5)] group gpu-accelerated ${className}`}
    >
      {/* <div className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse shrink-0" /> */}

      <div className="flex items-center space-x-2">
        {Icon && (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00] group-hover:scale-105 transition-transform shrink-0">
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        )}

        <div>
          <div className="font-display font-extrabold text-xs sm:text-base md:text-lg text-white tracking-wide flex items-center space-x-2 whitespace-nowrap">
            <span>{title}</span>
          </div>
          {subtitle && (
            <div className="font-mono-code text-[9px] sm:text-[10px] tracking-widest text-[#D4FF00]/80 uppercase mt-0.5 whitespace-nowrap">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* On-Hover Interactive UX Tooltip Hint */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap bg-black/95 text-[#D4FF00] border border-[#D4FF00]/50 font-mono-code text-[9px] font-bold px-2.5 py-0.5 rounded-lg shadow-2xl z-50 flex items-center space-x-1">
        <span>DOUBLE-CLICK TO OPEN ↗</span>
      </div>
    </div>
  );
});

export default FloatingCard;
