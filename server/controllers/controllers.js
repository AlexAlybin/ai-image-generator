const openai = require("../openai/config")
const generateImage = async (req, res) => {
    const {prompt, size, count} = req.body;
    try {
        const response = await openai.createImage({
            prompt,
            n: count,
            size: size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024"
        })

        const imageUrl = response.data?.data?.[0]?.url

        res.status(200).json({success: true, img: imageUrl})
    } catch (e) {
        res.status(400).json({message: `ERROR generating image - ${e.message}`})
    }
}

module.exports = {generateImage}