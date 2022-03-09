require('dotenv').config()

export const config = {
    API_URL: "http://localhost:5000",
    MONGO_CONNECTION: process.env.DATABASE_CONNECTION
}