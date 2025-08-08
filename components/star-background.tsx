"use client"
import { useEffect, useState } from "react"

// Deterministic pseudo-random number generator using seed
function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate deterministic star positions
function generateStars(count: number, seed: number = 42) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(seededRandom(seed + i * 2) * 2000);
    const y = Math.floor(seededRandom(seed + i * 2 + 1) * 2000);
    stars.push(`${x}px ${y}px #FFF`);
  }
  return stars.join(', ');
}

export default function StarBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate stars with fixed seeds for consistency
  const smallStars = generateStars(700, 42);
  const mediumStars = generateStars(200, 142);
  const largeStars = generateStars(100, 242);

  if (!isClient) {
    return (
      <div className="star-background">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        
        <style jsx global>{`
          .star-background {
            position: absolute;
            inset: 0;
            overflow: hidden;
            background: #000000;
            z-index: 0;
          }
          
          #stars, #stars2, #stars3 {
            opacity: 0;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="star-background">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      
      <style jsx global>{`
        /* Star Background Animation */
        .star-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #000000;
          z-index: 0;
        }

        #stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: ${smallStars};
          animation: animStar 50s linear infinite;
        }

        #stars:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: ${smallStars};
        }

        #stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: ${mediumStars};
          animation: animStar 100s linear infinite;
        }

        #stars2:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: ${mediumStars};
        }

        #stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: ${largeStars};
          animation: animStar 150s linear infinite;
        }

        #stars3:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: ${largeStars};
        }

        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </div>
  )
}
