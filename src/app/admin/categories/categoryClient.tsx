"use client";

import { Card, Typography } from "@mui/material";
import { Category } from "@prisma/client";
import Form from "./add/page";
import EditCategory from "./edit/editCategory";
import DeleteCategory from "./delete/page";

interface Props {
  categories: Category[];
}

export default function CategoriesClient({ categories }: Props) {
  return (
    <>
      {/* Add Category Form */}
      <Form />

      {/* List of Categories */}
      {categories.map((cat) => (
        <Card
          sx={{
            margin: "10px 0",
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
          key={cat.id}
        >
          <Typography variant="h6">{cat.name}</Typography>
          <div>
            <EditCategory category={cat} />
            <DeleteCategory categoryId={cat.id} />
          </div>
        </Card>
      ))}
    </>
  );
}
