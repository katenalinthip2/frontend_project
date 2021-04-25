import React, { useState} from "react";
import "../styles.css";

const Checkbox = ({ categories, handleFilters }) => {

    const [checked, setCheked] = useState([]);

    const handleToggle = c => () => {
        // return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // if ถ้าการตรวจสอบปัจจุบันไม่ได้อยู่ใน checke state แล้ว -> push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        //console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };


    return categories.map((c, i) => (
        <li key={i} className="form-check ">
            <input onChange={handleToggle(c._id)}
                value={checked.indexOf(c._id === -1)}
                type="checkbox"
                for="flexCheckChecked"
                className="form-check-input mr-3 ml-8 mb-1" />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
};

export default Checkbox;
