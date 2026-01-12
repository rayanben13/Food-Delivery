import Link from "next/link";
import React from "react";

function MenuItems() {
  return (
    <section>
      <div className="text-center">
        <Link href="menuItems/create">Create New Product</Link>
      </div>
    </section>
  );
}

export default MenuItems;
