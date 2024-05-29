// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from '../../../../Axios'
import Header from '../../../components/librarian/Sidebar/Header'
import SideBarLibrarian from "../../../components/librarian/Sidebar/SideBarLibrarian";
import Transaction from '../../../components/librarian/Transaction/Transaction';
import style from './TransactionPage.module.scss'


const TransactionPage = () => {

    return (
        <>
            <Header />
            <SideBarLibrarian />
            <Transaction />

        </>
    )
}

export default TransactionPage
