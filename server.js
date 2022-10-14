const express = require('express');
mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/toDo',{
    useNewUrlParser:true, useUnifiedTopology:true
});
const db = require('./models/toDosDb');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req,res)=>{
    let todosList = await db.find().sort({createdAt: -1});
    res.render('index', {data: todosList});
    console.log(todosList)
});

app.post('/save', async (req,res)=>{
    await db.create({description:req.body.description})
    res.redirect('/')
})

app.get('/delete/:id', async (req, res)=>{
    await db.findByIdAndDelete(req.params.id);
    res.redirect('/')
})

app.get('/edit/:id', async (req, res)=>{
   const data = await db.findById(req.params.id);
    res.render('edit', {data: data});
})

app.post('/update/', async (req, res)=>{
    await db.findByIdAndUpdate({'_id': req.body.id},req.body);
     res.redirect('/')
 })
app.listen(5000)