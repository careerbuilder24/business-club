"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

type ServiceType = {
  id: string;
  name: string;
  subSection: string;
};

export default function PackagesAdd() {
  const fixedPackages = [
    "Starter",
    "Growth",
    "Smart",
    "Premium",
    "Elite",
    "VIP",
  ];

  const serviceOptions = [
    "Basic Services",
    "Training Program",
    "Platform setup for online presence",
    "Platform setup for digital marketing",
    "Graphic design services",
    "Digital marketing services",
    "Content writing services",
    "Video creation",
    "Business consultancy",
  ];

  const [packages, setPackages] = useState<string[]>(fixedPackages);

  const [services, setServices] = useState<ServiceType[]>([]);

  const [subSections, setSubSections] = useState<string[]>([]);

  const [selectedService, setSelectedService] = useState("");

  const [data, setData] = useState<Record<string, Record<string, string>>>({});

  const [loading, setLoading] = useState(false);

  const [editingRows, setEditingRows] = useState<string[]>([]);

  /* ================= FETCH ================= */

  const fetchData = async () => {
    try {
      const res = await fetch("/api/packages");

      const result = await res.json();

      if (result.success && result.data) {
        setPackages(result.data.packages || fixedPackages);

        const fetchedServices = result.data.services || [];
        const fetchedSubSections = result.data.subSections || [];

        setSubSections(fetchedSubSections);

        const formattedServices = fetchedServices.map(
          (s: string, i: number) => ({
            id: crypto.randomUUID(),
            name: s,
            subSection: fetchedSubSections[i] || "General",
          }),
        );

        setServices(formattedServices);

        setData(result.data.data || {});
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= ADD PACKAGE ================= */

  const addPackage = () => {
    const name = prompt("Enter package name");

    if (!name) return;

    if (packages.includes(name)) {
      alert("Package already exists");
      return;
    }

    setPackages((prev) => [...prev, name]);
  };

  /* ================= ADD SERVICE ================= */

  const addService = () => {
    if (!selectedService) {
      alert("Select subsection first");
      return;
    }

    const name = prompt("Enter Service Name");

    if (!name) return;

    setServices((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        subSection: selectedService,
      },
    ]);

    if (!subSections.includes(selectedService)) {
      setSubSections((prev) => [...prev, selectedService]);
    }

    setSelectedService("");
  };

  /* ================= REMOVE SERVICE ================= */

  // const removeService = (id: string, serviceName: string) => {
  //   setServices((prev) => prev.filter((s) => s.id !== id));

  //   setData((prev) => {
  //     const updated = { ...prev };

  //     delete updated[serviceName];

  //     return updated;
  //   });
  // };


//   const removeService = async (id: string, serviceName: string) => {

//   try {

//     await fetch("/api/packages", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         serviceName
//       })
//     });

//     setServices(prev => prev.filter(s => s.id !== id));

//     setData(prev => {

//       const updated = { ...prev };

//       delete updated[serviceName];

//       return updated;

//     });

//   } catch (err) {

//     console.error("Delete error:", err);

//   }

// };

// const removeService = async (id: string, serviceName: string) => {

//   try {

//     const res = await fetch("/api/packages", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         serviceName
//       })
//     });

//     const result = await res.json();

//     if (!result.success) {
//       alert("Delete failed");
//       return;
//     }

//     // update UI after DB success
//     setServices(prev => prev.filter(s => s.id !== id));

//     setData(prev => {
//       const updated = { ...prev };
//       delete updated[serviceName];
//       return updated;
//     });

//   } catch (err) {

//     console.error("Delete error:", err);
//     alert("Delete error");

//   }

// };


const removeService = async (id: string, serviceName: string) => {

  const result = await Swal.fire({
    title: "Delete Service?",
    text: "This service will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {

    const res = await fetch("/api/packages", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        serviceName
      })
    });

    const dataRes = await res.json();

    if (!dataRes.success) {

      Swal.fire("Error", "Delete failed", "error");
      return;

    }

    // update UI after delete
    setServices(prev => prev.filter(s => s.id !== id));

    setData(prev => {

      const updated = { ...prev };

      delete updated[serviceName];

      return updated;

    });

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Service has been removed.",
      timer: 1500,
      showConfirmButton: false
    });

  } catch (err) {

    console.error("Delete error:", err);

    Swal.fire("Error", "Something went wrong", "error");

  }

};
  /* ================= EDIT ROW ================= */

  const enableRowEdit = (id: string) => {
    setEditingRows((prev) => [...prev, id]);
  };

  // const disableRowEdit = (id: string) => {

  //   setEditingRows(prev => prev.filter(r => r !== id));

  // };

  const disableRowEdit = async (id: string, serviceName: string) => {
    try {
      const values = data[serviceName] || {};

      await fetch("/api/packages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceName,
          values,
        }),
      });

      setEditingRows((prev) => prev.filter((r) => r !== id));
    } catch (err) {
      console.error(err);
    }
  };
  /* ================= CHANGE SERVICE NAME ================= */

  const changeServiceName = (id: string, oldName: string, newName: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: newName } : s)),
    );

    setData((prev) => {
      const updated = { ...prev };

      updated[newName] = updated[oldName] || {};

      delete updated[oldName];

      return updated;
    });
  };

  /* ================= CHANGE CELL ================= */

  const handleChange = (serviceName: string, pkg: string, value: string) => {
    setData((prev) => ({
      ...prev,

      [serviceName]: {
        ...prev[serviceName],

        [pkg]: value,
      },
    }));
  };

  /* ================= SAVE ================= */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/packages", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          packages,

          services: services.map((s) => s.name),

          subSections: services.map((s) => s.subSection),

          data,
        }),
      });

      const result = await res.json();

      if (result.success) {
        alert("Saved successfully");

        setEditingRows([]);

        fetchData();
      }
    } catch (err) {
      console.error(err);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GROUP SERVICES ================= */

  const groupedServices = subSections.map((sub) => ({
    subSection: sub,
    services: services.filter((s) => s.subSection === sub),
  }));

  /* ================= UI ================= */

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Dynamic Packages System</h2>

      <div className="flex gap-3 mb-4">
        <select
          className="border p-2 rounded"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Select SubSection</option>

          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <Button onClick={addService}>Add Service</Button>

        <Button onClick={addPackage}>Add Package</Button>
      </div>

      <table className="min-w-full border text-sm">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="p-2 border">Services</th>

            {packages.map((pkg) => (
              <th key={pkg} className="p-2 border text-center">
                {pkg}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {groupedServices.map((group) => (
            <React.Fragment key={group.subSection}>
              <tr className="bg-green-100 font-semibold">
                <td colSpan={packages.length + 1} className="p-2">
                  {group.subSection}
                </td>
              </tr>

              {group.services.map((service) => (
                <tr key={service.id}>
                  <td className="p-2 border bg-gray-100">
                    <div className="flex justify-between items-center">
                      {editingRows.includes(service.id) ? (
                        <input
                          className="border p-1 rounded"
                          value={service.name}
                          onChange={(e) =>
                            changeServiceName(
                              service.id,
                              service.name,
                              e.target.value,
                            )
                          }
                        />
                      ) : (
                        <span>{service.name}</span>
                      )}

                      <div className="flex gap-2">
                        {editingRows.includes(service.id) ? (
                          <button
                            // onClick={() => disableRowEdit(service.id)}
                            onClick={() =>
                              disableRowEdit(service.id, service.name)
                            }
                            className="text-green-600 text-xs"
                          >
                            Save Row
                          </button>
                        ) : (
                          <button
                            onClick={() => enableRowEdit(service.id)}
                            className="text-blue-600 text-xs"
                          >
                            Edit
                          </button>
                        )}

                        <button
                          onClick={() =>
                            removeService(service.id, service.name)
                          }
                          className="text-red-500 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>

                  {packages.map((pkg) => (
                    <td key={pkg} className="p-2 border">
                      {editingRows.includes(service.id) ? (
                        <input
                          className="border p-2 w-full rounded"
                          value={data[service.name]?.[pkg] || ""}
                          onChange={(e) =>
                            handleChange(service.name, pkg, e.target.value)
                          }
                        />
                      ) : (
                        <span className="p-2 block">
                          {data[service.name]?.[pkg] || "-"}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Button onClick={handleSubmit} className="mt-4" disabled={loading}>
        {loading ? "Saving..." : "Save All Data"}
      </Button>
    </div>
  );
}
