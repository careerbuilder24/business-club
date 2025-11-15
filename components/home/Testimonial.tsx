// 'use client'
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence, Variants } from 'framer-motion';

// // --- 1. Define the Testimonial Data Interface ---
// interface TestimonialData {
//   id: number;
//   review: string;
//   name: string;
//   title: string;
//   image: string;
// }

// // Fake data for the testimonials (now explicitly typed)
// const testimonialData: TestimonialData[] = [
//   {
//     id: 1,
//     review: "The expertise provided was unparalleled. Our workflow efficiency increased by 40% within the first quarter. This service didn't just meet our expectations; it completely redefined them. A truly game-changing partnership.",
//     name: "Sarah Chen",
//     title: "CEO, Innovatech Solutions",
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//   },
//   {
//     id: 2,
//     review: "Before partnering with them, our team struggled with direction. Their strategic planning sessions were clear, focused, and immediately actionable. It's the best investment we've made this year, bringing clarity and significant growth.",
//     name: "Marcus Rodriguez",
//     title: "Small Business Owner & Founder",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
//   {
//     id: 3,
//     review: "From initial consultation to final delivery, the communication was flawless. They handled every challenge with professionalism and innovative solutions. Highly recommend their dedicated team for complex projects and achieving exceptional results.",
//     name: "Emily Carter",
//     title: "Director of Operations, NextGen Co.",
//     image: "https://randomuser.me/api/portraits/women/68.jpg",
//   },
//   {
//     id: 4,
//     review: "Their innovative strategies revitalized our marketing efforts. We saw a substantial increase in engagement and conversion rates, exceeding our targets. Truly an indispensable partner for modern business challenges.",
//     name: "David Lee",
//     title: "Marketing Lead, Global Corp.",
//     image: "https://randomuser.me/api/portraits/men/70.jpg",
//   },
// ];

// // --- 2. Define Props Interface for Card Component ---
// type TestimonialCardProps = Omit<TestimonialData, 'id'>;

// // Simplified Card component for single display
// const TestimonialCard: React.FC<TestimonialCardProps> = ({ review, name, title, image }) => (
//   <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl flex flex-col h-full border-t-4 border-green-500">
    
//     {/* Quote Icon */}
//     <div className="text-[#2C8845] mb-4">
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-70" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M11 9H9V2H11V9ZM21 9H19V2H21V9Z"/>
//         <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"/>
//       </svg>
//     </div>

//     {/* Review Text */}
//     <p className="text-gray-700 text-xl italic mb-8 flex-grow leading-relaxed">
//       "{review}"
//     </p>

//     {/* Reviewer Info with Image */}
//     <div className="flex items-center pt-6 border-t border-gray-100 mt-auto">
//       <img
//         src={image}
//         alt={name}
//         // Properly type the SyntheticEvent for onError
//         onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
//           (e.target as HTMLImageElement).onerror = null; 
//           (e.target as HTMLImageElement).src = "https://placehold.co/56x56/a5b4fc/ffffff?text=User" 
//         }}
//         className="h-14 w-14 rounded-full object-cover mr-4 ring-2 ring-green-300"
//       />
//       <div>
//         <p className="text-xl font-bold text-gray-900">{name}</p>
//         <p className="text-base text-[#2C8845] font-medium">{title}</p>
//       </div>
//     </div>
//   </div>
// );

// const Testimonial: React.FC = () => {
//   // State is implicitly typed as number
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Function to advance the carousel index
//   const advanceCarousel = (): void => {
//     setActiveIndex(prevIndex => (prevIndex + 1) % testimonialData.length);
//   };

//   // Auto-advance logic using useEffect and setInterval
//   useEffect(() => {
//     const intervalId: number = window.setInterval(advanceCarousel, 5000); // Use window.setInterval for clarity in TS

//     // Cleanup function to clear the interval when the component unmounts
//     return () => window.clearInterval(intervalId);
//   }, []); // Empty dependency array means this runs once on mount

//   const goToSlide = (index: number): void => setActiveIndex(index);

//   // Animation variants for Framer Motion, explicitly typed as Variants
//   const slideVariants: Variants = {
//     enter: {
//       opacity: 0,
//       x: 100, // Starts from the right
//     },
//     center: {
//       opacity: 1,
//       x: 0, // Moves to the center
//       transition: {
//         duration: 0.7, // Animation duration
//         ease: "easeOut",
//       },
//     },
//     exit: {
//       opacity: 0,
//       x: -100, // Exits to the left
//       transition: {
//         duration: 0.7,
//         ease: "easeIn",
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans py-16">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-base text-[#2C8845] font-semibold tracking-wide uppercase">
//             What Our Clients Say
//           </h2>
//           <p className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//             Success Stories from Our Valued Partners
//           </p>
//           <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
//             Discover the impact of our dedication through the voices of those we've helped achieve their goals.
//           </p>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative h-auto min-h-[450px] mt-10 w-full overflow-hidden">
//           <AnimatePresence initial={false} mode="wait">
//             {/* The active testimonial is found using array indexing */}
//             {testimonialData.map((testimonial, index) => (
//               index === activeIndex && ( // Only render the active testimonial
//                 <motion.div
//                   key={testimonial.id}
//                   variants={slideVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   className="absolute top-0 left-0 w-full"
//                 >
//                   <TestimonialCard
//                     review={testimonial.review}
//                     name={testimonial.name}
//                     title={testimonial.title}
//                     image={testimonial.image}
//                   />
//                 </motion.div>
//               )
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Navigation Dots */}
//         <div className="flex justify-center space-x-3 mt-12">
//           {testimonialData.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`h-3 w-3 rounded-full transition-all duration-300 transform ring-2 ring-[#2C8845] ${
//                 index === activeIndex ? 'bg-[#2C8845] scale-125' : 'bg-[#2C8845] hover:bg-green-400'
//               }`}
//               aria-label={`Go to testimonial ${index + 1}`}
//             />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Testimonial;
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- 1. Define the Testimonial Data Interface ---
interface TestimonialData {
  id: number;
  review: string;
  name: string;
  title: string;
  image: string;
}

