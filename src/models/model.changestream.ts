import mongoose = require('mongoose');
import {Schema} from "mongoose";

const ChangestreamSchema = new Schema({
  server: {
    type: String,
    required: true
  },
  serverMode: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
});

const ModelChangestream = mongoose.model('Changestream', ChangestreamSchema, 'changehistory');
export default ModelChangestream