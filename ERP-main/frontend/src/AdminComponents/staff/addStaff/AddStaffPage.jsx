import React, { useState } from "react";
import PersonalInfo from "../../shared/Personalnfo";
import EmplymentDetails from "./EmploymentDetails";
import ContactDetails from "../../shared/Contact";
import ProfilePicture from "../../shared/ProfilePicture";
import NextofKin from "../../shared/NextofKin";
import { useForm } from "react-hook-form";
import { errorAlert, successAlert } from "../../../utils";
import axios from "../../../store/axios";
import { useSelector, useDispatch } from "react-redux";
import { selectStaff, setStaff } from "../../../store/slices/schoolSlice";
import imageCompression from "browser-image-compression";

function NewStaff() {
  const dispatch = useDispatch();
  const staff = useSelector(selectStaff);

  /* ======================
     RHF v7 FIX (CRITICAL)
     ====================== */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // personal
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [secondName, setsecondName] = useState("");
  const [gender, setgender] = useState("");
  const [dateofBirth, setdateofBirth] = useState("");
  const [email, setemail] = useState("");
  const [nationality, setnationality] = useState("");
  const [placeofBirth, setplaceofBirth] = useState("");
  const [religion, setreligion] = useState("");
  const [title, settitle] = useState("");
  const [health, sethealth] = useState("");
  const [allege, setallege] = useState("");
  const [disease, setdisease] = useState("");

  // employment
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [campus, setCampus] = useState("");
  const [employmentDate, setemploymentDate] = useState("");
  const [qualification, setqualification] = useState("");
  const [years, setyears] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [bank, setbank] = useState("");
  const [ssnit, setssnit] = useState(false);
  const [taxNumber, settaxNumber] = useState("");
  const [salary, setsalary] = useState("");
  const [allowance, setallowance] = useState("");

  // contact
  const [mobilenumber, setmobilenumber] = useState("");
  const [residence, setresidence] = useState("");
  const [telephone, settelephone] = useState("");
  const [postalAddress, setpostalAddress] = useState("");

  // next of kin
  const [nexttelephone, setnexttelephone] = useState("");
  const [nextname, setnextname] = useState("");
  const [nextlastname, setnextlastname] = useState("");
  const [nextemail, setnextemail] = useState("");
  const [relationship, setrelationship] = useState("");
  const [occupation, setoccupation] = useState("");
  const [address, setaddress] = useState("");

  // profile image
  const [profileUrl, setprofileUrl] = useState("");
  const [profileimg, setprofileimg] = useState("");
  const [loading, setloading] = useState(false);

  const handleCreateSubmit = async () => {
    setloading(true);
    let path = "";

    if (profileUrl) {
      const fileResponse = await axios.post("/upload", {
        dataUrl: profileimg,
      });
      path = fileResponse.data.url;
    }

    axios
      .post("/api/teachers/create", {
        profileUrl: path,
        name,
        middleName: secondName,
        surname: lastname,
        gender,
        title,
        dateofBirth,
        email,
        nationality,
        religion,
        placeofBirth,
        bank,
        accountNumber,
        qualifications: qualification,
        campusID: campus,
        employmentDate,
        health,
        disease,
        allege,
        allowance,
        department,
        years,
        salary,
        ssnit,
        taxNumber,
        position: role,
        mobilenumber,
        telephone,
        postalAddress,
        physicalAddress: residence,
        nextofKin: {
          name: nextname,
          relationship,
          occupation,
          email: nextemail,
          mobile: nexttelephone,
          address,
          lastname: nextlastname,
        },
      })
      .then(async (response) => {
        setloading(false);
        if (response.data.error) {
          errorAlert(response.data.error);
          return;
        }

        dispatch(setStaff([response.data.teacher, ...staff]));
        await axios.post("/api/activitylog/create", {
          activity: `staff member ${name} ${lastname} was created`,
          user: "admin",
        });

        successAlert("Successfully added");
      })
      .catch(() => {
        setloading(false);
        errorAlert("Something went wrong");
      });
  };

  return (
    <div>
      <h2>Add New Staff Member</h2>

      <form className="content__container">
        <ProfilePicture
          profileimg={profileimg}
          profileUrl={profileUrl}
          setprofileUrl={setprofileUrl}
        />

        <PersonalInfo
          register={register}
          errors={errors}
          isTeacher
          title={title}
          setTitle={settitle}
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

        <EmplymentDetails
          register={register}
          errors={errors}
          role={role}
          setRole={setRole}
          department={department}
          setDepartment={setDepartment}
          campus={campus}
          setCampus={setCampus}
          employmentDate={employmentDate}
          setemploymentDate={setemploymentDate}
          qualification={qualification}
          setqualification={setqualification}
          years={years}
          setyears={setyears}
          bank={bank}
          setbank={setbank}
          accountNumber={accountNumber}
          setaccountNumber={setaccountNumber}
          salary={salary}
          setsalary={setsalary}
          allowance={allowance}
          setallowance={setallowance}
          ssnit={ssnit}
          setssnit={setssnit}
          taxNumber={taxNumber}
          settaxNumber={settaxNumber}
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

        <NextofKin
          register={register}
          errors={errors}
          name={nextname}
          setname={setnextname}
          lastname={nextlastname}
          setlastname={setnextlastname}
          telephone={nexttelephone}
          settelephone={setnexttelephone}
          email={nextemail}
          setemail={setnextemail}
          relationship={relationship}
          setrelationship={setrelationship}
          occupation={occupation}
          setoccupation={setoccupation}
          address={address}
          setaddress={setaddress}
        />

        <div className="row mt-4">
          <button
            type="submit"
            onClick={handleSubmit(handleCreateSubmit)}
            disabled={loading}
            className="btn orange__btn"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewStaff;