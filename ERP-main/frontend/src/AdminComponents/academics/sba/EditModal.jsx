import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  setOpen,
  name,
  userID,
  exam,
  setexam,
  classWork,
  setclassWork,
  onSubmit,
  classID,
  loading,
  position,
  setposition,
  classworkMark,
  examMark,
}) {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      classWork,
      exam,
    },
  });

  const handleClose = () => {
    setposition("");
    setclassWork("");
    setexam("");
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar color="transparent" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {name} - {userID}
          </Typography>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <form className="m-5" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-5">Set Grades for Class {classID}</h3>

        {/* CLASS WORK */}
        <div className="mb-3">
          <label className="form-label">
            Class Work (out of {Number(classworkMark || 0)})
          </label>
          <input
            type="number"
            className="form-control col-sm-6"
            {...register("classWork", {
              min: 0,
              max: Number(classworkMark || 0),
            })}
            onChange={(e) => setclassWork(e.target.value)}
          />
          {errors.classWork && (
            <span className="text-danger">
              Must be between 0 and {Number(classworkMark || 0)}
            </span>
          )}
        </div>

        {/* EXAM */}
        <div className="mb-5">
          <label className="form-label">
            Exam Mark (out of {Number(examMark || 0)})
          </label>
          <input
            type="number"
            className="form-control col-6"
            {...register("exam", {
              min: 0,
              max: Number(examMark || 0),
            })}
            onChange={(e) => setexam(e.target.value)}
          />
          {errors.exam && (
            <span className="text-danger">
              Must be between 0 and {Number(examMark || 0)}
            </span>
          )}
        </div>

        {/* SUBMIT */}
        <button disabled={loading} type="submit" className="btn blue__btn">
          {loading && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            />
          )}
          Submit Changes
        </button>
      </form>
    </Dialog>
  );
}
