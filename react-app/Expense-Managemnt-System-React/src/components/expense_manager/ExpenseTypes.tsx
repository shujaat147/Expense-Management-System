const categories = ["Grocery", "Utilities", "Entertainment"] as const;

interface expense {
  desc: string;
  category: (typeof categories)[number];
  amount: number;
}

export { categories };
export type { expense };
