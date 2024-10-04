import { Hono } from 'hono';
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        UserId: string,
        json:any
    }

}>();

blogRouter.use('/*', async (c, next) => {
    try{
        const authHeader = c.req.header("authorization") || "";
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
    // @ts-ignore
            c.set("UserId", user.id);
             await next()
        }
        else {
            c.status(403);
            return c.text("user not exists");
        }
  
    }catch(e:any){
        return c.json({
            message:e.message
        })
    }
})



blogRouter.post('/blogs', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const authorId = c.get("UserId");
    
    try {
        const post = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        })
        return c.json({
            id:post.id
        });
    } catch (e) {
        c.status(411);
        return c.text("error:releted to blog ")
    }

})

blogRouter.put('/update',async (c) => {
    const body = await c.req.json();
    const authorId = c.get("UserId");
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log(body);

   try{
    const blogs = await prisma.blog.findMany({
        where: {
          authorId: 12,
        },
      });
      console.log(blogs);
      
     
      
 console.log(body.id);
    const updatedBlog = await prisma.blog.updateMany({
        where: { authorId: body.id },
        data: {
            title: body.title,
            content: body.content,
        },
    });


    return c.json({
        updatedBlog
    })
        
    
   }catch(e:any){

c.status(411);
return c.json({
    message:e.message
  })
   }
   
})

blogRouter.get("/bulk",async(c)=>{
    const authorId = c.get("UserId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log(prisma);
    try{
       const blog = await prisma.blog.findMany({
           
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({blog});
    }catch(e:any){
        c.status(411);
     return   c.json({
            message:e.message
        });
    }

})

blogRouter.get('/:id', async (c) => {
    const Id = c.req.param('id');
    console.log(Id);
    const authorId = c.get("UserId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const post = await prisma.blog.findUnique({
            where: {
                id: Number(Id)
            },select:{
                id:true,
               title:true,
               content:true,
               author:{
                select:{
                    name:true
                }
               }
            }
        })
        return c.json({
            post
        });
    } catch (e) {
        return c.text('get blog route')
    }

})