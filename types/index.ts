export type SiteConfig = {
  name: string;
  author: string;
  description: string;
  keywords: Array<string>;
  locale: string;
  type: string;
  publishedTime: string;
  twitterCard: string;
  url: {
    base: string;
    author: string;
  };
  links: {
    github: string;
  };
  ogImage: string;
};
export interface BreadcrumbType {
  label: string;
  href: string;
  isCurrent?: boolean;
}


export type TransaksiType = {
  id: number;
  invoice_code: string;
  status: string;
  status_name: string;
  customer_name: string;
  customer_phone: string;
  total_price: number;
  diskon_total: number;
  grand_total: number;
  paid_amount: number;
  is_paid: string;
  is_paid_label: string[];
  tgl_dibuat: string;
  estimasi_selesai: string;
  [key: string]: any; // Keep this for any additional fields
};