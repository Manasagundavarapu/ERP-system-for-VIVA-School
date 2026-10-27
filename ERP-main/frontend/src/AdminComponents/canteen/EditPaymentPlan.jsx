import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

export default function FormDialog({
  open,
  setOpen,
  descriptions,
  setdescriptions,
  prices,
  setprices,
  name,
  setname,
  title,
  settitle,
  isAdd,
  isPlans,
  onSubmit,
  loading,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => setOpen(false);

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

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={handleClose}>
      <DialogTitle onClose={handleClose}>
        Set Canteen Payment Plan
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Plan 1</th>
                <th>Plan 2</th>
                <th>Plan 3</th>
              </tr>
            </thead>
            <tbody>
              {isPlans && (
                <>
                  {/* PLAN NAME */}
                  <tr>
                    <th>Plan Name</th>
                    {[1, 2, 3].map((i) => (
                      <td key={i}>
                        <input
                          className="form-control"
                          value={name?.[`plan${i}`] || ""}
                          {...register(`name${i}`, { required: true })}
                          onChange={(e) =>
                            setname({
                              ...name,
                              [`plan${i}`]: e.target.value,
                            })
                          }
                        />
                        {errors[`name${i}`] && (
                          <div className="text-danger">
                            This field is required
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* PRICE */}
                  <tr>
                    <th>Plan Price</th>
                    {[1, 2, 3].map((i) => (
                      <td key={i}>
                        <input
                          type="number"
                          className="form-control"
                          value={prices?.[`plan${i}`] || ""}
                          {...register(`price${i}`, { required: true })}
                          onChange={(e) =>
                            setprices({
                              ...prices,
                              [`plan${i}`]: e.target.value,
                            })
                          }
                        />
                        {errors[`price${i}`] && (
                          <div className="text-danger">
                            This field is required
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* DESCRIPTION / ADD SERVICE */}
              <tr>
                {isAdd ? (
                  <th>
                    <input
                      className="form-control"
                      value={title}
                      {...register("title", { required: true })}
                      onChange={(e) => settitle(e.target.value)}
                    />
                    {errors.title && (
                      <div className="text-danger">
                        This field is required
                      </div>
                    )}
                  </th>
                ) : (
                  <th>{descriptions?.name || "Description"}</th>
                )}

                {[1, 2, 3].map((i) => (
                  <td key={i}>
                    <textarea
                      rows={3}
                      className="form-control"
                      value={descriptions?.[`plan${i}`] || ""}
                      {...register(`description${i}`, { required: true })}
                      onChange={(e) =>
                        setdescriptions({
                          ...descriptions,
                          [`plan${i}`]: e.target.value,
                        })
                      }
                    />
                    {errors[`description${i}`] && (
                      <div className="text-danger">
                        This field is required
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </DialogContent>

        <DialogActions>
          <Button type="submit" disabled={loading} color="primary">
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
