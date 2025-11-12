const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 3000;


// middleWare
app.use(cors());
app.use(express.json())

// VNhKjgCmycCtlbC7
// onlineCourseDb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ire4gf9.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



app.get('/', (req, res) => {
    res.send('omega learn running')
})

async function run() {
    try {
        await client.connect()
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");



        const db = client.db('onlineCourseDb')
        const courseCollection = db.collection('courses')

        app.post('/courses', async (req, res) => {
            const newCourse = req.body
            const result = await courseCollection.insertOne(newCourse)
            res.send(result)
        })

        app.get('/courses', async (req, res) => {
            const cursor = courseCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/popularCourses',async (req,res)=>{
            const cursor=courseCollection.find().sort({rating:-1}).limit(6)
            const result=await cursor.toArray()
            res.send(result)
        })



    }
    finally {

    }
}
run().catch(console.dir)


app.listen(port, () => {
    console.log(`This server listening on port ${port}`)
})