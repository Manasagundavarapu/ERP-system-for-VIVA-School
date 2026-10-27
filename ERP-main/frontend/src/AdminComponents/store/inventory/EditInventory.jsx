import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";

export default function ResponsiveDialog({
  name,
  qty,
  newQty,
  setnewQty,
  onSubmit,
  open,
  setOpen,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Change Item Inventory</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={name}
              readOnly
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Current Quantity</label>
            <input
              type="text"
              value={qty}
              readOnly
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Quantity</label>
            <input
              type="number"
              className="form-control"
              value={newQty}
              {...register("quantity", { required: true })}
              onChange={(e) => setnewQty(e.target.value)}
            />
            {errors.quantity && (
              <span className="text-danger">
                This field is required
              </span>
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <Button type="submit" color="primary">
            Save Changes
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
