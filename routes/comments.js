import express from "express"
const router = express.Router();
import Comments from "../modules/Comments.js" 

function removeProfanity(words){
    var CHAR = "";
    var BANNED = ['fuck','shit','queer','f*ck','sh*t', 'dumb', 'fucking', 'suck'];
    /* var regex = new RegExp(`\\b(${swear_words_arr.join('|')})\\b`, 'gi' ); */
    const censored = words
   .split(' ')
   .map(word => BANNED.includes(word) ? CHAR.repeat(word.length) : word)
   .join(' ')

    return censored;
    }

function cleanName(cName){
    cName = removeProfanity(cName);
    if (cName.trim() == "") {
        cName = "Anonymous"
    }
    return cName;
}

router.get("/", async (req, res) => {
    try{
        const comments = await Comments.find();
        res.json(comments);
    }catch(err){
        res.json({message: err});
    }
});


router.post("/", async (req, res) => {
    const cName = cleanName(req.body.Name);
    const cComment = removeProfanity(req.body.Comment);
    const myData = new Comments({   
        Name: cName,
        Comment: cComment
    });
    try{
        const savedComm = await myData.save()
        res.json(savedComm);
    }catch(err){
        res.json({message: err});
    }
   
});

export default router;
/* module.exports = router; */
