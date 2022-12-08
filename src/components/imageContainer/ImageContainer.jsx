import React from "react";
import styles from "./ImageContainer.module.css";
import ClockLoader from "react-spinners/ClockLoader";

export const ImageContainer = ({images = [], loading = false}) => {
    if (!loading && !images.length) {
        return null
    }
    return (
        <div className={styles.imageContainer}>
            {
                loading
                    ? <ClockLoader color="#3f51b5" size={100}/>
                    : images.length
                        ? images.map(image => {
                            return (<img alt={"generated"} key={image.url} src={image.url} className={styles.image}/>)
                        })
                        : null
            }
        </div>)
}