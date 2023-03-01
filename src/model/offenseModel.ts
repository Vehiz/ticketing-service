import { Document, Schema, Model, model } from 'mongoose';

interface IOffense extends Document {
  offender_id: string;
  police_id: string;
  offense_type: 'overspeeding' | 'one-way' | 'wrong-parking'; 
  offense_status: 'pending' | 'settled';
  appeal_offense: boolean;
  appeal_offense_status: 'pending' | 'approved' | 'rejected';
  offense_evidence: string;
  created_at: Date;
}

const offenseSchema: Schema = new Schema({
  offender_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  police_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  offense_type: {
    type: String,
    enum: ['overspeeding', 'one-way', 'wrong-parking'], 
    required: true
  },
  offense_status: {
    type: String,
    enum: ['pending', 'settled'],
    required: true
  },
  appeal_offense: {
    type: Boolean,
    required: true
  },
  appeal_offense_status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    required: true
  },
  offense_evidence: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
  }
});

const Offense: Model<IOffense> = model<IOffense>('Offense', offenseSchema);

export { IOffense, Offense };
