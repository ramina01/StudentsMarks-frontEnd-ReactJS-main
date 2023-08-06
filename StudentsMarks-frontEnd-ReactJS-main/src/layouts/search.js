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
// import React, { useState } from 'react';

// function Search({ fetchData }) {
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = () => {
//     fetchData(searchQuery);
//   };

//   return (
//     <div>
//       {/* Search Input */}
//       <div>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search..."
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//     </div>
//   );
// }

// export default Search;



// @mui material components
// import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
// import Grid from "@mui/material/Grid";

// //Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import Tables from "layouts/tables";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// function search() {
//   // const { sales, tasks } = reportsLineChartData;

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox py={3}>
//         <MDBox mt={4.5}/>
      
//       </MDBox>
//       <Tables />
//       {/* <Footer /> */}
//     </DashboardLayout>
//   );
// }

// export default search;
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DataTable from "../examples/Tables/DataTable";
import authorsTableData from "../layouts/tables/data/authorsTableData";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ columns: [], rows: [] });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setData({ columns: [], rows: [] });
      return;
    }

    try {
      const { columns, rows } = await authorsTableData(searchQuery);
      setData({ columns, rows });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(); // Automatically fetch data on component mount
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  function highlight(key, term) {
    if (!term || !key) return key; // If either key or term is not available, return the original text
  
    const regex = new RegExp(`\\b${term}\\b`, "gi");
    const highlightedTerm = key.replace(regex, (match) => `<mark>${match}</mark>`);
    return <div dangerouslySetInnerHTML={{ __html: highlightedTerm }} />;
  }
  
  
  

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength - 3) + "...";
  };

  return (
    <MDBox pt={2} pb={3} display="flex" justifyContent="end">
      <Grid item xs={12} sm={10} md={8} lg={9} marginRight={3}>
        <Card>
          <MDBox mx={2} my={4} textAlign="right" width="50%" marginLeft="auto">
            <MDBox pr={1} display="inline-block">
              <MDInput
                label="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
              />
            </MDBox>
          </MDBox>

          <MDBox
            mx={2}
            my={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Student's Mark PDFs
            </MDTypography>
          </MDBox>

          <MDBox pt={3} pb={2} px={2} maxWidth="100%" overflowX="auto">
            {isLoading ? (
              <MDBox
                pl={3}
                py={1}
                textAlign="left"
                fontWeight="bold"
                fontSize="18px"
                color="rgba(0, 0, 0, 0.54)"
              >
                Search for your name..
              </MDBox>
            ) : (
              <DataTable
                table={{
                  columns: data.columns.map((column) =>
                    column.accessor === "text_content"
                      ? {
                          ...column,
                          Cell: ({ cell: { value } }) =>
                            highlight(truncateText(value, 100), searchQuery),
                        }
                      : column
                  ),
                  rows: data.rows,
                }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            )}
          </MDBox>
        </Card>
      </Grid>
    </MDBox>
  );
}

export default Dashboard;










