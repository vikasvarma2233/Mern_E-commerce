import config from "../config/config.js";
import jwt from 'jsonwebtoken'



 export const createRefreshToken = ({userId , role})=>{

    const refreshToken = jwt.sign({ userId, role}, config.REFRESH_TOKEN,{expiresIn: "15m"})
    return refreshToken
}

 export const createAccessToken = ({userId , role})=>{

    const AccessToken = jwt.sign({ userId, role}, config.ACCESS_TOKEN,{expiresIn: "7Days"})
    return AccessToken
}

export const  readRefreshToken = (refreshToken)=>{

    return  jwt.verify(refreshToken, config.REFRESH_TOKEN);

}


export const  readAccessToken =(AccessToken) =>{

    return jwt.verify(AccessToken, config.ACCESS_TOKEN);
}

