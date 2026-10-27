import React from "react";
import { useForm } from "react-hook-form";

export default function AddClassGroup({ name, setname, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="content__container">
      <h3>Add New Class Group</h3>

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

      <button disabled={loading} type="submit" className="btn blue__btn">
        {loading && (
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          />
        )}
        Add
      </button>
    </form>
  );
}
