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
        x.collection("experince").find({}).toArray((err , data)=>
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

        var obj = {skill : req.body.skill , period : req.body.period , price : req.body.price}
        var x = db.db(dbname)
        x.collection("experince").insertOne(obj , (err , data)=>
        {
            if (err) throw err
            res.json({Message : "Success"})
            db.close()
        })
    })
})

 router.get('/:skill' , async (req , res)=>
{
    mongo.connect(url , (err , db)=>
    {
        if (err) throw err

        var x = db.db(dbname)
         x.collection("experince").findOne({ skill : req.params.skill},(err , data)=>
        {
            if (err) throw err
            res.json(data)
        })  
    })
}) 
router.put('/:skill' , async(req , res)=>
{
    mongo.connect(url , (err , db)=>
    {
        if (err) throw err 
        var x = db.db(dbname)
        var old = {skill : req.params.skill}
        var obj = {$set: {skill : req.body.skill , period : req.body.period , price : req.body.price}}
        x.collection("experince").updateOne(old , obj , (err , data)=>
        {
            if(err) throw err 
            res.json({message : "Updated"})
            db.close()
        })
    })
})

router.delete('/:skill' , async(req , res)=>
{
    mongo.connect(url , (err , db)=>
    {
        if (err) throw err 
        var x = db.db(dbname)
        var obj = {skill : req.params.skill}
        x.collection("experince").deleteOne(obj ,(err , data)=>
        {
            if(err) throw err 
            res.json({message : "Deleted"})
            db.close()
        })
    })
})
module.exports = router