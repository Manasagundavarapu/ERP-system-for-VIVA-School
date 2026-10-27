import React, { useState, useEffect } from "react";
import Search from "./Search";
import StudentsTable from "../../shared/TableListUsers";
import axios from "../../../store/axios";
import { selectClasses } from "../../../store/slices/schoolSlice";
import { useSelector } from "react-redux";
import { errorAlert } from "../../../utils";
import { pdf } from "../../../components/tables/pdf";
import { Link } from "react-router-dom";
import { studentStatus } from "../../../data";
import AddIcon from "@material-ui/icons/Add";
import Loading from "../../../Loading";

const headCells = [
  { id: "userID", numeric: false, disablePadding: false, label: "Student ID" },
  { id: "photoUrl", numeric: false, disablePadding: false, label: "Photo" },
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "middlename", disablePadding: true, label: "Middle Name" },
  { id: "surname", disablePadding: true, label: "Last Name" },
  { id: "status", disablePadding: false, label: "Status" },
  { id: "classID", disablePadding: false, label: "Class" },
  { id: "gender", disablePadding: false, label: "Gender" },
];

function AllStudents() {
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [classID, setclass] = useState("");
  const [status, setstatus] = useState("");
  const [students, setstudents] = useState([]);
  const [gender, setgender] = useState("");
  const classes = useSelector(selectClasses);
  const [storeData, setstoreData] = useState([]);
  const [loading, setloading] = useState(false);

  const classesOptions = classes.map((e) => ({
    name: e.name,
    id: e.classCode,
  }));

  /* =========================
     FETCH ALL STUDENTS
     ========================= */
  useEffect(() => {
    setloading(true);
    axios
      .get("/api/students")
      .then((res) => {
        setstudents(res.data);
        setstoreData(res.data);
        setloading(false);
      })
      .catch(() => {
        setloading(false);
        errorAlert("Failed to load students");
      });
  }, []);

  /* =========================
     PDF DOWNLOAD
     ========================= */
  const generatePDF = () => {
    const headers = [
      { key: "userID", label: "User ID" },
      { key: "name", label: "Name" },
      { key: "middleName", label: "Middle Name" },
      { key: "surname", label: "Surname" },
      { key: "gender", label: "Gender" },
      { key: "status", label: "Status" },
      { key: "classID", label: "Class" },
    ];

    pdf({ data: students, headers, filename: "All_Students" });
  };

  /* =========================
     RESET FILTERS
     ========================= */
  const handleReset = (e) => {
    e.preventDefault();
    setname("");
    setid("");
    setclass("");
    setstatus("");
    setgender("");
    setstudents(storeData);
  };

  /* =========================
     SEARCH CONFIG
     ========================= */
  const inputFields = [
    {
      type: "text",
      value: id,
      label: "Search by Student ID",
      name: "Student ID",
      onChange: setid,
    },
    {
      type: "text",
      label: "Search by Name",
      value: name,
      name: "Name",
      onChange: setname,
    },
    {
      type: "select",
      options: classesOptions,
      label: "Search by Class",
      value: classID,
      name: "class",
      onChange: setclass,
    },
    {
      type: "select",
      options: [
        { id: "female", name: "Female" },
        { id: "male", name: "Male" },
        { id: "other", name: "Other" },
      ],
      label: "Search by Gender",
      value: gender,
      name: "gender",
      onChange: setgender,
    },
    {
      type: "select",
      options: studentStatus,
      label: "Search by Status",
      value: status,
      name: "status",
      onChange: setstatus,
    },
  ];

  /* =========================
     SEARCH LOGIC
     ========================= */
  const handleSearch = (e) => {
    e.preventDefault();

    let filtered = [...storeData];

    if (classID) {
      filtered = filtered.filter((i) =>
        i.classID?.toLowerCase().includes(classID.toLowerCase())
      );
    }

    if (name) {
      filtered = filtered.filter(
        (i) =>
          i.name?.toLowerCase().includes(name.toLowerCase()) ||
          i.surname?.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (id) {
      filtered = filtered.filter((i) =>
        i.userID?.toLowerCase().includes(id.toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter((i) =>
        i.status?.toLowerCase().includes(status.toLowerCase())
      );
    }

    if (gender) {
      filtered = filtered.filter((i) =>
        i.gender?.toLowerCase().includes(gender.toLowerCase())
      );
    }

    setstudents(filtered);
  };

  /* =========================
     DELETE STUDENT
     ========================= */
  const handleDelete = (id) => {
    if (!window.confirm(`Are you sure you want to delete student ${id}?`)) {
      return;
    }

    axios.delete(`/api/user/delete/${id}`).then((res) => {
      if (res.data?.error) {
        errorAlert(res.data.error);
        return;
      }
      setstudents(students.filter((e) => e.userID !== id));
    });
  };

  /* =========================
     WITHDRAW STUDENT
     ========================= */
  const handleWithdraw = (id) => {
    if (
      !window.confirm(`Are you sure you want to withdraw student ${id}?`)
    ) {
      return;
    }

    axios
      .put(`/api/students/update/${id}`, { withdraw: true })
      .then((res) => {
        if (res.data?.error) {
          errorAlert(res.data.error);
          return;
        }
        setstudents(students.filter((e) => e.userID !== id));
      });
  };

  return (
    <div>
      {loading && <Loading />}

      <Search
        title=""
        handleReset={handleReset}
        handleSearch={handleSearch}
        inputFields={inputFields}
      />

      <div className="d-flex justify-content-end mb-3">
        <Link className="btn btn-outline-info" to="/students/new">
          <AddIcon /> Add New Student
        </Link>
      </div>

      <StudentsTable
        route="students"
        handleWithdraw={handleWithdraw}
        handleDelete={handleDelete}
        students={students}
        noData="No students in the database yet"
        headCells={headCells}
      />

      <div className="d-flex justify-content-end">
        <button onClick={generatePDF} className="btn orange__btn">
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default AllStudents;
