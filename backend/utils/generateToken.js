import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    try {
       

        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "15d", // Token expiry
        });

        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
            httpOnly: true, // Protect against XSS
            sameSite: "strict", // Protect against CSRF
            secure: process.env.NODE_ENV !== "development", 
        });

        
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};

export default generateToken;
