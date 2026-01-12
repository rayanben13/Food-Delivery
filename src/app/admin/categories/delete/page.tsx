"use client";
import { Delete } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import {
  forwardRef,
  Fragment,
  ReactElement,
  useActionState,
  useState,
} from "react";
import { deleteCategoryAction, DeleteState } from "./actions";
import Slide from "@mui/material/Slide";

const Transition = forwardRef<
  HTMLDivElement,
  TransitionProps & { children: ReactElement }
>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState: DeleteState = {
  success: false,
};

export default function DeleteCategory({ categoryId }: { categoryId: string }) {
  const [open, setOpen] = useState(false);

  const [state, formAction, pending] = useActionState(
    deleteCategoryAction.bind(null, categoryId),
    initialState
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button color="error" variant="outlined" onClick={handleClickOpen}>
        <Delete />
      </Button>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Category"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure want to delete this category?
          </DialogContentText>
          {state.error && (
            <DialogContentText color="error">{state.error}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <form action={formAction}>
            <Button
              type="submit"
              color="error"
              variant="contained"
              disabled={pending}
            >
              {pending ? "Deleting..." : "Delete"}
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
