export interface Jurisdiction {
  id: string;
  name: string;
  type: string;
  fips: string;
  stateRate: number;
  localRate: number;
  mctd: number | null;
  composite: number;
}

export const mockJurisdictions: Jurisdiction[] = [
  {
    id: "jur-001",
    name: "Albany",
    type: "County",
    fips: "36001",
    stateRate: 4.0,
    localRate: 4.0,
    mctd: null,
    composite: 8.0,
  },
  {
    id: "jur-002",
    name: "Allegany",
    type: "County",
    fips: "36003",
    stateRate: 4.0,
    localRate: 4.5,
    mctd: null,
    composite: 8.5,
  },
  {
    id: "jur-003",
    name: "New York",
    type: "County",
    fips: "36061",
    stateRate: 4.0,
    localRate: 4.5,
    mctd: 0.375,
    composite: 8.875,
  },
  {
    id: "jur-004",
    name: "Kings",
    type: "County",
    fips: "36047",
    stateRate: 4.0,
    localRate: 4.5,
    mctd: 0.375,
    composite: 8.875,
  },
  {
    id: "jur-005",
    name: "Queens",
    type: "County",
    fips: "36081",
    stateRate: 4.0,
    localRate: 4.5,
    mctd: 0.375,
    composite: 8.875,
  },
  {
    id: "jur-006",
    name: "Nassau",
    type: "County",
    fips: "36059",
    stateRate: 4.0,
    localRate: 4.625,
    mctd: 0.375,
    composite: 8.625,
  },
  {
    id: "jur-007",
    name: "Suffolk",
    type: "County",
    fips: "36103",
    stateRate: 4.0,
    localRate: 4.625,
    mctd: null,
    composite: 8.625,
  },
  {
    id: "jur-008",
    name: "Erie",
    type: "County",
    fips: "36029",
    stateRate: 4.0,
    localRate: 4.75,
    mctd: null,
    composite: 8.75,
  },
  {
    id: "jur-009",
    name: "Monroe",
    type: "County",
    fips: "36055",
    stateRate: 4.0,
    localRate: 4.0,
    mctd: null,
    composite: 8.0,
  },
  {
    id: "jur-010",
    name: "Bronx",
    type: "County",
    fips: "36005",
    stateRate: 4.0,
    localRate: 4.5,
    mctd: 0.375,
    composite: 8.875,
  },
];
