import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Extras } from "../../constants/enum";

export default function PizzaExtras({ extras, setExtras, item }) {
  const toggleExtra = (value: string) => {
    if (extras.includes(value)) {
      setExtras(extras.filter((e) => e !== value));
    } else {
      setExtras([...extras, value]);
    }
  };

  const isKebabDefault = item.name.toLowerCase().includes("kebab");
  const isKoftaDefault = item.name.toLowerCase().includes("kofta");
  const isFromage2Default = item.name.includes("2 Fromage");
  const isFromage4Default = item.name.includes("4 Fromage");

  return (
    <FormGroup sx={{ paddingTop: "5px", color: "gray" }}>
      <FormControlLabel
        control={<Checkbox />}
        label={`KEBAB $${Extras.KEBAB}`}
        checked={extras.includes("KEBAB") || isKebabDefault}
        disabled={isKebabDefault}
        onChange={() => toggleExtra("KEBAB")}
      />

      <FormControlLabel
        control={<Checkbox />}
        label={`KEFTA $${Extras.KOFTA}`}
        checked={extras.includes("KOFTA") || isKoftaDefault}
        disabled={isKoftaDefault}
        onChange={() => toggleExtra("KOFTA")}
      />

      <FormControlLabel
        control={<Checkbox />}
        label={`2 FROMAGE $${Extras.FROMAGE_2}`}
        checked={extras.includes("FROMAGE_2") || isFromage2Default}
        disabled={isFromage2Default}
        onChange={() => toggleExtra("FROMAGE_2")}
      />

      <FormControlLabel
        control={<Checkbox />}
        label={`4 FROMAGE $${Extras.FROMAGE_4}`}
        checked={extras.includes("FROMAGE_4") || isFromage4Default}
        disabled={isFromage4Default}
        onChange={() => toggleExtra("FROMAGE_4")}
      />
    </FormGroup>
  );
}
