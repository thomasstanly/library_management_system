// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from '../../../../Axios'
import Header from '../../../../components/librarian/Sidebar/Header'
import SideBarLibrarian from "../../../../components/librarian/Sidebar/SideBarLibrarian";
import CirculationReport from "../../../../components/librarian/Report/CirculationReport/CirculationReport";
import style from './CirculationReportPage.module.scss'


const CirculationReportPage = () => {

    return (
        <>
            <Header />
            <SideBarLibrarian />

            <CirculationReport />

        </>
    )
}

export default CirculationReportPage
