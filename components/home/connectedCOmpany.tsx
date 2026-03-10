
// 'use client';

// import React from "react";

// export default function ConnectedCompany() {
//   const logos = [
//     "https://i.postimg.cc/BvH72Q76/sources.png",
//     "https://i.postimg.cc/vHB7jPkr/cheaphost.png",
//     "https://i.postimg.cc/qR4yGQ2C/barzak.png",
//     "https://i.postimg.cc/rw5DYxVG/venture-capital.png",
//   ];

//   // The duration is slightly faster to look more dynamic
//   const animationDuration = "30s"; 

//   return (
//     <section 
//       className="overflow-hidden w-full bg-gray-50 py-10 rounded-xl shadow-lg" 
//       aria-labelledby="connected-companies"
//     >
//       <header className="text-center mb-8">
//         <h2 id="connected-companies" className="text-3xl font-bold text-gray-800">
//           Trusted by Leading Companies
//         </h2>
//         <p className="text-gray-600 mt-2 text-lg">
//           Our platform is proud to collaborate with industry leaders and innovators.
//         </p>
//       </header>

//       <div 
//         className="flex items-center animate-slide gap-12"
//         style={{ width: '200%' }} // Ensures the container is wide enough for the duplicated content
//         aria-live="polite" // Ensures screen readers announce this content dynamically
//       >
//         {/* Duplicate the logos so the transition appears seamless */}
//         {logos.concat(logos).map((logo, index) => (
//           <div 
//             key={index} 
//             className="flex-shrink-0 flex items-center justify-center h-20 px-4"
//           >
//             <img
//               src={logo}
//               alt={`Logo of ${getLogoName(index)}`} // More descriptive alt text
//               className="h-full w-[180px] object-contain grayscale hover:grayscale-0 transition duration-300 ease-in-out"
//               // Fallback for image loading errors:
//               onError={(e) => { e.currentTarget.src = `https://placehold.co/180x80/6b7280/ffffff?text=Logo+Fail`; }}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Custom CSS animation for Left-to-Right visual scroll */}
//       <style jsx>{`
//         .animate-slide {
//           animation: slide ${animationDuration} linear infinite;
//         }
//         @keyframes slide {
//           0% {
//             transform: translateX(-50%);
//           }
//           100% {
//             transform: translateX(0%);
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

// // Helper function to map logos to descriptive names
// function getLogoName(index: number): string {
//   const companyNames = [
//     "Sources", "CheapHost", "Barzak", "Venture Capital"
//   ];
//   return companyNames[index % companyNames.length];
// }
'use client';

import React from "react";

export default function ConnectedCompany() {
  const logos = [
    "https://i.postimg.cc/BvH72Q76/sources.png",
    "https://i.postimg.cc/vHB7jPkr/cheaphost.png",
    "https://i.postimg.cc/qR4yGQ2C/barzak.png",
    "https://i.postimg.cc/rw5DYxVG/venture-capital.png",
  ];

  const animationDuration = "30s";

  return (
    <section
      className="overflow-hidden w-full bg-gray-50 py-12  rounded-xl shadow-lg"
      aria-labelledby="connected-companies"
    >
      {/* Header */}
      <header className="text-center mb-10 ">
        <h2
          id="connected-companies"
          className="text-3xl font-bold text-gray-800 "
        >
          Trusted by Leading Companies
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Our platform proudly collaborates with industry leaders and innovators.
        </p>
      </header>

      {/* Logo Marquee */}
      <div className="relative w-full overflow-hidden" aria-live="polite">
        <div
          className="flex items-center gap-16 animate-slide"
          style={{ width: "200%" }}
        >
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center h-20 px-6"
            >
              <img
                src={logo}
                alt={`Logo of ${getLogoName(index)}`}
                className="h-full w-[180px] object-contain opacity-90 hover:opacity-100 transition duration-300 ease-in-out"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/180x80/6b7280/ffffff?text=Logo+Fail";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-slide {
          animation: slide ${animationDuration} linear infinite;
        }

        @keyframes slide {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
}

function getLogoName(index: number): string {
  const companyNames = [
    "Sources",
    "CheapHost",
    "Barzak",
    "Venture Capital",
  ];

  return companyNames[index % companyNames.length];
}
