export type Platform = 'android' | 'ios' | 'pc';

export interface DiamondPackage {
  id: string;
  name: string;
  diamondCount: number;
  bonusCount: number;
  popular?: boolean;
  bestValue?: boolean;
  badge?: string;
  colorScheme: 'cyan' | 'amber' | 'purple' | 'red';
}

// Backward compatibility alias if needed
export type RewardPackage = DiamondPackage;

export interface LiveClaim {
  id: string;
  username: string;
  location: string;
  countryCode: string;
  diamondsClaimed: number;
  timeAgo: string;
  avatarSeed: string;
}

export type Language = 'ar' | 'fr' | 'en';

export interface CpaConfig {
  lockerUrl: string;
  networkName: string;
  autoRedirect: boolean;
}
