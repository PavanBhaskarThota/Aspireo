const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  collaborators: [String],
  tasks: [
    {
      title: { type: String },
      status: { type: String },
      collaboratorId:{ type: String } 
    }
  ],
});

const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = {ProjectModel};
