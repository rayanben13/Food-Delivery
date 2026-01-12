"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import Image from "next/image";
import { updateProfile } from "@/src/app/actions/update-profile";
import { useRouter } from "next/navigation";
import { type ProfileForm, ProfileSchema } from "@/src/lib/validations/auth";

type UserFromDB = {
  name: string | null;
  email: string;
  city: string | null;
  phone: string | null;
  address: string | null;
  image: string | null;
};

export default function EditUser({ user }: { user: UserFromDB }) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState<string | null>(
    user.image || null
  );
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      city: user.city || "",
      phone: user.phone || "",
      address: user.address || "",
      image: undefined, // matches optional File type in ProfileSchema
    },
  });

  const imageFile = watch("image")?.[0];

  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("city", data.city || "");
      formData.append("phone", data.phone || "");
      formData.append("address", data.address || "");
      if (data.image) formData.append("image", data.image);

      const updated = await updateProfile(formData);

      if (updated.image) setCurrentImage(updated.image);

      router.refresh(); // refresh server components
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 p-8 bg-white border border-orange-100 rounded-2xl shadow-sm">
        {/* LEFT: Image */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50">
            {preview ? (
              <Image
                src={preview}
                alt={user.name || "profile"}
                fill
                className="object-cover"
              />
            ) : currentImage ? (
              <Image
                src={currentImage}
                alt={user.name || "profile"}
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
            accept="image/jpeg,image/png,image/webp"
            {...register("image")}
            className="hidden"
          />
          {errors.image && (
            <p className="text-xs text-red-500 text-center">
              {errors.image.message}
            </p>
          )}
        </div>

        {/* RIGHT: Fields */}
        <div className="space-y-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name")}
              placeholder="Name"
              className="rounded-lg border px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              readOnly
              className="rounded-lg border bg-gray-100 px-3 py-2 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              {...register("city")}
              placeholder="City"
              className="rounded-lg border px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
            {errors.city && (
              <p className="text-xs text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="Phone"
              className="rounded-lg border px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              {...register("address")}
              placeholder="Address"
              className="rounded-lg border px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
