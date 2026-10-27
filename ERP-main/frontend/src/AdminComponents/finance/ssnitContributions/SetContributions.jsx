import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose && (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({
  open,
  setOpen,
  percentage,
  setpercentage,
  onSubmit,
  loading,
}) {
  /* ✅ RHF v7 CORRECT */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => setOpen(false);

  return (
    <Dialog onClose={handleClose} fullWidth open={open}>
      <DialogTitle onClose={handleClose}>
        Contributions
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className="mb-4">
            <label className="form-label">
              Set Contribution Percentage
            </label>
            <input
              type="number"
              className="form-control"
              value={percentage}
              {...register("percentage", { required: true })}
              onChange={(e) => setpercentage(e.target.value)}
            />
            {errors.percentage && (
              <div className="text-danger">
                This field is required
              </div>
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            type="submit"
            color="primary"
            disabled={loading}
          >
            Save changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
