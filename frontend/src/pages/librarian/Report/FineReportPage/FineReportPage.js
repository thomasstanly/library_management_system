// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from '../../../../Axios'
import Header from '../../../../components/librarian/Sidebar/Header'
import SideBarLibrarian from "../../../../components/librarian/Sidebar/SideBarLibrarian";
import FineReport from '../../../../components/librarian/Report/FineReprt/FineReport';
// import style from './FineReportPage.module.scss'


const FineReportPage = () => {

    return (
        <>
            <Header />
            <SideBarLibrarian />
            <FineReport />

        </>
    )
}

export default FineReportPage
