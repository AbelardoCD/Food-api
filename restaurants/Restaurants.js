
const Conection = require('../Conection');
const {Client,Pool} = require('pg')

module.exports = class Restaurants{
    

    async createRestaurant(req,res){
        const pool = new Pool(Conection())
        pool.connect(function(err, client, done) {
            if(err) {
              return   res.sendStatus(400)
            }

            const user ={
                name:req.body.name,
                description:req.body.description,
                picture:req.body.picture,
                id_user_admin:req.body.id_admin,
            }
            client.query(`INSERT INTO restaurants (name,description,picture,id_user_admin) 
            values('${user.name}','${user.description}','${user.picture}','${user.id_user_admin}')`, 
            function(err, result) {
            
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

    async restaurantsList(req,res){
        const pool = new Pool(Conection())
        pool.connect(function(err, client, done) {
            if(err) {
              return   res.sendStatus(400)
            }

            const  restaurantsList=[];

            client.query(`SELECT * FROM restaurants`, function(err, result) {
            
              done();
              if(err) {
                console.log("error",error);
                res.sendStatus(403)
              }

              if(result.rows.length > 0){
                  result.rows.forEach((restaurant)=>{
                      restaurantsList.push({
                          name:restaurant.name,
                          description:restaurant.email,
                          picture:restaurant.picture,
                          id_user_admin:restaurant.id_user_admin,
                       
                        })
                  })

                  return res.send({
                      message:"Restaurants List ",
                      usresList:restaurantsList
                  })
              }
              return res.send({
                message:"List users",
                usresList:[]
            })
              
              pool.end()
            });
        });
    }
     

}