import { Router } from "express";
import { v4 } from "uuid";
import User from "../db_utils/userSchema.js";
const userRouter = Router();

userRouter.post("/", async (req, res) => {
  try {
    const data = new User({ ...req.body, id: v4() });
    await data.save();
    res
      .status(200)
      .json({ message: "new user created successfully", newData: data });
  } catch (err) {
    res.status(500).json({ message: "error creating user", err });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const data = await User.find({});

    res
      .status(200)
      .json({ message: " user data fetched successfully", userData: data });
  } catch (err) {
    res.status(500).json({ message: "error in fetching user", err });
  }
});
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findOne({ id: id });
    console.log(data);
    res
      .status(200)
      .json({ message: " user data fetched successfully", userData: data });
  } catch (err) {
    res.status(500).json({ message: "error in fetching user", err });
  }
});

userRouter.patch("/edit/:userId", async (req, res) => {
    const { userId } = req.params;
    const { name, age, image } = req.body;
    try {
    //   const updatedUser = await User.findOneAndUpdate(
    //     { id: userId },
    //     { name, age, image },
    //     { new: true } 
    //   );
    const updatedUser = await User.findOne({ id: userId });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      updatedUser.name = name || updatedUser.name;
    updatedUser.age = age || updatedUser.age;
    updatedUser.image = image || updatedUser.image;
    updatedUser.save()
      res.status(200).json({
        message: "User data updated successfully",
        userData: updatedUser,
      });
    } catch (err) {
      res.status(500).json({ message: "Error in updating user", err });
    }
  });
  

userRouter.get("/delete/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
//     const deletedUser = await User.deleteOne({ id: userId });

//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
const data = await User.deleteOne({ id: userId });

    res.status(200).json({ message: "user deleted successfully" , data});
  } catch (err) {
    res.status(500).json({ message: "error in deleting user", err });
  }
});

export default userRouter;
