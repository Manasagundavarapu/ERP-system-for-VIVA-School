import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
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
        <IconButton className={classes.closeButton} onClick={onClose}>
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

export default function CustomizedDialogs({
  name,
  setname,
  open,
  setOpen,
  loading,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fees: name,
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle onClose={handleClose}>
        Add New Fees Type
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <label className="col-12 form-label">Fees Name</label>
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                {...register("fees", { required: true })}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            {errors.fees && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="btn blue__btn"
          >
            {loading && (
              <span className="spinner-border spinner-border-sm me-2" />
            )}
            Submit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
