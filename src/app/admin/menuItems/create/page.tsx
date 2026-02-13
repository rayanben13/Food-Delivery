import { getCategories } from "@/src/lib/cache";
import CreateProductForm from "../form";

export default async function CreateProductPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl text-center font-bold mb-6">Create Product</h1>
      <CreateProductForm categories={categories} />
    </div>
  );
}
