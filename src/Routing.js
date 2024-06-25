import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import StudentDetails from "./component.js/StudentDetails";
import StudentForm from "./component.js/StudentForm";
import UpdateStudentForm from "./component.js/UpdateStudentForm";
 
  
export const AppRoute = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
              path: "student-details",
              element: <StudentDetails/> 
            },
            {
                path: "student-form",
                element: <StudentForm/> 
              }, 
              {
                path: "update-form/:firebaseId",
                element: <UpdateStudentForm/> 
              },
              
        ]
      },
])