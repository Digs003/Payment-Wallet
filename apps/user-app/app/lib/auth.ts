import prisma from "@repo/db/client"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOptions ={
    providers:[
        Credentials({
            name:'Credentials',
            credentials:{
                name:{label: "Name",type:"text"},
                phone:{ label: "Phone Number", type:"text", placeholder:"12331313"},
                password:{ label: "Password", type:"password"},
                email:{ label: "Email", type:"email",placeholder:"abcd@emaple.com"},
            },
            
            async authorize(credentials:any){
                if (!credentials.name || !credentials.password || !credentials.email) {
                    console.log('Missing required fields');
                    return null;
                }
                const hashedpassword=await bcrypt.hash(credentials.password,10);
                const existing_user= await prisma.user.findFirst({
                    where:{
                        name:credentials.name
                    }
                });
                if(existing_user ){
                    if(existing_user.password){
                        const passwordValidation=await bcrypt.compare(credentials.password,existing_user.password);
                        if(passwordValidation){
                            console.log(existing_user.name);
                            console.log(existing_user.email);
                            console.log('1');
                            return {
                                id: existing_user.id.toString(),
                                name: existing_user.name,
                                email: existing_user.email,
                            }
                        }
                        console.log('2');
                        return null;
                    }
                    console.log('3');
                    return null;
                }
                try {
                    console.log(credentials.name);
                    console.log(credentials.email);
                    const user = await prisma.user.create({
                        data: {
                            name:credentials.name,
                            number: credentials.phone,
                            password: hashedpassword,
                            email: credentials.email,
                        },
                        
                    });

                    console.log('4');
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }
                } catch(e) {
                    console.error(e);
                }
                console.log('5');
                return null;
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({token,session}:any){
            session.user.id=token.sub;
            return session;
        }
    }
}