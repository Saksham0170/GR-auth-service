import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  phonenum: z
    .string()
    .refine((num) => /^\d+$/.test(num), {
      message: "Phone number must consist of only digits",
    })
    .refine((num) => num.length === 10, {
      message: "Phone number must be exactly 10 digits",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/(?=.*[0-9])/, {
      message: "Password must contain at least one number",
    })
    .regex(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
      message: "Password must contain at least one special character",
    }),
  department: z.number().int().min(1).max(7),
  role: z.number().int().min(1).max(4),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  direct_assign: z.array(z.string()),
  department_assign: z.array(z.number()),
  global_assign: z.boolean(),
  deadline: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export const modifyTaskSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  direct_assign: z.array(z.string()).optional(),
  department_assign: z.array(z.number()).optional(),
  global_assign: z.boolean().optional(),
  deadline: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional(),
});
