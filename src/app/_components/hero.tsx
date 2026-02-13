import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

function Hero() {
  return (
    <section>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: 2,
          padding: "20px 0 10px 0",
        }}
      >
        <div style={{ alignContent: "center", color: "black" }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: "bold",
              padding: "10px 0",
              fontSize: "35px",
            }}
          >
            Slice Into Happiness
          </Typography>
          <Typography component="p" sx={{ color: "gray" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ipsa
            eum impedit sapiente eligendi optio voluptatibus dolore sint labore
            illo.
          </Typography>
          <div style={{ margin: "15px 0" }}>
            <Link href="/menu">
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{ marginRight: "15px", borderRadius: "50px" }}
              >
                Oreder Now
              </Button>
            </Link>
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: "50px" }}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            width: "300px",
            justifySelf: "center",
          }}
        >
          <Image
            className="hidden md:block md:height-0"
            src="/assets/pizza-on-transparent-background-free-png.png"
            alt="Pizza"
            loading="eager"
            priority
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
      </Box>
    </section>
  );
}

export default Hero;
