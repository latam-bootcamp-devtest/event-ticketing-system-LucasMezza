const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  availableSeats: {
    type: Number,
    require: true
  }
})

const Event = mongoose.model("Event", EventSchema)
module.exports = Event;