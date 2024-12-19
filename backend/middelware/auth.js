import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const isAuthenticated = async (req, res, next) => {
    try {
		// Extracting JWT from request cookies, body or header
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		// If JWT is missing, return 401 Unauthorized response

		// console.log(token)

		// console.log("SECRET KEY .....",process.env.SECRET_KEY)

		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = jwt.verify(token, process.env.SECRET_KEY);
			// console.log("printing Decode...",decode);
			// Storing the decoded JWT payload in the request object for further use
			console.log("DECODE....",decode)
			req.id=decode.id;
			// req.body=course; 
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res.status(401).json({ 
				success: false, 
				message: "token is invalid in auth " 
			});
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
}