// Fake data for the testimonials (now explicitly typed)
const testimonialData: TestimonialData[] = [
  {
    id: 1,
    review: "The expertise provided was unparalleled. Our workflow efficiency increased by 40% within the first quarter. This service didn't just meet our expectations; it completely redefined them. A truly game-changing partnership.",
    name: "Sarah Chen",
    title: "CEO, Innovatech Solutions",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    review: "Before partnering with them, our team struggled with direction. Their strategic planning sessions were clear, focused, and immediately actionable. It's the best investment we've made this year, bringing clarity and significant growth.",
    name: "Marcus Rodriguez",
    title: "Small Business Owner & Founder",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    review: "From initial consultation to final delivery, the communication was flawless. They handled every challenge with professionalism and innovative solutions. Highly recommend their dedicated team for complex projects and achieving exceptional results.",
    name: "Emily Carter",
    title: "Director of Operations, NextGen Co.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    review: "Their innovative strategies revitalized our marketing efforts. We saw a substantial increase in engagement and conversion rates, exceeding our targets. Truly an indispensable partner for modern business challenges.",
    name: "David Lee",
    title: "Marketing Lead, Global Corp.",
    image: "https://randomuser.me/api/portraits/men/70.jpg",
  },
];

// --- 2. Define Props Interface for Card Component ---
type TestimonialCardProps = Omit<TestimonialData, 'id'>;

// Simplified Card component for single display
const TestimonialCard: React.FC<TestimonialCardProps> = ({ review, name, title, image }) => (
  <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl flex flex-col h-full border-t-4 border-green-500">
    
    {/* Quote Icon */}
    <div className="text-[#2C8845] mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-70" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 9H9V2H11V9ZM21 9H19V2H21V9Z"/>
        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"/>
      </svg>
    </div>

    {/* Review Text */}
    <p className="text-gray-700 text-xl italic mb-8 flex-grow leading-relaxed">
      "{review}"
    </p>

    {/* Reviewer Info with Image */}
    <div className="flex items-center pt-6 border-t border-gray-100 mt-auto">
      <img
        src={image}
        alt={`Portrait of ${name}, ${title}`} // Descriptive alt text
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
          (e.target as HTMLImageElement).onerror = null; 
          (e.target as HTMLImageElement).src = "https://placehold.co/56x56/a5b4fc/ffffff?text=User" 
        }}
        className="h-14 w-14 rounded-full object-cover mr-4 ring-2 ring-green-300"
      />
      <div>
        <p className="text-xl font-bold text-gray-900">{name}</p>
        <p className="text-base text-[#2C8845] font-medium">{title}</p>
      </div>
    </div>
  </div>
);

const Testimonial: React.FC = () => {
  // State is implicitly typed as number
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to advance the carousel index
  const advanceCarousel = (): void => {
    setActiveIndex(prevIndex => (prevIndex + 1) % testimonialData.length);
  };

  // Auto-advance logic using useEffect and setInterval
  useEffect(() => {
    const intervalId: number = window.setInterval(advanceCarousel, 5000); // Use window.setInterval for clarity in TS

    // Cleanup function to clear the interval when the component unmounts
    return () => window.clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount

  const goToSlide = (index: number): void => setActiveIndex(index);

  // Animation variants for Framer Motion, explicitly typed as Variants
  const slideVariants: Variants = {
    enter: {
      opacity: 0,
      x: 100, // Starts from the right
    },
    center: {
      opacity: 1,
      x: 0, // Moves to the center
      transition: {
        duration: 0.7, // Animation duration
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -100, // Exits to the left
      transition: {
        duration: 0.7,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-base text-[#2C8845] font-semibold tracking-wide uppercase">
            What Our Clients Say
          </h2>
          <p className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Success Stories from Our Valued Partners
          </p>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Discover the impact of our dedication through the voices of those we've helped achieve their goals.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-auto min-h-[450px] mt-10 w-full overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            {/* The active testimonial is found using array indexing */}
            {testimonialData.map((testimonial, index) => (
              index === activeIndex && ( // Only render the active testimonial
                <motion.div
                  key={testimonial.id}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute top-0 left-0 w-full"
                >
                  <TestimonialCard
                    review={testimonial.review}
                    name={testimonial.name}
                    title={testimonial.title}
                    image={testimonial.image}
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-12">
          {testimonialData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 transform ring-2 ring-[#2C8845] ${
                index === activeIndex ? 'bg-[#2C8845] scale-125' : 'bg-[#2C8845] hover:bg-green-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Testimonial;
