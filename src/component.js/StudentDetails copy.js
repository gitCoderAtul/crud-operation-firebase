import React, { useEffect, useState } from 'react'
import { getDatabase, ref, child, push, update, set, get } from "firebase/database";
import { app } from '../utils/firebaseConfig';
import { Link } from 'react-router-dom';

export default function StudentDetails() {
    const [studentDetails,setStudentDetails] = useState([]);

  const db = getDatabase(app);

    const fetchData = async()=>{
        const dbRef = ref(db, 'database/studentDetails')
         const snapshot = await get(dbRef);
        console.log(db);
        console.log(dbRef);
        console.log(snapshot);
        // console.log(snapshot.val());
        if (snapshot.exists()) {
          console.log(snapshot.val());
          console.log(Object.values(snapshot.val()));
          setStudentDetails(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      
      }
      
      useEffect(()=>{
        fetchData()
      },[])

      
  return (
    <div className='container'>

    <div className='row'>
    <div className='col-md-12 mt-5'>
      <h4 className='text-center'>Student Details</h4>
      <Link to="/student-form" className='btn btn-sm btn-primary my-3'> Add Student  </Link>
      <table className='table table-hover table-striped'>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>First Name</th>
            <th>Class Division</th>
            <th>Roll No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            studentDetails && studentDetails.length > 0 && studentDetails.map((val,index)=>
              <tr key={index}>
                <td>{index+1}</td>
                <td>{val.firstName}</td> 
                <td>{val.classDivision}</td>
                <td>{val.rollNo}</td>
                <td><button className='btn btn-sm btn-outline-primary'> Edit </button> <button className='btn btn-sm btn-outline-danger'>Delete</button> </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  </div>
  </div>
  )
}
