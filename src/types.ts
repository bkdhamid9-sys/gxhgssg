export type Platform = 'android' | 'ios' | 'pc';

export type GameMode = 'monopoly' | 'freefire';

export interface RewardBundle {
  id: string;
  name: string;
  count: number;
  bonusCount: number;
  popular?: boolean;
  bestValue?: boolean;
  colorScheme?: 'cyan' | 'amber' | 'purple' | 'red' | 'emerald';
}

// Backward compatibility aliases
export type DiamondPackage = RewardBundle & { diamondCount: number };
export type RewardPackage = RewardBundle;

export interface LiveClaim {
  id: string;
  username: string;
  location: string;
  countryCode: string;
  amountClaimed: number;
  resourceType: 'dices' | 'diamonds';
  timeAgo: string;
  avatarSeed: string;
}

export type Language = 'ar' | 'fr' | 'en';

export interface CpaConfig {
  lockerUrl: string;
  networkName: string;
  autoRedirect: boolean;
}
