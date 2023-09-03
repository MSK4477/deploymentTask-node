import { Router } from "express";
import { v4  } from 'uuid';
import User from "../db_utils/userSchema.js";
const userRouter = Router();

userRouter.post("/", async(req, res) => {
  try{
    const data = new User({...req.body, id: v4()})
      await data.save()
      res.status(200).json({message:"new user created successfully", newData:data})
  }catch(err){
    res.status(500).json({message:"error creating user", err})
  }
})

userRouter.get("/", async (req, res) => {
    try{
        const data = await User.find({});
        
        res.status(200).json({message:" user data fetched successfully", userData:data})
    }catch(err){
        res.status(500).json({message:"error in fetching user", err})
    }
})

userRouter.put("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {    
        const updatedUser = await User.findOneAndUpdate({ id: userId }, req.body, { new: true });

        if (!updatedUser) {

            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "user data updated successfully", userData: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "error in updating user", err });
    }
});

userRouter.delete("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {    
        const deletedUser = await User.findOneAndDelete({ id: userId });

        if (!deletedUser) {

            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "user deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "error in deleting user", err });
    }
});


export default userRouter;
