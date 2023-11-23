import React, { useState, useEffect } from 'react';
import { Button, Card, Icon, Input, Table } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { listFamily, editFamily, deleteFamily, addFamily } from "services";
import { useAuth } from "context/AuthContext";
import '../family/listfamily.css';
import { Link } from 'react-router-dom';


function Family() {

     const { UserData } = useAuth();
     const [familyData, setFamilyData] = useState([]);
     const [showPopup, setShowPopup] = useState(false);
     const [popupindex, setpopupindex] = useState('');
     const [isEditing, setIsEditing] = useState('');
     const [editedValue, setEditedValue] = useState('');
     const [flashMessage, setFlashMessage] = useState('');
     const [ErrorflashMessage, setErrorFlashMessage] = useState('');
     const [Addpop, setAddPop] = useState(false);
     const [Add, setAdd] = useState('');

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const { data } = await listFamily(UserData.id);
                    if (data?.response?.familyList) {
                         const extractedData = data.response.familyList.map((familyItem) => ({
                              name: familyItem.name,
                              id: familyItem.id,
                              createdBy: familyItem.createdBy
                         }));
                         setFamilyData(extractedData);
                    }
               } catch (err) {
                    console.error("API call failed:", err);
               }
          };

          fetchData();
     }, [UserData]);

     const handleEditInput = (index, value) => {
          // const updatedData = [...familyData];
          // updatedData[index].name = value;
          setIsEditing(value);

     };


     const handleSave = async (index) => {

          try {
               const saveList = isEditing.find((saveItem) => index === saveItem.id);
               // if (!Array.isArray(isEditing) || saveList === null) {
               //      console.error('isEditing is not an array or saveList is null.');
               //      return;
               //  }
               const isNameExists = familyData.filter((item) => item.name === isEditing);
               if (isNameExists) {
                    setErrorFlashMessage('Family name is already registered');
                    setShowPopup(false);
                    setTimeout(() => {
                         setErrorFlashMessage('');

                    }, 1000);
                    return;
               }
               const newArray = [{
                    name: isEditing,
                    familyId: saveList.id,
                    adminId: saveList.createdBy
               }];
               console.log('famil', newArray)
               const { data } = await editFamily(newArray[0]);

               if (data?.status === 'SUCCESS') {
                    setFlashMessage('Family saved successfully!');
                    setShowPopup(false);
                    setTimeout(() => {
                         setFlashMessage('');

                    }, 1000);
               }
          } catch (err) {
               console.error('Error saving family:', err);
          }

     };


     const toggleEdit = (index) => {
          setpopupindex(index);
          setShowPopup(true);
     };

     const togglePopup = () => {
          setShowPopup(!showPopup);
          setpopupindex(null);
          setAddPop(false);
     };

     const handleDelete = async (familyIdd) => {

          try {
               const adminId = UserData.id;
               const familyId = familyIdd;
               const values = { familyId: familyId, adminId: adminId };
               const { data } = await deleteFamily(values);
               if (data?.status === 'SUCCESS') {
                    setFamilyData(prevData => prevData.filter(item => item.id !== familyId));
                    setFlashMessage('Family Deleted successfully!');
                    setTimeout(() => {
                         setFlashMessage('');
                    }, 1000);
               } else {
                    // console.error('Failed to delete family.');
               }
          } catch (err) {
               console.error('Error deleting family:', err);
          }
     };

     const handleAdd = () => {
          setAddPop(true);
     }


     const handleAddInput = (e) => {
          setAdd(e.target.value);
     }
     const handleAddsave = async () => {

          try {
               const adminIdAdd = Add;
               const val = { name: adminIdAdd, adminId: UserData.id }
               const { data } = await addFamily(val);
               if (data?.status === 'SUCCESS') {
                    const newFamily = data?.response?.familyDetails;
                    setFamilyData(prevData => [...prevData, newFamily]);
                    setFlashMessage('Family Added successfully!');
                    setAddPop(false);
                    setAdd('');
                    setTimeout(() => {
                         setFlashMessage('');
                    }, 1000);

               }
          } catch (error) {
               console.error('Error Save family:', error);
          }

     }

     return (
          <DashboardLayout className='mainContent'>
               <DashboardNavbar />

               <MDBox className="mdbboxfamily">
                    <div className="addbtn">

                         <h2>Family Management</h2>
                         <div>
                              <Button variant="contained" onClick={handleAdd} className="btnfamilylist">Add + </Button>
                         </div>
                    </div>

                    <Card>
                         <Card>
                              {flashMessage && (
                                   <div>
                                        <div className="overlay">
                                             <div className="popup">
                                                  <div className="popup-content">
                                                       <div className='flash-message'>
                                                            {flashMessage}
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )}
                         </Card>
                         <Card>
                              {ErrorflashMessage && (
                                   <div>
                                        <div className="overlay">
                                             <div className="popup">
                                                  <div className="popup-content">
                                                       <div className='Errorflash-message'>
                                                            {ErrorflashMessage}
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )}
                         </Card>
                         <Card>
                              {Addpop && (
                                   <div>
                                        <div className="overlay">
                                             <div className="popup">
                                                  <div className="popup-content">
                                                       <div className='flash-message'>
                                                            <Input type="text"
                                                                 placeholder="Enter...."
                                                                 value={Add}
                                                                 onChange={(e) => handleAddInput(e)}
                                                                 className='pop-up-input' />

                                                       </div>
                                                       <Button variant="contained" color="error" onClick={togglePopup} className='btn-pop'>Close</Button>
                                                       <Button variant="contained" color="success" onClick={() => handleAddsave()}>Save</Button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )}


                         </Card>
                         <Table>

                              <MDBox>

                                   <thead>
                                        <tr>
                                             <th>Family Name</th>
                                             <th>Action</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {familyData.map((item, index) => (
                                             <>
                                                  <tr key={index}>
                                                       <td>
                                                            {showPopup && popupindex === item.id && (
                                                                 <div>
                                                                      <div className="overlay">
                                                                           <div className="popup">
                                                                                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                                                                     <div className='pop-input-div'>
                                                                                          <Input
                                                                                               type="text"
                                                                                               value={editedValue !== '' ? editedValue : item.name}
                                                                                               onChange={(e) => handleEditInput(index, e.target.value)}
                                                                                               className='pop-up-input'
                                                                                          />
                                                                                     </div>

                                                                                     <Button variant="contained" color="error" onClick={togglePopup} className='btn-pop'>Close</Button>
                                                                                     <Button variant="contained" color="success" onClick={() => handleSave(item.id)}>Save</Button>

                                                                                </div>
                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                            )}
                                                            {item.name}

                                                       </td>
                                                       <td>
                                                            <Button onClick={() => toggleEdit(item.id)}><Icon>edit</Icon></Button>
                                                            <Button className="btn-delete" onClick={() => handleDelete(item.id)}><Icon>delete</Icon></Button>
                                                       </td>
                                                  </tr>
                                             </>
                                        ))}
                                   </tbody>

                              </MDBox>
                         </Table>
                    </Card>

               </MDBox>
          </DashboardLayout>
     );

}

export default Family;
