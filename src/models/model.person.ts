import mongoose = require('mongoose');
import {Schema} from "mongoose";

const SchemaPerson = new Schema({
    phone: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true,
        default: Date.now()
    }
});

const ModelPerson = mongoose.model('Person', SchemaPerson, 'people');
export default ModelPerson