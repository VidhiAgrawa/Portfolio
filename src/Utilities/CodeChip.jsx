import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

export default function CodeChip({
  id,
  code,
  initialPos = { top: '50%', left: '50%' },
  zIndex = 10,
  onBringToFront,
}) {
  const chipRef = useRef(null);
  const onBringToFrontRef = useRef(onBringToFront);
  onBringToFrontRef.current = onBringToFront;

  useEffect(() => {
    if (!chipRef.current) return;

    const draggableInstance = Draggable.create(chipRef.current, {
      type: 'x,y',
      cursor: 'grab',
      activeCursor: 'grabbing',
      allowEventDefault: true,
      onPress: function () {
        if (chipRef.current) {
          chipRef.current.style.zIndex = 9999;
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
    if (chipRef.current) {
      chipRef.current.style.zIndex = zIndex;
    }
  }, [zIndex]);

  return (
    <div
      ref={chipRef}
      style={{
        top: initialPos.top,
        left: initialPos.left,
        zIndex: zIndex,
        position: 'absolute',
        touchAction: 'none',
      }}
      className="select-none cursor-grab active:cursor-grabbing pointer-events-auto"
    >
      <div className="glass-chip px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-md sm:rounded-lg text-zinc-300 font-mono-code text-[10px] sm:text-xs tracking-wider shadow-lg hover:text-[#D4FF00] hover:border-[#D4FF00]/50 transition-transform duration-200 hover:scale-105 active:scale-95 animate-float-bob whitespace-nowrap">
        {code}
      </div>
    </div>
  );
}
