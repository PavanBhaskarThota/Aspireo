
const express = require("express");
const { TaskModel } = require("../model/task.model");
const { authMiddleware } = require("../middlewares/auth.middleware");

const taskRouter = express.Router();

taskRouter.use(authMiddleware)


taskRouter.post('/add',async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();

    res.status(200).send({ message: "Task Added Successfully", data: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).send({ message:"Internal Server Error"});
  }
});

taskRouter.get('/', async (req, res) => {
  try {
    // console.log(req.body)
    const allTasks = await TaskModel.find({userId:req.body.userId});
   
    res.status(200).send({message:"All Tasks", data: allTasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(400).send({message:"Internal Server Error"});
  }
});
taskRouter.get('/admintasks', async (req, res) => {
  try {
    // console.log(req.body)
    const allTasks = await TaskModel.find({});
    console.log(allTasks)
    res.status(200).send({message:"All Tasks", data: allTasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(400).send({message:"Internal Server Error"});
  }
});



taskRouter.patch('/update/:taskId', async (req, res) => {
  try {

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: req.params.taskId },
       req.body,
      { new: true }
    );
    // console.log(updatedTask)
    if (!updatedTask) {
      return res.status(200).send({ message: "Task Not FOund"});
    }

    res.status(200).send({ message: "Task Updated Successfully", data: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).send({message:"Internal Server Error"});
  }
});

taskRouter.delete('/delete/:taskId', async (req, res) => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.taskId);

    if (!deletedTask) {
      return res.status(200).send({ message:'Task not found' });
    }

    res.status(200).send({message: "Task Deleted Successfully", data: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(400).send({message:"Internal Server Error"});
  }
});

module.exports = { taskRouter };