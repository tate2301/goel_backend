import mongoose = require('mongoose');
import {Schema} from "mongoose";

const SchemaTest = new Schema({
  name: {
    type: String,
  }
});

const ModelTest = mongoose.model('Test', SchemaTest, 'test');
export default ModelTest