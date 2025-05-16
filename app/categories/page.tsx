// app/categories/page.tsx
import { fetchCategories } from "../../lib/api";

export default async function CategoryPage() {
  const data = await fetchCategories();
  const categories = data.categories;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat._id} className="border p-4 rounded shadow-sm">
              <div className="flex items-center space-x-3">
                {cat.icon && (
                  <img src={cat.icon} alt={cat.name} className="w-8 h-8 object-contain" />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{cat.name}</h2>
                  <p className="text-sm text-gray-600">{cat.description}</p>
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Status: {cat.active ? "Active" : "Inactive"} | Order: {cat.order}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}