import mongoose = require('mongoose');
import {Schema} from "mongoose";

const TokenSchema = new Schema({
    Person: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    tokens: [{
        Identifier: {
            type: String,
            required: true,
        },
        tul: {
            type: Number,
            required: true,
        },
        tll: {
            type: Number,
            required: true
        }
    }],
    nextGenDate: {
        type: Number,
        required: true
    }
});

const ModelTokens = mongoose.model('Token', TokenSchema, 'tokens');
export default ModelTokens