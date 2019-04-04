import React from "react";
import classes from "./FacebookImage.css";
import FacebookImage from "../../assets/fb.png"

const facebookImage = (props) => (
    <div className={classes.FacebookImage}>
        <img src={FacebookImage} className={classes.FacebookImg}/>
    </div>
)

export default facebookImage;