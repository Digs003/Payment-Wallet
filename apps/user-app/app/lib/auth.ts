import prisma from "@repo/db/client"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import GoogleProvider from "next-auth/providers/google";

export const authOptions ={
    providers:[
        Credentials({
            name:'Credentials',
            credentials:{
                password:{ label: "Password", type:"password"},
                email:{ label: "Email", type:"email",placeholder:"abcd@emaple.com"},
            },
            
            async authorize(credentials:any){
                if ( !credentials.password || !credentials.email) {
                    console.log('Missing required fields');
                    return null;
                }
                const hashedpassword=await bcrypt.hash(credentials.password,10);
                const existing_user= await prisma.user.findFirst({
                    where:{
                        email:credentials.email
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
                                id: existing_user.id,
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
                else{
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    pages:{
        signIn: 'api/auth/signin',
    },
    callbacks: {
        async session({token,session}:any){
            session.user.id=token.sub;
            return session;
        },
        // async redirect({ url, baseUrl }:any) {
        //     // Allows relative callback URLs
        //     if (url.startsWith("/")) return `${baseUrl}${url}`
        //     // Allows callback URLs on the same origin
        //     else if (new URL(url).origin === baseUrl) return url
        //     return baseUrl
        // },
        async signIn({ user, account }: { user: any, account: any }) {
            if (account.provider === "google") {
              const { name, email } = user;
              try {
                const userExists = await prisma.user.findUnique({ where: { email } });
          
                if (!userExists) {
                  await prisma.user.create({
                    data: {
                      name,
                      email,
                    },
                  });
                }
              } catch (error) {
                console.log(error);
              }
            }
          
            return user;
        },
        
    }
}