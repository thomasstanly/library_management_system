import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from '../../../../Axios'
import Header from "../../../../components/librarian/Sidebar/Header";
import PatronNav from "../../../../components/librarian/Patron/PatronNav/PatronNav";
import PatronCheckout from "../../../../components/librarian/Patron/PatronCheckout/PatronCheckout";
import Breadcrumb from "../../../../components/librarian/Patron/Breadcrumb/Breadcrumb";
import Typography from "@mui/material/Typography";
import style from './PatronCheckoutPage.module.scss'

const PatronCheckoutPage = () => {
    const { id } = useParams()
    console.log(id)
    const [patron, setPatron] = useState({
        "id": '',
        "first_name": "",
        "last_name": "",
        "email": "",
        "phone_number": "",
        "profile_pic": "",
        "card": "",
        "plan": {},
        "expiry_date": ""

    })
    const name = `${patron.first_name + ' ' + patron.last_name}`
    const fetch = async () => {
        try {
            const access_token = JSON.parse(localStorage.getItem('access'))
            const res = await axios.get(`patron/${id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            const lastPaidPayment = res.data.user_id.find(user => user.status === 'PAID');
            const expiryDate = lastPaidPayment ? lastPaidPayment.expiry_date : '';
            const card = res.data.membership_id ? `${res.data.membership_id.plan_code}${res.data.membership_id.id}` : '';
            const pic = res.data.Profile ? `${res.data.Profile.profile_pic}` : '';
            console.log(res.data)
            setPatron({
                "id": res.data.id,
                "first_name": res.data.first_name,
                "last_name": res.data.last_name,
                "email": res.data.email,
                "phone_number": res.data.phone_number,
                "expiry_date": expiryDate,
                "card": card,
                "profile_pic": pic,
                "plan": res.data.membership_id || {}

            })
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetch()
    }, [])
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" to="/library/dashboard">
            Dashboard
        </Link>,
        <Link underline="hover" key="2" color="inherit" to="/library/patron">
            Patron
        </Link>,
        <Typography key="3" color="text.primary">
            {name}
        </Typography>,
    ];
    return (
        <>
            <Header />
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <div className={style.container}>
                <div className={style.profile_menu}>
                    <PatronNav id={id} name={name} card={patron.card} pic={patron.profile_pic}/>
                </div>
                <div className={style.content}>
                    <PatronCheckout patron_id={id}/>
                </div>
            </div>


        </>
    )
}

export default PatronCheckoutPage

//name={name} card={patron.card} pic={patron.profile_pic}