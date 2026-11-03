import { z } from "zod";

export const enquiryTypes = {
  general: "General enquiry",
  quote: "Request a quotation",
  product: "Product enquiry",
  consultation: "Technical consultation",
  partnership: "Partnership enquiry",
  service: "Service / project enquiry",
  careers: "Careers enquiry",
} as const;
export type EnquiryType = keyof typeof enquiryTypes;

export const projectTypes = [
  "Residential building",
  "Commercial building",
  "Industrial facility",
  "IT park",
  "Hospital",
  "Hotel",
  "Infrastructure",
  "Mixed use",
  "Other",
] as const;

export const projectStages = [
  "Concept / feasibility",
  "Design",
  "Tender",
  "Construction",
  "Testing & commissioning",
  "Existing building / retrofit",
  "Not applicable",
] as const;

export const interestOptions = [
  "Smoke Management",
  "Pressurization",
  "Ventilation",
  "Fireman Override Systems",
  "AI & Automation Integration",
  "Services / consultation",
  "Not sure yet",
] as const;

const optional = z.string().trim().max(200).optional().or(z.literal(""));

export const enquirySchema = z.object({
  type: z.enum(Object.keys(enquiryTypes) as [EnquiryType, ...EnquiryType[]]),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  company: z.string().trim().min(2, "Please enter your company").max(160),
  email: z.string().trim().email("Please enter a valid business email").max(200),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a phone or WhatsApp number")
    .max(30)
    .regex(/^[+()\d\s-]+$/, "Use digits, spaces, + ( ) or - only"),
  country: z.string().trim().min(2, "Please enter your country").max(80),
  location: optional,
  projectType: optional,
  stage: optional,
  interest: optional,
  message: z.string().trim().min(10, "Please add a few words about your enquiry").max(5000),
  products: z
    .array(z.object({ slug: z.string().max(120), name: z.string().max(200), qty: z.number().int().min(1).max(999) }))
    .max(50)
    .optional(),
  source: z.string().max(300).optional(),
  consent: z.literal(true, { message: "Please accept so we can respond to your enquiry" }),
  // anti-spam
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
