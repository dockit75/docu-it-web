/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */


// @mui material components
import Icon from "@mui/material/Icon";

// DocuIt React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import Switch from '@mui/material/Switch';

// Images
import logoHealthInsurance from "assets/images/health-insurance.png";
import logoLifeInsurance from "assets/images/family-insurance.png";
import logoAsset from "assets/images/assets.png";
import logoBank from "assets/images/piggy-bank.png";
import logoFinance from "assets/images/finance-growth.png";
import { memo, useState } from "react";
import MDButton from "components/MDButton";
import { IconButton, Input } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { AnimatedIconButton, AnimatedIconEditButton } from "./AnimatedIconButton";

//
// import React ,{useSate} from 'react';
// import progress from ''
const label = { inputProps: { 'aria-label': ' Color switch demo' } };

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const numbers = [10, 20, 30, 40, 50];
// const randomNum = getRandomElement(numbers);

// console.log(randomNum); // This will log a random number from the numbers array

const Progress = ({ color, value }) => (
  <MDBox display="flex" alignItems="center">
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {value}%
    </MDTypography>
    <MDBox ml={0.5} width="9rem">
      <MDProgress variant="gradient" color={color} value={value} />
    </MDBox>
  </MDBox>
);
export default function useProjectsTableData(rows, updateCategory, handleSave, handleEditRow, handleCancel, tempRowData, editingId, setEditingId, images) {


  const Category = ({ id, image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <Input autoFocus={editingId === id} required={true} disableUnderline={editingId !== id} readOnly={editingId !== id} value={editingId === id ? tempRowData?.categoryName : name} sx={{ marginLeft: 1, fontWeight: 'bold' }} onChange={updateCategory} />
    </MDBox>
  )

  const prepareRow = ({ id, categoryName, categoryImage, status, handleEdit, isNew }, index) => {

    return {
      categoryName: <Category id={id} image={categoryImage} editingId={editingId} name={categoryName} />,
      status: (
        <MDTypography component="a" href="#" color="text"
        >
          <Switch checked={status} color="success"/>
        </MDTypography>
      ),
      action: editingId === id ? (
        <MDBox display="flex" gap={0}>
          <AnimatedIconButton>
            <IconButton onClick={() => {
              handleSave(id);
              setEditingId(null);
            }}>
              <Icon fontSize="large" color="success">done</Icon>
            </IconButton>
          </AnimatedIconButton>
          <AnimatedIconButton>
            <IconButton onClick={() => handleCancel(id)}>
              <Icon fontSize="large" color="error">cancel</Icon>
            </IconButton>
          </AnimatedIconButton>
        </MDBox>
      ) : (
        <AnimatedIconEditButton>
          <IconButton onClick={() => handleEditRow(id, { categoryName, categoryImage, status, isNew: false })}>
            <Icon fontSize="large" color="secondary">edit_note</Icon>
          </IconButton>
        </AnimatedIconEditButton>
      ),
    }
  }

  console.count('rendering projectTableData')

  return {
    columns: [
      { Header: "category name", accessor: "categoryName", width: "30%", align: "left" },
      // { Header: "No.of.Documents", accessor: "budget", width: "10%", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      // { Header: "completion progress", accessor: "completion", align: "center" },
      { Header: "Edit", accessor: "action", align: "center" },
    ],


    rows: rows?.length ? rows.map(prepareRow) : []
    // [
    //   {
    //     category: <Project image={logoLifeInsurance} name="Life Insurance" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         12,900
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDTypography component="a" href="#" color="text"
    //       >
    //         <Icon fontSize="large" color="success" >toggle_on</Icon>
    //       </MDTypography>
    //     ),
    //     completion: <Progress color="info" value={60} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon fontSize="large" color="secondary"  >edit_note</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     category: <Project image={logoHealthInsurance} name="Health Insurance" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         25,000
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDTypography component="a" href="#" color="text" >
    //         <Icon fontSize="large" color="success" >toggle_on</Icon>
    //       </MDTypography>
    //     ),
    //     completion: <Progress color="success" value={100} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon fontSize="large" color="secondary"  >edit_note</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     category: <Project image={logoAsset} name="Assets" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         23,400
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDTypography component="a" href="#" color="text" >
    //         <Icon fontSize="large" color="success" >toggle_on</Icon>
    //       </MDTypography>
    //     ),
    //     completion: <Progress color="error" value={30} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon fontSize="large" color="secondary"  >edit_note</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     category: <Project image={logoBank} name="Bank" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         23,000
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDTypography component="a" href="#" color="text" >
    //         <Icon fontSize="large" color="success" >toggle_on</Icon>
    //       </MDTypography>
    //     ),
    //     completion: <Progress color="info" value={80} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon fontSize="large" color="secondary"  >edit_note</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     category: <Project image={logoFinance} name="Finance" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         10,000
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDTypography component="a" href="#" color="text" >
    //         <Icon fontSize="large" color="success" >toggle_on</Icon>
    //       </MDTypography>
    //     ),
    //     completion: <Progress color="error" value={0} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon fontSize="large" color="secondary" >edit_note</Icon>
    //       </MDTypography>
    //     ),
    //   },

    // ]
  }
};



