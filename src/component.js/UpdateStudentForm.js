import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  set,
  get,
} from "firebase/database";
import { app } from "../utils/firebaseConfig";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateStudentForm() {
  let navigate = useNavigate();
  let firstName = useRef();
  let classDivision = useRef();
  let rollNo = useRef();

  const [initialValues, setInitialValues] = useState({});

  const { firebaseId } = useParams();
  const db = getDatabase(app);

  const formik = useFormik({
    // initialValues: {
    //   firstName: "",
    //   classDivision: "",
    //   rollNo: "",
    // },
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      classDivision: Yup.string().required("Required"),
      rollNo: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);

      const newDocRef = push(ref(db, "database/studentDetails"));
      set(newDocRef, {
        firstName: values.firstName,
        classDivision: values.classDivision,
        rollNo: values.rollNo,
      })
        .then(alert("data save"))
        .catch((error) => {
          alert("error", error.message);
        });
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(db, "database/studentDetails/" + firebaseId);
      const snapshot = await get(dbRef);

      console.log(snapshot);
      //  console.log(snapshot.val());

      if (snapshot.exists()) {
        // console.log('dataexist');
        const dbData = snapshot.val();
        console.log(dbData);

        setInitialValues(dbData);
        // setInitialValues( { firstName : dbData.firstName, classDivision : dbData.classDivision, rollNo : dbData.rollNo });
        console.log(initialValues);
      }
    };
    fetchData();
  }, [firebaseId]);

  var funcUpdateData = async ()=>{
    // alert('ckic')
    var dataSet = {
   firstName : firstName.current.value,
    classDivision : classDivision.current.value,
     rollNo : rollNo.current.value
    }

    const dbRef = ref(db, "database/studentDetails/" + firebaseId);
    // const snapshot = await get(dbRef);

    set(dbRef, {
      firstName: firstName.current.value,
      classDivision: classDivision.current.value,
      rollNo: rollNo.current.value,
    })
      .then(
      alert("data save"),
      navigate('/student-details')
    )
      .catch((error) => {
        alert("error", error.message);
      });

     
}

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-5">
          <h4 className="text-center">Student Form</h4>
        </div>
        <div className="col-md-4">
          {/* <form onSubmit={formik.handleSubmit} initialValues={initialValues} >
            <div className="mb-3">
              <label style={{ "font-weight": "500" }} className="pb-2">
                Student Name
              </label>
              <input
                type="text"  
                placeholder="Enter Student Name"
                className="form-control "
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label style={{ "font-weight": "500" }} className="pb-2">
                Class and Division
              </label>
              <input
                type="text"
                placeholder="Enter Class/Division"
                className="form-control "
                id="classDivision"
                name="classDivision"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.classDivision}
              />
              {formik.touched.classDivision && formik.errors.classDivision ? (
                <div>{formik.errors.classDivision}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label style={{ "font-weight": "500" }} className="pb-2">
                Roll Number
              </label>
              <input
                type="text"
                placeholder="Enter Roll Number"
                className="form-control "
                id="rollNo"
                name="rollNo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rollNo}
              />
              {formik.touched.rollNo && formik.errors.rollNo ? (
                <div>{formik.errors.rollNo}</div>
              ) : null}
            </div>
            <button className="btn btn-primary" type="submit">
              {" "}
              Submit{" "}
            </button>
          </form> */}
          <div className="mb-3">
            <label style={{ "font-weight": "500" }} className="pb-2">
              Student Name
            </label>
            <input
              type="text"
              placeholder="Enter Student Name"
              className="form-control "
              ref={firstName}
              defaultValue={initialValues.firstName}
            />
          </div>
          <div className="mb-3">
            <label style={{ "font-weight": "500" }} className="pb-2">
            Class and Division
            </label>
            <input
              type="text"
              placeholder="Enter Class/Division"
              className="form-control "
              ref={classDivision}
              defaultValue={initialValues.classDivision}
            />
          </div>
          <div className="mb-3">
            <label style={{ "font-weight": "500" }} className="pb-2">
            Roll Number
            </label>
            <input
              type="text"
              placeholder="Enter Roll Number"
              className="form-control "
              ref={rollNo}
              defaultValue={initialValues.rollNo}
            />
          </div>
          <button className="btn btn-primary" type="submit" onClick={()=>{funcUpdateData()}}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
