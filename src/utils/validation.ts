import * as yup from 'yup'

export const signupSchema = yup.object({
  email: yup
    .string()
    .required('L\'email est requis')
    .email('Format d\'email invalide'),
  
  name: yup
    .string()
    .required('Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  
  age: yup
    .number()
    .required('L\'âge est requis')
    .min(18, 'Vous devez avoir au moins 18 ans')
    .max(120, 'Âge invalide'),
  
  isFrance: yup
    .boolean()
    .required('Veuillez indiquer votre résidence')
    .test('is-france', 'Seuls les résidents français peuvent s\'inscrire', (value) => value === true),
  
  bookmakers: yup
    .array()
    .of(yup.string())
    .min(1, 'Veuillez sélectionner au moins un bookmaker')
    .required('La sélection de bookmakers est requise')
})

export const magicLinkSchema = yup.object({
  email: yup
    .string()
    .required('L\'email est requis')
    .email('Format d\'email invalide')
})