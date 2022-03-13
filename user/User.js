
const Conection = require('../Conection');
const {Client,Pool} = require('pg')

module.exports = class User{
    

    async createUser(req,res){
        const pool = new Pool(Conection())
        pool.connect(function(err, client, done) {
            if(err) {
              return   res.sendStatus(400)
            }

            const user ={
                user_name:req.body.user_name,
                password:req.body.password,
                email:req.body.email,
     
            }
            client.query(`
            INSERT INTO users (user_name,password,email) values('${user.user_name}','${user.password}','${user.email}')`, function(err, result) {
            
              done();
          
              if(err) {
                console.log("error",error);
                res.sendStatus(403)
              }
              res.json({
                message:"Created succesfull"
              })
              pool.end()
            });
        });
    }
     
    async usersList(req,res){
        const pool = new Pool(Conection())
        pool.connect(function(err, client, done) {
            if(err) {
              return   res.sendStatus(400)
            }

            const  usersList=[];

            client.query(`SELECT * FROM users`, function(err, result) {
            
              done();
              if(err) {
                console.log("error",error);
                res.sendStatus(403)
              }

              if(result.rows.length > 0){
                  result.rows.forEach((user)=>{
                      usersList.push({
                          name:user.user_name,
                          email:user.email
                        })
                  })

                  return res.send({
                      message:"Users List ",
                      usresList:usersList
                  })
              }
              return res.send({
                message:"Users List ",
                usresList:[]
            })
              
              pool.end()
            });
        });
    }
    
}