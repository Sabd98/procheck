const mongoose = require('mongoose');

//Task Collection Model
const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);