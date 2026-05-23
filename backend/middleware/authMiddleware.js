import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // check token exists
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Please login ....",
      });
    }

    // get token
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // compare token id with params id
    /*  if (decoded.id !== Number(req.params.id)) {
      return res.status(403).json({
        message: "Access denied",
      }); 
    }
      */

    // save user info
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
