const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 3000;


// middleWare
app.use(cors());
app.use(express.json())

const verifyAccessToken=(req,res,next)=>{

}

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
        // await client.connect()
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");



        const db = client.db('onlineCourseDb')
        const courseCollection = db.collection('courses')
        const instructorCollection = db.collection('instructor')
        const addCourseCollection = db.collection('myCourse')
        const enrollCourseCollection = db.collection('myEnrollCourse')

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

        app.get('/popularCourses', async (req, res) => {
            const cursor = courseCollection.find().sort({ rating: -1 }).limit(6)
            const result = await cursor.toArray()
            res.send(result)
        })

        // instructor apis
        app.get('/instructors', async (req, res) => {
            const cursor = instructorCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        // add course apis
        app.post('/myCourse', async (req, res) => {
            const newCourse = req.body;
            const result = await addCourseCollection.insertOne(newCourse)
            res.send(result)
        })

        app.get('/myCourse', async (req, res) => {
            const email = req.query.email;

            let query = {};
            if (email) {
                query = { userEmail: email };
            }

            const result = await addCourseCollection.find(query).toArray();
            res.send(result);
        });


        app.get('/myCourse/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const cursor = addCourseCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.patch('/myCourse/:id', async (req, res) => {
            const id = req.params.id;
            const updatedProduct = req.body;
            const query = { _id: new ObjectId(id) }
            const update = {
                $set: updatedProduct
            }
            const result = await addCourseCollection.updateOne(query, update)
            res.send(result)
        })
        app.delete('/myCourse/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await addCourseCollection.deleteOne(query);
            res.send(result);
        })

        // my enroll course apis
        app.post('/enrollCourse', async (req, res) => {
            const newCourse = req.body;
            const result = await enrollCourseCollection.insertOne(newCourse)
            res.send(result)
        })
        app.get('/enrollCourse', async (req, res) => {
            const email = req.query.email;
            const query = {}
            if (email) {
                query.userEmail = email
            }
            const result = await enrollCourseCollection.find(query).toArray();
            res.send(result);
        });

        app.delete('/enrollCourse/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await enrollCourseCollection.deleteOne(query);
            res.send(result);
        })



    }
    finally {

    }
}
run().catch(console.dir)


app.listen(port, () => {
    // console.log(`This server listening on port ${port}`)
})