import { Typography } from "@mui/material";
import React from "react";

function SectionTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className="text-center" style={{ paddingBottom: "20px" }}>
      <p className="py-2 font-bold" style={{ color: "gray" }}>
        {subTitle}
      </p>
      <Typography
        sx={{ fontWeight: "bold", fontSize: "35px" }}
        variant="h1"
        component="h1"
      >
        {title}
      </Typography>
    </div>
  );
}

export default SectionTitle;
