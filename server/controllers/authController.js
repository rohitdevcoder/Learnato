import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.model.js';

const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to create a token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '1d' // Token expires in 1 day
  });
};

// @route   POST /auth/register
// @desc    Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 2. Create new user instance
    user = new User({ name, email, password, role });

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Save user to database
    await user.save();

    // 5. Create and return a JWT token
    const token = createToken(user.id);
    res.status(201).json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   POST /auth/login
// @desc    Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 2. Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 3. Create and return a JWT token
    // 
    const token = createToken(user.id);
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export const isAuth = async (req, res) =>{
  const userId = req.user.id;
  try {
    // const {userId} = req.body;
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({success:true, user});
  } catch (error) {
     console.log(error.message);
    return res.status(500).json({success:false, message:"Internal Server Error"})
  }
}