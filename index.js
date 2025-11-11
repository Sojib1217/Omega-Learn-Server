const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express();
const cors = require('cors');
const port=process.env.PORT || 3000;


// middleWare
app.use(cors());
app.use(express.json())

// VNhKjgCmycCtlbC7
// onlineCourseDb

const uri = "mongodb+srv://onlineCourseDb:VNhKjgCmycCtlbC7@cluster0.ire4gf9.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



app.get('/',(req,res)=>{
    res.send('omega learn running')
})

async function run(){
 try{
       await client.connect()
       await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

 }
 finally{

 }
}
run().catch(console.dir)


app.listen(port,()=>{
    console.log(`This server listening on port ${port}`)
})