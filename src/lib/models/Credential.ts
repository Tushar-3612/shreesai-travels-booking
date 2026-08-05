import "server-only";

import { Schema, model, models, type Document, type Model } from "mongoose";

export interface CredentialDoc extends Document {
  email: string;
  name: string;
  photoUrl: string;
  passwordHash: string;
}

const CredentialSchema = new Schema<CredentialDoc>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    photoUrl: { type: String, default: "" },
    passwordHash: { type: String, required: true },
  },
  { collection: "credentials", timestamps: false }
);

export const CredentialModel: Model<CredentialDoc> =
  models.Credential || model<CredentialDoc>("Credential", CredentialSchema);
