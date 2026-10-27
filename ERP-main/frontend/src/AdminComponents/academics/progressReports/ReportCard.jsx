import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../store/axios";
import PrintIcon from "@material-ui/icons/Print";

function ReportCard() {
  const { id, year, term } = useParams();
  const [results, setresults] = useState([]);
  const [user, setuser] = useState({});
  const [school, setschool] = useState([]);

  useEffect(() => {
    axios.get("/api/school").then((res) => {
      setschool(res.data);
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      let student = await axios.get(`/api/students/student/${id}`);
      setuser(student.data.student);
      await axios.get(`/apisba/student/${id}/${year}/${term}`).then((res) => {
        setresults(res.data.docs);
        console.log(res.data.docs);
      });
    };
    getData();
  }, [id, year, term]);

  const handlePrint = () => {
    window.print();
  };

  const getTotal = (exams, work) => {
    if (!work && !exams) {
      return "-";
    }
    return Number(exams || 0) + Number(work || 0);
  };

  const getGrade = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    if (num > 95 && num <= 100) {
      return "A+";
    } else if (num > 90 && num <= 95) {
      return "A-";
    } else if (num > 85 && num <= 90) {
      return "B+";
    } else if (num > 80 && num <= 85) {
      return "B-";
    } else if (num > 75 && num <= 80) {
      return "C+";
    } else if (num > 70 && num <= 75) {
      return "C-";
    } else if (num > 65 && num <= 70) {
      return "D+";
    } else if (num > 60 && num <= 65) {
      return "D-";
    } else if (num > 50 && num <= 60) {
      return "E+";
    } else if (num > 40 && num <= 50) {
      return "E-";
    } else if (num > 0 && num <= 50) {
      return "F";
    } else {
      return null;
    }
  };

  const getInterpretation = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    num = Number(num);
    if (num > 75 && num <= 100) {
      return "Excellent";
    } else if (num >= 70 && num <= 74) {
      return "Vert good";
    } else if (num >= 65 && num <= 69) {
      return "Good";
    } else if (num >= 60 && num <= 64) {
      return "Credit";
    } else if (num >= 55 && num <= 59) {
      return "Credit";
    } else if (num >= 50 && num <= 54) {
      return "Credit";
    } else if (num >= 45 && num <= 49) {
      return "Pass";
    } else if (num >= 40 && num <= 44) {
      return "Pass";
    } else if (num >= 0 && num <= 39) {
      return "Failure";
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <button onClick={handlePrint} className="btn blue__btn">
          <PrintIcon />
          Print
        </button>
      </div>
      <div id="section-to-print">
        <div className="text-center">
          <h3>{school?.fullName}</h3>
          <p>
            <strong>{school?.motto}</strong>
          </p>
        </div>
        <div className=" mb-5">
          <div>
            <h5>Report Card</h5>
            <h6>
              Name: {user?.name} {user?.middleName} {user?.surname} - {id}
            </h6>
            <h6>Class: {user?.classID}</h6>
            <h6> Year: {year}</h6>
            <h6>Term:{term}</h6>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Courses</th>
              <th scope="col">Classwork</th>
              <th scope="col">Classwork Percentage</th>
              <th scope="col">Exam</th>
              <th scope="col">Exam Percentage</th>
              <th scope="col">Total %</th>
              <th scope="col">Grade</th>
              <th scope="col">Interpretation</th>
              <th scope="col">Position</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((res) => (
                <tr key={res?._id}>
                  <td>{res?.course}</td>
                  <td>{res.classWork || "-"}</td>
                  <td>{res.classWorkPercentage || "-"}</td>
                  <td>{res?.exam || "-"}</td>
                  <td>{res?.examPercentage || "-"}</td>
                  <td>
                    {getTotal(res?.examPercentage, res.classWorkPercentage)}
                  </td>
                  <td>
                    {getGrade(res?.examPercentage, res.classWorkPercentage)}
                  </td>
                  <td>
                    {getInterpretation(
                      res?.examPercentage,
                      res.classWorkPercentage
                    )}
                  </td>
                  <td>{res?.position || 0} </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center text-danger">
                  <h5>No data yet</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ReportCard;
