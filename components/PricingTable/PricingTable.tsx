

// // components/PricingTable/PricingTable.tsx
// import React from 'react';
// import { Check } from 'lucide-react'; // For the checkmark icon
// import { MessageSquare } from 'lucide-react'; // Using a generic message icon for 'Contact'

// // --- 1. TypeScript Interfaces ---
// // Defines the structure for each package (Basic, Premium, etc.)
// export interface Package {
//   name: string;
//   price: string;
//   currency: string;
// }

// // Defines the structure for a single feature row, now with a dedicated 'packageColumn'
// export interface Feature {
//   id: string; 
//   name: string;
//   packageColumn: string; // The descriptive text in the second column (e.g., "1 Domain", "5 GB")
//   basicValue: string | boolean; 
//   premiumValue: string | boolean;
//   corporateValue: string | boolean;
//   eliteValue: string | boolean;
// }

// // Defines the props for the main component
// export interface PricingTableProps {
//   packages: Package[];
//   features: Feature[];
//   title: string;
// }

// // --- 2. Component Implementation ---
// const PricingTable: React.FC<PricingTableProps> = ({ packages, features, title }) => {
//   // Helper function to get feature value based on the column index (0 to 3)
//   const getFeatureValue = (feature: Feature, index: number): string | boolean => {
//     switch (index) {
//       case 0: return feature.basicValue;
//       case 1: return feature.premiumValue;
//       case 2: return feature.corporateValue;
//       case 3: return feature.eliteValue;
//       default: return '';
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 md:p-8  font-sans my-12">
//       {/* Title */}
//       <h2 className="text-3xl md:text-4xl font-extrabold text-[#384a6c] text-center mb-10 tracking-wide">
//         {title}
//       </h2>

//       <div className="overflow-x-auto border border-[#39f06a] rounded-xl">
//         <table className="min-w-full bg-white border-[#39f06a]">
//           <thead>
//             {/* Header Row 1: Titles and Package Names */}
//             <tr>
//               {/* Items Include */}
//               <th className="py-4 px-4 bg-[#2C8845] text-white text-left font-bold text-sm sm:text-base border-r border-[#39f06a] rounded-tl-xl">
//                 Items Include
//               </th>
//               {/* Package (Descriptive Column) */}
//               <th className="py-4 px-4 bg-[#2C8845] text-white text-left font-bold text-sm sm:text-base border-r border-[#39f06a]">
//                 Package
//               </th>
//               {/* Package Headers (Basic, Premium, Corporate, Elite) */}
//               {packages.map((pkg, index) => (
//                 <th 
//                   key={pkg.name} 
//                   className={`py-4 px-4 bg-[#2C8845] text-white text-center font-bold text-sm sm:text-base ${
//                     index < packages.length - 1 ? 'border-r border-[#39f06a]' : ''
//                   } ${
//                     index === packages.length - 1 ? 'rounded-tr-xl' : '' // Rounded corner for the last header
//                   }`}
//                 >
//                   {pkg.name}
//                 </th>
//               ))}
//             </tr>
//             {/* Header Row 2: Prices (Matching the six-column layout) */}
//             <tr>
//               {/* Empty cell below "Items Include" */}
//               <th className="py-3 px-4 bg-[#2C8845] text-white text-left text-xs sm:text-sm border-r border-[#39f06a]"></th>
//               {/* Empty cell below "Package" */}
//               <th className="py-3 px-4 bg-[#2C8845] text-white text-left text-xs sm:text-sm border-r border-[#39f06a]"></th>
              
//               {/* Package Prices */}
//               {packages.map((pkg, index) => (
//                 <th 
//                   key={`${pkg.name}-price`} 
//                   className={`py-3 px-4 bg-[#2C8845] text-white text-center text-xs sm:text-sm font-light ${
//                     index < packages.length - 1 ? 'border-r border-[#39f06a]' : ''
//                   }`}
//                 >
//                   {pkg.currency} {pkg.price}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {/* Feature Rows */}
//             {features.map((feature, index) => (
//               <tr 
//                 key={feature.id} 
//                 className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} // Alternating row color
//               >
//                 {/* 1. Feature Name (Items Include) */}
//                 <td className="py-3 px-4 border-r border-[#39f06a] text-gray-800 text-left font-medium text-sm sm:text-base">
//                    {feature.name}
//                 </td>
                
