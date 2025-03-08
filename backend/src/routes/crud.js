const express = require('express');
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const router = express.Router()

router.post("/events", async (req, res) => {
  const { name, date, availableSeats } = req.body;

  const currentDate = Date.now()
  if(new Date(date).getTime() < currentDate) {
    return res.status(400).json({ error: "Date musn´t be in the pass"})
  }

  if(Number(availableSeats) <= 0) {
    return res.status(400).json({ error: "Available seats must be greater than 0"})
  }

  const event = new Event({
    name: name,
    date: date,
    availableSeats: availableSeats
  })

  try {
    await event.save()
    res.status(201).json(event)
  } catch {
    res.status(500).json({ error: "Server error"})
  }
})

router.get("/events", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const skipEvents = (page - 1) * pageSize;

  try {
    const currentDate = new Date(Date.now()).toISOString().split('T')[0]
    const events = await Event.find({ date : { $gt: currentDate }}).skip(skipEvents).limit(pageSize)

    events.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const totalDocuments = await Event.countDocuments({date : { $gt: currentDate }})
    const totalPages = Math.ceil(totalDocuments / pageSize);
    res.status(201).json({
      currentPage: page,
      pageSize: pageSize,
      totalPages: totalPages,
      events: events})
  } catch {
    res.status(500).json({ error: "Server error"})
  }
})

router.post("/tickets", async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const eventExist = await Event.findOne({ _id: eventId })
    
    if(!eventExist) {
      return res.status(404).json({ error: "Event not found"})
    }

    if(eventExist.availableSeats == 0) {
      return res.status(409).json({ error: "Event does not has more available seats"})
    }

    const ticket = new Ticket({
      userId: userId,
      eventId: eventId
    });

    const result = await ticket.save();

    if(!result) {
      return res.status(500).json({ error: "Server error while create ticket"})
    }

    eventExist.availableSeats -= 1;
    await eventExist.save();

    res.status(201).json(ticket);
  } catch {
    res.status(500).json({ error: "Server error"})
  }
})

router.delete("/tickets/:ticketId", async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticketExist = await Ticket.findOne({ _id: ticketId })
    
    if(!ticketExist) {
      return res.status(404).json({ error: "Ticket not found"})
    }

    const currentDate = Date.now()
    if(new Date(ticketExist.date).getTime() < currentDate) {
      return res.status(404).json({ error: "Cannot cancel past events"})
    }

    const eventId = ticketExist.eventId;
    const deleteDoc = await Ticket.findOneAndDelete({ _id: ticketId })
    
    if(!deleteDoc) {
      return res.status(400).json({ error: "Server error"})
    }

    const eventExist = await Event.findOne({ _id: eventId })
    
    if(!eventExist) {
      return res.status(404).json({ error: "Event not found"})
    }

    eventExist.availableSeats += 1;

    await eventExist.save();
    res.status(204).json({ message: "Ticket deleted successfully" });
  } catch {
    res.status(500).json({ error: "Server error"})
  }
})

router.get("/users/:userId/tickets", async (req, res) => {
  const { userId } = req.params
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const startDate = req.query.startDate || '2000-01-10';
  const endDate = req.query.endDate || Date.now();
  const sort = Boolean(req.query.sort) || false;
  const search = String(req.query.search) || '';

  const skipEvents = (page - 1) * pageSize;

  try {
    const tickets = await Ticket.find({userId: userId}).skip(skipEvents).limit(pageSize)  
    const eventsIds = tickets.map(row => row.eventId)  

    const events = await Event.find({ 
      userId: eventsIds,
      date : { 
        $gt: startDate,
        $lte: endDate
      }, 
      name: search 
      }).skip(skipEvents).limit(pageSize)

    if(sort) {
      events.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    const ticketdId = tickets.reduce((acc, elm) => {
      if(!acc.hasOwnProperty(elm.eventId)) {
        acc[elm.eventId] = elm;
      }

      return acc
    })

    const eventAndTickets = events.map(row => {
      const ticket = ticketdId[row._id]
      return {
        ticketId: ticket._id,
        userId: ticket.userId,
        eventId: ticket.eventId,
        name: row.name,
        date: row.date
      }
    })

    const totalDocuments = await Event.countDocuments({date : { $gt: "2025-03-10" }})
    const totalPages = Math.ceil(totalDocuments / pageSize);
    res.status(201).json({
      currentPage: page,
      pageSize: pageSize,
      totalPages: totalPages,
      events: eventAndTickets})
  } catch {
    res.status(500).json({ error: "Server error"})
  }
})

module.exports = router;