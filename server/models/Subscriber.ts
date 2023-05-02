import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  name: string;
  email: string;
}

const subscriberSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<ISubscriber>('Subscriber', subscriberSchema);
