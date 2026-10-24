import env from 'dotenv'

env.config()


const config ={

    MONGODB_URL:process.env.MONGODB_URL,
    ACCESS_TOKEN:process.env.ACCESS_TOKEN,
    REFRESH_TOKEN:process.env.REFRESH_TOKEN
}


export default config