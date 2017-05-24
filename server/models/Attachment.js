var mongoose = require('mongoose');
const crypto = require('crypto');
var AttachmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  name: {
    type: String
  },
  description: String,
  modified: String,
  size: String,
  mimeType: String,
  revision: String,
  path: {
    type: String
  },
  icon: String,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

module.exports = mongoose.model('Attachment', AttachmentSchema);