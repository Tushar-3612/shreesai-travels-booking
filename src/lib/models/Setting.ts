import "server-only";
import { Schema, model, models, type Document, type Model } from "mongoose";
import type { SiteSettings } from "@/admin/types";

export interface SettingDoc extends SiteSettings, Document {}

const SettingSchema = new Schema<SettingDoc>(
  {
    businessName: { type: String, default: "Shirdi Car Rental" },
    tagline: { type: String, default: "" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "/favicon.ico" },
    heroSlides: [{ type: Schema.Types.Mixed, default: [] }],
    trustCounters: [{ type: Schema.Types.Mixed, default: [] }],
    about: { type: Schema.Types.Mixed, default: {} },
    whyChooseUs: [{ type: Schema.Types.Mixed, default: [] }],
    mostBookedRoutes: [{ type: Schema.Types.Mixed, default: [] }],
    phone: { type: String, default: "" },
    phoneDisplay: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    googleMapsLink: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    youtube: { type: String, default: "" },
    workingHours: { type: String, default: "" },
    footerCopyright: { type: String, default: "" },
    companyDescription: { type: String, default: "" },
    primaryColor: { type: String, default: "" },
    secondaryColor: { type: String, default: "" },
    accentColor: { type: String, default: "" },
    seo: { type: Schema.Types.Mixed, default: {} },
  },
  { collection: "settings", timestamps: false }
);

export const SettingModel: Model<SettingDoc> =
  models.Setting || model<SettingDoc>("Setting", SettingSchema);
