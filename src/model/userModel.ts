import { Schema, Document, model } from 'mongoose';

export enum UserType {
  Reporter = 'Reporter',
  Officer = 'Officer',
  Offender = 'Offender',
  Lawyer = 'Lawyer'
}

export interface IUser extends Document{
  _id: string
  firstName: string;
  lastName: string;
  phoneNumber: string;
  NIN: string;
  bookings: Schema.Types.ObjectId[];
  police_id: Schema.Types.ObjectId;
  userType: UserType;
  profile_picture: string;
  created_at: Date;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  NIN: { type: String, required: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Offense' }],
  police_id: { type: Schema.Types.ObjectId, ref: 'Police' },
  userType: { type: String, enum: Object.values(UserType), required: true },
  profile_picture: { type: String },
  created_at: { type: Date, default: Date.now }
});

const User = model<IUser>('User', userSchema);

export default User;
