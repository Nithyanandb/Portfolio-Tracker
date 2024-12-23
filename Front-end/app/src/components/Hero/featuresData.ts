import { TrendingUp, Users, Shield, BarChart2, Globe, Clock } from 'lucide-react';
import { Feature } from '../types/types';

export const featuresList: Feature[] = [
  {
    icon: TrendingUp,
    title: 'Free equity investments',
    description: 'Zero account charges. Zero equity delivery charges.'
  },
  {
    icon: Users,
    title: 'Largest active community',
    description: 'Join millions of traders who trust us with their investments.'
  },
  {
    icon: Shield,
    title: 'Completely secure',
    description: 'Protected by cutting-edge security systems and insurance.'
  },
  {
    icon: BarChart2,
    title: 'Advanced analytics',
    description: 'Real-time market data and professional-grade charts.'
  },
  {
    icon: Globe,
    title: 'Global markets',
    description: 'Access to international markets and diverse asset classes.'
  },
  {
    icon: Clock,
    title: '24/7 trading',
    description: 'Trade whenever you want with our always-on platform.'
  }
];  