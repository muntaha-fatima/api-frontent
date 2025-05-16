"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchStores } from "@/lib/api";
import { toast } from "sonner";

interface Store {
  _id: string;
  name: string;
}

export function CouponFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [stores, setStores] = useState<Store[]>([]);
  const [storesLoading, setStoresLoading] = useState(true);

  const currentStore = useMemo(() => searchParams.get("store") || "", [searchParams]);
  const isActive = useMemo(() => searchParams.get("active") === "true", [searchParams]);
  const isValid = useMemo(() => searchParams.get("isValid") === "true", [searchParams]);
  const isFeatured = useMemo(() => searchParams.get("featuredForHome") === "true", [searchParams]);
  const hasFilters = useMemo(
    () => currentStore || isActive || isValid || isFeatured,
    [currentStore, isActive, isValid, isFeatured]
  );

 useEffect(() => {
  const abortController = new AbortController();

  const getStores = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view stores");
        setStoresLoading(false);
        return;
      }

      const data = await fetchStores(abortController.signal); // ✅ PLACE IT HERE
      setStores(data); // ✅ Update state with fetched stores
    } catch (err: any) {
      if (err.name === "AbortError") return;
      toast.error(err?.message || "Failed to fetch stores");
    } finally {
      setStoresLoading(false);
    }
  };

  getStores();

  return () => abortController.abort(); // cleanup on unmount
}, []);

  const createQueryString = (params: Record<string, string | null | boolean>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", "1");

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });

    return newParams.toString();
  };

  const handleStoreChange = (storeId: string) => {
    const params = { store: storeId === "all" ? null : storeId };
    router.push(`${pathname}?${createQueryString(params)}`);
  };

  const handleCheckboxChange = (key: string, checked: boolean) => {
    const value = key === "isValid" ? (checked ? "true" : "false") : checked ? "true" : null;
    router.push(`${pathname}?${createQueryString({ [key]: value })}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </CardTitle>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 text-xs"
              aria-label="Clear all filters"
            >
              <X className="mr-1 h-3 w-3" /> Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Store</label>
          <Select
            value={currentStore || "all"}
            onValueChange={handleStoreChange}
            disabled={storesLoading}
            name="store"
          >
            <SelectTrigger aria-label="Select a store">
              {storesLoading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading stores...
                </span>
              ) : (
                <SelectValue placeholder="All Stores" />
              )}
            </SelectTrigger>
            <SelectContent>
              {stores.length === 0 ? (
                <div className="text-sm text-muted-foreground p-2">No stores available</div>
              ) : (
                <>
                  <SelectItem value="all">All Stores</SelectItem>
                  {stores.map((store) => (
                    <SelectItem key={store._id} value={store._id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Status</label>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              name="active"
              checked={isActive}
              onCheckedChange={(checked) => handleCheckboxChange("active", checked as boolean)}
              aria-describedby="active-description"
            />
            <label htmlFor="active" className="text-sm">
              Active coupons only
            </label>
            <span id="active-description" className="sr-only">
              Filter coupons to show only active ones
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="valid"
              name="valid"
              checked={isValid}
              onCheckedChange={(checked) => handleCheckboxChange("isValid", checked as boolean)}
              aria-describedby="valid-description"
            />
            <label htmlFor="valid" className="text-sm">
              Valid coupons only
            </label>
            <span id="valid-description" className="sr-only">
              Filter coupons to show only valid ones
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              name="featured"
              checked={isFeatured}
              onCheckedChange={(checked) =>
                handleCheckboxChange("featuredForHome", checked as boolean)
              }
              aria-describedby="featured-description"
            />
            <label htmlFor="featured" className="text-sm">
              Featured coupons only
            </label>
            <span id="featured-description" className="sr-only">
              Filter coupons to show only featured ones
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}