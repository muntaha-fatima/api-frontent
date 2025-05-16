"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const CouponFilters = dynamic(() => import("@/components/ui/coupon-filters").then(mod => mod.CouponFilters), { ssr: false });

export default function NotFoundPage() {
  return (
    <div>
      <h1>Page Not Found</h1>

      <Suspense fallback={<p>Loading filters...</p>}>
        <CouponFilters />
      </Suspense>
    </div>
  );
}
