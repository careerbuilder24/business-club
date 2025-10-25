
// 'use client';

// import React from "react";
// import Image from "next/image";

// export default function ConnectedCompany() {
//   const logos = [
//     "https://i.postimg.cc/BvH72Q76/sources.png",
//     "https://i.postimg.cc/vHB7jPkr/cheaphost.png",
//     "https://i.postimg.cc/qR4yGQ2C/barzak.png",
//     "https://i.postimg.cc/rw5DYxVG/venture-capital.png",
//   ];

//   return (
//     <div className="overflow-hidden w-full bg-white py-6">
//       <div className="flex items-center animate-slide gap-8">
//         {logos.concat(logos).map((logo, index) => (
//           <div key={index} className="flex-shrink-0 flex items-center justify-center h-20">
//             <Image
//               src={logo}
//               alt={`Logo ${index}`}
//               width={150}
//               height={80}
//               className="object-contain"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Tailwind CSS animation */}
//       <style jsx>{`
//         @keyframes slide {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         .animate-slide {
//           display: flex;
//           animation: slide 20s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }
'use client';

import React from "react";
// Removed: import Image from "next/image"; -> using standard <img> tag

export default function ConnectedCompany() {
  const logos = [
    "https://i.postimg.cc/BvH72Q76/sources.png",
    "https://i.postimg.cc/vHB7jPkr/cheaphost.png",
    "https://i.postimg.cc/qR4yGQ2C/barzak.png",
    "https://i.postimg.cc/rw5DYxVG/venture-capital.png",
  ];

  // The duration is slightly faster to look more dynamic
  const animationDuration = "30s"; 

  return (
    <div className="overflow-hidden w-full bg-gray-50 py-10 rounded-xl shadow-lg">
      <div 
        className="flex items-center animate-slide gap-12"
        style={{ width: '200%' }} // Ensures the container is wide enough for the duplicated content
      >
        {/* Duplicate the logos so the transition appears seamless */}
        {logos.concat(logos).map((logo, index) => (
          <div 
            key={index} 
            // h-20 sets the height of the image container to 80px
            className="flex-shrink-0 flex items-center justify-center h-20 px-4"
          >
            <img
              src={logo}
              alt={`Client Logo ${index}`}
              // h-full makes the image take the full height of the container (80px)
              // w-[180px] sets a specific width, approximating the previous Image component's size
              className="h-full w-[180px] object-contain grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              // Fallback for image loading errors:
              onError={(e) => { e.currentTarget.src = `https://placehold.co/180x80/6b7280/ffffff?text=Logo+Fail`; }}
            />
          </div>
        ))}
      </div>

      {/* Custom CSS animation for Left-to-Right visual scroll */}
      <style jsx>{`
        .animate-slide {
          animation: slide ${animationDuration} linear infinite;
        }
        @keyframes slide {
          /* Start at -50% (the second set of logos) */
          0% {
            transform: translateX(-50%);
          }
          /* Move to 0% (the first set of logos) - this creates the visual rightward scroll motion */
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
