"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import PizzaSize from "../pizzaSize";
import PizzaExtras from "../pizzaExtras";
import { useMemo, useState } from "react";
import { Product } from "@prisma/client";
import Link from "next/link";
import { Box, TextField } from "@mui/material";
import { Extras, Size } from "../../constants/enum";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PizzaDialog({ item }: { item: Product }) {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = useState("STANDARD");
  const [extras, setExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 🧮 Calculate total price dynamically
  const totalPrice = useMemo(() => {
    let price = 0;

    if (size === "STANDARD") price += Size.STANDARD;
    if (size === "LARGE") price += Size.LARGE;

    extras.forEach((extra) => {
      if (extra === "KEBAB") price += Extras.KEBAB;
      if (extra === "KOFTA") price += Extras.KOFTA;
      if (extra === "FROMAGE_2") price += Extras.FROMAGE_2;
      if (extra === "FROMAGE_4") price += Extras.FROMAGE_4;
    });

    // multiply by quantity
    return price * quantity;
  }, [size, extras, quantity]);

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add To Cart
      </Button>

      <BootstrapDialog onClose={handleClose} open={open}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          {/* Pizza Image */}
          <div
            style={{
              width: "130px",
              height: "130px",
              justifySelf: "center",
              marginTop: "25px",
            }}
          >
            <Image
              src={item.image}
              alt="pizza"
              width={0}
              height={0}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: "100%",
                height: "100%",
              }}
              sizes="100px"
            />
          </div>

          <Typography
            variant="h5"
            sx={{ pt: 2, fontWeight: "bold", textAlign: "center" }}
          >
            {item.name}
          </Typography>

          <Typography sx={{ color: "gray", textAlign: "center", pt: 1 }}>
            {item.description}
          </Typography>

          {/* Quantity */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography fontWeight="bold">Quantity</Typography>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              size="small"
              inputProps={{ min: 1, style: { textAlign: "center" } }}
              sx={{ width: "80px", mt: 1 }}
            />
          </Box>

          {/* Select Size */}
          <Typography sx={{ fontWeight: "bold", textAlign: "center", pt: 2 }}>
            Pick Your Size
          </Typography>
          <PizzaSize size={size} setSize={setSize} />

          {/* Extras */}
          <Typography sx={{ fontWeight: "bold", textAlign: "center", pt: 2 }}>
            Any Extras?
          </Typography>
          <PizzaExtras extras={extras} setExtras={setExtras} item={item} />
        </DialogContent>

        <DialogActions>
          <Link
            href={{
              pathname: "/checkout",
              query: {
                name: item.name,
                image: item.image,
                price: totalPrice,
                size,
                extras: extras.join(","),
                quantity,
              },
            }}
            style={{ width: "100%" }}
          >
            <Button
              variant="contained"
              sx={{ mt: 2, width: "100%", fontWeight: "bold" }}
            >
              Add To Cart: {totalPrice} DA
            </Button>
          </Link>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
