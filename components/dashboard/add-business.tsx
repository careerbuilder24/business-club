"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import RichTextEditor from "./rich-text-editor-two";
import useLoggedUser from "@/hooks/useLoggedUser";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import useBusinessClubPayments from "@/hooks/useBusinessClubPayments";

// Business Types
const businessTypes = [
  "Manufacturer",
  "Supplier",
  "Buying House",
  "Dealer",
  "Trader",
  "Importer",
  "Exporter",
];

// Industries / Categories
const industries = [
  "Agriculture Farm",
  "Aquarium Fish Farm",
  "Automotive Industry",
  "Banks",
  "Beauty Parlor & Spa",
  "Blogs & Magazines",
  "Brassware Industry",
  "Buying House",
  "Cement Factory",
  "Ceramics Factory",
  "Chemical Factory",
  "Cleaning Agency",
  "Coaching Center",
  "Construction Firm",
  "Construction Materials",
  "Consulting Firms",
  "Cottage Industry",
  "Courier Service",
  "Day Care Center",
  "Diagnostic Centers",
  "Ecommerce",
  "Education Institute",
  "Electronics Industry",
  "Engineering Workshop",
  "Event Management Firm",
  "Fashion House",
  "Fast Food & Restaurant",
  "Fertiliser Factory",
  "Financial Company",
  "Fisheries",
  "Food Factory",
  "Furniture Company",
  "Garments Factory",
  "Glass Factory",
  "Grocery Shop",
  "Gym",
  "Handicraft Company",
  "Handloon Industry",
  "Hatchery",
  "Health Care Company",
  "Home Appliance Company",
  "Home Builders",
  "Homeo Clinic",
  "Hotel",
  "Interior Design Firm",
  "Interior Firm",
  "Internet Service Provider",
  "IT Firm",
  "Jewellery Factory",
  "Jewelry Company",
  "Jute Factory",
  "Law Firms",
  "Leather Factory",
  "Life Insurance",
  "Machine Industry",
  "Madrasha",
  "Maid Agency",
  "Marine Industry",
  "Marketing Agency",
  "Marriage Media",
  "Medical Equipment Suppliers",
  "Mosquito Coil Factory",
  "Motor Vehicle Service",
  "Music Industry",
  "Newspaper",
  "Pearl Farm",
  "Pet Shop",
  "Petroleum Industry",
  "Pharmaceutical Industry",
  "Photo Studio",
  "Physical Therapy Center",
  "Poultry Farm",
  "Printing Press",
  "Publications",
  "Pulp & Paper Company",
  "Real Estate Company",
  "Resorts",
  "Restaurant",
  "Salon & Spa",
  "Sanitary Agency",
  "School & College",
  "Security Company",
  "Service Company",
  "Shoe Factory",
  "Steel Factory",
  "Tea Industry",
  "Telecommunications",
  "Textile Industry",
  "Transport Company",
  "Travel Agency",
  "University",
  "Veterinary Farm",
];

