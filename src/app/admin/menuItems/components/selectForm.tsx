import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Category } from "../form";

export default function SelectSmall({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <FormControl fullWidth size="small">
      <Select
        name="categoryId" // 🔥 مهم جدًا
        defaultValue=""
      >
        <MenuItem value="">
          <em>Select category</em>
        </MenuItem>

        {categories.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
