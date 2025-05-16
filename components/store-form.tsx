"use client";

import { useState } from "react";
import { createStore } from "@/lib/api";

export default function CreateStoreForm() {
  const [loading, setLoading] = useState(false);

  const token = "YOUR_ADMIN_TOKEN"; // Replace with your actual token

  const handleCreate = async () => {
    setLoading(true);
    const newStore = {
  name: "Jessica Simpson",
  trackingUrl: "https://jessicasimpson.com/",
  short_description:
    "Jessica Simpson Collection is a privately owned company that specializes in the design manufacture and retail of clothing shoes leather goods and accessories",
  long_description:
    "Jessica Simpson Collection is a privately owned company that specializes in the design manufacture and retail of clothing shoes leather goods and accessories",
  image: {
    url: "https://coupon-app-image.s3.us-east-1.amazonaws.com/3d1457ff-629c-4c35-b4f1-0165f308abfc-js.png",
    alt: "Updated Store Image",
  },
  categories: ["categoryId1"], // <-- Yahan real category ID lagani hai!
  seo: {
    meta_title: "Jessica Simpson Coupons",
    meta_description:
      "Jessica Simpson Collection coupons, offers and promo codes",
    meta_keywords: "jessica simpson, fashion, deals, coupons",
  },
  language: "English",
  isTopStore: false,
  isEditorsChoice: false,
  heading: "Coupons & Promo Codes", // ✅ valid heading
};

    try {
      const response = await createStore(newStore, token);
      console.log("Store created:", response);
      alert("Store created successfully!");
    } catch (err) {
      console.error("Failed to create store", err);
      alert("Failed to create store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Create Store</h2>
      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Amazon Store"}
      </button>
    </div>
  );
}