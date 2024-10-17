import { User } from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
// Top-level constants
const REFRESH_TOKEN = {
  secret: process.env.AUTH_REFRESH_TOKEN_SECRET,
  cookie: {
    name: "refreshTkn",
    options: {
      sameSite: "None",
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
};

/*
  1. SIGN UP USER 
*/
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email, password });
    await newUser.save();
    console.log(newUser.toJSON());
    

    const aTkn = await newUser.generateAccessToken();
    const refreshToken = await newUser.generateRefreshToken();

    res.cookie(
      REFRESH_TOKEN.cookie.name,
      refreshToken,
      REFRESH_TOKEN.cookie.options
    );

    res.status(201).json({
      success: true,
      
      message: "User registered successfully",
      accessToken: aTkn,
      user: newUser.toJSON()
    });
  } catch (error) {
    console.error("Registration Error:", error);

    res.status(500).json({
      success: false,
      message: error.details || "Registration failed",
      error: error.message,
    });
  }
};

/*
  2. LOGIN USER
*/
export const loginUser = async (req, res) => {
  console.log(req.header);
  
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    const aTkn = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    console.log(aTkn, refreshToken);

    res.cookie(
      REFRESH_TOKEN.cookie.name,
      refreshToken,
      REFRESH_TOKEN.cookie.options
    );
    res.status(200).json({
      success: true,
      message: "User Login successfully",
      accessToken: aTkn,
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: error.feedback || "Login failed",
      error: error.message,
    });
  }
};


/*
  5. REGENERATE NEW ACCESS TOKEN
*/
export const refreshAccessToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies[REFRESH_TOKEN.cookie.name];
    
    if (!refreshToken) {
      throw new AuthorizationError(
        "Authentication error!",
        undefined,
        "You are unauthenticated",
        {
          realm: "Obtain new Access Token",
          error: "no_rft",
          error_description: "Refresh Token is missing!",
        }
      );
    }

    const decodedRefreshTkn = jwt.verify(refreshToken, REFRESH_TOKEN.secret);
    
    const userWithRefreshTkn = await User.findOne({
      _id: decodedRefreshTkn._id,
      "tokens.token": refreshToken,
    });
    if (!userWithRefreshTkn)
      throw new AuthorizationError(
        "Authentication Error",
        undefined,
        "You are unauthenticated!",
        {
          realm: "Obtain new Access Token",
        }
      );

    // GENERATE NEW ACCESSTOKEN
    const newAtkn = await userWithRefreshTkn.generateAccessToken();
      console.log('newAtkn', newAtkn);
      
    res.status(201);
    res.set({ "Cache-Control": "no-store", Pragma: "no-cache" });

    // Send response with NEW accessToken
    res.json({
      success: true,
      accessToken: newAtkn,
    });
  } catch (error) {
    console.log('error',error);
    
    if (error?.name === "JsonWebTokenError") {
      next(
        new AuthorizationError(error, undefined, "You are unauthenticated", {
          realm: "Obtain new Access Token",
          error_description: "token error",
        })
      );
      return;
    }
    next(error);
  }
};




