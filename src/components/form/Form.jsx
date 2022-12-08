import React, {useState} from "react";
import styles from "./Form.module.css"
import {ImageContainer} from "../imageContainer/ImageContainer";
import {generateImageRequest} from "../../api/api";

export const Form = () => {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const prompt = formData.get("prompt")
        const size = formData.get("size")
        const count = formData.get("count")
        if (!prompt) {
            return
        }
        setLoading(true)
        generateImageRequest(prompt, size, count)
            .then(resp => resp.json())
            .then(data => {
                setImages(data.images)
            })
            .catch(e => {
                console.log("ERROR fetching image", e.message)
                setImages([])
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit} id="movieForm">
                    <h2 className={styles.title}>Image generator by OpenAI</h2>
                    <p className={styles.text}>Describe the image.</p>
                    <em className={styles.subText}>F.e: White boat in the ocean</em>
                    <input placeholder={"Type..."} className={styles.formItem} id="prompt" name="prompt"/>
                    <p className={styles.text}>Select image size. </p>
                    <select className={styles.formItem} id="size" name="size" defaultValue={"small"}>
                        <option value={"small"}>Small</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"large"}>Large</option>
                    </select>
                    <p className={styles.text}>Select image count. </p>
                    <select className={styles.formItem} id="count" name="count" defaultValue={1}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                    <button type={"submit"} className={styles.submitBtn} disabled={loading}>Generate</button>
                </form>
            </div>
            <ImageContainer loading={loading} images={images}/>
        </div>)
}