import {mongoose, connect } from "mongoose";
export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URL, {
        dbName:  "bookingApplication"
    }).then(()=>{
        console.log("db connected successfully");
    }).catch((err)=>{
        console.log(err);
    })
} 