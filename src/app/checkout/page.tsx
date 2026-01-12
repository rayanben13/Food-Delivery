"use client";

import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Product {
  id?: number;
  name: string;
  image: string;
  description?: string;
  price: number;
  size?: string; // ✅ use string | undefined, not null
  extras?: string[];
  quantity: number;
}

export default function CheckoutPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const name = params.get("name");
    const image = params.get("image");
    const price = Number(params.get("price"));
    const quantity = Number(params.get("quantity")) || 1;
    const size = params.get("size") || undefined; // ✅ convert null → undefined
    const extras = params.get("extras")?.split(",") || [];

    if (name && image && !isNaN(price)) {
      setProduct({ name, image, price, size, extras, quantity });
    }
  }, [params]);

  const handleClose = () => setOpen(false);

  const saveOrder = async () => {
    if (!product) return;
    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          image: product.image,
          quantity: product.quantity,
          size: product.size ?? "", // ✅ safely handle undefined
          extras: product.extras ?? [],
          subTotal: product.price * product.quantity,
          delivery: 200,
          totalPrice: product.price * product.quantity + 200,
          userEmail: process.env.EMAIL_USER, // replace with logged-in user email if needed
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOpen(true);
        setTimeout(() => router.push("/cart"), 1000);
      } else {
        alert("❌ Failed to save order: " + data.error);
      }
    } catch (err) {
      alert("❌ Error while saving order: " + err);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h6" textAlign="center">
          Loading product details...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Checkout
      </Typography>

      <Card sx={{ p: 3, maxWidth: 500, mx: "auto", boxShadow: 3 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ height: 200, objectFit: "cover", borderRadius: 2 }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {product.name}
          </Typography>
          {product.size && <Typography>Size: {product.size}</Typography>}
          {product.extras && product.extras.length > 0 && (
            <Typography>Extras: {product.extras.join(", ")}</Typography>
          )}
          <Typography>Quantity: {product.quantity}</Typography>
          <Typography variant="h6" color="primary" mt={2}>
            Total: {product.price * product.quantity + 200} DA
          </Typography>
        </CardContent>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={saveOrder}
            disabled={loading}
          >
            Confirm Order
          </Button>
        </Box>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: "green",
            color: "white",
            fontWeight: "bold",
          }}
        >
          ✅ Order sent successfully!
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
