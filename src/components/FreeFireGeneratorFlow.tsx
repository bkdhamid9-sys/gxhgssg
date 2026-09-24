import React from 'react';
import { ArcadeGeneratorFlow } from './ArcadeGeneratorFlow';
import { Language, CpaConfig } from '../types';

interface FreeFireGeneratorFlowProps {
  currentLang: Language;
  cpaConfig: CpaConfig;
}

export const FreeFireGeneratorFlow: React.FC<FreeFireGeneratorFlowProps> = ({
  currentLang,
  cpaConfig,
}) => {
  return (
    <ArcadeGeneratorFlow
      currentLang={currentLang}
      cpaConfig={cpaConfig}
      gameMode="freefire"
      onGameModeChange={() => {}}
    />
  );
};
