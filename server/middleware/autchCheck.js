import pkg from 'jsonwebtoken';
const { verify } = pkg;

import AuthorizationError from "../config/errors/AuthorizationError.js";
console.log(process.env.AUTH_ACCESS_TOKEN_SECRET);

// Pull in Environment variables
const ACCESS_TOKEN = {
  secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
};

export async function requireAuthentication(req, res, next) {
  try {
    const authHeader = req.header("Authorization");
    console.log('authHeader',authHeader);
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log('Authorization header is missing or malformed');
      throw new AuthorizationError(
        "Authentication Error",
        undefined,
        "You are unauthenticated!",
        {
          error: "invalid_access_token",
          error_description: "unknown authentication scheme",
        }
      );
    }

    const accessTokenParts = authHeader.split(" ");
    const aTkn = accessTokenParts[1];
    console.log(aTkn);

    const decoded = verify(aTkn, ACCESS_TOKEN.secret);
      console.log('decoded', decoded);
      
    // Attach authenticated user and Access Token to request object
    req.userId = decoded._id;
    req.token = aTkn;
    next();
  } catch (err) {
    // Authentication didn't go well
    console.log(err);

    const expParams = {
      error: "expired_access_token",
      error_description: "access token is expired",
    };
    if (err.name === "TokenExpiredError")
      return next(
        new AuthorizationError(
          "Authentication Error",
          undefined,
          "Token lifetime exceeded!",
          expParams
        )
      );

    next(err);
  }
}
