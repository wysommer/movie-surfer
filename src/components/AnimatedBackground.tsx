"use client"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute inset-0 animate-gradient"
        style={{
          backgroundImage: 'linear-gradient(-45deg, #f97316, #fef3c7, #fdba74, #fff8f3)',
          backgroundSize: '300% 300%',
        }}
      />
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid" />
    </div>
  )
} 