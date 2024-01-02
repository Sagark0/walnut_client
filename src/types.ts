export interface Transaction {
  id: number;
  transaction_id: number;
  amount: number;
  details: string;
  category: string;
  date: string;
  time: string;
  created_at: Date;
}

interface Category {
  category_label: string;
  category_id: string;
  category_color: string;
  category_avatar: any;
}

export interface Categories {
  [key: string]: Category;
  uncategorised: Category;
  food: Category;
  emi: Category;
  grocery: Category;
  fitness: Category;
  travel: Category;
}