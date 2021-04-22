import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
// import {getStatusValues} from "../admin/apiAdmin";

const Dashboard = () => {

    const [history, setHistory] = useState([]);


    const {
        user: { _id, name, role }
    } = isAuthenticated();

    const token = isAuthenticated().token;
    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        
        init(_id, token); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                                <h6> Status : {p.getStatusValues}</h6>

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