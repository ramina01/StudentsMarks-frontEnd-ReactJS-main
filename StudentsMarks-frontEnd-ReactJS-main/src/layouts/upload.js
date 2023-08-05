/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import MDBox from "components/MDBox";
import Tables from "layouts/tables";
import Dropzone from "examples/Navbars/UploadNavbar/Dropzone";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import UploadNavbar from "examples/Navbars/UploadNavbar";
import React, { useState,useEffect } from "react";
import axios from "axios";
import projectsTableData from "./tables/data/projectsTableData";

import { useAuth } from "../AuthContext"; // Import the AuthContext hook
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { isAuthenticated } = useAuth();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    // Call projectsTableData whenever fetchTrigger changes
    projectsTableData().then((tableData) => {
      // You can do something with the table data here, if needed.
      // For example, you might want to set it to a state variable to display it in a component.
      // Assuming you have a state variable `tableData` to hold the result of projectsTableData.
      // Here's how you can set it:
      // setTableData(tableData);
    });
  }, [fetchTrigger]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect the user to the login page
      navigate('/login');
    }
  }, [isAuthenticated]);
  
  const handleFileChange = (files) => {
    setSelectedFiles(files);
    handleFileUpload(files); // Automatically trigger file upload when files are selected
  };

  const handleFileUpload = (files) => {
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("pdfFiles[]", file);
      });

      axios.post("http://localhost:8000/api/upload/pdfs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        })
        .then((response) => {
          // Handle the API response, e.g., show success message or handle errors
          console.log(response.data);
           // Update the fetchTrigger state variable to trigger a re-run of projectsTableData
      setFetchTrigger((prevTrigger) => prevTrigger + 1);
        })
        .catch((error) => {
          // Handle API error
          console.error(error);
        });
    }
  };
  if (!isAuthenticated) {
   
    return null;
    

  }
  return (
    <DashboardLayout>
      <UploadNavbar />

      <MDBox py={3}>
        <MDBox mt={4.5} />
        <Dropzone onFileChange={handleFileChange} />
      </MDBox>

      <Tables />
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;



// @mui material components
// import Grid from "@mui/material/Grid";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import Tables from "layouts/tables";
// import Dropzone from "examples/Navbars/UploadNavbar/Dropzone";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import UploadNavbar from "examples/Navbars/UploadNavbar";

// // import Footer from "examples/Footer";
// // import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// // import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// // import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// // Data
// // import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// // import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// // Dashboard components
// // import Projects from "layouts/dashboard/components/Projects";
// // import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// function Dashboard() {
//   // const { sales, tasks } = reportsLineChartData;

//   return (
//     <DashboardLayout>
//      <UploadNavbar />
     
//       <MDBox py={3}>
//         <MDBox mt={4.5}/>
//         <Dropzone />
//       </MDBox>
    
//       <Tables />
//       {/* <Footer /> */}
//     </DashboardLayout>
//   );
// }

// export default Dashboard;
