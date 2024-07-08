const Categories = ["Groceries", "Utilities", "Entertainment"] as const;

interface expense {
    desc: string;
    category: typeof Categories[number];
    price: number;
    quantity: number;
    subTotal: number;
}

export {Categories};
export type {expense};