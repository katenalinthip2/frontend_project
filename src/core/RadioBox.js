// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import "../styles.css";

const RadioBox = ({ prices, handleFilters }) => {
    // eslint-disable-next-line
    const [value, setValue] = useState(0);



    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };



    return prices.map((p, i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-3 ml-8 mb-2"
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
};

export default RadioBox;