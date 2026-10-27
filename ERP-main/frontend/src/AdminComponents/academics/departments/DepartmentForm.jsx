import React from "react";
import { useForm } from "react-hook-form";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

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
  root: { padding: theme.spacing(2) },
}))(MuiDialogContent);

function CourseForm({
  name,
  setname,
  description,
  setdescription,
  setOpen,
  open,
  onSubmit,
  loading,
  isEdit,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      description,
    },
  });

  const handleClose = () => {
    setOpen(false);
    setname("");
    setdescription("");
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle onClose={handleClose}>
        {isEdit ? "Edit Division" : "Add New Division"}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              {...register("name", { required: true })}
              onChange={(e) => setname(e.target.value)}
            />
            {errors.name && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              {...register("description", { required: true })}
              onChange={(e) => setdescription(e.target.value)}
            />
            {errors.description && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <button disabled={loading} type="submit" className="btn blue__btn">
            {loading && (
              <span className="spinner-border spinner-border-sm me-2" />
            )}
            {isEdit ? "Save Changes" : "Add"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CourseForm;
