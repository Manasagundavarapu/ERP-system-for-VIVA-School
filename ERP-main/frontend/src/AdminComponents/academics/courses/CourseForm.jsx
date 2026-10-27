import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import {
  selectDepartments,
  selectClasses,
} from "../../../store/slices/schoolSlice";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { IconButton } from "@material-ui/core";

function CourseForm(props) {
  const [teachers, setteachers] = useState([]);
  const departments = useSelector(selectDepartments);
  const classes = useSelector(selectClasses);

  const {
    type,
    teacher,
    setteacher,
    settype,
    name,
    setname,
    code,
    setcode,
    onSubmit,
    loading,
    isEdit,
    setclassesArr,
    classesArr,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      code,
    },
  });

  useEffect(() => {
    axios.get("/api/teachers/teachers").then((res) => {
      setteachers(res.data);
    });
  }, []);

  const handleSetClassClass = (val, id) => {
    setclassesArr(
      classesArr.map((e) =>
        e._id === id ? { ...e, class: val } : e
      )
    );
  };

  const handleSetClassTeacher = (val, id) => {
    setclassesArr(
      classesArr.map((e) =>
        e._id === id ? { ...e, teacher: val } : e
      )
    );
  };

  const handleAddClass = () => {
    setclassesArr([
      ...classesArr,
      { _id: Math.random().toString(16).slice(2), class: "", teacher: "" },
    ]);
  };

  const handleDeleteClass = (id) => {
    setclassesArr(classesArr.filter((i) => i._id !== id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* COURSE NAME */}
      <div className="mb-3">
        <label className="form-label">Course Name</label>
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

      {/* COURSE CODE */}
      {!isEdit && (
        <div className="mb-3">
          <label className="form-label">Course Code</label>
          <input
            type="text"
            className="form-control"
            {...register("code", { required: true })}
            onChange={(e) => setcode(e.target.value)}
          />
          {errors.code && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
      )}

      {/* DEPARTMENT */}
      <div className="mb-3">
        <label className="form-label">Department</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => settype(e.target.value)}
        >
          <option value="" hidden>
            Choose...
          </option>
          {departments.length > 0 ? (
            departments.map((d) => (
              <option key={d._id} value={d.code}>
                {d.name}
              </option>
            ))
          ) : (
            <option disabled>No departments yet</option>
          )}
        </select>
      </div>

      {/* CLASSES */}
      <div className="mb-3">
        <label className="form-label">Classes</label>

        {classesArr.map((c) => (
          <div className="row mb-2" key={c._id}>
            <div className="col-sm-5">
              <select
                className="form-select"
                value={c.class}
                onChange={(e) =>
                  handleSetClassClass(e.target.value, c._id)
                }
              >
                <option value="" hidden>
                  Choose...
                </option>
                {classes.map((cl) => (
                  <option key={cl._id} value={cl.classCode}>
                    {cl.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-sm-5">
              <select
                className="form-select"
                value={c.teacher}
                onChange={(e) =>
                  handleSetClassTeacher(e.target.value, c._id)
                }
              >
                <option value="" hidden>
                  Choose...
                </option>
                {teachers.map((t) => (
                  <option key={t._id} value={t.userID}>
                    {t.name} {t.surname}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-sm-2">
              <IconButton onClick={() => handleDeleteClass(c._id)}>
                <HighlightOffIcon />
              </IconButton>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn"
          onClick={handleAddClass}
        >
          <AddCircleOutlineIcon /> Add Class
        </button>
      </div>

      {/* HEAD TEACHER */}
      <div className="mb-4">
        <label className="form-label">Head Teacher</label>
        <select
          className="form-select"
          value={teacher}
          onChange={(e) => setteacher(e.target.value)}
        >
          <option value="" hidden>
            Choose...
          </option>
          {teachers.map((t) => (
            <option key={t.userID} value={t.userID}>
              {t.name} {t.surname}
            </option>
          ))}
        </select>
      </div>

      {/* SUBMIT */}
      <button disabled={loading} type="submit" className="btn blue__btn">
        {loading && (
          <span className="spinner-border spinner-border-sm me-2" />
        )}
        {isEdit ? "Save Changes" : "Add"}
      </button>
    </form>
  );
}

export default CourseForm;
