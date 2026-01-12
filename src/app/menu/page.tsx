// app/menu/[category]/page.tsx
import { getProductsByCategory } from "../../lib/cache";
import PizzaDiolog from "../../components/pizzaDialog";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  CardActions,
} from "@mui/material";

export default async function CategoryPage() {
  const category = await getProductsByCategory();
  if (category.length === 0) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h4" textAlign="center">
          No products.
        </Typography>
      </Container>
    );
  }

  return (
    <main>
      {category.map((e) => {
        return (
          <section key={e.id}>
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                padding: "10px 0",
                fontWeight: "bold",
              }}
            >
              {e.name}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 3,
                justifyItems: "center",
              }}
            >
              {e.product.map((p) => (
                <Card
                  key={p.id}
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    width: 250,
                    textAlign: "center",
                    p: 1,
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={p.image}
                    alt={p.name}
                    sx={{
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">{p.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {p.description}
                    </Typography>
                    <Typography variant="h6" color="primary" mt={1}>
                      ${p.price}
                    </Typography>
                    <CardActions sx={{ justifySelf: "center" }}>
                      <PizzaDiolog item={p} />
                    </CardActions>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>
        );
      })}
    </main>
  );
}
