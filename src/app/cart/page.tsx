"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { Order } from "@prisma/client";

export default function CartPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // 🟢 for initial load spinner

  // 🧩 Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      setFetching(true);
      try {
        const res = await fetch("/api/order");
        const text = await res.text();

        if (!text) {
          console.warn("⚠️ Empty response from /api/order");
          return;
        }

        const data = JSON.parse(text);
        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders:", data.error);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchOrders();
  }, []);

  // 🟠 Open cancel dialog
  const handleCancelClick = (order: Order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  // 🔴 Close dialog
  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setOpenDialog(false);
  };

  // ✅ Confirm cancel (DELETE)
  const handleConfirmCancel = async () => {
    if (!selectedOrder) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/order/${selectedOrder.id}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => null);
      if (data?.success) {
        setOrders((prev) =>
          prev.filter((order) => order.id !== selectedOrder.id)
        );
        setSnackbarOpen(true);
        setOpenDialog(false);
      } else {
        alert("❌ Failed to cancel order: " + (data?.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  // 🕓 Show spinner while fetching orders
  if (fetching) {
    return (
      <Container
        sx={{
          mt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography textAlign="center" variant="h6">
          🛒 Your cart is empty
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        🛍 Your Cart
      </Typography>

      {orders.map((order) => (
        <Card
          key={order.id}
          sx={{
            mb: 3,
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            boxShadow: 3,
          }}
        >
          <CardMedia
            component="img"
            image={order.image}
            alt={order.name}
            sx={{
              height: 120,
              borderRadius: 2,
              objectFit: "cover",
              width: "120px",
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{order.name}</Typography>
            {order.size && <Typography>Size: {order.size}</Typography>}
            {order.extras && <Typography>Extras: {order.extras}</Typography>}
            <Typography>Subtotal: {order.subTotal} DA</Typography>
            <Typography>Delivery: {order.delivery} DA</Typography>
            <Typography fontWeight="bold" color="primary">
              Total: {order.totalPrice} DA
            </Typography>
          </CardContent>
          <Box>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleCancelClick(order)}
            >
              Annuler
            </Button>
          </Box>
        </Card>
      ))}

      {/* 🧾 Confirm Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>❗ Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            Do you really want to cancel this order:{" "}
            <strong>{selectedOrder?.name}</strong> ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button color="error" onClick={handleConfirmCancel}>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{
            width: "100%",
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
          }}
        >
          ❌ Order canceled successfully
        </Alert>
      </Snackbar>

      {/* 🔵 Loading Backdrop (while deleting) */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
