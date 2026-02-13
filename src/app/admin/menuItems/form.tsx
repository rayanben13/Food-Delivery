"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { createProduct } from "@/src/app/actions/createProduct";
import SelectSmall from "./components/selectForm";

export type Category = {
  id: string;
  name: string;
};

const initialState: {
  success: boolean;
  error: Error | null;
  errors?: Record<string, string>;
} = {
  success: false,
  error: null,
};

export default function CreateProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [state, formAction, pending] = useActionState(
    createProduct,
    initialState
  );

  const [preview, setPreview] = useState<string | null>(null);

  return (
    <form action={formAction} className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 p-8 bg-white border border-orange-100 rounded-2xl shadow-sm">
        {/* LEFT: Image */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50">
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-orange-400">
                No image
              </div>
            )}
          </div>

          <label
            htmlFor="image"
            className="cursor-pointer rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition"
          >
            Choose image
          </label>

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setPreview(
                e.target.files ? URL.createObjectURL(e.target.files[0]) : null
              )
            }
          />

          {state.errors?.image && (
            <p className="text-xs text-red-500 text-center">
              {state.errors.image}
            </p>
          )}
        </div>

        {/* RIGHT: Fields */}
        <div className="space-y-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Product name
            </label>
            <input
              name="name"
              placeholder="Product name"
              className="rounded-lg border px-3 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
            {state.errors?.name && (
              <p className="text-xs text-red-500">{state.errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Description"
              className="rounded-lg border px-3 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
            {state.errors?.description && (
              <p className="text-xs text-red-500">{state.errors.description}</p>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              placeholder="0.00"
              className="rounded-lg border px-3 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
            {state.errors?.price && (
              <p className="text-xs text-red-500">{state.errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <SelectSmall categories={categories} />
            {state.errors?.categoryId && (
              <p className="text-xs text-red-500">{state.errors.categoryId}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {pending ? "Creating..." : "Create Product"}
          </button>
        </div>
      </div>
    </form>
  );
}