export default function AddListingForm() {
  const { payments } = useBusinessClubPayments();

  const { loggedUser } = useLoggedUser();

  const [formData, setFormData] = useState({
    listingName: "",
    companyName: "",
    type: "",
    category: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    facebook: "",
    district: "",
    city: "",
    description: "",
    labels: [] as string[],
  });

  console.log(payments);
  console.log(loggedUser);

  useEffect(() => {
    if (loggedUser?.email) {
      setFormData((prev) => ({
        ...prev,
        email: loggedUser.email,
      }));
    }
  }, [loggedUser]);

  const userPayments =
    payments?.filter(
      (p: any) =>
        p.email === loggedUser?.email && p.payment_status !== "rejected",
    ) || [];

  const packageCount = userPayments.length;

  const packageNames = [
    ...new Set(userPayments.map((p: any) => p.package_name)),
  ];
  const [images, setImages] = useState({
    logo: null as File | null,
    cover: null as File | null,
    gallery: [] as File[],
  });

  const [labelInput, setLabelInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Products (same as first file)
  const [products, setProducts] = useState([
    { name: "", description: "", images: [] as File[] },
  ]);

  // Services (same as first file)
  const [services, setServices] = useState([
    { name: "", description: "", images: [] as File[] },
  ]);

  // ---------- Helpers ----------

  const cleanHTML = (dirty: string): string => {
    const clean = DOMPurify.sanitize(dirty, {
      ALLOWED_ATTR: ["href", "target", "rel"],
      ALLOWED_TAGS: [
        "p",
        "br",
        "strong",
        "b",
        "i",
        "ul",
        "ol",
        "li",
        "a",
        "h1",
        "h2",
        "h3",
      ],
    });
    return clean;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (content: string) => {
    const cleaned = cleanHTML(content);
    setFormData((prev) => ({ ...prev, description: cleaned }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "cover" | "gallery",
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (type === "gallery") {
      setImages((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...Array.from(files)],
      }));
    } else {
      setImages((prev) => ({
        ...prev,
        [type]: files[0],
      }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setImages((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const addLabel = () => {
    const trimmed = labelInput.trim();
    if (trimmed && !formData.labels.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        labels: [...prev.labels, trimmed],
      }));
      setLabelInput("");
    }
  };

  const removeLabel = (label: string) => {
    setFormData((prev) => ({
      ...prev,
      labels: prev.labels.filter((l) => l !== label),
    }));
  };

  // ---------- Products ----------

  const handleProductChange = (index: number, field: string, value: string) => {
    const newProducts = [...products];
    // @ts-expect-error – dynamic field assign
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleProductImages = (index: number, files: FileList | null) => {
    if (!files) return;
    const newProducts = [...products];
    newProducts[index].images.push(...Array.from(files));
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts((prev) => [...prev, { name: "", description: "", images: [] }]);
  };

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------- Services ----------

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...services];
    // @ts-expect-error – dynamic field assign
    newServices[index][field] = value;

    setServices(newServices);
  };

  const handleServiceImages = (index: number, files: FileList | null) => {
    if (!files) return;
    const newServices = [...services];
    newServices[index].images.push(...Array.from(files));
    setServices(newServices);
  };

  const addService = () => {
    setServices((prev) => [...prev, { name: "", description: "", images: [] }]);
  };

  const removeService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------- Submit with ImgBB + Swal ----------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Submit Listing?",
      text: "Are you sure you want to submit this listing?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    // Upload function
    const uploadToImgBB = async (file: File) => {
      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: fd },
      );

      const data = await res.json();
      return data?.data?.url || null;
    };

    // Logo & Cover
    const logo_url = images.logo ? await uploadToImgBB(images.logo) : null;
    const cover_url = images.cover ? await uploadToImgBB(images.cover) : null;

    // Gallery
    const gallery_urls: string[] = [];
    for (const img of images.gallery) {
      const url = await uploadToImgBB(img);
      if (url) gallery_urls.push(url);
    }

    // Products with uploaded images
    const uploadedProducts: {
      name: string;
      description: string;
      images: string[];
    }[] = [];

    for (const product of products) {
      const uploadedImgUrls: string[] = [];
      for (const img of product.images) {
        const url = await uploadToImgBB(img);
        if (url) uploadedImgUrls.push(url);
      }
      uploadedProducts.push({
        name: product.name,
        description: product.description,
        images: uploadedImgUrls,
      });
    }

    // Services with uploaded images
    const uploadedServices: {
      name: string;
      description: string;
      images: string[];
    }[] = [];

    for (const service of services) {
      const uploadedImgUrls: string[] = [];
      for (const img of service.images) {
        const url = await uploadToImgBB(img);
        if (url) uploadedImgUrls.push(url);
      }
      uploadedServices.push({
        name: service.name,
        description: service.description,
        images: uploadedImgUrls,
      });
    }

    // Send to backend
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formData,
        logo_url,
        cover_url,
        gallery_urls,
        products: uploadedProducts,
        services: uploadedServices,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);
      Swal.fire({
        title: "Success!",
        text: "Listing submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: data.error || "Something went wrong.",
        icon: "error",
      });
    }
  };

  console.log(packageNames);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 space-y-8 w-full max-w-[1200px] mx-auto"
      >
        {/* Success Message */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            ✓ Listing submitted successfully! We'll review it shortly.
          </div>
        )}

        {/* Basic Information */}

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Listing Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Listing Name *
              </label>
              <input
                type="text"
                name="listingName"
                value={formData.listingName}
                onChange={handleInputChange}
                placeholder="e.g., Tech Solutions Pro"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="e.g., Tech Solutions Inc."
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Business Type & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 sm:col-span-2">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Business Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  required
                >
                  <option value="">Select a type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  required
                >
                  <option value="">Select a category</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                disabled
                className="w-full px-4 py-2 border border-border rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
                required
              />
            </div>

            {loggedUser?.email && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-blue-800">
                  Your Packages ({packageCount})
                </p>

                {packageNames.length > 0 ? (
                  <ul className="list-disc ml-5 text-sm text-blue-700 mt-2 space-y-1">
                    {packageNames.map((pkg) => {
                      const pkgData = userPayments.find(
                        (p: any) =>
                          p.package_name === pkg &&
                          p.email === loggedUser?.email,
                      );

                      return (
                        <li key={pkg} className="flex items-center gap-2">
                          {pkg}

                          {pkgData && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded
                  ${
                    pkgData.payment_status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                            >
                              {pkgData.payment_status === "approved"
                                ? "Approved"
                                : "Pending"}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
                    No packages found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
            Contact Information
          </h2>

          {/* District */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">
              District *
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              placeholder="e.g., Dhaka"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="e.g., Gulshan"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+8801XXXXXXXXX"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Company Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Business St, City, State"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourcompany.com"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Facebook */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Facebook URL
              </label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/yourpage"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
            Images
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Logo */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Company Logo
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "logo")}
                  className="hidden"
                  id="logo-input"
                />
                <label htmlFor="logo-input" className="cursor-pointer">
                  <Upload
                    className="mx-auto mb-2 text-muted-foreground"
                    size={24}
                  />
                  <p className="text-sm text-muted-foreground">
                    Click to upload logo
                  </p>
                  {images.logo && (
                    <p className="text-xs text-primary mt-2">
                      ✓ {images.logo.name}
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Cover Image
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "cover")}
                  className="hidden"
                  id="cover-input"
                />
                <label htmlFor="cover-input" className="cursor-pointer">
                  <Upload
                    className="mx-auto mb-2 text-muted-foreground"
                    size={24}
                  />
                  <p className="text-sm text-muted-foreground">
                    Click to upload cover
                  </p>
                  {images.cover && (
                    <p className="text-xs text-primary mt-2">
                      ✓ {images.cover.name}
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-6">
            <label className="block text-sm font-semibold mb-2 text-foreground">
              Gallery Images
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, "gallery")}
                className="hidden"
                id="gallery-input"
              />
              <label htmlFor="gallery-input" className="cursor-pointer">
                <Upload
                  className="mx-auto mb-2 text-muted-foreground"
                  size={24}
                />
                <p className="text-sm text-muted-foreground">
                  Click to upload gallery images
                </p>
              </label>
            </div>

            {images.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.gallery.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <div className="bg-muted rounded-lg p-2 aspect-square flex items-center justify-center">
                      <span className="text-xs text-muted-foreground text-center truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="border border-border rounded-lg p-4 bg-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Products</h2>

            {products.map((product, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <X size={18} />
                  </button>
                )}

                <label className="block font-semibold mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    handleProductChange(index, "name", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded mb-3"
                  placeholder="e.g., Premium Laptop"
                  required
                />

                <label className="block font-semibold mb-1">
                  Description *
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) =>
                    handleProductChange(index, "description", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded mb-3"
                  rows={3}
                  placeholder="Short product description..."
                  required
                ></textarea>

                <label className="block font-semibold mb-1">
                  Product Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleProductImages(index, e.target.files)}
                  className="border p-2 rounded w-full"
                />

                {product.images.length > 0 && (
                  <ul className="text-sm mt-2 list-disc ml-4">
                    {product.images.map((img, i) => (
                      <li key={i}>{img.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addProduct}
              className="mt-2 px-4 py-2 bg-[#2C8845] hover:bg-[#21b348] duration-500 ease-in-out text-white rounded-lg"
            >
              + Add Another Product
            </button>
          </div>
        </div>

        {/* Services Section */}
        <div>
          <div className="border border-border rounded-lg p-4 bg-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Services</h2>

            {services.map((service, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 relative">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <X size={18} />
                  </button>
                )}

                <label className="block font-semibold mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) =>
                    handleServiceChange(index, "name", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded mb-3"
                  placeholder="e.g., Web Development"
                  required
                />

                <label className="block font-semibold mb-1">
                  Description *
                </label>
                <textarea
                  value={service.description}
                  onChange={(e) =>
                    handleServiceChange(index, "description", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded mb-3"
                  rows={3}
                  placeholder="Short service description..."
                  required
                ></textarea>

                <label className="block font-semibold mb-1">
                  Service Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleServiceImages(index, e.target.files)}
                  className="border p-2 rounded w-full"
                />

                {service.images.length > 0 && (
                  <ul className="text-sm mt-2 list-disc ml-4">
                    {service.images.map((img, i) => (
                      <li key={i}>{img.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addService}
              className="mt-2 px-4 py-2 bg-[#2C8845] hover:bg-[#21b348] duration-500 ease-in-out text-white rounded-lg"
            >
              + Add Another Service
            </button>
          </div>
        </div>

        {/* Labels */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
            Listing Labels
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addLabel())
              }
              placeholder="e.g., Software Development"
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={addLabel}
              className="px-6 py-2 bg-[#2C8845] hover:bg-[#21b348] duration-500 ease-in-out text-white rounded-lg transition-colors font-semibold"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.labels.map((label) => (
              <div
                key={label}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span className="text-sm">{label}</span>
                <button
                  type="button"
                  onClick={() => removeLabel(label)}
                  className="hover:text-primary-light transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Company Description */}
        <div className="border border-border rounded-lg p-4 bg-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
            Company Description
          </h2>
          <RichTextEditor
            value={formData.description}
            onChange={handleDescriptionChange}
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
          <button
            type="submit"
            className="flex-1 bg-[#2C8845] hover:bg-[#21b348] duration-500 ease-in-out text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Submit Listing
          </button>
          <button
            type="button"
            className="flex-1 bg-[#2C8845] hover:bg-[#21b348] duration-500 ease-in-out text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Save as Draft
          </button>
        </div>
      </form>
    </>
  );
}
