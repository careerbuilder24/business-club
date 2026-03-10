"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

type Category = {
  businessType: string;
  industry: string;
  district: string;
};

export default function SideBarCategory() {
  const [form, setForm] = useState<Category>({
    businessType: "",
    industry: "",
    district: ""
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

//   const addCategory = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!form.businessType || !form.industry || !form.district) return;

//     setCategories([...categories, form]);

//     setForm({
//       businessType: "",
//       industry: "",
//       district: ""
//     });
//   };

const addCategory = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const res = await fetch("/api/sidebar-category", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (data.success) {
    setCategories([...categories, form]);

    setForm({
      businessType: "",
      industry: "",
      district: ""
    });
  }
};

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Sidebar Categories
      </h2>

      <form onSubmit={addCategory}>
        <input
          name="businessType"
          placeholder="Business Type"
          value={form.businessType}
          onChange={handleChange}
          className="input"
        />

        <input
          name="industry"
          placeholder="Industry"
          value={form.industry}
          onChange={handleChange}
          className="input"
        />

        <input
          name="district"
          placeholder="Location (District)"
          value={form.district}
          onChange={handleChange}
          className="input"
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#0aa03c",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            marginTop: "10px"
          }}
        >
          Add Category
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      <ul>
        {categories.map((item, index) => (
          <li key={index}>
            <b>{item.businessType}</b> | {item.industry} | {item.district}
          </li>
        ))}
      </ul>

      <style>{`
        .input{
          width:100%;
          padding:12px;
          margin-bottom:15px;
          border:1px solid #ddd;
          border-radius:8px;
          font-size:14px;
        }
      `}</style>
    </div>
  );
}
