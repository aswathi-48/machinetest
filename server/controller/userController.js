import { validationResult } from "express-validator";
import HttpError from "../middileware/httpError.js";
import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

  export const register = async (req, res, next) => {

      try {
    
        const errors = validationResult(req);
        const { first_name, last_name, phone, status, email, password} = req.body;
    
        if (!errors.isEmpty()) {
    
          return next(new HttpError("Invalid data inputs passed, please check your data before retry!", 422));
    
        }
    
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
    
          return next(new HttpError("User with this email already exists.", 409));
    
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
    
        const newUser = new User({ first_name, last_name, phone, email, status, password: hash });
        console.log(newUser);
        
    
        const savedUser = await newUser.save();
        console.log(savedUser,"saved");
        res.status(200).json({
          status: true,
          message: "User registered successfully",
          data: savedUser,
        });
      } catch (err) {
        return next(new HttpError("Oops! Process failed, please contact admin.", 500));
      }
    };


  export const login = async (req, res, next) => {

    try{
      
      const errors = validationResult(req);
  
      const { email , password } = req.body
  
      if (!errors.isEmpty()) {
  
        return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
  
      } else {
        const user = await User.findOne({ email: email });
    
      if (!user) {

        return next(new HttpError("Invalid credentials", 400))
      } else {
  
        const isPassword = await bcrypt.compare( req.body.password, user.password );

      if (isPassword) {
          const token = jwt.sign({ userId: user._id, userEmail: user. email, role: user.role },
                        process.env.JWT_SECRET,
                        { expiresIn: process. env. JWT_TOKEN_EXPIRY });
  
          res.status(200).json({
            status : true,
            message : '',
            data : null,
            result : user,
            access_token : token        
          })
      }
      else {

        return next(new HttpError("Oops! invalid credential!", 404)); 

      }
       }
      }

    } catch(err) {
      console.error(err)
      return next(new HttpError("Oops! Process failed", 500));
    }
}



  export const listUser = async (req, res, next) => {
    try {

        const user = await User.find({})

        res.status(200).json({
            status: true,
            message: "user retrieved successfully",
            data: user
        });
    } catch (err) {
        console.error(err);
        return next(new HttpError("Oops! Process failed, please contact admin", 500));
    }
};
  

  export const editUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty()) { 
  
            return next(new HttpError("Invalid inputs passed, please check ...", 422))
  
        } else {
  
            const {_id, first_name, last_name, phone, status, email, password} = req.body;
  
            const userData = await User.findOne({ _id: _id })
  
            if (! userData) {
  
                return next(new HttpError("Invalid credentials", 404))
  
            } else {
            const updateUser = { first_name, last_name, phone, status, email, password  }
            
            const updatedUserData = await User.findOneAndUpdate({ _id : _id }, updateUser, { new: true })
  
            res.status(200).json({
                status : true,
                message : "Successfuly updated",
                data: updatedUserData
            })
                       
            }
  
        }
  
    } catch(err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
  }

  export const deleteUser = async(req, res, next) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return next(new HttpError("Something went wrong.."), 422)

        } else {        
                const { _id } = req.body      

                const deleteUser = await User.findByIdAndUpdate(_id)

                res.status(200).json({
                    status : true,
                    message : "",
                    data : deleteUser
                })
        }

    } catch(err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}
