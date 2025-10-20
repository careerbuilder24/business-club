// "use client"

// import Link from "next/link"
// import { useState } from "react"
// import { Menu, X } from "lucide-react"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)

//   const navItems = [
//     { label: "Home", href: "/" },
//     { label: "Add Listing", href: "/add-listing" },
//     { label: "All Listings", href: "/listings" },
//     { label: "Blog", href: "/blog" },
//     { label: "About", href: "/about" },
//     { label: "Contact", href: "/contact" },
//   ]

//   return (
//     <nav className="bg-white border-b border-border sticky top-0 z-50">
//       <div className="container-custom">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-lg">L</span>
//             </div>
//             <span className="font-bold text-xl text-foreground hidden sm:inline">Listify</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>

//           {/* Login Button & Mobile Menu */}
//           <div className="flex items-center gap-4">
//             <Link href="/login" className="btn-primary hidden sm:inline-block">
//               Login
//             </Link>

//             {/* Mobile Menu Button */}
//             <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg">
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden pb-4 border-t border-border">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             ))}
//             <Link
//               href="/login"
//               className="block px-4 py-2 text-primary font-semibold hover:bg-muted"
//               onClick={() => setIsOpen(false)}
//             >
//               Login
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }
"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Add Listing", href: "/add-listing" },
    { label: "All Listings", href: "/listings" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://i.postimg.cc/pXxRpm8f/3.png"
              alt="Listify Logo"
              width={200}
              height={200}
              className="rounded-md object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:inline-block px-4 py-2 rounded-lg font-semibold text-white hover:brightness-90 transition-colors"
              style={{ backgroundColor: "#308C48" }}
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="block px-4 py-2 text-primary font-semibold hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
