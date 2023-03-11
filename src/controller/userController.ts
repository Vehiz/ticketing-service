import { Request, Response } from "express";
import User, { IUser, UserType } from "../model/userModel";
import { Offense } from "../model/offenseModel";
import Payment from "../model/paymentModel";
import { generateToken as generateSignature } from "../utils/utility";
import PaymentModel, { IPayment } from "../model/paymentModel";
import https from 'https'

// Register User
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, firstName, lastName, NIN } = req.body;

    // Check if user exist

    const existingUser = await User.findOne(phoneNumber);

    if (!existingUser) {
      const newUser = new User({
        phoneNumber,
        firstName,
        lastName,
        NIN,
        userType: UserType.Offender,
      });
      // Save the new user document
      const user = await newUser.save();

      // Generate token
      const signature = await generateSignature({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      });
      res.status(200).json({
        message: "user created successfully",
        user,
        signature,
      });
    }
    res.status(404).json({
      message: "User already exist",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update User

export const updateUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const { phoneNumber, profile_picture } = req.body;

console.log('let us go')
    // Find user by Id
    const user = await User.findByIdAndUpdate(
        id,
        { phoneNumber, profile_picture:req.file?.path },
        { new: true }
      );
console.log('i am here')
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // Update user profile
    
    return res.status(200).json({
        message:"user updated successfully",
        user
        // id:user._id,
        // phoneNumber:user.phoneNumber,
        // profile_picture:user.profile_picture
    })
  } catch (error: any) {
    res.status(500).json({
      Error: error.message,
    });
  }
};
// Offense Registration

export const offenseRegister = async (req: Request, res: Response) => {
  try {
    const {
      offender_id,
      police_id,
      offense_type,
      offense_status,
      appeal_offense,
      appeal_offense_status,
      offense_evidence,
    } = req.body;

    const user = await User.findOne({offender_id})
    const newOffense = new Offense({
      offender_id,
      police_id,
      offense_type,
      offense_status,
      appeal_offense,
      appeal_offense_status,
      offense_evidence,
      created_at: new Date(),
    });

    const offense = await newOffense.save();
    res.status(201).json({
      message: "Offense registered succesfully",
      newOffense,
    });
  } catch (error:any) {
    res.status(500).json({
      Error: error.message,
      message: "Internal server error",
    });
  }
};

// Payment

export const paymentRegister = async(req:Request, res:Response)=>{
    try {
        const {Amount,offense_id } = req.body

       const payment = new PaymentModel({Amount, offense_id})
       const paymentRecord = await payment.save()
       return res.status(200).json({
        message: "payment recorded successfully",
        paymentRecord
       })
    } catch (error:any) {
        console.error(error)
       res.status(500).json({
        message:"Internal server error",
        Error: error.message
       }) 

    }
}

export const paystackPayment = (req:Request, res:Response)=>{
  try {
    

const params = JSON.stringify({
  "email": "vehiz@gmail.com",
  "amount": "10000"
})

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/initialize',
  method: 'POST',
  headers: {
    Authorization: 'Bearer sk_test_a98e29c541cd80d9d3b19732a792c456840ce5ca',
    'Content-Type': 'application/json'
  }
}

const reqPaystack = https.request(options, resPaystack => {
  let data = ''

  resPaystack.on('data', (chunk) => {
    data += chunk
  });

  resPaystack.on('end', () => {
    res.status(200).json({data})
    console.log(JSON.parse(data))
  })
}).on('error', error => {
  console.error(error)
})

reqPaystack.write(params)
reqPaystack.end()
  } catch (error:any) {
    res.status(500).json({
      Error: error.message
    })
  }
}


