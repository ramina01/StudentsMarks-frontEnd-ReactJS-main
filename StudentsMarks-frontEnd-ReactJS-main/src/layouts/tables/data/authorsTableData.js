/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import axios from "axios";
import PdfLinkCell from "../data/PdfLinkCell";

// Function to truncate text
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength - 3) + '...';
}

// Function to highlight the search term in the text
function highlightMatch(text, searchTerm) {
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

const authorsTableData = async (searchQuery) => {
  const columns = [
    { Header: "#", accessor: (row, index) => index + 1, width: "10%", align: "left" },
    { Header: "PDF Path", accessor: "pdfPath", width: "60%", align: "left", Cell: PdfLinkCell },
    { Header: "Text Content", accessor: "text_content", width: "30%", align: "left", Cell: ({ cell: { value } }) => highlightMatch(truncateText(value, 50), searchQuery) },
  ];

  let rows = [];

  try {
    const response = await axios.get(`http://localhost:8000/api/search?query=${searchQuery}`);
    console.log("API Response:", response.data);

    if (Array.isArray(response.data)) {
      const pdfs = response.data.map((pdf) => ({
        "#": pdf.uuid,
        pdfPath: pdf.uuid,
        uuid: pdf.uuid,
        text_content: pdf.text_content, // Add the text_content property to the row
      }));

      rows = pdfs;
    } else {
      console.log("No 'data' property found in API response.");
    }
  } catch (error) {
    console.error("Error fetching indexed documents:", error);
  }

  return { columns, rows };
};

export default authorsTableData;

// import axios from "axios";
// import PdfLinkCell from "../data/PdfLinkCell";

// const authorsTableData = async (searchQuery) => {
//   const columns = [
//     { Header: "#", accessor: (row, index) => index + 1, width: "10%", align: "left" },
//     { Header: "PDF Path", accessor: "pdfPath", width: "60%", align: "left", Cell: PdfLinkCell },
//     { Header: "UUID", accessor: "uuid", width: "30%", align: "left" },
//   ];

//   let rows = [];

//   try {
//     // Make sure to use the searchQuery parameter in the API request
//     const response = await axios.get(`http://localhost:8000/api/search?query=${searchQuery}`);
//     console.log("API Response:", response.data);
  
//     // Check if the 'data' property is present in the API response
//     if (Array.isArray(response.data)) {
//       const pdfs = response.data.map((pdf) => ({
//         "#": pdf.uuid, // Assuming 'id' is the uuid property in your API response
//         pdfPath: pdf.uuid, // Access the UUID as pdfPath to avoid duplicate column id
//         uuid: pdf.uuid,
//       }));
  
//       rows = pdfs;
//     } else {
//       console.log("No 'data' property found in API response.");
//     }
  
//   } catch (error) {
//     console.error("Error fetching indexed documents:", error);
//   }

//   return { columns, rows };
// };

// export default authorsTableData;




// Material Dashboard 2 React components
// import axios from "axios";

// const authorsTableData = async () => {
//   const columns = [
//     // Define your columns here
//     // For example:
//     { Header: "#", accessor: (row, index) => index + 1, width: "10%", align: "left" },
//     { Header: "PDF Text Content", accessor: "text-content", width: "30%", align: "left" },
//     // { Header: "PDF Path", accessor: "pdfPath", width: "60%", align: "left", Cell: PdfLinkCell },
    
//   ];

//   // Fetch data containing PDFs and their highlights
//   // For example:
//   const response = await axios.get("http://localhost:8000/api/");
//   const pdfData = response.data; // This should be an array of objects, each containing PDF and highlight information

//   const rows = pdfData.map((pdf, index) => ({
//     "#": index + 1,
//     // pdfPath: pdf.pdfPath,
//     pdfTextContent: pdf.pdfTextContent, // The text content of the PDF
//     highlights: pdf.highlights, // Array of highlights for this PDF
//   }));

//   return { columns, rows };
// };

// export default authorsTableData;


// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";

// // Images
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

// export default function data() {
//   const Author = ({ image, name, email }) => (
//     <MDBox display="flex" alignItems="center" lineHeight={1}>
//       <MDAvatar src={image} name={name} size="sm" />
//       <MDBox ml={2} lineHeight={1}>
//         <MDTypography display="block" variant="button" fontWeight="medium">
//           {name}
//         </MDTypography>
//         <MDTypography variant="caption">{email}</MDTypography>
//       </MDBox>
//     </MDBox>
//   );

//   const Job = ({ title, description }) => (
//     <MDBox lineHeight={1} textAlign="left">
//       <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
//         {title}
//       </MDTypography>
//       <MDTypography variant="caption">{description}</MDTypography>
//     </MDBox>
//   );

//   return {
//     columns: [
//       { Header: "author", accessor: "author", width: "45%", align: "left" },
//       { Header: "function", accessor: "function", align: "left" },
//       { Header: "status", accessor: "status", align: "center" },
//       { Header: "employed", accessor: "employed", align: "center" },
//       { Header: "action", accessor: "action", align: "center" },
//     ],

//     rows: [
//       {
//         author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
//         function: <Job title="Manager" description="Organization" />,
//         status: (
//           <MDBox ml={-1}>
//             <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//           </MDBox>
//         ),
//         employed: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             23/04/18
//           </MDTypography>
//         ),
//         action: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             Edit
//           </MDTypography>
//         ),
//       },
//       {
//         author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
//         function: <Job title="Programator" description="Developer" />,
//         status: (
//           <MDBox ml={-1}>
//             <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//           </MDBox>
//         ),
//         employed: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             11/01/19
//           </MDTypography>
//         ),
//         action: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             Edit
//           </MDTypography>
//         ),
//       },
//       {
//         author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
//         function: <Job title="Executive" description="Projects" />,
//         status: (
//           <MDBox ml={-1}>
//             <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//           </MDBox>
//         ),
//         employed: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             19/09/17
//           </MDTypography>
//         ),
//         action: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             Edit
//           </MDTypography>
//         ),
//       },
//       {
//         author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
//         function: <Job title="Programator" description="Developer" />,
//         status: (
//           <MDBox ml={-1}>
//             <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//           </MDBox>
//         ),
//         employed: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             24/12/08
//           </MDTypography>
//         ),
//         action: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             Edit
//           </MDTypography>
//         ),
//       },
//       {
//         author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
//         function: <Job title="Manager" description="Executive" />,
//         status: (
//           <MDBox ml={-1}>
//             <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//           </MDBox>
//         ),
//         employed: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             04/10/21
//           </MDTypography>
//         ),
//         action: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             Edit
//           </MDTypography>
//         ),
//       },
//       {
//         author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
//         function: <Job title="Programator" description="Developer" />,
//         status: (
//           <MDBox ml={-1}>
//             <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//           </MDBox>
//         ),
//         employed: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             14/09/20
//           </MDTypography>
//         ),
//         action: (
//           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//             Edit
//           </MDTypography>
//         ),
//       },
//     ],
//   };
// }
