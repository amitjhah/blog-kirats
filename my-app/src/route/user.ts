import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signininput,signupinput } from '@amitjha7891/medium-validator';


export  const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET :string
	}
}>();

  userRouter.post("/signup", async (c) => {
	
	try {
		const body = await c.req.json();
	const sucess = signupinput.safeParse(body);
	console.log(sucess);
	if(!sucess){
       c.json({
		message:"input is not right"
	   })
	}
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

		 const user = await prisma.user.create({

			data: {
				email: body.email,
				password: body.password,
				
			}
		}

	 )
	 const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.text(jwt );
	

	 }  catch (e: any) {
          
         console.error('Error during signup:', e);
        
         if (e.code === 'P2002') { 
           c.status(403);
           return c.json({
			message:e.message
		   });
         }
    }})

userRouter.post("/signin", async(c) => {
	
	try{
		const body = await c.req.json();

		const success = signininput.safeParse(body);
		if(!success){
			c.json({
				message:"input is not right"
			})
		}
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate())
       
		const user = await prisma.user.findFirst({
		where:{
			email:body.email,

		}
	})
	if(!user){
		return c.text("user not exists");
	}
const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.text(jwt );

		
	}catch(e){

		c.status(403);
		return c.text("error:error while signin ");
	}

	
})