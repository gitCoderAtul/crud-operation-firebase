import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 import { getDatabase, ref, child, push, update, set, get, remove } from "firebase/database";
import { app } from '../utils/firebaseConfig';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateStudentForm() {
  let navigate = useNavigate();
const [studentDetails,setStudentDetails] = useState([]);
const  [ dataArray, setDataArray] = useState();

  const db = getDatabase(app);

    // const formik = useFormik({
    //     initialValues: {
    //       firstName: '',
    //       classDivision: '',
    //       rollNo: '',
    //     },
    //     validationSchema: Yup.object({
    //       firstName: Yup.string() 
    //         .required('Required'),
    //         classDivision: Yup.string() 
    //         .required('Required'),
    //         rollNo: Yup.string() 
    //         .required('Required'), 
    //     }),
    //     onSubmit: values => {
    //         alert(JSON.stringify(values, null, 2));
    //       console.log(values); 
         
    //       const newDocRef = push(ref(db,'database/studentDetails'));
    //       set(newDocRef,{ 
    //         "firstName":values.firstName,
    //         "classDivision":values.classDivision,
    //         "rollNo":values.rollNo,

    //       })
    //       .then(alert('data save'))
    //         .catch((error)=>{
    //           alert('error',error.message)
    //         })
         
            
           
    //     },
    //   });
 

    const fetchData = async()=>{
      
        const dbRef = ref(db, 'database/studentDetails')
         const snapshot = await get(dbRef);
        console.log('db',db);
        console.log('dbRef',dbRef);
        console.log('snapshot',snapshot);
        // console.log(snapshot.val());
        if (snapshot.exists()) {
          const dbData = snapshot.val();
          
          console.log('snapshot.val()',snapshot.val(),dbData);
          console.log('Object.values(snapshot.val())',Object.values(snapshot.val()));
          console.log('Object.keys()',Object.keys(dbData)); 

          setStudentDetails(Object.values(dbData)); 
          const tempArrayData =   Object.keys(dbData).map(firebaseId =>{
            return {
              ...dbData[firebaseId],
              studentId:firebaseId
            } 
          })
          console.log(tempArrayData);
          setDataArray(tempArrayData)
        } else {
          console.log("No data available");
        }
      
      }

      const  funcDelete = async(studentId,ev)=>{

        console.log(studentId);

        const dbRef = ref(db, 'database/studentDetails/'+ studentId)
        console.log(dbRef);
       

        console.log('db',db);
        console.log('dbRef',dbRef);

        // console.log(ev.target.parentNode.parentNode.remove());
        await remove(dbRef)
        ev.target.parentNode.parentNode.remove(dbRef);
        
          // await remove(dbRef);  
      }
      
      useEffect(()=>{
        fetchData()
      },[])

      
  return (

    <div className="container"> 
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
            dataArray && dataArray.length > 0 && dataArray.map((val,index)=>
              <tr key={index}>
                <td>{index+1}</td>
                <td>{val.firstName}</td> 
                <td>{val.classDivision}</td>
                <td>{val.rollNo}</td>
                <td className="d-none">{val.studentId}</td>
                <td><button className='btn btn-sm btn-outline-primary' onClick={()=> navigate(`/update-form/${val.studentId}`) }> Edit </button> 
                <button className='btn btn-sm btn-outline-danger' onClick={(ev)=>funcDelete(val.studentId,ev)}>Delete</button> </td>
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
