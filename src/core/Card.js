import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import "../styles.css";

//description -> substring (0, 50) กำหนดความยาวในการอธิบายข้อมูลของเมนูใต้ภาพได้ 50 ตัวอักษร

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    fun
}) => {


    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-4">
                    <button className="bview">
                        View
                    </button>
                </Link>
            )
        );
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    //เรียกใช้ addTtem จาก Helper
    const addToKitchen = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    //ปุ่มAddToKitchen
    const showAddToKitchen = (showAddToCartButton) => {
        return showAddToCartButton && (
            <button onClick={addToKitchen} className="bKitchen">
                Add 
            </button>
        );
    };



    //บอกว่ารายการอาหารนั้นหมดหรือยังมี
    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-success badge-pill">มี</span>
        ) : (
                <span className="badge badge-danger badge-pill">หมด</span>
            );
    };

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
        fun()
    };

    //เลือกจำนวนรายการอาหารที่ต้องการจะสั่ง
    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                เลือกจำนวนที่จะสั่ง
                            </span>
                        </div>

                        <select class="form-control" id="exampleFormControlSelect1" value={count}
                            onChange={handleChange(product._id)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>

                    </div>
                </div>
            )
        );
    };

    //สร้างปุ่มลบรายการอาหารออกจาก cart
    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="bRemove"
                >
                    Remove
                </button>
            )
        );
    };
    return (


        <div className="card">
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="products" />
                
                <p className="CardPrice"> Price  : {product.price} ฿ </p>

                {showStock(product.quantity)}
                <br />
                {showViewButton(showViewProductButton)}

                {showAddToKitchen(showAddToCartButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}


            </div>
        </div>

    );
};

export default Card;
