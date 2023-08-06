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

// react-router-dom components
import { Link } from "react-router-dom";
import React, { useState } from "react";


import { useNavigate } from 'react-router-dom';




// import { useHistory } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {

  const [name, setName] = useState(""); // state for name field
  const [email, setEmail] = useState(""); // state for email field
  const [password, setPassword] = useState(""); // state for password field
  const [isChecked, setIsChecked] = useState(false); // state for checkbox

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  }
  const navigate = useNavigate();

  
  // async const handleSignUp = () => {
  //   // Use the captured values (name, email, password, isChecked) as needed
  //   let item={name,email,password}
  //   console.log(item);

  //   let result= await fetch("http://127.0.0.1:8000/api/signup",{
  //     method: 'POST',
  //     body.JSON.stringify(item),
  //     headers:{
  //       "Content-type":'application/json',
  //       "Accept":'application/json'
  //     }
  //   });
  //   result = await result.json()
  //   localStorage.setItem("user-info" ,JSON.stringify(result))
  //   history.push("/add");

  //   // console.log("Name:", name);
  //   // console.log("Email:", email);
  //   // console.log("Password:", password);
  //   // console.log("Terms and Conditions checked:", isChecked);
  // };
  
  const handleFormSubmit = (event) => {
    event.preventDefault(); // prevent the form from submitting normally
  
    // create an object containing the form data
    const formData = {
      name: name,
      email: email,
      password: password,
      // termsAndConditions: isChecked
    };
  
    // make an HTTP POST request to the API endpoint
    fetch("http://127.0.0.1:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to sign up.");
      }
      navigate('/authentication/sign-in');
    })
    .catch(error => {
      // handle error here
    });
  };
  
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth value={name}
                    onChange={handleNameChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth value={email}
                   onChange={handleEmailChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth  value={password}
                  onChange={handlePasswordChange}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox  checked={isChecked}
                  onChange={handleCheckboxChange}/>
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleFormSubmit}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
