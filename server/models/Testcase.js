var mongoose = require('mongoose');
const crypto = require('crypto');
var TestcaseSchema = new mongoose.Schema({
  _id: { type: String, unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  key: { type: String, unique: true },
  testSuiteId: { type: String },
  priority: { type: Number },
  order: { type: Number },
  title: { type: String, required: true },
  description: { type: String },
  prerequisites: { type: String },
  steps: Array,
  expected: Array,
  tags: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: { type: String },
  updatedBy: { type: String },
  enabled: { type: Boolean },
  isAutomated: { type: Boolean },
  estimate: { type: Number },
  status: { type: String, default: 'created' }
});

module.exports = mongoose.model('Testcase', TestcaseSchema);
