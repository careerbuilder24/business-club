// import Link from "next/link";
// import { Mail, Phone, MapPin } from "lucide-react";
// import Image from "next/image";
// export default function Footer() {
//   return (
//     <footer className=" text-white mt-20 bg-white">
//       <div className="container-custom py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <Link href="/" className="flex items-center gap-2">
//                 <Image
//                   src="https://i.postimg.cc/pXxRpm8f/3.png"
//                   alt="Listify Logo"
//                   width={200}
//                   height={200}
//                   className="rounded-md object-contain"
//                 />
//               </Link>
//             </div>
//             <p className="text-gray-400 text-sm">
//               Your trusted business directory platform
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-sm text-gray-400">
//               <li>
//                 <Link href="/" className="hover:text-white transition">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/listings" className="hover:text-white transition">
//                   Listings
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/blog" className="hover:text-white transition">
//                   Blog
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about" className="hover:text-white transition">
//                   About
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h4 className="font-semibold mb-4">Support</h4>
//             <ul className="space-y-2 text-sm text-gray-400">
//               <li>
//                 <Link href="/contact" className="hover:text-white transition">
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:text-white transition">
//                   FAQ
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:text-white transition">
//                   Privacy
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="hover:text-white transition">
//                   Terms
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="font-semibold mb-4">Contact</h4>
//             <ul className="space-y-3 text-sm text-gray-400">
//               <li className="flex items-center gap-2">
//                 <Mail size={16} />
//                 <span>info@listify.com</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 <Phone size={16} />
//                 <span>+1 (555) 123-4567</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 <MapPin size={16} />
//                 <span>123 Business St, NY</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
//           <p>&copy; 2025 Listify. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white mt-20 text-gray-700">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="https://i.postimg.cc/pXxRpm8f/3.png"
                alt="Listify Logo"
                width={200}
                height={200}
                className="rounded-md object-contain"
              />
            </Link>
            <p className="text-gray-500 text-sm">
              Your trusted business directory platform
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-primary transition">
                  Listings
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col">
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Map */}
          <div className="flex flex-col">
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm mb-4">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@listify.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Business St, NY</span>
              </li>
            </ul>

            {/* Google Map */}
            <div className="w-full h-40 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.123456789!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1234567890%3A0x1234567890abcdef!2s123%20Business%20St%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 Listify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
