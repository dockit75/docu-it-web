
import { useEffect, useState } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// DocuIt React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.png";
import brandWhite from "assets/images/logo_dockit.png";
import { login, logout } from "../../../services/index";

function Basic() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    logout()
  }, [])

  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = () => {
    if (credentials?.email && credentials?.password){
      login(credentials).then(({data}) => {
        localStorage.setItem('docuItToken', data?.response?.token)
        navigate('/dashboard')
      }).catch((error) => {
        console.error('login error: ', error)
      })
    }else{
      console.error('Field mandatory')
    }
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDTypography variant="h4" fontWeight="medium" color="docuit" m={'auto'} pt={4}>
          <img src={brandWhite} alt="Dockit Logo" style={{ width: '40px', height: 'auto', marginBottom: '-14px'}} /> Login
        </MDTypography>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" name="email" label="Email" fullWidth onChange={handleChange} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" name="password" label="Password" fullWidth onChange={handleChange}  />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleLogin} variant="gradient" color="docuit" fullWidth sx={{
                "&:hover": {
                  backgroundColor: 'docuit.main'
                },
              }}>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
