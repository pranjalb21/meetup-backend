const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const Event = require("./models/event.model");
const { initializeDB } = require("./db/db.config");

const app = express();
const PORT = process.env.PORT;
const corsOptions = {
    origin: "*",
    credentials: true,
};
initializeDB();

app.use(express.json());
app.use(cors(corsOptions));

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

// Get all events
const getAllEvents = async () => {
    try {
        const events = await Event.find();
        return events;
    } catch (error) {
        throw error;
    }
};
app.get("/events", async (req, res) => {
    try {
        const events = await getAllEvents();
        if (events.length > 0) {
            res.status(200).json({
                message: "Events fetched successfully.",
                data: events,
            });
        } else {
            res.status(404).json({ error: "No event found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch event." });
    }
});

// Get event by ID
const getEventById = async (id) => {
    try {
        const events = await Event.findById(id);
        return events;
    } catch (error) {
        throw error;
    }
};
app.get("/events/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const events = await getEventById(id);
        if (events) {
            res.status(200).json({
                message: "Event fetched successfully.",
                data: events,
            });
        } else {
            res.status(404).json({ error: "No event found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch event." });
    }
});


// Get event by filter
const getEventByFilter = async (event_type) => {
    try {
        const events = await Event.find({event_type});
        return events;
    } catch (error) {
        throw error;
    }
};
app.get("/events/filter/:event_type", async (req, res) => {
    try {
        const { event_type } = req.params;
        const events = await getEventByFilter(event_type);
        if (events.length>0) {
            res.status(200).json({
                message: "Event fetched successfully.",
                data: events,
            });
        } else {
            res.status(404).json({ error: "No event found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch event." });
    }
});

// Get event by keyword
const getEventByKeyword = async (keyword) => {
    try {
        const combinedEvents = [];
        const titleEvents = await Event.find({
            event_title: {
                $regex: keyword,
                $options: "i",
            },
        });
        const tag = keyword.charAt(0) + keyword.slice(1)
        const keywordEvents = await Event.find({
            event_tags: { $in: tag },
        });
        for(const e of titleEvents){
            combinedEvents.push(e);
        }
        for(const e of keywordEvents){
            combinedEvents.push(e);
        }
        return combinedEvents;
    } catch (error) {
        throw error;
    }
};
app.get("/events/keyword/:keyword", async (req, res) => {
    try {
        const { keyword } = req.params;
        const events = await getEventByKeyword(keyword);
        if (events.length > 0) {
            res.status(200).json({
                message: "Event fetched successfully.",
                data: events,
            });
        } else {
            res.status(404).json({ error: "No event found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch event." });
    }
});
