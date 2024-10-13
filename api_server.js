import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",

  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 4,
    title: "10 Benefits of Drinking Water",
    content:
      "This blog outlines the essential advantages of staying hydrated. Key benefits include aiding in weight management by controlling calorie intake, improving skin health through enhanced moisture, and supporting physical performance during exercise. Additionally, adequate hydration is vital for cognitive function, reducing headaches, and lubricating joints.Overall, drinking enough water is crucial for maintaining health and well-being.",
    author: "Kelsey Casselbury",
    date: "2023-08-22T10:37:00Z",
  },
  {
    id: 5,
    title: "How Apple's iOS 16 makes your iPhone feel like new",
    content:
      "A deep dive into the new features of iOS 16, focusing on personalization and usability enhancements that make older iPhones feel fresh and modern. Search for How Apple's iOS 16 makes your iPhone feel like new on The Verge's website.Users can now personalize their lock screens with various fonts, colors, and widgets. This feature allows for more creative expression and better information visibility right from the lock screen.",
    author: "Jon Porter",
    date: "2022-09-12T04:55:00Z",
  }
];


let lastId = 5;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/posts",(req,res)=>{
  const all=posts.filter((post)=>post.id>0)
  res.json(all)
})


app.get("/posts/:id",(req,res)=>{
const id=parseInt(req.params.id)
const specific=posts.find((post)=>post.id===id)
res.json(specific)
})


app.post("/posts",(req,res)=>{
  const id=posts.length+1;
  const newpost={ 
    id:id,
    title:req.body.title,
    content:req.body.content,
    author:req.body.author,
    date:new Date()
  }
  posts.push(newpost)
  console.log(newpost)
  res.json(newpost)
})


app.patch("/posts/:id",(req,res)=>{
const id=parseInt(req.params.id)
const samepost=posts.find((post)=>post.id===id);
const search=posts.findIndex((post)=>post.id===id)
const newpost={
  id:id,
  title:req.body.title      ||samepost.title,
  content:req.body.content    || samepost.content,
  author:req.body.author       || samepost.author,
  date:new Date()  ||  samepost.date
}
posts[search]=newpost;
console.log(newpost)
res.json( newpost)
})


app.delete("/posts/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((joke) => joke.id === id);
  if (searchIndex > -1) {
    posts.splice(searchIndex, 1);
    res .json({messge :`post with id: ${id} is deleted.` });
   
    
  } else {
    res
      .status(404)
      .json({ error: `post with id: ${id} not found. No post were deleted.` });
  }
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

