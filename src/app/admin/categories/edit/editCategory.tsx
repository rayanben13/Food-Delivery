"use client";

import { Fragment, useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useActionState } from "react";
import { editCategoryAction } from "./actions";
import { Category } from "@prisma/client";
import { FormState } from "../add/actions";

interface Props {
  category: Category;
}

export default function EditCategory({ category }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);

  const [state, formAction, pending] = useActionState(
    editCategoryAction.bind(null, category.id),
    {} as FormState
  );
  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state?.success]);
  return (
    <Fragment>
      <Button variant="outlined" onClick={() => setOpen(true)} sx={{ mr: 1 }}>
        <Edit />
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Category Name</DialogTitle>

        <DialogContent>
          <form action={formAction} id={`edit-category-form-${category.id}`}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(state?.error)}
              helperText={state?.error}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            form={`edit-category-form-${category.id}`}
            disabled={pending}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
