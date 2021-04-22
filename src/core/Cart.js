import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart, } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
    const [items, setItems] = useState([]);

    // useEffect(() => {
    //     setItems(getCart());
    // }, [items]);

    useEffect(() => {
        setItems(getCart());
    }, []);

    const fun = () => {
        setItems(getCart())
    }

    const showItems = items => {
        return (
            <div>
                <h2>รายการอาหารที่คุณเลือกมี {`${items.length}`} รายการ</h2>
                <Link to="/food">กลับไปยังหน้าสั่งอาหาร</Link>
                <hr />
                {items.map((product, i) => (
                    <Card key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        fun={fun}
                    />
                ))}

            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            ไม่มีรายการอาหารที่สั่ง <br /> <Link to="/food">กลับไปยังหน้าสั่งอาหาร</Link>
        </h2>
    );

    return (
        <Layout
            title="รายการอาหารที่คุณเลือก"
            description="โปรดมั่นใจก่อนกดสั่งอาหาร"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
