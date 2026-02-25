export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: "Available" | "Blocked";
  jurisdictionIds: string[] | "all";
}

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Lavender Calm Drops",
    description: "Premium lavender essential oil blend for instant relaxation.",
    price: 14.99,
    status: "Available",
    jurisdictionIds: ["jur-003", "jur-004", "jur-005", "jur-006", "jur-007"],
  },
  {
    id: "prod-002",
    name: "Energy Boost Gummies",
    description: "Vitamin B12 and green tea extract gummies.",
    price: 12.99,
    status: "Available",
    jurisdictionIds: ["jur-003", "jur-006", "jur-007"],
  },
  {
    id: "prod-003",
    name: "Hydration Pack",
    description: "Electrolyte powder sachets with coconut water base.",
    price: 9.99,
    status: "Available",
    jurisdictionIds: "all",
  },
  {
    id: "prod-004",
    name: "Stress Relief Patch",
    description: "Transdermal magnesium and ashwagandha patches.",
    price: 19.99,
    status: "Blocked",
    jurisdictionIds: ["jur-003"],
  },
  {
    id: "prod-005",
    name: "Focus Mints",
    description:
      "L-theanine infused peppermint tablets for enhanced concentration.",
    price: 7.99,
    status: "Available",
    jurisdictionIds: "all",
  },
  {
    id: "prod-006",
    name: "Recovery Balm",
    description: "Arnica and CBD topical balm for muscle recovery.",
    price: 24.99,
    status: "Available",
    jurisdictionIds: ["jur-008", "jur-009"],
  },
  {
    id: "prod-007",
    name: "Sleep Support Capsules",
    description: "Melatonin and valerian root blend for restful sleep.",
    price: 17.49,
    status: "Available",
    jurisdictionIds: "all",
  },
  {
    id: "prod-008",
    name: "Immunity Boost Syrup",
    description: "Elderberry and zinc syrup to strengthen immune defense.",
    price: 21.99,
    status: "Available",
    jurisdictionIds: ["jur-001", "jur-002", "jur-008", "jur-009", "jur-010"],
  },
];
