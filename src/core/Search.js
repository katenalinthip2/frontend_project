import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Search = () => {
    //กรองราคา
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);

    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    //ดึงข้อมูลจากฐานข้อมูลมาแสดงทางขวามือ (ยังไม่แสดงรูป) 
    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });

    };

    //กำหนด limit ในการแสดงเมนูอาหารในหนึ่งหน้า 
    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };


    //ถ้าเกินกำหนดจะมีปุ่ม loadmore เพื่อแสดงเมนูเพิ่มครั้งละตามจำนวน limit
    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    // list เมนูอาหารทั้งหมดจากฐานข้อมูล
    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    //filters = filters in category
    //filtersBy = filters of price
    const handleFilters = (filters, filterBy) => {
        //console.log("Search", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    // ดึงข้อมูลราคาที่เซตเป็น Array จาก fixcedPrices ที่กำหนดไว้
    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };


    return (
        <Layout
            title="ค้นหาอาหาร"
            description="ค้นหาอาหารและเรทของราคาอาหารที่คุณต้องการ"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h2>Categories of Menu</h2>
                    <h5>
                        <ul>
                            <Checkbox
                                categories={categories}
                                handleFilters={filters => handleFilters(filters, "category")} />
                        </ul>
                    </h5>

                    <h2>Price Range</h2>
                    <h5>
                        <ul>
                            <RadioBox prices={prices}
                                handleFilters={filters => handleFilters(filters, "price")} />
                        </ul>
                    </h5>

                </div>


                <div className="col-8">

                    <h2 className="mb-4">Menu</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout >
    );
};

export default Search;
