const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app = express() 
const port = 3000

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://JNC:jayesh%402512@cluster0.57baeh6.mongodb.net/Watchlistdb?retryWrites=true&w=majority');
const itemsSchema=new mongoose.Schema({
    toWatch:String
})
const Item=mongoose.model("todo",itemsSchema);

// const wakeUpSid=new Item({
//     toWatch:"Wake up sid"
// })
// wakeUpSid.save();

// const got=new Item({
//     toWatch:"Game of the Thrones"
// });

// const vikings=new Item({
//     toWatch:"Vikings"
// });
const toWatch=[];

// Item.insertMany(toWatch).then(function(){});

// Item.find().then(function(array){
//     array.forEach(function(item){
//         toWatch.push(item.toWatch);
//     });
// })
app.set('view engine','ejs');

app.get('/', function(req, res) {
    
Item.find().then(function(array){
    res.render('watchlist',newItems=array);
})
});

app.post('/delete',function(req,res){
    Item.deleteOne({_id:req.body.checked}).then(function(){
        res.redirect("/");
    });
  
})

app.post('/', function(req, res){
    // var newItem=req.body.newInput;
    // toWatch.push(newItem);
    const New = new Item({
        toWatch:req.body.newInput
    })
    New.save();
    res.redirect("/");

});

app.listen(port, () => console.log(`app listening on port ${port}!`))