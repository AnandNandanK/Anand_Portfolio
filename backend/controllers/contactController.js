import {mailSender} from "../utils/mailSender.js"

export const contactAdmin = async (req, res) => {
    try {

        const { email, message, name} = req.body;
        console.log(email, message, name,)

        if (!email || !message || !name) {
            return res.status(400).json({
                message: "All feilds are required",
                success: false
            })
        }

        try {
            const emailResponse = mailSender(email, name, message);
            console.log("Email sent successfully:", emailResponse.response);

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
              })
        }

        return res.status(200).json({
            message: "email sent success",
            success: true
        })



    } catch (error) {
        console.log(error)
    }
}