const mid  = (req , res , next)=>
{
    console.log("Middleware ..........")
    next()
}

module.exports= mid