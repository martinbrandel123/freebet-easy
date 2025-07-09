// Types pour le domaine programme
export interface Step {
  id: string
  order: number
  type: 'signup' | 'deposit' | 'bet' | 'result' | 'freebet'
  bookmaker: string
  bet?: string
  matrice?: string[]
  matchInfo?: MatchInfo[]
  bookmakerStep: BookmakerStep[]
  title: string
  status: 'todo' | 'in_progress' | 'done'
  isOptional?: boolean
}

export interface MatchInfo {
  homeTeam: string
  awayTeam: string
  competition: string
  startingDate: string
  betType?: 'Moneyline'
}

export interface BookmakerStep {
  name: string
  bonus?: number
  affiliateLink?: string
  tutoSubscriptionVideoLink?: string
  deposit?: number
  bet?: string
  betToTake?: string
  betOdd?: number
  betAmount?: number
  amountType?: 'cash' | 'freebet'
}

export interface BookmakerGroup {
  id: string
  name: string
  bookmakers: string[]
  totalBonus: number
  steps: Step[]
}

export interface ProgramProgress {
  currentStepId: string
  stepStatuses: Record<string, 'todo' | 'in_progress' | 'done'>
  completedSteps: number
  totalSteps: number
  currentGain: number
  history: ProgramHistoryEntry[]
}

export interface ProgramHistoryEntry {
  stepId: string
  action: 'completed' | 'skipped' | 'started'
  timestamp: Date
}

export interface ProgramState {
  currentStepId: string
  stepStatuses: Record<string, 'todo' | 'in_progress' | 'done'>
  showAdvancedSettings: boolean
  history: ProgramHistoryEntry[]
  bookmakerGroups: BookmakerGroup[]
}