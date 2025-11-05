import { WorkBonus } from '@/types/employee';

export const calculateYearsOfService = (joiningYear: number): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - joiningYear;
};

export const calculateWorkBonus = (joiningYear: number): WorkBonus => {
  const yearsOfService = calculateYearsOfService(joiningYear);
  const eligible = yearsOfService >= 6;
  const bonusCount = Math.floor(yearsOfService / 6);
  const nextBonusIn = eligible ? 6 - (yearsOfService % 6) : 6 - yearsOfService;

  return {
    eligible,
    bonusCount,
    yearsOfService,
    nextBonusIn: nextBonusIn === 6 ? 0 : nextBonusIn,
  };
};
