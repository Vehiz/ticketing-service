


import { Schema, Document, model } from 'mongoose';

export enum UserType {
  Reporter = 'Reporter',
  Officer = 'Officer',
  Offender = 'Offender',
  Lawyer = 'Lawyer'
}

export interface IPayment extends Document {
    Amount: number;
    offense_id: Schema.Types.ObjectId;
    created_at: Date;
}

const paymentSchema = new Schema<IPayment>({
    Amount: {
        type: Number,
        required: true,
      },
      offense_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Offense',
      },
      created_at: {
        type: Date,
        required: true,
        default: Date.now,
      },
});

const PaymentModel = model<IPayment>('Payment', paymentSchema);

export default PaymentModel;
