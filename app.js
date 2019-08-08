//imports
const express = require('express');
const adminRoutes = require('./routes/admin');
const routineRoutes = require('./routes/routines');
const authRoutes = require('./routes/auth');
const assessRoutes = require('./routes/assessments')
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const db = require('./config/database');
const modelRelationships = require('./models/modelRelationships');

const app = express();

//parse data 
app.use(bodyParser.json()); 

// to stop CORS error / define CRUD method / headers
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//bring in model relationships 
modelRelationships.modelRelationships();

//test database connection
db.authenticate()
    .then(()=>{
        console.log('Database connected');
    })
    .catch(err=>{
        console.log(err);
    });



//routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/routines', routineRoutes);
app.use('/auth', authRoutes);
app.use('/assessments', assessRoutes);


app.use((error, req, res, next) =>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});

});

app.get('/', function(request, response) {
    response.send('API is running');
    });


app.listen(process.env.PORT || 8080);