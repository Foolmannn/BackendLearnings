import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    nameOfPatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    diseases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
      },
    ],
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    nameOfDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    treatment: String, //we can also define the type directly like this if no other constraint or info needed
    admittedAt: Date,
    dischargedAt: Date,
  },
  { timestamps: true },
);

export const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema,
);
