import DropSchedule from "../models/dropSchedule.model.js";
import { sendEmail } from "../services/email.service.js";
import { logEvent } from "../utils/logger.js";

export const createDropSchedule = async (req, res) => {
  try {
    const { petId, dropLocation, dropDate, dropTime, instructions } = req.body;
    // const { id: userId, email: userEmail } = req.user;
     const userId = req.user.id;
    const userEmail = req.user.email;

    const drop = await DropSchedule.create({
      userId,
      petId,
      dropLocation,
      dropDate,
      dropTime,
      instructions
    });

    // Log event
    await logEvent({
      userId,
      eventType: "DROP_SCHEDULED",
      description: `User scheduled a drop for pet ID ${petId}`,
      metadata: { dropDate, dropTime, dropLocation, instructions }
    });

    await sendEmail({
      to: userEmail,
      subject: `Drop Scheduled for Your Pet`,
      text: `Hi! Your drop is scheduled on ${dropDate} at ${dropTime} to ${dropLocation}.
Instructions: ${instructions || 'None'}`
    });

    res.status(201).json({ message: "Drop scheduled and email sent", data: drop });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getUserDropSchedules = async (req, res) => {
  try {
    const userId = req.user.id;
    const drops = await DropSchedule.findAll({ where: { userId } });
    res.json(drops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

