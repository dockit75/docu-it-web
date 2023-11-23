// import React, { useState } from 'react';
// import { Table, TableCell, TableRow } from "@mui/material";
// import MDBox from "components/MDBox";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import ArticleIcon from '@mui/icons-material/Article';

// function Documents() {
//   const [documentData] = useState([
//     { id: 1, name: 'Document 1' },
//     { id: 2, name: 'Document 2' },
//   ]);

//   return (
//     <DashboardLayout className='mainContent'>
//       <DashboardNavbar />

//       <MDBox className="mdbboxfamily">
//         <Table>
//           <MDBox>
//             <thead>
//               <tr>
//                 <th>Icon</th>
//                 </tr>
//             </thead>
//             <tbody>
//               {documentData.map((document, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <ArticleIcon />
//                   </TableCell>
//                   <TableCell>{document.name}</TableCell>
//                 </TableRow>
//               ))}
//             </tbody>
//           </MDBox>
//         </Table>
//       </MDBox>
//     </DashboardLayout>
//   );
// }

// export default Documents;

import React, { useState, useEffect } from 'react';
import { Table, TableCell, TableRow, Tabs, Tab } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArticleIcon from '@mui/icons-material/Article';

function Documents() {
  const [documentData, setDocumentData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const tabCategories = ["Category1", "Category2", "Category3"];

  useEffect(() => {
    // Fetch documents based on the selected tab/category
    const fetchData = async () => {
      try {
          // Assuming there's an API endpoint to fetch documents based on the selected tab
          const response = await fetch(`tab=${selectedTab}`);
          
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const data = await response.json();
          // Process the fetched data as needed
          console.log(data);
      } catch (error) {
          // Handle errors, e.g., network issues, failed requests, etc.
          console.error('Error fetching documents:', error.message);
      }
  };

  fetchData(); // Call the fetchData function when the component mounts or when selectedTab changes


    
    // Implement your API call logic here. For example:
    // fetchDocuments(tabCategories[selectedTab]);
    // You may use axios or fetch to make the API call.
    // Update the documentData state with the fetched documents.
    // setDocumentData(response.data);
  }, [selectedTab]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <DashboardLayout className='mainContent'>
      <DashboardNavbar />

      <MDBox className="mdbboxfamily">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary" // Customize the indicator color
        >
          {tabCategories.map((category, index) => (
            <Tab
              key={index}
              label={category}
              style={{
                backgroundColor: index === selectedTab ? '#87CEEB' : '#fff', // Sky blue when selected, white otherwise
                color: '#fff', // White text color for all tabs
              }}
            />
          ))}
        </Tabs>

        <Table>
          <MDBox>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {documentData.map((document, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <ArticleIcon />
                  </TableCell>
                  <TableCell>{document.name}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </MDBox>
        </Table>
      </MDBox>
    </DashboardLayout>
  );
}

export default Documents;

