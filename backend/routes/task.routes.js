
const express = require("express");
const { TaskModel } = require("../model/task.model");

const taskRouter = express.Router();


taskRouter.post('/add', async(req,res)=>{
    try {
          const createdAt= new Date();
          req.body.createdAt= createdAt;
          console.log(createdAt)
          const newPost= new TaskModel(req.body);
          await newPost.save();

          res.status(200).send(newPost);

    }catch(error){
        res.status(400).send(error.message);
    }
})


module.exports = { taskRouter };

