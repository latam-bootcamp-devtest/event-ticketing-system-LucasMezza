const express = require('express');
const Event = require('../models/Event');
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
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const skipEvents = (page - 1) * pageSize;

  try {
    const currentDate = new Date(Date.now()).toISOString().split('T')[0]
    const events = await Event.find({date : { $gt: "2025-03-10" }}).skip(skipEvents).limit(pageSize)

    events.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const totalDocuments = await Event.countDocuments({date : { $gt: "2025-03-10" }})
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

module.exports = router;