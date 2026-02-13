import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { SaveIcon } from "lucide-react";

export default function LoadingButtons() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Button
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
