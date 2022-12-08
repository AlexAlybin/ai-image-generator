import {API_PREFIX} from "../constants";

export const generateImageRequest = async (prompt, size, count) => {
    try {
        return await fetch(`${API_PREFIX}/openai/generate-image`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    prompt,
                    size,
                    count
                })
            })
    } catch (e) {
        console.log("ERROR generating an image", e.message)
    }
}