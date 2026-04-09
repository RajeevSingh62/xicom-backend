import mongoose, { Schema, Document } from "mongoose";



export interface ICandidate extends Document {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  resStreet1: string;
  resStreet2: string;
  perStreet1: string;
  perStreet2: string;
  documents: {
    fileName: string;
    fileType: string;
    fileUrl: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}



const CandidateSchema = new Schema<ICandidate>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    resStreet1: {
      type: String,
      required: [true, "Residential street 1 is required"],
      trim: true,
    },
    resStreet2: {
      type: String,
      required: [true, "Residential street 2 is required"],
      trim: true,
    },
    perStreet1: {
      type: String,
      required: [true, "Permanent street 1 is required"],
      trim: true,
    },
    perStreet2: {
      type: String,
      required: [true, "Permanent street 2 is required"],
      trim: true,
    },
    documents: {
      type: [
        {
          fileName: {
            type: String,
            required: true,
            trim: true,
          },
          fileType: {
            type: String,
            required: true,
            enum: ["image", "pdf"],
          },
          fileUrl: {
            type: String,
            required: true,
          },
        },
      ],
      validate: {
        validator: (docs: unknown[]) => docs.length >= 2,
        message: "At least 2 documents are required",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Candidate = mongoose.model<ICandidate>("Candidate", CandidateSchema);

export default Candidate;
