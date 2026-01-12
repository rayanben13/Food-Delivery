import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Size } from "../../constants/enum";

export default function PizzaSize({
  size,
  setSize,
}: {
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <FormControl sx={{ padding: "5px 150px 0 0", color: "gray" }}>
      <RadioGroup
        value={size}
        onChange={(e) => setSize(e.target.value)}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="STANDARD"
        name="pizza-size"
      >
        <FormControlLabel
          value="STANDARD"
          control={<Radio />}
          label={`STANDARD $${Size.STANDARD}`}
        />
        <FormControlLabel
          value="LARGE"
          control={<Radio />}
          label={`LARGE $${Size.LARGE}`}
        />
      </RadioGroup>
    </FormControl>
  );
}
