import { Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import SectionTitle from "../../components/mainHeading/sectiontitle";
import Image from "next/image";
import { bestSellers } from "../../server/db/product";
import PizzaDiolog from "../../components/pizzaDialog";
async function BestSellers() {
  const data = await bestSellers();
  if (data.length == 0) {
    return (
      <>
        <SectionTitle title="Our Best Sellers" subTitle="Checkout" />
        <p style={{ textAlign: "center", color: "gray" }}>Not Found Data</p>
      </>
    );
  } else {
    return (
      <section style={{ padding: "10px 0" }}>
        <SectionTitle title="OUR BEST SELLERS" subTitle="CHECKOUT" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "19px",
          }}
        >
          {data.map((e) => {
            return (
              <Card key={e.id} sx={{ minWidth: 230 }}>
                <CardContent>
                  <div
                    style={{
                      padding: "7px 0",
                      position: "relative",
                      width: 150,
                      height: 150,
                      justifySelf: "center",
                    }}
                  >
                    <Image
                      src={e.image}
                      alt="pizza"
                      fill
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      sizes="150px"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "7px 0",
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{ fontWeight: "bold" }}
                    >
                      {e.name}
                    </Typography>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "gray",
                      }}
                    >
                      ${e.price}
                    </span>
                  </div>
                  <p style={{ color: "gray" }}>{e.description}</p>
                </CardContent>
                <CardActions sx={{ justifySelf: "center" }}>
                  <PizzaDiolog item={e} />
                </CardActions>
              </Card>
            );
          })}
        </div>
      </section>
    );
  }
}

export default BestSellers;
