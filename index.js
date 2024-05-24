const express = require ('express');
const app = express();
const {dbConnection} = require ('./config/config.js')
const PORT = 8000;
const routes = require('./routes/tasks.js');

app.use(express.json());
app.use('/', routes)

dbConnection();

app.get('/', (req,res) => {
    res.send('prueba')
})
app.listen(PORT, () => console.log(`server started on port http://localhost:${PORT}`))

