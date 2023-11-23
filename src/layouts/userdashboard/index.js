// DocuIt React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from 'react';
import { userdashboard } from "../../services/index";
import MDBox from "components/MDBox";
import { Card } from "@mui/material";
// import { docupload } from "../../services/index";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import { useAuth } from "context/AuthContext";
//import { Document, Page } from 'react-pdf';
import { Document, Page, pdfjs } from 'react-pdf';
import './userdash.css';
import Icon from "@mui/material/Icon";
import './userdash.css';
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';


function Dashboard() {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
  const [datas, setData] = useState([]);
  const { UserData, setuserdata } = useAuth();
  const vals = UserData?.id;//'0bf1f1ae-d632-4717-90f8-a730c7c03005';
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  console.log(UserData?.id);


  useEffect(() => {
    userdashboard(vals)
      .then(({ data, response }) => {

        if (data) {
          setData(data?.response);
        }
      })
      .catch((err) => {
        // Handle errors here
      });

  }, [vals]);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />

        <div className="card-box">
          <Link to="/usercategory">
            <Card className="userdash-card">
              <div className="doc-card">
                <span className="icon-userdash"><Icon fontSize="large">topic</Icon></span>

                <h4>My Documents</h4>
              </div>

            </Card>
          </Link>

          <Link to="/family" style={{}}>
            <Card className="userdash-card">
              <div className="doc-card">
                <span className="icon-userdash"><Icon fontSize="large">groupAdd</Icon></span>

                <h4>My Family</h4>
              </div>
            </Card>
          </Link>

        </div>
        <h2 className="card-head">Recent Activity</h2>

        {datas.map((item, index) => (
          <>
            {console.log('PDF URL:', item.url)}

            <Card>

              <div className="thumbnail-container" key={index}>

                <div className="recent-view">
                  <div>
                    {/* <Document file={{ url: item.url.startsWith('http') ? 'https://cors-anywhere.herokuapp.com/' + item.url : item.url }}>

                    {console.log('encodeURI(item.url)', item)}
                    <Page pageNumber={1} /> defaultScale={SpecialZoomLevel.PageFit}
                  </Document> */}
                    <Viewer fileUrl={corsAnywhereUrl + item.url}  className="pdf-img"/>
                  </div>
                  <div className="doc-details">

                    <h5>{item.documentName}</h5>
                    <h5><Moment format="MMM D YYYY, hh:mm:ss a" >{item.createdAt}</Moment></h5>
                    <h5>Size: {(item.documentSize / (1024 * 1024)).toFixed(2)}MB</h5>
                  </div>
                </div>
              </div>
            </Card>

            {/* item.createdAt.substring(item.createdAt.length - 17, item.createdAt.length) */}

          </>
        ))}

      </DashboardLayout>
    </>
  );
}

export default Dashboard;
