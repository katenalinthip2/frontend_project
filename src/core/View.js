import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

//product
const View = props => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
 console.log(error);
    //read product จาก DB เรียกใช้ที่ apicore
    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // ดึงรายการที่เกี่ยวข้อง (ขวามือ)
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);


    return (
        <Layout
            title={product && product.name}
            description={
                product &&
                product.description &&
                product.description.substring(0, 100)
            }
            className="container-fluid"
        >

            <div className="row">
                <div className="col-8">
                    {product && product.description && (
                        <Card product={product} showViewProductButton={false} />
                    )}
                </div>

                <div className="col-4">
                    <h4>รายการอาหารที่เกี่ยวข้องกับเมนู {product.name}</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );

};
export default View;

