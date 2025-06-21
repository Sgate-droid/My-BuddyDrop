import EventLog from "../models/eventLog.model.js";

export const logEvent = async ({ userId, eventType, description, metadata = {} }) => {
  try {
    await EventLog.create({ userId, eventType, description, metadata });
  } catch (err) {
    console.error("Error logging event:", err.message);
  }
};
