import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import multer from "multer"
import path from "path"


const app=express()
const port=3000;
const api_url="http://localhost:4000"


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs');

const eurl = "mailto:pawarchandan301@gmail.com";
const iurl = 'https://www.instagram.com/chandanpawar101/?igsh=MTc2bDllcHk3b3V1aw%3D%3D';
const furl = 'https://www.facebook.com/profile.php?id=100069436939298';
const lurl = 'https://www.linkedin.com/in/chandan-singh-5a0448326';

app.get("/contact",(req,res)=>{
  
    res.render('contact.ejs', { 
    eurl: eurl ,
    iurl: iurl,
    furl: furl,
    lurl: lurl
})
})

app.get("/about",(req,res)=>{
    res.render("about.ejs",{
        eurl: eurl ,
        iurl: iurl,
        furl: furl,
        lurl: lurl
    })
})

app.get("/",async (req,res)=>{
    const random=Math.floor(Math.random()*9)+1
    try {
        const result=await axios(api_url+"/posts")
        res.render("index",{
            random:random,
            posts:result.data,
            eurl: eurl ,
            iurl: iurl,
            furl: furl,
            lurl: lurl
        })
    } catch (error) {
        res.send(error.message)
    }
})
app.get("/new",(req,res)=>{ 
    
    res.render("modify",{
        heading: "New Post",
        submit:"Create New Post",
        eurl: eurl ,
        iurl: iurl,
        furl: furl,
        lurl: lurl
    })
})
const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null ,"./public/blog_images")
    },
    filename:function(req,file,cb){
        console.log(file)
       cb(null ,Date.now() + path.extname(file.originalname))
    }
})
const upload =multer({storage})

app.post("/api/posts",upload.single('blog_image'),async (req,res)=>{
   
    try {
        const result=await axios.post(api_url +"/posts",req.body)
      res.redirect("/")

    } catch (error) {
        res.send(error.message)
    }
})


app.get("/edit/:id",async(req,res)=>{
    try {
        const result=await axios.get(api_url+`/posts/${req.params.id}`)
        res.render("modify",{
            heading:"Edit Post",
            submit: "Update Post",
            eurl: eurl ,
            iurl: iurl,
            furl: furl,
            lurl: lurl,
            post:result.data
        })
    } catch (error) {
        res.send(error.message)
    }
})

app.post("/api/posts/:id",async (req,res)=>{
    try {
        const result =await axios.patch(api_url + `/posts/${req.params.id}`,req.body)
        res.redirect("/")
    } catch (error) {
        res.send(error.message)
    }
})
app.get("/api/posts/delete/:id",async (req,res)=>{
    try {
        const result = await axios.delete(api_url + `/posts/${req.params.id}`)
        res.redirect("/")
    } catch (error) {
        res.send(error.message)
    }
})

app.listen(port,()=>{
    console.log(`Server is runnig on port ${port}`)
})
