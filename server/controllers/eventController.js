const Event = require('../models/Event');
const { getAllDocuments } = require('../utils/querryDocument');
const {deleteFile} = require("../utils/deleteFile");

exports.getAll = async (req, res) => {
  const query = { };

  if(req.query.search) {
    query.title = { $regex: req.query.search, $options: 'i' }
  }

  const defaultField = 'title';
  getAllDocuments(Event, query, defaultField, req, res);
};

exports.getOneById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ data: event });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, } = req.body;

    const event = new Event({
      title,
      description,
      startDate,
      endDate,
    });

    if (req.files?.["image"] && req.files?.["image"]?.length > 0) {
      event.images = req.files["image"][0].filename;
    }

    await event.save();
    res.status(201).json({ data: event });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startDate, endDate } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (new Date(event.startDate) <= new Date()) {
      return res.status(400).json({ error: 'Cannot update an event that has already started' });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.startDate = startDate || event.startDate;
    event.endDate = endDate || event.endDate;

    if (req.files?.["image"]?.[0]) {
      if (event.image) {
        deleteFile(event.image, res);
      }
      event.image = req.files["image"][0].filename;
    }

    await event.save();
    res.status(200).json({ data: event });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (new Date() >= event.startDate) {
      return res.status(400).json({ error: 'Cannot delete an event that has already started' });
    }

    await Event.findByIdAndDelete(event._id)
    res.status(204).send()
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getEventStatistics = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (new Date() < event.endDate) {
      return res.status(400).json({ error: 'Event has not yet ended' });
    }
    const totalBooksDonated = event.donateBooks.reduce((acc, book) => acc + book.quantity, 0);

    res.status(200).json({
      data: {
        ...event,
        totalBooksDonated,
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.donateBook = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { book, quantity } = req.body;
    const user = req.user.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    event.donateBooks.push({ book, donor: user, quantity });
    await event.save();

    res.status(200).json({ data: event });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateDonationStatus = async (req, res) => {
  try {
    const { eventId, donationId } = req.params;
    const { status } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const donation = event.donateBooks.id(donationId);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    donation.status = status;

    await event.save();

    res.status(200).json({ data: event });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};