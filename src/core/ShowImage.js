import React from "react";
import { API } from "../config";
import "../styles.css";

const ShowImage = ({ item, url }) => (
    <div className="img">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="img"
            style={{ Height: "80%", Width: "100%" }}
        />
    </div>
);

export default ShowImage;
