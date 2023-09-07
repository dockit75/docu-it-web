// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// DocuIt React components
import MDBox from "../../components/MDBox";
import MDTypography from "components/MDTypography";

// DocuIt React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "../../examples/Tables/DataTable";

// Data
import useProjectsTableData from "./data/projectsTableData";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";

import logoHealthInsurance from "assets/images/health-insurance.png";
import logoLifeInsurance from "assets/images/family-insurance.png";
import logoAsset from "assets/images/assets.png";
import logoBank from "assets/images/piggy-bank.png";
import logoFinance from "assets/images/finance-growth.png";
import addNew from "assets/images/add-new.png";
import agreements from "assets/images/agreement-paper.png";
import property from "assets/images/property-investment.png";
import tax from "assets/images/tax.avif";
import corona from "assets/images/corona.avif";



import { useEffect, useState } from "react";
import { addCategory, categoryList,editCategory} from "../../services/index";
// import projectsTableData from "layouts/tables/data/projectsTableData";

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function Tables() {

  const images = [
    logoLifeInsurance,
    logoBank,
    logoFinance,
    agreements,
    tax,
    logoBank,
    logoAsset,
    logoFinance,
    corona,
    logoHealthInsurance,
    property
  ]



  const staticRows = [
    {
      id: 1,
      categoryName: "Life Insurance",
      categoryImage: logoLifeInsurance,
      status: true
    }, {
      id: 2,
      categoryName: "Health Insurance",
      categoryImage: logoHealthInsurance,
      status: true
    }, {
      id: 3,
      categoryName: "Assets",
      categoryImage: logoAsset,
      status: true
    }, {
      id: 4,
      categoryName: "Bank",
      categoryImage: logoBank,
      status: true
    }, {
      id: 5,
      categoryName: "Finance",
      categoryImage: logoFinance,
      status: true
    }
  ]
  const updateCategory = (e) => {
    const inputValue = e.target.value;
    
    // Check if the updated category name is valid (up to 50 letters and only alphabets)
    const isValidCategoryName = /^[A-Za-z\s]{1,50}$/.test(inputValue);
  
    if (isValidCategoryName) {
      setTempRowData((prevData) => ({ ...prevData, categoryName: inputValue }));
    } else {
      // Handle invalid category name (e.g., show an error message)
      console.error("Invalid category name. It should be up to 50 letters and only alphabets.");
    }
  };

  const [tempRowData, setTempRowData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [rows, setRows] = useState()


  useEffect(() => {
    (async () => await categoryList().then((res) => {
      const rowsWithImages = res?.data?.response?.categoryList?.map((category) => {
        return {
          ...category,
          categoryImage: getRandomElement(images)
        }
      })
      setRows(rowsWithImages)
    }))()
  }, [])

  const handleSave = (id) => {
    console.log('tempRowData?.categoryName', tempRowData?.categoryName?.trim()?.length , tempRowData?.isNew)
    if (tempRowData?.categoryName?.trim()?.length) {
      const updatedRows = rows.map(row => {
        if (row.id === id && (row.categoryName !== tempRowData?.categoryName)) {
          return { ...row, ...tempRowData, isNew: false, categoryImage: getRandomElement(images) };
        }
        return row;
      });
      const params = {
        categoryName: tempRowData?.categoryName,    
        description: tempRowData?.categoryName
    }
    const param = {
      categoryId: id, 
      categoryName: tempRowData?.categoryName,
      description: tempRowData?.categoryName
    }
    if(tempRowData?.isNew){
      addCategory(params)
    }else if(tempRowData.categoryName){
     editCategory(param)
    }
      setRows(updatedRows);
      setTempRowData({});
    } else {
      handleCancel(id);
    }
  };

  const handleEditRow = (id, rowData) => {
    setEditingId(id);
    setTempRowData(rowData)
  };

  const handleCancel = (id) => {
    if (rows?.some((rowData) => rowData?.id === id && rowData?.isNew)) {
      rows.shift()
      setRows([...rows])
      setTempRowData({})
    } else {
      setEditingId(null);
      setTempRowData({});
    }
  };

  const handleAddCategory = () => {
    const newRow = {
      id: Date.now(),  // using a timestamp as a unique ID; consider better methods in production
      categoryName: "",
      categoryImage: addNew,  // you may want a default image or null
      status: true,
      isNew: true
    };

    setRows(prevRows => [ newRow, ...prevRows,]);
    setEditingId(newRow.id);
    setTempRowData(newRow)
  };

  const { columns: pColumns, rows: pRows } = useProjectsTableData(rows, updateCategory, handleSave, handleEditRow, handleCancel, tempRowData, editingId, setEditingId, images);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                justifyContent="space-between"
                display="flex"
                alignItems='center'
              >
                <MDTypography variant="h4" color="white" >
                  Category List
                </MDTypography>
                <MDButton onClick={handleAddCategory} variant="gradient" color="dark" sx={{ padding: '0px 20px 0px 15px', fontSize: 12 }}>
                  <Icon sx={{ marginRight: 1 }}> add</Icon>
                  Add
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
