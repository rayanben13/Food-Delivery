"use client";

import { Box, Button, List } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminTabs() {
  const tabs = [
    { id: 1, name: "Profile", href: "" },
    { id: 2, name: "Categories", href: "/categories" },
    { id: 3, name: "Menu Items", href: "/menuItems" },
    { id: 4, name: "Users", href: "/users" },
    { id: 5, name: "Orders", href: "/orders" },
  ];

  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <List>
        {tabs.map((item) => {
          const fullPath = `/admin${item.href}`;
          const isActive =
            item.href === ""
              ? pathname === "/admin"
              : pathname === fullPath || pathname.startsWith(`${fullPath}/`);
          return (
            <Button
              key={item.id}
              component={Link}
              href={fullPath}
              sx={{
                color: isActive ? "orange" : "black",
                "&:hover": { color: "orange" },
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </List>
    </Box>
  );
}
