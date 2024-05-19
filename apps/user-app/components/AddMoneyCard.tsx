"use cliet"
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransactions";



const SUPPORTED_BANKS=[{
    name:'HDFC Bank',
    redirectUrl: "https://netbanking.hdfcbank.com"
},{
    name:'AXS Bank',
    redirectUrl: "https://www.axisbank.com/"
}];



export const AddMoney=()=>{
    const [redirectUrl,setRedirectUrl]=useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [value,setValue]=useState(0);
    const [provider,setProvider]=useState(SUPPORTED_BANKS[0]?.name || "");
    return <Card title="Add Money">
        <div className="w-full">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val)=>{
                setValue(Number(val));
            }} />
            <div className="py-4 text-left">
                Bank
            </div>
            <Select onSelect={(value:string)=>{
                setRedirectUrl(SUPPORTED_BANKS.find(x=>x.name===value)?.redirectUrl || "");
                setProvider(SUPPORTED_BANKS.find(x=>x.name===value)?.name || "");
            }} options={SUPPORTED_BANKS.map(x=>({
                key:x.name,
                value: x.name
            }))} />
            <div className="flex justify-center pt-4">
                <Button onClick={async()=>{
                    await createOnRampTransaction(provider,value)
                    window.location.href=redirectUrl || ""
                }}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}