import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";
import prisma from "../../lib/prisma";

export const bestSellers = nextCache(
  reactCache(async () => {
    const data = await prisma.product.findMany({
      take: 3,
      orderBy: {
        order: "desc",
      },
    });
    if (data) return data;
  }),
  ["products-cache-key"],
  { revalidate: 600 }
);
