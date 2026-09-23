export type Platform = 'ios' | 'android' | 'pc';

export interface RewardPackage {
  id: string;
  name: string;
  diceCount: number;
  cashAmount: string;
  badge?: string;
  popular?: boolean;
  colorScheme: 'emerald' | 'amber' | 'purple';
}

export interface LiveClaim {
  id: string;
  username: string;
  location: string;
  countryCode: string;
  diceClaimed: number;
  timeAgo: string;
  avatarSeed: string;
}

export type Language = 'en' | 'fr';

export interface CpaConfig {
  lockerUrl: string;
  networkName: string;
  autoRedirect: boolean;
}
