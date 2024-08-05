const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const z = require('zod');
const prisma = new PrismaClient();

const signupInputs = z.object({
  Fullname : z.string(),
  email : z.string().email(),
  password : z.string().min(4)
})

const signinInputs = z.object({
  email : z.string().email(),
  password : z.string().min(4)
})


const signupUser = async (req, res) => {
  const success = signupInputs.safeParse();
  if(!success){
    res.status(411);
     return res.json({
        message:"Invalid"
      })
  }
  try {
    const { Fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, Fullname }
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token,user });
  }
  catch(e){
    res.status(403);
    console.log(e);
    res.json({
      message:"invalid creds"
    })
  }
};



const loginUser = async (req, res) => {
  const success = signinInputs.safeParse();
  if(!success){
    res.status(411);
     return res.json({
        message:"Invalid"
      })
  }
  try {
    const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token ,user });
  }
  catch(e){
    res.status(411);
      return res.json({
          message:"Invalid"
        })
  }
}


const registerAdmin = async (req,res) => {
  try {
    const { Fullname, email, password, adminKey } = req.body;
      if (adminKey !== process.env.ADMIN_KEY) {
        return res.status(403).json({ error: 'Invalid admin key' });
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, Fullname, role: 'ADMIN' }
    });
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
  }
  catch(e){
    res.status(411);
    console.log(e);
    res.json({
      message:"Access Denied"
    })
  }
}
module.exports = { signupUser, loginUser, registerAdmin };
