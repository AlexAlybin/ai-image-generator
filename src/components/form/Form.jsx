import React, {useState} from "react";
import ClockLoader from "react-spinners/ClockLoader";
import styles from "./Form.module.css"

export const Form = () => {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const generateImageRequest = async (prompt, size, count) => {
        setLoading(true)
        return {
            data: {
                "success": true,
                "images": [
                    {
                        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-YIlMmJYT38BvSZ2YrCTL6v8X/user-h7K2h9I4aZDGY7CCpQOLqXg4/img-P49VepZydwnBi3oH8hhX4zL3.png?st=2022-12-07T19%3A25%3A14Z&se=2022-12-07T21%3A25%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-07T17%3A51%3A37Z&ske=2022-12-08T17%3A51%3A37Z&sks=b&skv=2021-08-06&sig=8ztVZ6kQ/k3UaJTQUOWszRPR2AuLSyj/07XxT9zPdoM%3D"
                    },
                    {
                        "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-YIlMmJYT38BvSZ2YrCTL6v8X/user-h7K2h9I4aZDGY7CCpQOLqXg4/img-rj9XxVi6QjnNwTzTnQIZWWxI.png?st=2022-12-07T19%3A25%3A14Z&se=2022-12-07T21%3A25%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-07T17%3A51%3A37Z&ske=2022-12-08T17%3A51%3A37Z&sks=b&skv=2021-08-06&sig=ZTHHpPcUlomGqwT1JBKgfDcWnc8CFVo4MzRyyHlRwCI%3D"
                    }
                ]
            }
        }
        // try {
        //     const response = await fetch("http://localhost:3001/openai/generate-image",
        //         {
        //             method: "post",
        //             headers: {
        //                 "Content-Type": "application/json; charset=utf-8",
        //             },
        //             body: JSON.stringify({
        //                 prompt,
        //                 size,
        //                 count
        //             })
        //         })
        //     console.log("RESP", response)
        //     return response
        // } catch (e) {
        //     console.log("ERROR generating an image", e.message)
        // } finally {
        //     setLoading(false)
        //
        // }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const prompt = formData.get("prompt")
        const size = formData.get("size")
        const count = formData.get("count")
        console.log(formData.get("prompt"))
        console.log(formData.get("size"))
        console.log(formData.get("count"))
        generateImageRequest(prompt, size, count).then(data => {
            setImages(data.data.images)
            setLoading(false)
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit} id="movieForm">
                    <h2>Request an image</h2>
                    <p className={styles.text}>Describe the image.
                        {" "}
                        <em>F.e: White boat in the ocean</em>
                    </p>
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
                    <button type={"submit"} className={styles.submitBtn}>Generate</button>
                </form>
                {loading ? <ClockLoader color="#36d7b7"/> : null}
            </div>
            <div className={styles.imagesContainer}>{
                images.length ? images.map(image => {
                    return (<img key={image.url} src={image.url} className={styles.image}/>)
                }) : null
            }</div>
        </div>)
}