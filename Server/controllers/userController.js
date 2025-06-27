import Users from "../models/userModal.js";

export const userRegesiter =async (req, res, next) => {
    const { body } = req;
    const user = new Users({
      username: body.username,
      password: body.password,
      email: body.email,
    });
    await user.save();
    try {
      res.status(200).json("user register successfull");
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  export const userLoing = async(req,res)=>{
    const {email,password} =req.body;
    const user =await Users.findOne({email});
    if(!user){
        return res.status(404).json({error:'User not found',success:false,})
    }
    const isMatch = await user.comparePassword(password);    
    if(!isMatch){
      return  res.status(400).json({error:'invalid credential',success:true})
    }
    
    try{
     const token =await user.generateToken();
    res.status(200).json({message:'Login scucessful',success:true,error:'',token,userDetails:{username:user.username,email:user.email}})
    }catch(e){
        res.status(500).json({message:'',success:false,error:'server error'})
    } 
}
