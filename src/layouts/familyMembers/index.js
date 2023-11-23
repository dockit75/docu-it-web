import { Button } from "@mui/material";
import MDBox from "components/MDBox";
import { useAuth } from "context/AuthContext";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { listFamilyMembers } from "services";


function FamilyMembers(props) {
     const{ UserData } = useAuth();
     const { state } = useLocation();
     const { familyMemberId } = state;
    
     console.log('Members : ',UserData);
     useEffect(() => {
          const fetchData = async () => {
               try {
                    const { data } = await listFamilyMembers(UserData);
                   
                    if (data?.response?.familyList) {
                       
                       
                       
                    }
               } catch (err) {
                    console.error("API call failed:", err);
               }
          };

          fetchData();
     }, [UserData]);
     return (
          <DashboardLayout className='mainContent'>
               <DashboardNavbar />

               <MDBox className="mdbboxfamily">
                    <div className="addbtn">

                         <h2>Family Users  Management</h2>
                         <div>
                              <Button variant="contained"  className="btnfamilylist">Invite + </Button>
                         </div>
                    </div>
                    </MDBox>

          </DashboardLayout>
     );

     
}

export default FamilyMembers;