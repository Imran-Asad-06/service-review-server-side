const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.stfbiry.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('photography').collection('services');
        const reviewCollection = client.db('photography').collection('reviews');

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        });
        app.get('/allServices', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });


        app.post('/allServices', async (req, res) => {
            const Service = req.body;
            const result = await serviceCollection.insertOne(Service);
            res.send(result);
            });
            
            app.get('/allServices/:id', async (req, res) => {
                const id = req.params.id;
                const query = { _id: ObjectId(id) };
                const service = await serviceCollection.findOne(query);
                console.log(service)
                res.send(service);
            });

            //reviews
            app.get('/reviews', async (req, res) => {
                const query = {}
                const cursor = reviewCollection.find(query);
                const review= await cursor.toArray();
                res.send(review);
                });
                
                app.post('/reviews', async (req, res) => {
                const review = req.body;
                const result = await reviewCollection.insertOne(review);
                res.send(result);
             });

             
            
            
            
    }
    finally{

    }
}

run().catch(err => console.error(err));




app.get('/', (req, res) => {
    res.send('Photography assignment ')
})

app.listen(port, () => {
    console.log(`Photography assignment ${port}`);
})