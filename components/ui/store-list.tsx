"use client";

import { useEffect, useState } from "react";
import { fetchStores, deleteStore } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Store = {
  _id: string;
  name: string;
  short_description: string;
  long_description?: string;
  trackingUrl: string;
  image?: { url: string; alt: string };
  categories?: string[];
  language?: string;
  isTopStore?: boolean;
  isEditorsChoice?: boolean;
  heading?: string;
};

export default function StoreList() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);

  const loadStores = async () => {
    setLoading(true);
    try {
      const data = await fetchStores();
      setStores(data);
    } catch (err) {
      console.error("Failed to load stores", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  // StoreList.tsx (ya jahan bhi button hai)

const handleDelete = async (id: string) => {
  const token = localStorage.getItem("token");

if (!token) return;

// use token in API call:

  try {
    await deleteStore(id, token);
    await fetchStores(); // stores reload karo
  } catch (error) {
    console.error("Error deleting store:", error);
  }
};


  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Stores</h2>
      {loading ? (
        <p>Loading...</p>
      ) : stores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        stores.map((store) => (
          <Card key={store._id} className="p-4 flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
               {store.image?.url && (
  <Image
    src={store.image.url}
    alt={store.image.alt || store.name}
    width={48}
    height={48}
    className="w-12 h-12 object-contain rounded"
  />
)}

                <div>
                  <div className="font-semibold">{store.name}</div>
                  <p className="text-sm text-muted-foreground">{store.short_description}</p>
                </div>
              </div>

              {store.long_description && (
                <p className="text-sm text-gray-600">{store.long_description}</p>
              )}

              <div className="text-xs text-gray-500">
                {store.categories?.join(", ")} | {store.language} | {store.heading}
              </div>
            </div>
<Button variant="destructive" onClick={() => handleDelete(store._id)}>
  Delete
</Button>

          </Card>
        ))
      )}
    </div>
  );
}