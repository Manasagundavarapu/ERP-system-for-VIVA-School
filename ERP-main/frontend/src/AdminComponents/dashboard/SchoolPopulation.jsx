import React from "react";
import { Donut } from "react-svg-donuts";

function Population({ maleStudents = 0, femaleStudents = 0 }) {
  const total = maleStudents + femaleStudents;

  // avoid divide by zero
  const femalePercent = total ? (femaleStudents / total) * 100 : 0;
  const malePercent = total ? (maleStudents / total) * 100 : 0;

  return (
    <div className="content__container attendances">
      <h3>Students</h3>

      {/* Donut for Female Students */}
      <Donut
        size={200}
        thickness={40}
        value={femalePercent}
        colors={["#ffa201", "#051f3e"]}
      />

      <div className="graph__keys row mt-4">
        <div className="col-sm-5">
          <div className="color__box female__color"></div>
          <div className="muted-text">Female Students</div>
          <h6>
            <strong>{femaleStudents}</strong>
          </h6>
        </div>

        <div className="col-sm-5">
          <div className="color__box male__color"></div>
          <div className="muted-text">Male Students</div>
          <h6>
            <strong>{maleStudents}</strong>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Population;
