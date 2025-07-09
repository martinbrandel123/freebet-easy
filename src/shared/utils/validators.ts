// Fonctions de validation
import { VALIDATION_RULES } from './constants'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = []
  
  if (!email) {
    errors.push('Email requis')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Format email invalide')
  } else if (email.length > VALIDATION_RULES.MAX_EMAIL_LENGTH) {
    errors.push(`Email trop long (max ${VALIDATION_RULES.MAX_EMAIL_LENGTH} caractères)`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = []
  
  if (!password) {
    errors.push('Mot de passe requis')
  } else if (password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    errors.push(`Le mot de passe doit contenir au moins ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} caractères`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateName = (name: string, fieldName = 'Nom'): ValidationResult => {
  const errors: string[] = []
  
  if (!name?.trim()) {
    errors.push(`${fieldName} requis`)
  } else if (name.length > VALIDATION_RULES.MAX_NAME_LENGTH) {
    errors.push(`${fieldName} trop long (max ${VALIDATION_RULES.MAX_NAME_LENGTH} caractères)`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateAge = (age: string | number): ValidationResult => {
  const errors: string[] = []
  const ageNum = typeof age === 'string' ? parseInt(age) : age
  
  if (!age) {
    errors.push('Âge requis')
  } else if (isNaN(ageNum)) {
    errors.push('Âge invalide')
  } else if (ageNum < VALIDATION_RULES.MIN_AGE) {
    errors.push(`Vous devez avoir au moins ${VALIDATION_RULES.MIN_AGE} ans`)
  } else if (ageNum > VALIDATION_RULES.MAX_AGE) {
    errors.push(`Âge maximum : ${VALIDATION_RULES.MAX_AGE} ans`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateRequired = (value: any, fieldName: string): ValidationResult => {
  const errors: string[] = []
  
  if (!value || (typeof value === 'string' && !value.trim())) {
    errors.push(`${fieldName} requis`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, (value: any) => ValidationResult>
): { isValid: boolean; errors: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {}
  let isValid = true
  
  Object.entries(rules).forEach(([field, validator]) => {
    const result = validator(data[field])
    if (!result.isValid) {
      errors[field] = result.errors
      isValid = false
    }
  })
  
  return { isValid, errors }
}