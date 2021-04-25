import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import axios from 'axios'

const Dashboard = () => {
    const [history, setHistory] = useState([])

    const token = isAuthenticated().token
    axios.defaults.headers.common = {
        'Authorization': 'Bearer ' + token
    };
    const {
        // eslint-disable-next-line
        user: { _id, name, email, role }
    } = isAuthenticated();

    const getUserOrder = async ()  => {
        let result = await (await axios.get(`https://arcane-atoll-35730.herokuapp.com/api/orders/by/user/`+_id))
        console.log('result - > ')
        console.log(result.data);
        setHistory(result.data)
        }

    

    useEffect(() => {
        getUserOrder()
    }, []);


    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    {/* <li className="list-group-item">{name}</li> */}
                    {/* <li className="list-group-item">{email}</li> */}
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User name  :   "}{`${name}`}
                    </li>
                </ul>
            </div>
        );
    };
    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header"> Your Food order history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Order name: {p.name}</h6>
                                                <h6>
                                                    price: {p.price}฿
                                                </h6>
                                                <h6> Status : {h.status}</h6>
                                                
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title={`${name}`}
            description=""
            className="container"
        >
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>

                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>

            </div>
        </Layout>
    );
};


export default Dashboard;