const express = require("express");
const router = express.Router();
const ActivitySummary = require("../models/ActivitySummary");

// Create a new Activity Summary entry
router.post("/activity_summaries", async (req, res) => {
  try {
    const newActivitySummary = await ActivitySummary.create(req.body);
    res.status(201).json(newActivitySummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Activity Summary entries
router.get("/activity_summaries", async (req, res) => {
  try {
    const activitySummaries = await ActivitySummary.find();
    res.status(200).json(activitySummaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific Activity Summary entry by ID
router.get("/activity_summaries/:id", async (req, res) => {
  try {
    const activitySummary = await ActivitySummary.findOne({
      code: req.params.id,
    });
    if (!activitySummary) {
      return res
        .status(404)
        .json({ message: "Activity Summary entry not found" });
    }
    res.status(200).json(activitySummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific Activity Summary entry by ID
router.put("/activity_summaries/:id", async (req, res) => {
  try {
    const updatedActivitySummary = await ActivitySummary.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedActivitySummary) {
      return res
        .status(404)
        .json({ message: "Activity Summary entry not found" });
    }
    res.status(200).json(updatedActivitySummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific Activity Summary entry by ID
router.delete("/activity_summaries/:id", async (req, res) => {
  try {
    const deletedActivitySummary = await ActivitySummary.findOneAndDelete({
      code: req.params.id,
    });
    if (!deletedActivitySummary) {
      return res
        .status(404)
        .json({ message: "Activity Summary entry not found" });
    }
    res
      .status(200)
      .json({ message: "Activity Summary entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
