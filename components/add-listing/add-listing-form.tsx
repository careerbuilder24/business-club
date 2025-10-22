"use client";

import type React from "react";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import RichTextEditor from "./rich-text-editor";
import { categories } from "@/lib/data";
import SideCategory from "../sideCategory/sideCategory";

export default function AddListingForm() {
  const [formData, setFormData] = useState({
    listingName: "",
    companyName: "",
    category: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    facebook: "",
    description: "",
    labels: [] as string[],
  });

  const [images, setImages] = useState({
    logo: null as File | null,
    cover: null as File | null,
    gallery: [] as File[],
  });

  const [labelInput, setLabelInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "cover" | "gallery"
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
    if (labelInput.trim() && !formData.labels.includes(labelInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        labels: [...prev.labels, labelInput.trim()],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { formData, images });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* <div className="lg:w-[18%]">
        <SideCategory />
      </div> */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 space-y-8"
      >
        {/* Success Message */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            ✓ Listing submitted successfully! We'll review it shortly.
          </div>
        )}

        {/* Basic Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="contact@company.com"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
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
          <h2 className="text-2xl font-bold mb-6 text-foreground">Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Gallery Images */}
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

            {/* Gallery Preview */}
            {images.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
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

        {/* Labels */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Listing Labels
          </h2>
          <div className="flex gap-2 mb-4">
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
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors font-semibold"
            >
              Add
            </button>
          </div>

          {/* Labels Display */}
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

        {/* Description */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Description
          </h2>
          <RichTextEditor
            value={formData.description}
            onChange={handleDescriptionChange}
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6 border-t border-border">
          <button
            type="submit"
            className="flex-1 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors"
          >
            Submit Listing
          </button>
          <button
            type="button"
            className="flex-1 bg-muted text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-border transition-colors"
          >
            Save as Draft
          </button>
        </div>
      </form>
    </>
  );
}
