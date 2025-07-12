import api from '../services/axios'


export interface ProgramRun {
  id: number;
  stages: Stage[];
  currentStageIdx: number;
  startedAt: string; // ISO date string
  active: boolean;
}

export interface Stage {
  id: number;
  index: number;
  status: StageStatus;
  bookmakers: string[];
  subSteps: SubStep[];
}

export type StageStatus = "COMPLETED" | "PENDING" | "IN_PROGRESS"; // adapte selon les valeurs possibles

export interface SubStep {
  id: number;
  subStep: SubStepName;
  status: SubStepStatus;
  data: string | null; // JSON string to parse
  updatedAt: string;
  dataCreatedAt: string | null;
  dataUpdatedAt: string | null;
  current: boolean;
}

export type SubStepStatus = "COMPLETED" | "PENDING" | "IN_PROGRESS"; // adapte selon les valeurs possibles

export type SubStepName =
  | "CROSS_BETS"
  | "PROFIT_DISPLAY"
  | "SIGNUP_DEPOSIT"
  | "USE_BONUS"; // ajoute d'autres si nécessaire

// Si tu veux parser le champ "data" des subSteps SIGNUP_DEPOSIT :
export type ParsedSignupDepositData = Bookmaker[][];

export interface Bookmaker {
  id: number;
  name: string;
  bonus: number;
  deposit: number;
  isActive: boolean;
  bonusType: "FREEBET" | "CASH"; // adapte si d'autres types
  affiliateScore: number;
  subscriptionLink: string;
}

export const programService = {


  async getProgram() {
    try {
      const response = await api.get('program/me', {});
      console.log("program me => ", response);
      return response;
    } catch (error: any) {
      throw error.response?.data;
    }
  },
};

