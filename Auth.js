const { Client } = require('pg');
const { password } = require('pg/lib/defaults');
const Conection = require('./Conection');
const jwt = require("jsonwebtoken");

module.exports = class Auth{
    
     client = new Client(Conection())
   async login(req,res){
        
        this.client.connect();
       
        this.client.query(`SELECT * FROM users where user_name = '${req.body.name}' and password = '${req.body.password}'`)
        .then((resp)=>{
            const  userObject ={
                name:'',
                password:''
            } 
                if(resp.rows.length > 0){
                   resp.rows.forEach((user)=>{
                       
                      userObject.name = user.user_name;
                      userObject.password = user.password
                   });

                   return jwt.sign({userObject},'secretKey',{expiresIn:'1h'},(err,token)=>{
                    res.json({
                        token,
                        userObject
                    })
                })
                }

                return res.status(400).json({
                    message:'user not found'
                })
                
                
               
        }).catch((error)=>{
            console.log("error",error);
            res.sendStatus(403)
          
        }).finally(()=>{
            this.client.end();
        })
    }
}