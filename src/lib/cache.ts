import { unstable_cache as nextCache } from "next/cache";
import prisma from "./prisma";

export const getProducts = nextCache(
  async () => {
    return await prisma.product.findMany({
      orderBy: { order: "asc" },
    });
  },
  ["products-cache-key"], // مفتاح الكاش (مهم)
  { revalidate: 1800 } // يحدث البيانات كل 60 ثانية
);

export const getProductsByCategory = nextCache(
  async () => {
    return await prisma.category.findMany({
      include: {
        product: {
          orderBy: {
            order: "asc", // order products inside each category
          },
        },
      },
    });
  },
  ["category-cache-key"], // مفتاح الكاش (مهم)
  { revalidate: 60 } // يحدث البيانات كل 60 ثانية
);

export const getCategories = nextCache(
  async () => {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc", // ترتيب الأقسام حسب الاسم
      },
    });

    return categories;
  },
  ["categories-cache-key"], // مفتاح الكاش
  { revalidate: 300 } // إعادة التحقق كل 5 دقائق
);
