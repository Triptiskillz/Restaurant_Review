require("dotenv").config();

const express=require("express");
const cors =require("cors");
const db = require('./db');
const morgan=require("morgan");//package for midware
const app= express();

app.use(cors());
app.use(express.json())
 // get all restaurnts
 app.get("/api/v1/restaurants",async(req,res)=>{
     try {
        const restaurantRatingsData= await db.query(
        "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
        );
        res.status(200).json({
            status:"success",
            results:restaurantRatingsData.rows.length,
            data:{
               restaurants:restaurantRatingsData.rows,
            },
        });
     }catch(err){
  console.log(err);
     }
    
 });
//get a one restaurnts
app.get("/api/v1/restaurants/:id",async(req,res)=>{
    console.log(req.params.id);
    try{
      const  restaurant = await db.query(
        "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
        [req.params.id]
      );
     //select * from restaurants where id =req.params.id
     
     const reviews = await db.query("select * from reviews where restaurant_id =$1",[req.params.id]);
     console.log(reviews);
     
     res.status(200).json({// status code
        status:"succes",
        data:{
            restaurant: restaurant.rows[0],
            reviews: reviews.rows,
        },
    });
    }catch(err){
    console.log(err);
    }
   
});




// create a restaurnts
app.post("/api/v1/restaurants",async(req,res)=>{
  console.log(req.body);
   try{
   const results= await db.query
   ("INSERT INTO restaurants (name,location,price_range) values ($1,$2,$3)  returning *",
   [req.body.name, req.body.location,req.body.price_range])
   res.status(201).json({// status code
    status:"succes",
    data:{
        restaurant:results.rows[0],
    }
});
   }catch(err){
   console.log(err);
   }
  
});

//update a restaurnts
app.put("/api/v1/restaurants/:id",async(req,res)=>{
    try{
     const results= await db.query
     ("UPDATE restaurants SET name = $1,location= $2,price_range=$3 where id=$4 returning * ",
     [req.body.name,req.body.location, req.body.price_range,req.params.id]);
    
    console.log(results);
    res.status(200).json({// status code
        status:"succes",
        data:{
            restaurant:results.rows[0],
        },
    });
    }catch(err){
        console.log(err);
    }
   
    console.log (req.params.id);
    console.log(req.body);
});

//delete a restaurnts
app.delete("/api/v1/restaurants/:id",async(req,res)=>{
    try{
        const results = await db.query ("DELETE FROM restaurants  where id= $1",
        [req.params.id]);
        res.status(204).json({
            status:"sucess"
        });
    }catch(err){
    console.log(err);
    }
    
});

app.post("/api/v1/restaurants/:id/addReview",async(req,res)=>{
    try{
       const newReview = await  db.query("INSERT INTO reviews(restaurant_id,name,review,rating) values ($1,$2,$3,$4) returning *;",
        [req.params.id, req.body.name, req.body.review, req.body.rating]);
    
       console.log(newReview);
        res.status(201).json({// status code
            status:"succes",
            data:{
                review:newReview.rows[0],
            }
        });
    }catch(err){
     console.log(err);
    }
});


//server port 3000 or 4000 
const port = process.env.PORT||4000;
app.listen (port,()=>{
     console.log(`sever is up and listenting on port ${port}`);
 });
//midware package
/*app.use(morgan("dev"));

midware 2

 app.use((req,res,next)=>{
  console.log("something");
  next();
 });*/