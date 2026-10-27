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
  name,
  salary,
  allowance,
  bonus,
  setname,
  setsalary,
  isAdd,
  loading,
  onSubmit,
  setallowance,
  setbonus,
}) {
  /* ✅ RHF v7 CORRECT */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => setOpen(false);

  return (
    <Dialog onClose={handleClose} fullWidth maxWidth="sm" open={open}>
      <DialogTitle onClose={handleClose}>
        {isAdd ? "Add New Staff Position" : "Edit Staff Position"}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className="mb-3">
            <label>Position Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              {...register("name", { required: true })}
              onChange={(e) => setname(e.target.value)}
              readOnly={!isAdd}
            />
            {errors.name && (
              <div className="text-danger">Required</div>
            )}
          </div>

          <div className="mb-3">
            <label>Salary</label>
            <input
              type="number"
              className="form-control"
              value={salary}
              {...register("salary", { required: true })}
              onChange={(e) => setsalary(e.target.value)}
            />
            {errors.salary && (
              <div className="text-danger">Required</div>
            )}
          </div>

          <div className="mb-3">
            <label>Allowance</label>
            <input
              type="number"
              className="form-control"
              value={allowance}
              {...register("allowance", { required: true })}
              onChange={(e) => setallowance(e.target.value)}
            />
            {errors.allowance && (
              <div className="text-danger">Required</div>
            )}
          </div>

          <div className="mb-3">
            <label>Bonus</label>
            <input
              type="number"
              className="form-control"
              value={bonus}
              {...register("bonus", { required: true })}
              onChange={(e) => setbonus(e.target.value)}
            />
            {errors.bonus && (
              <div className="text-danger">Required</div>
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <Button type="submit" color="primary" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm me-2" />
            )}
            {isAdd ? "Add" : "Save Changes"}
          </Button>

          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
