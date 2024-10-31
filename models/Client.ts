import mongoose, { Schema, Document } from 'mongoose';

interface ClientDocument extends Document {
  name: string;
  age: number;
  retirementAge: number;
  jobTitle: string;
  income: number;
  currentSavings: number;
  savingsPercentage: number;
}

const ClientSchema = new Schema<ClientDocument>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  retirementAge: { type: Number, required: true },
  jobTitle: { type: String, required: true },
  income: { type: Number, required: true },
  currentSavings: { type: Number, required: true },
  savingsPercentage: { type: Number, required: true }
});

export default mongoose.models.Client || mongoose.model<ClientDocument>('Client', ClientSchema);
