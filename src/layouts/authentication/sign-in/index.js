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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');


  useEffect(() => {
    logout()
  }, [])

  const navigate = useNavigate();

  const validateEmail = () => {
    if (!credentials.email) {
      setEmailError('*Email is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        setEmailError('*Invalid email address');
      } else {
        setEmailError('');
      }
    }
  };

  const validatePassword = () => {
    if (!credentials.password) {
      setPasswordError('*Password is required');
    } else if (credentials.password.length < 8) {
      setPasswordError('*Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = () => {
    validateEmail();
    validatePassword();

    // Check if there are no validation errors
    if (!emailError && !passwordError) {
      // Perform login logic here
      if (credentials.email && credentials.password) {
        login(credentials)
          .then(({ data }) => {
            localStorage.setItem('docuItToken', data?.response?.token);
            navigate('/dashboard');
          })
          .catch((error) => {
            setLoginError('*Incorrect email or password');
          });
      } else {
        console.error('Fields are mandatory');
      }
    }
  };


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDTypography variant="h4" fontWeight="medium" color="docuit" m={'auto'} pt={4}>
          <img src={brandWhite} alt="Dockit Logo" style={{ width: '40px', height: 'auto', marginBottom: '-14px'}} /> Login
        </MDTypography>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
            
              <MDInput type="email" name="email"label="Email" 
               sx={{
                input: {
                   color: 'grey',
                   "&::placeholder": 
                   {    
                      color: 'red',
                   },},
                   label: {
                    color: emailError ? 'red' : 'grey', // Change 'defaultLabelColor' to your actual default label color
                  },
                // label: { color:'red'},
              }}
               error={!!emailError} 
               fullWidth 
              onChange={handleChange} onBlur={validateEmail}
               helperText={emailError && <div className="error" style={{color:'red'}}>{emailError}</div>}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" name="password" label="Password"  
                 fullWidth 
                sx={{
                input: {
                   color: 'grey',
                   "&::placeholder":
                    {    
                      color:'red',
                   },},
                   label: {
                    color:passwordError ? 'red' : 'grey', // Change 'defaultLabelColor' to your actual default label color
                  },
                // label: { color:'red'}
              }}
                error={!!passwordError}
                onChange={handleChange} onBlur={validatePassword} 
               helperText={passwordError && <div className="error" style={{color:'red'}} >{passwordError}</div>}
              />
            </MDBox>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleLogin} variant="gradient" color="docuit" fullWidth sx={{
                "&:hover": {
                  backgroundColor: 'docuit.main'
                },
              }}>
                sign in
              </MDButton>
              {loginError && (<div style={{ color: 'red', textAlign: 'center',fontSize:'13px',marginTop:'5px' }}>{loginError}</div>)}
            </MDBox>
          </MDBox>
        {/* </MDBox> */}
      </Card>
    </BasicLayout>
  );
}

export default Basic;
