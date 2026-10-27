import React from "react";

function Contact(props) {
  const {
    setmobilenumber,
    mobilenumber,
    settelephone,
    residence,
    setresidence,
    telephone,
    postalAddress,
    errors,
    register,
    setpostalAddress,
  } = props;

  return (
    <div>
      <h3>Contact Details</h3>

      {/* PHONE NUMBERS */}
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6">
          <label className="form-label">Mobile Number</label>
          <input
            name="mobile"
            type="tel"
            value={mobilenumber}
            {...register("mobile", { required: true })}
            onChange={(e) => setmobilenumber(e.target.value)}
            className="form-control"
            placeholder="Phone number"
          />
          {errors.mobile && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="col-xs-12 col-sm-6">
          <label className="form-label">Phone Number</label>
          <input
            name="phone"
            type="tel"
            value={telephone}
            {...register("phone", { required: true })}
            onChange={(e) => settelephone(e.target.value)}
            className="form-control"
            placeholder="Phone number"
          />
          {errors.phone && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
      </div>

      {/* ADDRESS */}
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6">
          <label className="form-label">Area of Residence</label>
          <textarea
            rows={3}
            name="residence"
            value={residence}
            {...register("residence", { required: true })}
            onChange={(e) => setresidence(e.target.value)}
            className="form-control"
          />
          {errors.residence && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="col-xs-12 col-sm-6">
          <label className="form-label">Postal Address</label>
          <textarea
            rows={3}
            value={postalAddress}
            onChange={(e) => setpostalAddress(e.target.value)}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
