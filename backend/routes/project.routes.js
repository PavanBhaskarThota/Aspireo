const express = require("express");
const { ProjectModel } = require("../model/project.model");
const { userModel } = require("../model/user.model");



const projectRouter = express.Router();

projectRouter.post('/searchCollab', async (req, res) => {
    try {
      const { emailQuery } = req.body;
  
      const users = await userModel.find(
        { email: { $regex: new RegExp(emailQuery, 'i') } },
        { email: 1, _id: 1 }
      );

      if(users.length>0){
         return res.status(200).send({"msg":"colleborators","Colleborators":users});
        }
        return res.status(200).send({"msg":"Not Found"});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  projectRouter.post('/addCollab/:projectId', async (req, res) => {

    try {
      const { projectId } = req.params;
      const { collaboratorId } = req.body;


      const updatedProject = await ProjectModel.findByIdAndUpdate(
        projectId,
        { $push: { collaborators: collaboratorId } },
        { new: true }
      );

      if(updatedProject){
          return res.status(200).send({"msg":"colleborators added","Colleborator":updatedProject});
      }

      return res.status(200).send({"msg":"colleborators Id not added"});

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  
  projectRouter.post('/addTask/:projectId', async (req, res) => {
    try {
      const { projectId } = req.params;
      const { title, status, collaboratorId } = req.body;
  
      const task = { title, status, collaboratorId };
  
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        projectId,
        { $push: { tasks: task } },
        { new: true }
      );
  
      if (updatedProject) {
        return res.status(200).send({ "msg": "Task added", "Project": updatedProject });
      }
  
      return res.status(200).send({ "msg": "Task not added" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  projectRouter.post('/addProject', async (req, res) => {
    try {
  
      const newProject = new ProjectModel(req.body);
  
      const savedProject = await newProject.save();
  
      res.status(200).send({ message: 'Project added successfully', project: savedProject });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Internal Server Error' });
    }
  });



module.exports= {projectRouter};