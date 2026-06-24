import type { Candidate } from "@/types";

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "c1",
    name: "Alex Rivera",
    headline: "Frontend Developer | React & Next.js",
    domain: "Frontend Engineering",
    rank: "Platinum",
    points: 12450,
    streak: 45,
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    certifications: [
      { id: "cert1", name: "Meta Front-End Developer", issuer: "Coursera", status: "verified", date: "2024-02-15" },
      { id: "cert2", name: "Advanced React Patterns", issuer: "Frontend Masters", status: "verified", date: "2024-05-20" }
    ],
    isPro: true,
  },
  {
    id: "c2",
    name: "Sarah Chen",
    headline: "Data Scientist | ML & Python",
    domain: "Data Science",
    rank: "Diamond",
    points: 18200,
    streak: 112,
    skills: ["Python", "Machine Learning", "PyTorch", "SQL"],
    certifications: [
      { id: "cert3", name: "Google Data Analytics", issuer: "Google", status: "verified", date: "2023-11-10" },
      { id: "cert4", name: "DeepLearning.AI ML Specialization", issuer: "Coursera", status: "verified", date: "2024-01-25" }
    ],
    isPro: false,
  },
  {
    id: "c3",
    name: "Marcus Johnson",
    headline: "Product Designer | UI/UX",
    domain: "Product Design",
    rank: "Gold",
    points: 8900,
    streak: 21,
    skills: ["Figma", "UI Design", "User Research", "Prototyping"],
    certifications: [
      { id: "cert5", name: "Google UX Design", issuer: "Google", status: "verified", date: "2023-09-05" },
      { id: "cert6", name: "Figma Advanced UI", issuer: "Design+Code", status: "self-declared", date: "2024-03-12" }
    ],
    isPro: true,
  },
  {
    id: "c4",
    name: "Elena Rodriguez",
    headline: "Backend Engineer | Node.js & Go",
    domain: "Backend Engineering",
    rank: "Elite",
    points: 24500,
    streak: 215,
    skills: ["Node.js", "Go", "PostgreSQL", "AWS"],
    certifications: [
      { id: "cert7", name: "AWS Certified Solutions Architect", issuer: "AWS", status: "verified", date: "2023-08-20" },
      { id: "cert8", name: "Backend Development", issuer: "Codecademy", status: "verified", date: "2023-12-10" }
    ],
    isPro: false,
  },
  {
    id: "c5",
    name: "David Kim",
    headline: "Full Stack Developer",
    domain: "Full Stack Engineering",
    rank: "Silver",
    points: 4200,
    streak: 12,
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    certifications: [
      { id: "cert9", name: "Full Stack Web Development", issuer: "freeCodeCamp", status: "verified", date: "2024-01-15" }
    ],
    isPro: false,
  }
];

export const CURRENT_USER: Candidate = MOCK_CANDIDATES[0];