//                 {/* 2. Package Column (Descriptive Text) */}
//                 <td className="py-3 px-4 border-r border-[#39f06a] text-gray-700 text-left text-sm sm:text-base">
//                    {feature.packageColumn}
//                 </td>

//                 {/* 3-6. Feature Values for the four package columns */}
//                 {packages.map((pkg, pkgIndex) => {
//                   const value = getFeatureValue(feature, pkgIndex);
                  
//                   return (
//                     <td 
//                       key={`${feature.id}-${pkg.name}`} 
//                       className={`py-3 px-4 text-center text-sm sm:text-base ${
//                         pkgIndex < packages.length - 1 ? 'border-r border-[#39f06a]' : ''
//                       }`}
//                     >
//                       {/* Checkmark for boolean true */}
//                       {value === true && <Check size={20} className="text-green-500 mx-auto" />}
//                       {/* Empty cell for boolean false or empty string */}
//                       {value === false || value === '' ? '' : value}
//                       {/* Note: In your Basic column, "Tk. 1500/Year" is handled as a string */}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
            
//             {/* Contact Row (Bottom Buttons) */}
//             <tr className="bg-white">
//               {/* 1. Empty cell for "Items Include" */}
//               <td className="py-4 px-4 border-r border-[#39f06a] rounded-bl-xl"></td>
//               {/* 2. Empty cell for "Package" column */}
//               <td className="py-4 px-4 border-r border-[#39f06a]"></td>
              
//               {/* 3-6. Contact Buttons */}
//               {packages.map((pkg, index) => (
//                 <td 
//                   key={`contact-${pkg.name}`} 
//                   className={`py-4 px-4 text-center ${
//                     index < packages.length - 1 ? 'border-r border-[#39f06a]' : ''
//                   } ${
//                     index === packages.length - 1 ? 'rounded-br-xl' : ''
//                   }`}
//                 >
//                   {/* Button uses the provided bright green color */}
//                   <button className="flex items-center justify-center gap-2 bg-[#2C8845] text-white text-sm sm:text-base font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors mx-auto w-full max-w-[120px]">
//                     <MessageSquare size={16} />
//                     Contact
//                   </button>
//                 </td>
//               ))}
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PricingTable;


// components/PricingTable/PricingTable.tsx
import React from 'react';
import { Check } from 'lucide-react'; // For the checkmark icon
import { MessageSquare } from 'lucide-react'; // Using a generic message icon for 'Contact'

// --- 1. TypeScript Interfaces (UNCHANGED) ---
export interface Package {
  name: string;
  price: string;
  currency: string;
}

export interface Feature {
  id: string;
  name: string;
  packageColumn: string;
  basicValue: string | boolean;
  premiumValue: string | boolean;
  corporateValue: string | boolean;
  eliteValue: string | boolean;
}

export interface PricingTableProps {
  packages: Package[];
  features: Feature[];
  title: string;
}

// =============================================================
// 👇 NEW: WhatsApp Configuration
// 1. Replace '1234567890' with your full WhatsApp number (country code + number, NO spaces, NO '+' or '00').
//    Example for the US: '15551234567'
//    Example for India: '919876543210'
const WHATSAPP_NUMBER = '+8801339397906';
const WHATSAPP_MESSAGE_BASE = 'Hello! I am interested in the ';
// =============================================================


