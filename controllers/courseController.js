import { Courses } from "../models/courseSchema.js";
export const addCourse = async (req, res, next) => {
  try {
    const {
      title,
      code,
      instructor,
      price,
      duration,
      mode,
      validity,
      imageUrl,
      embedLink1,
      embedLink2,      
    } = req.body;
    if (
      !title ||
      !code ||
      !instructor ||
      !price ||
      !duration ||
      !mode ||
      !validity ||
      !imageUrl ||
      !embedLink1 ||
      !embedLink2
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter all details",
      });
    }
    const course = await Courses.findOne({ code });
    if (course) {
      return res
        .status(400)
        .json({ message: "course with this code already exists" });
    }
    await Courses.create({
      title,
      code,
      instructor,
      price,
      duration,
      mode,
      validity,
      imageUrl,
      embedLink1,
      embedLink2,
      
    });
    return res.status(200).json({
      success: true,
      message: "Course added successfully",
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Courses.find();
    res.status(200).json({ courses });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};


export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    let course = await Courses.findById(id);
    if (!course) {
      return res.status(400).json({ message: "Course don't exists" });
    }
    await course.deleteOne();
    return res.status(200).json({ message: "Course successfully deleted" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
