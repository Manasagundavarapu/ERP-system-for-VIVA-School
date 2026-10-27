import React, { useState, useEffect } from "react";
import AddCampus from "./AddCampus";
import ListCampus from "../../shared/ListTable";
import EditCampus from "./EditCampuses";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import { useDispatch } from "react-redux";
import { setCampuses } from "../../../store/slices/schoolSlice";

const tableHeader = [
  { id: "name", name: "Name" },
  { id: "location", name: "Location" },
  { id: "createdAt", name: "Added" },
];

function Campuses() {
  const [openEdit, setopenEdit] = useState(false);
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [editname, seteditname] = useState("");
  const [editlocation, seteditlocation] = useState("");
  const [id, setid] = useState("");
  const [loading, setloading] = useState(false);
  const [createLoading, setcreateLoading] = useState(false);
  const [campuses, setcampuses] = useState([]);

  const dispatch = useDispatch();

  // ✅ FIX 1: load campuses into BOTH local + redux
  useEffect(() => {
    axios.get("/api/campuses").then((res) => {
      setcampuses(res.data);
      dispatch(setCampuses(res.data));   // ← IMPORTANT
    });
  }, [dispatch]);

  const handleDelete = (delID) => {
    setloading(true);

    axios
      .delete(`/api/campuses/delete/${delID}`)
      .then(async (res) => {
        setloading(false);

        if (res.data.error) {
          errorAlert(res.data.error);
          return;
        }

        const newData = campuses.filter((i) => i._id !== delID);

        // ✅ FIX 2: update BOTH
        setcampuses(newData);
        dispatch(setCampuses(newData));

        await axios.post("/api/activitylog/create", {
          activity: `campus ${delID} was deleted`,
          user: "admin",
        });
      })
      .catch(() => {
        setloading(false);
        errorAlert("something went wrong");
      });
  };

  const handleEdit = (editID) => {
    setopenEdit(true);

    let editCampus = campuses.find((e) => e._id === editID);

    seteditlocation(editCampus?.location);
    seteditname(editCampus?.name);
    setid(editCampus?._id);
  };

  const onEdit = () => {
    setloading(true);

    axios
      .put(`/api/campuses/update/${id}`, {
        name: editname,
        location: editlocation,
      })
      .then(async (res) => {
        setloading(false);
        setopenEdit(false);

        if (res.data.error) {
          errorAlert(res.data.error);
          return;
        }

        successAlert("Campus successfully edited");

        const updated = campuses.map((i) =>
          i._id === id ? res.data.doc : i
        );

        // ✅ FIX 3: update BOTH
        setcampuses(updated);
        dispatch(setCampuses(updated));

        await axios.post("/api/activitylog/create", {
          activity: `campus ${editname} was edited`,
          user: "admin",
        });
      })
      .catch(() => {
        setloading(false);
        errorAlert("something went wrong");
      });
  };

  const handleAddCampus = () => {
    setcreateLoading(true);

    axios
      .post("/api/campuses/create", { name, location })
      .then(async (res) => {
        setcreateLoading(false);

        if (res.data.error) {
          errorAlert("something went wrong");
          return;
        }

        successAlert("successfully created");

        const newData = [res.data.doc, ...campuses];

        // ✅ FIX 4: update BOTH
        setcampuses(newData);
        dispatch(setCampuses(newData));

        await axios.post("/api/activitylog/create", {
          activity: `new campus ${name} was created`,
          user: "admin",
        });

        setname("");
        setlocation("");
      })
      .catch(() => {
        setcreateLoading(false);
        errorAlert("something went wrong");
      });
  };

  return (
    <div>
      <h3>Campuses</h3>

      <div className="row">
        <div className="col-sm-12 mb-5">
          <AddCampus
            loading={createLoading}
            name={name}
            location={location}
            setname={setname}
            setlocation={setlocation}
            onSubmit={handleAddCampus}
          />
        </div>

        <div className="col-sm-12">
          <ListCampus
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            data={campuses}
            tableHeader={tableHeader}
          />
        </div>
      </div>

      <EditCampus
        open={openEdit}
        loading={loading}
        setopen={setopenEdit}
        name={editname}
        location={editlocation}
        setname={seteditname}
        setlocation={seteditlocation}
        onSubmit={onEdit}
      />
    </div>
  );
}

export default Campuses;
