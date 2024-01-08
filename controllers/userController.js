import User from "../models/user.js";


const registerUser = async (req,res) => {
  try {
    const {username} = req.body

    const existingUser = await User.findOne({ username })

    if(existingUser) {
      return res.status(400).json({ message: "user already exists"})
    }
    const newUser = new User({ username })
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully'})
  } catch(error) {
    console.error(error)
    res.status(500).json({message:'internal server error'})
  }
}


const loginUser = async (req,res) => {
  try {
    const { username } = req.body

    const user = await User.findOne({username})

    if(!user) {
      return res.status(404).json({message:'user not found'})
    } 
    res.status(200).json({message:'login successful', user})
    } catch (error) {
      console.error(error)
      res.status(500).json({ message:'internal server error'})
    }
  }


const userController = {
  registerUser,
  loginUser
}

export default userController