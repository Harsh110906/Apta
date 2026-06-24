import type { Recruiter } from "@/types";

export const MOCK_RECRUITERS: Recruiter[] = [
  {
    id: "r1",
    name: "James Wilson",
    companyName: "Acme Corp",
    plan: "Growth",
  },
  {
    id: "r2",
    name: "Emily Davis",
    companyName: "TechFlow",
    plan: "Starter",
  },
  {
    id: "r3",
    name: "Michael Chang",
    companyName: "Global Systems Inc",
    plan: "Enterprise",
  }
];

export const CURRENT_RECRUITER: Recruiter = MOCK_RECRUITERS[0];
