import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

export default function FloatingCard({
  id,
  title,
  subtitle,
  icon: Icon,
  initialPos = { top: '20%', left: '10%' },
  zIndex = 10,
  onBringToFront,
}) {
  const cardRef = useRef(null);
  const onBringToFrontRef = useRef(onBringToFront);
  onBringToFrontRef.current = onBringToFront;

  useEffect(() => {
    if (!cardRef.current) return;

    const draggableInstance = Draggable.create(cardRef.current, {
      type: 'x,y',
      cursor: 'grab',
      activeCursor: 'grabbing',
      onPress: function () {
        if (cardRef.current) {
          cardRef.current.style.zIndex = 9999;
        }
        if (onBringToFrontRef.current) {
          onBringToFrontRef.current(id);
        }
      },
    });

    return () => {
      if (draggableInstance[0]) draggableInstance[0].kill();
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
      style={{
        top: initialPos.top,
        left: initialPos.left,
        zIndex: zIndex,
        position: 'absolute',
      }}
      className="select-none cursor-grab active:cursor-grabbing pointer-events-auto"
    >
      <div className="glass-card px-5 py-4 rounded-xl flex items-center space-x-4 shadow-2xl transition-transform duration-200 hover:scale-105 active:scale-95 group animate-float-bob">
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/40 flex items-center justify-center text-[#D4FF00] group-hover:bg-[#D4FF00]/20 transition-colors shadow-[0_0_10px_rgba(212,255,0,0.15)]">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <div>
          <div className="font-display font-extrabold text-base md:text-lg text-white tracking-wide flex items-center space-x-2">
            <span>{title}</span>
          </div>
          {subtitle && (
            <div className="font-mono-code text-[10px] tracking-widest text-[#D4FF00]/80 uppercase mt-0.5">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
