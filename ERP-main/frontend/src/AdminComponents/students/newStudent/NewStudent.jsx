import React, { useState } from "react";
import PersonalInfo from "../../shared/Personalnfo";
import Academics from "./AcademicsDetails";
import ContactDetails from "../../shared/Contact";
import ProfilePicture from "../../shared/ProfilePicture";
import Guadian from "../../shared/Guadian";
import GuadianCard from "../../shared/GuadianCard";
import { useForm } from "react-hook-form";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

function NewStudent() {
  // ===================== FORM (RHF v7 FIX) =====================
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ===================== PERSONAL =====================
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [secondName, setsecondName] = useState("");
  const [gender, setgender] = useState("");
  const [dateofBirth, setdateofBirth] = useState("");
  const [email, setemail] = useState("");
  const [nationality, setnationality] = useState("");
  const [placeofBirth, setplaceofBirth] = useState("");
  const [religion, setreligion] = useState("");
  const [health, sethealth] = useState("");
  const [allege, setallege] = useState("");
  const [disease, setdisease] = useState("");

  // ===================== PROFILE =====================
  const [profileUrl, setprofileUrl] = useState("");
  const [profileimg, setprofileimg] = useState("");

  // ===================== ACADEMICS =====================
  const [autoID, setautoID] = useState(true);
  const [userID, setuserID] = useState("");
  const [classID, setclass] = useState("");
  const [section, setsection] = useState("");
  const [division, setdivision] = useState("");
  const [campus, setcampus] = useState("");
  const [status, setstatus] = useState("");
  const [dormitory, setdormitory] = useState("");
  const [schoolarship, setschoolarship] = useState("");
  const [feesCategory, setfeesCategory] = useState("");
  const [lastSchool, setlastSchool] = useState("");
  const [reasonforTransfer, setreasonforTransfer] = useState("");

  // ===================== CONTACT =====================
  const [mobilenumber, setmobilenumber] = useState("");
  const [residence, setresidence] = useState("");
  const [telephone, settelephone] = useState("");
  const [postalAddress, setpostalAddress] = useState("");

  // ===================== GUARDIAN =====================
  const [guadian, setguadian] = useState([]);

  // ===================== UI =====================
  const [loading, setloading] = useState(false);

  // ===================== FILE UPLOAD =====================
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2_000_000) {
      errorAlert("Image is too large");
      return;
    }

    setprofileUrl(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setprofileimg(reader.result);
  };

  // ===================== RESET =====================
  const handleReset = () => {
    setautoID(true);
    setuserID("");
    setclass("");
    setsection("");
    setdivision("");
    setcampus("");
    setstatus("");
    setdormitory("");
    setschoolarship("");
    setfeesCategory("");
    setlastSchool("");
    setreasonforTransfer("");
    setmobilenumber("");
    settelephone("");
    setpostalAddress("");
    setresidence("");
    setguadian([]);

    setname("");
    setsecondName("");
    setlastname("");
    setgender("");
    setdateofBirth("");
    setemail("");
    setnationality("");
    setplaceofBirth("");
    setreligion("");
    sethealth("");
    setallege("");
    setdisease("");
    setprofileUrl("");
    setprofileimg("");
  };

  // ===================== SUBMIT =====================
  const handleCreateSubmit = async () => {
    try {
      setloading(true);

      let imagePath = "";
      if (profileUrl) {
        const uploadRes = await axios.post("/api/upload", {
          dataUrl: profileimg,
        });
        imagePath = uploadRes?.data?.url;
      }

      const res = await axios.post("/api/students/create", {
        profileUrl: imagePath,
        userID: autoID ? null : userID,
        name,
        middleName: secondName,
        surname: lastname,
        gender,
        dateofBirth,
        email,
        nationality,
        religion,
        placeOfBirth: placeofBirth,
        health,
        disease,
        allege,
        classID,
        division,
        dormitoryID: dormitory,
        section,
        status,
        campusID: campus,
        scholarship: schoolarship,
        fees: feesCategory,
        lastSchool: {
          school: lastSchool,
          reason: reasonforTransfer,
        },
        mobilenumber,
        telephone,
        postalAddress,
        physicalAddress: residence,
        guadian,
      });

      if (res.data?.error) {
        errorAlert(res.data.error);
        setloading(false);
        return;
      }

      await axios.post("/api/activitylog/create", {
        activity: `student ${name} ${lastname} was created`,
        user: "admin",
      });

      successAlert(`Student ${res.data.student.userID} successfully added`);
      handleReset();
    } catch (err) {
      console.error(err);
      errorAlert("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  // ===================== RENDER =====================
  return (
    <div>
      <h2>Add New Student</h2>

      <form className="content__container">
        <ProfilePicture
          profileimg={profileimg}
          profileUrl={profileUrl}
          setprofileUrl={handleChangeFile}
        />

        <PersonalInfo
          register={register}
          errors={errors}
          name={name}
          setname={setname}
          secondName={secondName}
          setsecondName={setsecondName}
          lastname={lastname}
          setlastname={setlastname}
          gender={gender}
          setgender={setgender}
          dateofBirth={dateofBirth}
          setdateofBirth={setdateofBirth}
          email={email}
          setemail={setemail}
          nationality={nationality}
          setnationality={setnationality}
          placeofBirth={placeofBirth}
          setplaceofBirth={setplaceofBirth}
          religion={religion}
          setreligion={setreligion}
          healthCon={health}
          setHealthCon={sethealth}
          disease={disease}
          setDisease={setdisease}
          allerge={allege}
          setallerge={setallege}
        />

        <Academics
          register={register}
          errors={errors}
          autoID={autoID}
          setautoID={setautoID}
          userID={userID}
          setuserID={setuserID}
          classID={classID}
          setclass={setclass}
          division={division}
          setdivision={setdivision}
          section={section}
          setsection={setsection}
          status={status}
          setstatus={setstatus}
          dormitory={dormitory}
          setdormitory={setdormitory}
          schoolarship={schoolarship}
          setschoolarship={setschoolarship}
          feesCategory={feesCategory}
          setfeesCategory={setfeesCategory}
          lastSchool={lastSchool}
          setlastSchool={setlastSchool}
          reasonforTransfer={reasonforTransfer}
          setreasonforTransfer={setreasonforTransfer}
          campus={campus}
          setcampus={setcampus}
        />

        <ContactDetails
          register={register}
          errors={errors}
          mobilenumber={mobilenumber}
          setmobilenumber={setmobilenumber}
          residence={residence}
          setresidence={setresidence}
          telephone={telephone}
          settelephone={settelephone}
          postalAddress={postalAddress}
          setpostalAddress={setpostalAddress}
        />

        <Guadian guadian={guadian} setguadian={setguadian} />

        <div className="row">
          {guadian.map((g, i) => (
            <div key={i} className="col-md-6">
              <GuadianCard guadian={g} />
            </div>
          ))}
        </div>

        <div className="row mt-4">
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit(handleCreateSubmit)}
            className="col btn orange__btn me-3"
          >
            {loading ? "Creating..." : "Create"}
          </button>

          <button
            type="button"
            className="col btn blue__btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewStudent;
