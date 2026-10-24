
import authModel from "../model/auth.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/auth.utils.js";
import { createRefreshToken , readRefreshToken } from "../utils/auth.utils.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // Validate input
        if (!email || !name || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check existing user
        const isUserAlreadyExist = await authModel.findOne({ email });

        if (isUserAlreadyExist) {
            return res.status(409).json({
                message: "User already exists with this email"
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Save user
        const user = await authModel.create({
            email,
            name,
            passwordHash
        });

        const accessToken = createAccessToken({userId : user._id , role : user.role})
        const refreshToken = createRefreshToken({userId : user._id , role : user.role})

        res.cookie("refreshToken", refreshToken ,{
            httpOnly:true
        })

        await authModel.findByIdAndUpdate(user._id , {
            refreshToken: refreshToken
        })

        return res.status(201).json({
            message: "User registered successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                accessToken
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



export const login = async (req, res)=>{


    const {email , password} = req.body;

     const user = await authModel.findOne({email})

     if(!user){
        
        return res.status(400).json({
            message:"Invalid email or password"
        })
     }

     const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

     if(!isPasswordValid){

        return res.status(400).json({
            message:"Invalid email or Password"
        })
     }

     const refreshToken = createRefreshToken({userId: user._id , role :user.role})
     const accessToken = createAccessToken({userId: user._id , role :user.role})

     await authModel.findOneAndUpdate({email},{
        refreshToken
     }
        
     )

     res.cookie("refreshToken", refreshToken ,{
        httpOnly:true
     });
     

     res.status(201).json({

        message:"user loggin successfully",
        data:{
            user:{
                id: user._id,
                name:user.name,
                email:user.email
            }
        },
        accessToken
     })

}


export const refresh =  async(req, res)=>{

    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){

        res.status(401).json({
            message:"refresh token is required"
        })
    }

    try {

        const decoded = readRefreshToken(refreshToken);

        const {userId , role} = decoded

        const user = await authModel.findById(userId);

        if(refreshToken != user.refreshToken){
            await authModel.findByIdAndUpdate(user._id ,{
                refreshToken : null,
                isAccountFreeze: true
            })

            return res.status(401).json({
                message:"Refresh Token mismtach"
            })
        }

        const accessToken = createAccessToken({userId, role});
        const newRefreshToken = createRefreshToken({userId, role})

        await authModel.findByIdAndUpdate(user._id ,{
            refreshToken : newRefreshToken,
        })

        res.cookie("refreshToken",refreshToken , {
            httpOnly:true
        } )

        res.status(201).json({
            message:"Token rotated successfully..",
            data:{
                user:{
                    email:user.email,
                    name:user.name,
                    id: user._id
                },
                accessToken
            }
        })        
    } catch (error) {

      return   res.status(400).json({
        message:"Invalid refresh token"
      })
        
    }



}


export const getMe = async (req, res)=>{

    const { userId , role} = req.user

    const user = await authModel.findById(userId)

    res.status(201).json({
        message:"user fetch successfully ",
        data:{
            user:{
                email: user.email,
                name:user.name,
                id:user._id
            }
        }
    })


}

export default register;
