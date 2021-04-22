import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import "../styles.css";
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#fff" };
    }
};

//แถบเมนูข้างบน
const Menu = ({ history }) => (
    <div className="menu">
        <ul className="nav nav-tabs nav-fill">
            <li className="iHome">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    ____
                </Link>
            </li>


            <li className="iFood">
                <Link
                    className="nav-link"
                    style={isActive(history, "/food")}
                    to="/food"
                >
                    ____
                </Link>
            </li>

            

            <li className="iCart">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    ____
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>

            <li className="iSearch">
                <Link
                    className="nav-link"
                    style={isActive(history, "/search")}
                    to="/search"
                >
                    ______
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="iDboard">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        ____
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="iDboard">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        ____
                    </Link>
                </li>
            )}


            {!isAuthenticated() && (
                <Fragment>
                    <li className="iIn">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            ____
                        </Link>
                    </li>

                    <li className="iUp">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            ____
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="iOut">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#000" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        ____
                    </span>
                </li>
            )}
        </ul>
        <style>{`
                        .menu {
                            display: flex;
                            justify-content: flex-end;
                            box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px;
                        }
                    `}</style>
    </div>
);

export default withRouter(Menu);
