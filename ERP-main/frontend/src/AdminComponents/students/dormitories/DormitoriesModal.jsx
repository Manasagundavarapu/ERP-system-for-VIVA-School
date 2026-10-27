import React from "react";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
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
  root: { padding: theme.spacing(2) },
}))(MuiDialogContent);

function EditCampuses({ open, setopen, name, setname, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name },
  });

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={() => setopen(false)}>
      <DialogTitle onClose={() => setopen(false)}>
        Edit Dormitories
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn blue__btn offset-sm-2 col-sm-3"
          >
            {loading && (
              <span className="spinner-border spinner-border-sm me-2" />
            )}
            Save Changes
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCampuses;
