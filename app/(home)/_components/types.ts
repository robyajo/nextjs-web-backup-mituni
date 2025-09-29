import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'glow' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'xl';
  className?: string;
  [key: string]: any;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'popular';
  className?: string;
  [key: string]: any;
}

export interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
  bgGradient: string;
  badge?: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  company: string;
}

export interface PricingPlan {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonVariant: 'outline' | 'gradient';
}

export interface StatItem {
  value: string;
  label: string;
}
