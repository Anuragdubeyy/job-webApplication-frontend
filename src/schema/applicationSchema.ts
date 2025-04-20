import { z } from "zod";

export const ApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  experience_year: z.number().min(0, "Experience must be non-negative").optional(),
  currently_working: z.boolean().optional(),
  notice_period: z.string().optional(),
  linkedIn_link: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  current_salary: z.string().optional(),
  expected_salary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  resume: z.any(), // Can be refined for file validation
  coverLetter: z.string().optional(),
  status: z.string({ required_error: "please select status" }),
  experience: z.array(
    z.object({
    job_title: z.string().min(1, "Role is required"),
      company_name: z.string().min(1, "Company is required"),
      joining_date: z.date().optional(),
      end_date: z.date().optional(),
      description: z.string().optional(),
      currently_working: z.boolean(),
      city: z.string().optional(),
    })
  )
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;
