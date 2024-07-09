"use server";
import twilio from "twilio";
const accountSid: string = process.env.TWILIO_ACCOUNT_SID || "";
const authToken: string = process.env.TWILIO_AUTH_TOKEN || "";
const client = twilio(accountSid, authToken);
export async function TwilioSMS(phone: string) {
  const otp = Math.floor(1000 + Math.random() * 9000);
  try {
    // const message=await client.messages.create({
    //     body:`Your OTP is ${otp}`,
    //     from:'+19788002915',//USE YOUR TWILIO NUMBER
    //     to:'+91'+phone
    // });
    // console.log(message);
    return {
      message: "OTP sent successfully",
      otp: otp,
    };
  } catch (e) {
    return {
      error: "Error sending OTP",
    };
  }
}
