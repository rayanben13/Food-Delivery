"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Link from "next/link";
import { Container } from "@mui/material";
import AuthButton from "./authButton";
import { useState } from "react";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
interface Props {
  window?: () => Window;
  initialSession: Session | null;
}
const drawerWidth = 240;

export default function Header({ initialSession, window }: Props) {
  const pathname = usePathname();
  const navItems = [
    { id: 1, name: "Menu", href: "/menu" },
    { id: 2, name: "About", href: "/about" },
    { id: 3, name: "Contact", href: "/contact" },
    {
      id: 4,
      name: initialSession?.user.role === "USER" ? "profile" : "admin",
      href: initialSession?.user.role === "USER" ? "/profile" : "/admin",
    },
  ];
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2, fontWeight: "bold" }}
        color="primary"
      >
        PIZZA
      </Typography>
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Button
              key={item.id}
              component={Link}
              href={item.href}
              sx={{
                color: isActive ? "orange" : "black",
                "&:hover": { color: "orange" },
                transition: "color 0.3s",
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </List>
      <Box sx={{ display: { xs: "block", sm: "none" }, marginTop: "20px" }}>
        <AuthButton initialSession={initialSession} />
      </Box>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ marginBottom: "90px" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="fixed"
        sx={{ backgroundColor: "white" }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              color="primary"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              <Link href="/">PIZZA</Link>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                console.log(pathname);

                return (
                  <Button
                    key={item.id}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: isActive ? "orange" : "black",
                      "&:hover": { color: "orange" },
                      transition: "color 0.3s",
                    }}
                  >
                    {item.name}
                  </Button>
                );
              })}
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" }, ml: "20px" }}>
              <AuthButton initialSession={initialSession} />
            </Box>
            <Link href="/cart">
              <IconButton sx={{ mx: "5px" }}>
                <AddShoppingCartIcon />
              </IconButton>
            </Link>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="end"
              color="inherit"
              sx={{ ml: "auto", display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