// --- 2. Component Implementation ---
const PricingTable: React.FC<PricingTableProps> = ({ packages, features, title }) => {
  // Helper function to get feature value based on the column index (0 to 3)
  const getFeatureValue = (feature: Feature, index: number): string | boolean => {
    switch (index) {
      case 0: return feature.basicValue;
      case 1: return feature.premiumValue;
      case 2: return feature.corporateValue;
      case 3: return feature.eliteValue;
      default: return '';
    }
  };
  
  // 👇 NEW: Helper function to generate the WhatsApp link
  const getWhatsappLink = (packageName: string) => {
    // Generates a message like: "Hello! I am interested in the Basic package."
    const message = WHATSAPP_MESSAGE_BASE + packageName + ' package.';
    const encodedMessage = encodeURIComponent(message);
    // WhatsApp API link format: https://wa.me/<number>?text=<urlencodedtext>
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  };

  return (
    <div className="container mx-auto p-4 md:p-8  font-sans my-12">
      {/* Title (UNCHANGED) */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#384a6c] text-center mb-10 tracking-wide">
        {title}
      </h2>

      <div className="overflow-x-auto border border-[#39f06a] rounded-xl">
        <table className="min-w-full bg-white border-[#39f06a]">
          <thead>
            {/* Header Rows (UNCHANGED) */}
            <tr>
              <th className="py-4 px-4 bg-[#2C8845] text-white text-left font-bold text-sm sm:text-base border-r border-[#39f06a] rounded-tl-xl">
                Items Include
              </th>
              <th className="py-4 px-4 bg-[#2C8845] text-white text-left font-bold text-sm sm:text-base border-r border-[#39f06a]">
                Package
              </th>
              {packages.map((pkg, index) => (
                <th
                  key={pkg.name}
                  className={`py-4 px-4 bg-[#2C8845] text-white text-center font-bold text-sm sm:text-base ${
                    index < packages.length - 1 ? 'border-r border-[#39f06a]' : ''
                  } ${
                    index === packages.length - 1 ? 'rounded-tr-xl' : ''
                  }`}
                >
                  {pkg.name}
                </th>
              ))}
            </tr>
            <tr>
              <th className="py-3 px-4 bg-[#2C8845] text-white text-left text-xs sm:text-sm border-r border-[#39f06a]"></th>
              <th className="py-3 px-4 bg-[#2C8845] text-white text-left text-xs sm:text-sm border-r border-[#39f06a]"></th>

              {packages.map((pkg, index) => (
                <th
                  key={`${pkg.name}-price`}
                  className={`py-3 px-4 bg-[#2C8845] text-white text-center text-xs sm:text-sm font-light ${
                    index < packages.length - 1 ? 'border-r border-[#39f06a]' : ''
                  }`}
                >
                  {pkg.currency} {pkg.price}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Feature Rows (UNCHANGED) */}
            {features.map((feature, index) => (
              <tr
                key={feature.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-3 px-4 border-r border-[#39f06a] text-gray-800 text-left font-medium text-sm sm:text-base">
                   {feature.name}
                </td>
                <td className="py-3 px-4 border-r border-[#39f06a] text-gray-700 text-left text-sm sm:text-base">
                   {feature.packageColumn}
                </td>

                {packages.map((pkg, pkgIndex) => {
                  const value = getFeatureValue(feature, pkgIndex);

                  return (
                    <td
                      key={`${feature.id}-${pkg.name}`}
                      className={`py-3 px-4 text-center text-sm sm:text-base ${
                        pkgIndex < packages.length - 1 ? 'border-r border-[#39f06a]' : ''
                      }`}
                    >
                      {value === true && <Check size={20} className="text-green-500 mx-auto" />}
                      {value === false || value === '' ? '' : value}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Contact Row (MODIFIED to use WhatsApp Link) */}
            <tr className="bg-white">
              <td className="py-4 px-4 border-r border-[#39f06a] rounded-bl-xl"></td>
              <td className="py-4 px-4 border-r border-[#39f06a]"></td>

              {/* 3-6. WhatsApp Links (Anchor Tags) */}
              {packages.map((pkg, index) => (
                <td
                  key={`contact-${pkg.name}`}
                  className={`py-4 px-4 text-center ${
                    index < packages.length - 1 ? 'border-r border-[#39f06a]' : ''
                  } ${
                    index === packages.length - 1 ? 'rounded-br-xl' : ''
                  }`}
                >
                  {/* Replaced <button> with <a> for redirection */}
                  <a
                    href={getWhatsappLink(pkg.name)}
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#2C8845] text-white text-sm sm:text-base font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors mx-auto w-full max-w-[120px]"
                  >
                    <MessageSquare size={16} />
                    Contact
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;