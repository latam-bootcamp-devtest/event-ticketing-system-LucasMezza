const mongoose = require('mongoose')

const TicketSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true
  },
  eventId: {
    type: String,
    require: true
  }
})

const Ticket = mongoose.model("Ticket", TicketSchema)
module.exports = Ticket;