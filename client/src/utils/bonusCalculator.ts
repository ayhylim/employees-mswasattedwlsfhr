import { WorkBonus } from '@/types/employee';

/**
 * Parse date string in dd/mm/yyyy format to Date object
 */
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
};

/**
 * Format Date object to dd/mm/yyyy string
 */
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Calculate years between two dates
 */
const yearsDifference = (startDate: Date, endDate: Date): number => {
  let years = endDate.getFullYear() - startDate.getFullYear();
  const monthDiff = endDate.getMonth() - startDate.getMonth();
  const dayDiff = endDate.getDate() - startDate.getDate();
  
  // If we haven't reached the anniversary date yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years--;
  }
  
  return years;
};

/**
 * Calculate days between two dates
 */
const daysDifference = (startDate: Date, endDate: Date): number => {
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Calculate years of service from joining date
 */
export const calculateYearsOfService = (joiningDateString: string): number => {
  try {
    const joiningDate = parseDate(joiningDateString);
    const today = new Date();
    return yearsDifference(joiningDate, today);
  } catch (error) {
    console.error('Error parsing joining date:', error);
    return 0;
  }
};

/**
 * Calculate work bonus based on exact joining date (dd/mm/yyyy)
 * Employee gets bonus every 6 years from joining date
 */
export const calculateWorkBonus = (joiningDateString: string): WorkBonus => {
  try {
    const joiningDate = parseDate(joiningDateString);
    const today = new Date();
    
    // Calculate years of service
    const yearsOfService = yearsDifference(joiningDate, today);
    
    // Calculate how many 6-year periods have passed
    const bonusCount = Math.floor(yearsOfService / 6);
    
    // Calculate next bonus date
    const nextBonusYearOffset = (bonusCount + 1) * 6;
    const nextBonusDate = new Date(joiningDate);
    nextBonusDate.setFullYear(joiningDate.getFullYear() + nextBonusYearOffset);
    
    // Calculate last bonus date (if any)
    let lastBonusDate: string | undefined;
    if (bonusCount > 0) {
      const lastBonusYearOffset = bonusCount * 6;
      const lastBonus = new Date(joiningDate);
      lastBonus.setFullYear(joiningDate.getFullYear() + lastBonusYearOffset);
      lastBonusDate = formatDate(lastBonus);
    }
    
    // Calculate upcoming bonus dates (next 3 bonuses)
    const upcomingBonusDates: string[] = [];
    for (let i = 1; i <= 3; i++) {
      const futureBonus = new Date(joiningDate);
      const yearOffset = (bonusCount + i) * 6;
      futureBonus.setFullYear(joiningDate.getFullYear() + yearOffset);
      upcomingBonusDates.push(formatDate(futureBonus));
    }
    
    // Employee is eligible if they've completed at least 6 years AND the date has passed
    const eligible = today >= nextBonusDate && bonusCount > 0;
    
    // Calculate days until next bonus
    const daysUntilBonus = daysDifference(today, nextBonusDate);
    
    return {
      eligible,
      bonusCount,
      yearsOfService,
      nextBonusDate: formatDate(nextBonusDate),
      nextBonusIn: daysUntilBonus > 0 ? daysUntilBonus : 0,
      lastBonusDate,
      upcomingBonusDates,
    };
  } catch (error) {
    console.error('Error calculating work bonus:', error);
    return {
      eligible: false,
      bonusCount: 0,
      yearsOfService: 0,
      nextBonusDate: undefined,
      nextBonusIn: 0,
    };
  }
};