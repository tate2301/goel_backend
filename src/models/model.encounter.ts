import mongoose = require('mongoose');
import {Schema} from "mongoose";

const EncounterSchema = new Schema({
  data: {
      type: String,
      required: true
  }
});

const ModelEncounter = mongoose.model('Encounter', EncounterSchema, 'cut_encounters');
export default ModelEncounter