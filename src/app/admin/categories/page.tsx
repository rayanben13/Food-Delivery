import { Box, Typography } from "@mui/material";
import { getCategories } from "@/src/lib/cache";
import CategoriesClient from "./categoryClient";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={2}>
        Categories
      </Typography>

      <CategoriesClient categories={categories} />
    </Box>
  );
}
