const express = require("express")
const jwt = require("jsonwebtoken");
const app = express();
const Auth= require("./Auth") 
const User = require("./user/User");
const ValidateToken = require("./ValidateToken")
const Restaurants = require("./restaurants/Restaurants");


const auth = new Auth();
app.use(express.json({extended:true}));

const cors = require("cors");

const user = new User();
const restaurant = new Restaurants();
const validateToken = new ValidateToken();

const corsOptions = {
  origin: "http://localhost:19006",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.post("/api/login",(req,res)=>{
    
    auth.login(req,res)
  
})

app.post("/api/user/create",verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretKey',(error,authData)=>{

        if(error){
            res.sendStatus(403);

        }else{
            user.createUser(req,res)

        }
    })
  
})
app.get("/api/user/list",verifyToken,(req,res)=>{
    
    jwt.verify(req.token,'secretKey',(error,authData)=>{

        if(error){
            res.sendStatus(403);
        }else{
            user.usersList(req,res)
        }
    })
  
})
app.post("/api/restaurant/createrRestaurant",verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretKey',(error,authData)=>{

        if(error){
            res.sendStatus(403);

        }else{
            restaurant.createRestaurant(req,res)

        }
    })
  
})

app.get("/api/restaurant/list",verifyToken,(req,res)=>{
    
    jwt.verify(req.token,'secretKey',(error,authData)=>{

        if(error){
            res.sendStatus(403);
        }else{
            restaurant.restaurantsList(req,res)
        }
    })
  
})

app.post("/api/posts",verifyToken,(req,res)=>{
    
    jwt.verify(req.token,'secretKey',(error,authData)=>{

        if(error){
            res.sendStatus(403);

        }else{
            res.json({
                message:'post fue creado',
                authData:authData
            })
        }
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
      const bearerToken =  bearerHeader.split(" ")[1]

      req.token = bearerToken
      next();
    }else{
    res.sendStatus(403)
    }
}
app.listen(3000,()=>{
    console.log("loading");
})
