
const BASE_URL = "https://coupon-app-backend.vercel.app/api";
const STORES_API = `${BASE_URL}/stores`;

// ---------------------
// TYPES
// ---------------------

export type Store = {
  _id: string;
  name: string;
  trackingUrl: string;
  short_description: string;
  long_description?: string;
  image?: { url: string; alt: string };
  categories?: string[];
  seo?: {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
  };
  language?: string;
  isTopStore?: boolean;
  isEditorsChoice?: boolean;
  heading?: string;
};

// export type Coupon = {
//   _id: string;
//   offerDetails: string;
//   store: any; // Can be ID or full object
//   code?: string;
//   active?: boolean;
//   isValid?: boolean;
//   featuredForHome?: boolean;
//   expirationDate?: string;
//   hits: number;
//   lastAccessed: string;
// };


// ---------------------
// STORES
// ---------------------

// lib/api.ts
export async function fetchStores(signal?: AbortSignal)
 {
  const res = await fetch("https://coupon-app-backend.vercel.app/api/stores", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stores");
  }


  const json = await res.json();
  return json.stores || []; // <-- Adjust this line based on actual response structure
}




export async function createStore(storeData: Partial<Store>, token: string) {
  const res = await fetch(STORES_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(storeData),
  });
  return await res.json();
}

export async function deleteStore(id: string, token: string) {
  const res = await fetch(`${STORES_API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}


// ---------------------
// COUPONS
// ---------------------

// export async function fetchAllCouponsPaginated(): Promise<Coupon[]> {
//   try {
//     const res = await fetch(COUPONS_API);
//     const data = await res.json();
//     return data || [];
//   } catch (error) {
//     console.error("fetchAllCouponsPaginated error:", error);
//     return [];
//   }
// }

// export async function createCoupon(data: Coupon, token: string) {
//   const res = await axios.post(COUPONS_API, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// }

// export async function deleteCoupon(id: string, token: string) {
//   const res = await fetch(`${COUPONS_API}/${id}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Failed to delete coupon");
//   return await res.json();
// }

// export async function trackCoupon(couponId: string) {
//   const res = await axios.post(`${COUPONS_API}/${couponId}/track`);
//   return res.data;
// }




export type Coupon = {
  _id: string
  offerDetails: string
  code?: string
  active: boolean
  isValid: boolean
  featuredForHome: boolean
  expirationDate?: string
  hits?: number
  store: {
    _id: string
    name: string
    trackingUrl: string
    image: {
      url: string
      alt?: string
    }
  }
}

export type CreateCouponInput = {
  offerDetails: string
  code?: string
  store: string
  active?: boolean
  isValid?: boolean
  featuredForHome?: boolean
  expirationDate?: string
}

export async function fetchCoupons(): Promise<Coupon[]> {
  const res = await fetch(`https://coupon-app-backend.vercel.app/api/coupons`)
  if (!res.ok) throw new Error('Failed to fetch coupons')
  const json = await res.json()
  return json.data
}

export async function createCoupon(data: CreateCouponInput, token: string) {
  const res = await fetch(`https://coupon-app-backend.vercel.app/api/coupons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create coupon')
  return res.json()
}

export async function deleteCoupon(id: string, token: string) {
  const res = await fetch(`https://coupon-app-backend.vercel.app/api/coupons/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!res.ok) throw new Error('Failed to delete coupon')
  return true
}

export async function trackCoupon(id: string) {
  const res = await fetch(`https://coupon-app-backend.vercel.app/api/coupons/${id}/track`, {
    method: 'POST'
  })
  if (!res.ok) throw new Error('Failed to track coupon')
  return true
}

// ---------------------
// CATEGORIES
// ---------------------
// Define proper types
// Define proper types for export
// Define proper types for export
// Define proper types for export
// Define proper types for export
// Define proper types for export
// 





// lib/api.ts

// lib/api.ts
export type Category = {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  active: boolean;
  order: number;
};

export type CategoryListResponse = {
  categories: Category[];
  totalCategories: number;
  currentPage: number;
  totalPages: number;
};

export async function fetchCategories({
  page = 1,
  limit = 50,
  active,
}: {
  page?: number;
  limit?: number;
  active?: boolean;
} = {}): Promise<CategoryListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(active !== undefined ? { active: String(active) } : {}),
  });

  const url = `https://coupon-app-backend.vercel.app/api/categories?${params.toString()}`;
  console.log("Fetching:", url); // for debug

  const res = await fetch(url);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error("Fetch failed", res.status, error);
    throw new Error(error.message || `Failed to fetch categories (status ${res.status})`);
  }

  const json = await res.json();
  return json.data;
}



// ✅ Get category by ID
export async function getCategoryById(id: string): Promise<Category> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch category");

  const json = await res.json();
  return json.data;
}

// ✅ Create a new category
export async function createCategory(
  data: {
    name: string;
    description?: string;
    icon?: string;
    active?: boolean;
    order?: number;
  },
  token: string
): Promise<Category> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create category");
  }

  const json = await res.json();
  return json.data;
}




  /*
  try {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
  */


/**
 * Delete a category by ID
 */

  // For testing, just return success

  /*
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
  */


// ---------------------
// AUTH
// ---------------------

// export async function login(email: string, password: string) {
//   const res = await axios.post(`${AUTH_API}/login`, { email, password });
//   return res.data;
// }

// export async function registerAdmin(data: {
//   name: string;
//   email: string;
//   password: string;
//   passwordConfirm: string;
// }, token: string) {
//   const res = await axios.post(`${AUTH_API}/register`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// }

// export async function getCurrentUser(token: string) {
//   const res = await axios.get(`${AUTH_API}/me`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// }

// export async function forgotPassword(email: string) {
//   const res = await axios.post(`${AUTH_API}/forgot-password`, { email });
//   return res.data;
// }

// export async function resetPassword(token: string, data: {
//   password: string;
//   passwordConfirm: string;
// }) {
//   const res = await axios.patch(`${AUTH_API}/reset-password/${token}`, data);
//   return res.data;
// }

// export async function updatePassword(data: {
//   currentPassword: string;
//   newPassword: string;
//   passwordConfirm: string;
// }, token: string) {
//   const res = await axios.patch(`${AUTH_API}/update-password`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// }
// function setStores(updated: any) {
//   throw new Error("Function not implemented.");
// }






// lib/auth.ts



export type AuthUser = {
  _id: string
  name: string
  email: string
  role: 'admin' | 'user'
  lastLogin: string
}
// lib/api.ts
export async function login(email: string, password: string): Promise<void> {
  const res = await fetch("https://coupon-app-backend.vercel.app/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Login failed");
  }

  localStorage.setItem("token", data.token); // ✅ Save token

  if (typeof window !== "undefined") {
    window.location.href = "/stores"; // ✅ Redirect on success
  }


}



