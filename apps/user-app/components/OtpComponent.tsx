"use client"
import { createRef, useState } from "react";
import { TwilioSMS } from "../app/lib/actions/otpsms";
import { addNumber } from "../app/lib/actions/addNumber";



export const MobileVerify = ({otp,number}:{otp:number,number:string}) => {
    const [otpValues,setOtpValues]=useState<number[]>(Array(4).fill(0));
    const refs=Array(4).fill(0).map(()=>createRef<HTMLInputElement>());
    const handleInputChange=(index:number)=>(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value && index<refs.length-1){
            refs[index+1]?.current?.focus();
        }
        const newOtpValues=[...otpValues];
        newOtpValues[index]=parseInt(e.target.value);
        setOtpValues(newOtpValues);
    };
    const verify=async()=>{
        const enteredOtp=otpValues.join("");
        if(parseInt(enteredOtp)===otp){
            const res=await addNumber(number);
            if(res.message){
                console.log("Number added successfully");
                window.location.reload();
            }
            if(res.error){
                console.log("Error adding number");
            }
        }
        else{
            window.alert("Incorrect OTP");
        }
    }
    
    return (
        <div className="flex flex-col justify-center h-screen items-center">
            <div className="p-8 bg-black rounded  border border-red-500">
                <div className="text-2xl font-bold">
                    Verify your mobile number
                </div>
                <div className="text-sm text-slate-600">
                    Enter the OTP sent to your mobile number
                </div>
                <div className=" pt-4 flex flex-row items-center justify-between mx-auto w-full max-w-xs text-black">
                    {refs.map((ref, index) => (
                        <div key={index} className="w-12 h-12">
                            <input
                                ref={ref}
                                className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                type="text"
                                maxLength={1}
                                onChange={handleInputChange(index)}
                            />
                        </div>
                    ))}
                </div>
                <div className="pt-4">
                    <button className="bg-red-500 text-white rounded p-2 w-full" onClick={verify}>
                        Verify
                    </button>
                </div>
                <div className="pt-4">
                    <button className="bg-slate-500 text-white rounded p-2 w-full">
                        Resend OTP
                    </button>
                </div>
            </div>
        </div>
    )
}

export const MobileCreate=()=>{
    const [number,setNumber]=useState<string>("");
    const [otp,setOtp]=useState<number|null>(null);
    async function sendSMS(){
        const response=await TwilioSMS(number);
        if(response.message){
            console.log(response.otp);
            setOtp(response.otp);
        }
    }
    if(otp){
        return <MobileVerify otp={otp} number={number}/>
    }
    return(
        <div className="flex flex-col justify-center h-screen items-center">
        <div className="p-8 bg-black rounded  border border-red-500">
            <div className="text-xl font-bold">
               Enter your mobile number to prooceed
            </div>
            <div className="pt-4">
                <input type="text" className="border border-slate-300 rounded p-2 w-full text-black" placeholder="9123XXXXXX" onChange={(e)=>{
                    setNumber(e.target.value);
                }}/>
            </div>
            <div className="pt-4">
                <button className="bg-red-500 text-white rounded p-2 w-full hover:bg-red-600"
                        onClick={sendSMS}
                >
                    Generate OTP
                </button>
            </div>
        </div>
    </div>
    )
}
