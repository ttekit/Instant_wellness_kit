export interface WellnessPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  taxRate: "auto" | number;
  status: "Available" | "Blocked";
  jurisdictionIds: string[] | "all";
  productIds: string[];
}

export const mockWellnessPackages: WellnessPackage[] = [
  {
    id: "pkg-001",
    name: "Instant Reset Kit",
    description:
      "A compact kit for immediate stress relief and energy rebalance.",
    price: 34.99,
    taxRate: "auto",
    status: "Available",
    jurisdictionIds: ["jur-003", "jur-004"],
    productIds: ["prod-001", "prod-002", "prod-005"],
  },
  {
    id: "pkg-002",
    name: "Outdoor Workout Kit",
    description:
      "Everything you need for a spontaneous outdoor training session.",
    price: 44.99,
    taxRate: "auto",
    status: "Available",
    jurisdictionIds: ["jur-008", "jur-009"],
    productIds: ["prod-002", "prod-003", "prod-006"],
  },
  {
    id: "pkg-003",
    name: "Deep Calm Kit",
    description: "Premium relaxation set for deep stress relief.",
    price: 39.99,
    taxRate: "auto",
    status: "Available",
    jurisdictionIds: "all",
    productIds: ["prod-001", "prod-004", "prod-007"],
  },
  {
    id: "pkg-004",
    name: "Energy Surge Kit",
    description: "Maximum energy boost for peak afternoon performance.",
    price: 29.99,
    taxRate: "auto",
    status: "Available",
    jurisdictionIds: ["jur-003"],
    productIds: ["prod-002", "prod-005", "prod-008"],
  },
];
