const { Client } = require('pg');

const Conection = require('../Conection');

module.exports = class User{
    
     client = new Client(Conection())
   async createUser(req,res){
    
        this.client.connect();
        console.log(req.body);
       const user ={
           user_name:req.body.user_name,
           password:req.body.password,
           email:req.body.email,

       }
        this.client.query(`
        INSERT INTO users (user_name,password,email) values('${user.user_name}','${user.password}','${user.email}')`)
        .then((resp)=>{
            
             res.json({
                message:"Created succesfull"
            })
                
        }).catch((error)=>{
            console.log("error",error);
            res.sendStatus(403)
          
        }).finally(()=>{
            this.client.end();
        })
    }
}