"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { addCategory, FormState } from "./actions";
import { useActionState } from "react";

const initialState: FormState = {
  success: false,
  error: undefined,
};

export default function AddCategoryPage() {
  const [state, formAction, isPending] = useActionState(
    addCategory,
    initialState
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
            Add Category
          </Typography>

          <form action={formAction}>
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Category Name"
                fullWidth
                error={Boolean(state.error)}
                helperText={state.error}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
