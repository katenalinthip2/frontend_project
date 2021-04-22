import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from "./apiCore";
import Card from "./Card";
import Searching from "./Searching";
import Search from './Search';


const Food = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    // sold = ที่ขายไปแล้ว
    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };


    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout title="ประเภทอาหาร"
            description="โปรดเลือกอาหารที่ท่านต้องการ">

            <Searching />
            <h2 className="mb-4 ml-5">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-3 ml-5 mb-3 mr-5 ">
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <br />

            <h2 className="mb-4 ml-5">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-3 ml-5 mb-3 mr-5">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );




};
export default Food;