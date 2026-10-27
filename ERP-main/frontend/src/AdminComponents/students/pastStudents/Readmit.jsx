import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({
  open,
  setOpen,
  user,
  onSubmit,
  classes,
  classID,
  setclass,
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
        Re-admit student {user} to the school
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-5">
          <label className="form-label">Select Class</label>

          <select
            className="form-select"
            value={classID}
            {...register("classID", { required: true })}
            onChange={(e) => setclass(e.target.value)}
          >
            <option value="">Select</option>
            {classes.length > 0 ? (
              classes.map((e) => (
                <option key={e.classCode} value={e.classCode}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data yet</option>
            )}
          </select>

          {errors.classID && (
            <div className="text-danger mt-2">
              This field is required
            </div>
          )}
        </div>

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
