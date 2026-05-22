import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  _id: string;
  customerId: string;
  staffId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: 'booked' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['booked', 'confirmed', 'completed', 'cancelled'],
      default: 'booked'
    },
    notes: {
      type: String
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

appointmentSchema.index({ staffId: 1, startTime: 1 });
appointmentSchema.index({ customerId: 1, startTime: 1 });

export default mongoose.model<IAppointment>('Appointment', appointmentSchema);
