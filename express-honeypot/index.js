const express = require('express');
const cors = require('cors');
const path = require('path')
const port = '3000';
const app = express()

const routes = require('./src/routes/routes.js')

app.use('/', express.static(path.join(__dirname, 'static')));                                                                                                                                                      
app.use(cors());                                                                                                                                                                                                   
app.set('trust proxy', true)                                                                                                                                                                                 
app.use(express.json());
app.use(express.urlencoded({
  extended: true,                                                                                                                                                                                                  
}));

routes(app);

app.get('/', (req, res) => {
    var ip = req.ip
    console.log('ip = ', ip)
    res.send('coucou');
})  

app.listen(port, () => {
    console.log('app listen on port: ', port);
})