import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CustomError from "../config/errors/CustomError.js";
dotenv.config();

const ACCESS_TOKEN = {
  secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
  expiry: "15m", 
};

const REFRESH_TOKEN = {
  secret: process.env.AUTH_REFRESH_TOKEN_SECRET,
  expiry: "7d",
};

// const RESET_PASSWORD_TOKEN = {
//   expiry: process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINS,
// };


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: { required: true, type: String },
    },
  ],
  phone: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other',
  },
  locationName: {
    type: String,
    default: '',
  },
});

UserSchema.pre('save', function (next) {
  if (this.isModified('username') || this.isModified('email') || this.isModified('password')) {
    this.updatedAt = Date.now(); // Update timestamp
  }
  next();
});


UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});


/* 
1. SET SCHEMA OPTION
 */
UserSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret, options) {
      const { username, email } = ret;
      return { username, email }; 
    },
  });
  

/* 
2. GENERATE  ACCESS TOKEN
 */
UserSchema.methods.generateAccessToken = function () {
  const user = this;
 

  if (!ACCESS_TOKEN) {
    throw new Error("Access token secret is not defined");
  }
  const accessToken = jwt.sign(
    {
      _id: user._id.toString(),
      username: `${user.username}`,
      email: user.email,
    },
    ACCESS_TOKEN.secret,
    {
      expiresIn: ACCESS_TOKEN.expiry,
    }
  );

  return accessToken;
};

/*
3. GENERATE  REFRESH TOKEN
 */
UserSchema.methods.generateRefreshToken = async function () {
  const user = this;

  const refreshToken = jwt.sign(
    {
      _id: user._id.toString(),
    },
    REFRESH_TOKEN.secret,
    {
      expiresIn: REFRESH_TOKEN.expiry,
    }
  );

  user.tokens.push({ token: refreshToken });
  await user.save();

  return refreshToken;
};


/* 
4. ATTACH CUSTOM STATIC METHODS
 */
UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user)
      throw new CustomError(
        "Wrong credentials!",
        400,
        "Email or password is wrong!"
      );
    const passwdMatch = await bcrypt.compare(password, user.password);
    if (!passwdMatch)
      throw new CustomError(
        "Wrong credentials!!",
        400,
        "Email or password is wrong!"
      );
    return user;
  };
  
export const User = model("User", UserSchema);
