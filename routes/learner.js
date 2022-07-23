const express = require('express')
const mongo = require('mongodb').MongoClient
const router = express.Router()
const jwt = require('jsonwebtoken')

const dbname = 'final'
const url = "mongodb://localhost:27017/"

router.get('/gettoken' , (req , res)=>
{
    jwt.sign(url , 'abcd123' ,(error , token)=>
    {
        if(error)
            res.json("There is error in gettoken")
        else
            res.json({Token : token})    
    })
})

router.get('/' , async (req , res)=>
{
    mongo.connect(url , (err , db)=>
    {
        if (err) throw err

        var x = db.db(dbname)
        
         x.collection("learner").find({}).toArray((err , data)=>
        {
            if (err) throw err
            res.json(data)
          

        })  
    })
})

router.post('/' , async (req , res)=>
{
    mongo.connect(url , (err , db)=>
    {
        if (err) throw err

        var obj = {name : req.body.name , age : req.body.age , gender : req.body.gender , skill : req.body.skill}
        var x = db.db(dbname)
        x.collection("learner").insertOne(obj , (err , data)=>
        {
            if (err) throw err
            res.json({Message : "Success"})
            db.close()
        })
    })
})

 router.get('/:name' , async (req , res)=>
{
    mongo.connect(url , (err , db)=>
    {
        if (err) throw err

        var x = db.db(dbname)
         x.collection("learner").findOne({ name : req.params.name},(err , data)=>
        {
            if (err) throw err
            res.json(data)
            db.close()
        })  
    })
}) 
router.put('/:name' , async(req , res)=>
{
    mongo.connect(url , (err , db)=>
    {
        if (err) throw err 
        var x = db.db(dbname)
        var old = {name : req.params.name}
        var obj = {$set: {name : req.body.name , age : req.body.age , gender : req.body.gender , skill : req.body.skill}}
        x.collection("learner").updateOne(old , obj , (err , data)=>
        {
            if(err) throw err 
            res.json({message : "Updated"})
            db.close()
        })
    })
})

router.delete('/:name' , async(req , res)=>
{
    mongo.connect(url , (err , db)=>
    {
        if (err) throw err 
        var x = db.db(dbname)
        var obj = {name : req.params.name}
        x.collection("learner").deleteOne(obj ,(err , data)=>
        {
            if(err) throw err 
            res.json({message : "Deleted"})
            db.close()
        })
    })
})
module.exports = router