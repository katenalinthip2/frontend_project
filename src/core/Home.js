import React from 'react';
import { Link, withRouter } from "react-router-dom";
import image from "../img/test.jpg"

const Home = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ "backgroundImage": "url(" + image + ")", "height": "100vh" }}>

        <div className="screen d-flex justify-content-center align-items-center">
            <div className="text-light mt-4 text-center">
                <h1>Welcom to Restaurant system</h1>
            </div>
            <div className="d-flex justify-content-center s">
                <Link to="/food" >
                    <button className="btn btn-outline-warning mt-2 mb-2 mr-2">
                        Order now!
                    </button>
                </Link>
                <Link to="/signin" >
                    <button className="btn btn-outline-warning mt-2 mb-2">
                        Signin
                    </button>
                </Link>
            </div>
        </div>
        <style jsx>{`
            .screen {
                background-color: rgba(0,0,0,0.8);
                height: 100vh;
                width: 100vw;
                flex-direction: column;
            }
           h1 {
               font-size: 100px;
               font-family: 'Solway', serif;
           }
           button {
               width: 200px;
               height: 50px;
               font-size: 30px;
               border-radius: 8px !important;
           }
        `}</style>
    </div>

);

export default Home;