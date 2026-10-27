import React from "react";
import { useForm } from "react-hook-form";

function CampusForm({
  name,
  setname,
  location,
  setlocation,
  onSubmit,
  isEdit,
  loading
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name,
      location
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* NAME */}
      <div className="row mb-3">
        <label className="col-xs-12 col-md-3 col-form-label">
          Name
        </label>
        <div className="col-sm-12 col-md-9">
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true })}
            onChange={(e) => setname(e.target.value)}
          />
          {errors.name && (
            <span className="form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>

      {/* LOCATION */}
      <div className="row mb-3">
        <label className="col-xs-12 col-md-3 col-form-label">
          Location
        </label>
        <div className="col-sm-12 col-md-9">
          <textarea
            rows={3}
            className="form-control"
            {...register("location", { required: true })}
            onChange={(e) => setlocation(e.target.value)}
          />
        </div>
      </div>

      {/* BUTTON */}
      <div className="row mb-3">
        <div className="offset-md-3 col-xs-12 col-md-9">
          <button
            disabled={loading}
            type="submit"
            className="btn blue__btn"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {isEdit ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CampusForm;
