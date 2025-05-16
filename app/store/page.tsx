// app/stores/page.tsx
import StoreList from "../../components/ui/store-list";
import StoreForm from "../../components/store-form";


export default function StorePage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StoreForm />
        <StoreList />
      </div>
    </main>
  );
}