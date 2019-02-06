const Tweet = require('../models/Tweet')

module.exports = {
    async store(req,res){
        console.log(req.params)
        const tweet = await Tweet.findById(req.params.id)
         
        tweet.set({likes: tweet.likes + 1})
        await tweet.save()
        //config socket io
        req.io.emit('like',tweet)
        return res.json(tweet)
    }
}