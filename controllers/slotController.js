import { Slots } from "../models/slotSchema.js";
import { User } from "../models/userSchema.js";

export const postSlot = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      referalCode,
      dob,
      gender,
      slot_date,
      course,
      instructor_firstName,
      instructor_lastName,
      whatsapp,
      commentsIfAny,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !slot_date ||
      !course ||
      !instructor_firstName ||
      !instructor_lastName
    ) {
      return res.status(400).json({ message: "Fill in all required details" });
    }
    const isConflict = await User.find({
      firstName: instructor_firstName,
      lastName: instructor_lastName,
      role: "Instructor",
      instructorCourse: course,
    });
    if (isConflict.length === 0) {
      return res.status(400).json({ message: "Instructor not found" });
    }
    if (isConflict.length > 1) {
      return res
        .status(400)
        .json({ message: "Instructor conflict! Contact through email" });
    }
    const instructorId = isConflict[0]._id;
    const studentId = req.user._id;
    const slot  = await Slots.create({
      firstName,
      lastName,
      email,
      phone,
      referalCode,
      dob,
      gender,
      slot_date,
      course,
      instructor: {
        firstName: instructor_firstName,
        lastName: instructor_lastName,
      },
      whatsapp,
      commentsIfAny,
      instructorId,
      studentId,
    });
    return res.status(200).json({ message: "Slot Booked Successfully", slot });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getAllSlots = async (req, res, next) => {
  try {
    const slots = await Slots.find();
    return res.status(200).json({ slots });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const updateSlotStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let slot = await Slots.findById(id);
    if (!slot) {
      return res.status(400).json({ message: "slot don't exists" });
    }
    slot = await Slots.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      message: "Status updated successfully",
      slot,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const deleteSlot = async (req, res, next) => {
  try {
    const { id } = req.params;
    let slot = await Slots.findById(id);
    if (!slot) {
      return res.status(400).json({ message: "slot don't exists" });
    }
    await slot.deleteOne();
    return res.status(200).json({ message: "slot successfully deleted" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
