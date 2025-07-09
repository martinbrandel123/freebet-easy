# Plan de restructuration du projet

## Structure proposée

```
src/
├── app/                          # Configuration globale de l'application
│   ├── config/                   # Configuration centralisée
│   │   ├── index.ts             # Point d'entrée des configs
│   │   ├── api.config.ts        # Configuration API
│   │   ├── auth.config.ts       # Configuration authentification
│   │   └── app.config.ts        # Configuration générale
│   ├── plugins/                  # Plugins Vue/Vuetify
│   │   ├── index.ts
│   │   ├── vuetify.ts
│   │   └── router.ts
│   └── providers/               # Providers globaux
│       ├── AuthProvider.vue
│       └── ThemeProvider.vue
│
├── shared/                      # Code partagé entre domaines
│   ├── components/              # Composants réutilisables
│   │   ├── ui/                  # Composants UI de base
│   │   │   ├── Button/
│   │   │   │   ├── Button.vue
│   │   │   │   ├── Button.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Modal/
│   │   │   ├── Form/
│   │   │   └── index.ts
│   │   ├── layout/              # Composants de mise en page
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── index.ts
│   │   └── common/              # Composants métier partagés
│   │       ├── VideoModal/
│   │       ├── BookmakerLogo/
│   │       └── index.ts
│   ├── composables/             # Logique réutilisable
│   │   ├── useApi.ts
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   ├── services/                # Services partagés
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── interceptors.ts
│   │   │   └── index.ts
│   │   ├── storage/
│   │   │   ├── localStorage.ts
│   │   │   └── sessionStorage.ts
│   │   └── validation/
│   │       ├── schemas.ts
│   │       └── validators.ts
│   ├── utils/                   # Utilitaires
│   │   ├── formatters.ts
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── index.ts
│   ├── types/                   # Types TypeScript globaux
│   │   ├── api.types.ts
│   │   ├── auth.types.ts
│   │   ├── common.types.ts
│   │   └── index.ts
│   └── styles/                  # Styles globaux
│       ├── globals.css
│       ├── variables.css
│       ├── components.css
│       └── index.css
│
├── features/                    # Fonctionnalités par domaine
│   ├── auth/                    # Domaine authentification
│   │   ├── components/
│   │   │   ├── LoginForm/
│   │   │   │   ├── LoginForm.vue
│   │   │   │   ├── LoginForm.types.ts
│   │   │   │   ├── LoginForm.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── SignupForm/
│   │   │   ├── GoogleAuthButton/
│   │   │   └── index.ts
│   │   ├── composables/
│   │   │   ├── useLogin.ts
│   │   │   ├── useSignup.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.api.ts
│   │   │   └── index.ts
│   │   ├── stores/
│   │   │   ├── auth.store.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── auth.types.ts
│   │   │   └── index.ts
│   │   ├── views/
│   │   │   ├── LoginView.vue
│   │   │   ├── SignupView.vue
│   │   │   ├── ForgotPasswordView.vue
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── program/                 # Domaine programme de paris
│   │   ├── components/
│   │   │   ├── ProgramStepper/
│   │   │   ├── InstructionCard/
│   │   │   ├── BetInstruction/
│   │   │   ├── FreebetInstruction/
│   │   │   └── index.ts
│   │   ├── composables/
│   │   │   ├── useProgram.ts
│   │   │   ├── useProgramProgress.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── program.service.ts
│   │   │   └── index.ts
│   │   ├── stores/
│   │   │   ├── program.store.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── program.types.ts
│   │   │   ├── step.types.ts
│   │   │   └── index.ts
│   │   ├── views/
│   │   │   ├── ProgramView.vue
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── landing/                 # Domaine page d'accueil
│   │   ├── components/
│   │   │   ├── HeroSection/
│   │   │   ├── ConceptExplanation/
│   │   │   ├── Testimonials/
│   │   │   ├── FAQ/
│   │   │   └── index.ts
│   │   ├── composables/
│   │   │   ├── useLanding.ts
│   │   │   └── index.ts
│   │   ├── views/
│   │   │   ├── HomeView.vue
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── dashboard/               # Domaine tableau de bord
│       ├── components/
│       │   ├── DashboardStats/
│       │   ├── ProgressCard/
│       │   └── index.ts
│       ├── composables/
│       │   ├── useDashboard.ts
│       │   └── index.ts
│       ├── views/
│       │   ├── DashboardView.vue
│       │   └── index.ts
│       └── index.ts
│
├── router/                      # Configuration du routeur
│   ├── index.ts
│   ├── guards.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── program.routes.ts
│   │   ├── dashboard.routes.ts
│   │   └── index.ts
│   └── middleware/
│       ├── auth.middleware.ts
│       └── index.ts
│
├── stores/                      # Store global Pinia
│   ├── index.ts
│   └── root.store.ts
│
├── assets/                      # Ressources statiques
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── tests/                       # Tests
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── __mocks__/
│   └── setup.ts
│
└── main.ts                      # Point d'entrée
```

## Justifications des choix

### 1. **Architecture par domaines fonctionnels** (`features/`)
- **Pourquoi** : Sépare clairement les responsabilités métier
- **Avantages** : 
  - Facilite la maintenance et l'évolution
  - Permet le travail en équipe sur des domaines distincts
  - Réduit le couplage entre fonctionnalités
  - Facilite les tests unitaires

### 2. **Composants atomiques** (`shared/components/ui/`)
- **Pourquoi** : Réutilisabilité et cohérence visuelle
- **Structure** : Chaque composant dans son dossier avec types et tests
- **Avantages** :
  - Design system cohérent
  - Maintenance centralisée des composants UI
  - Tests isolés par composant

### 3. **Composables pour la logique métier**
- **Pourquoi** : Séparation logique/présentation
- **Avantages** :
  - Réutilisabilité de la logique
  - Tests plus faciles
  - Code plus lisible

### 4. **Services centralisés** (`shared/services/`)
- **Pourquoi** : Logique d'accès aux données centralisée
- **Avantages** :
  - Configuration API unique
  - Gestion d'erreurs centralisée
  - Cache et intercepteurs partagés

### 5. **Types TypeScript organisés**
- **Pourquoi** : Typage fort et maintenable
- **Structure** : Types par domaine + types partagés
- **Avantages** :
  - Autocomplétion améliorée
  - Détection d'erreurs à la compilation
  - Documentation vivante

### 6. **Configuration centralisée** (`app/config/`)
- **Pourquoi** : Gestion environnement et déploiement
- **Avantages** :
  - Configuration par environnement
  - Sécurité des secrets
  - Maintenance simplifiée

### 7. **Tests intégrés**
- **Pourquoi** : Qualité et fiabilité du code
- **Structure** : Tests à côté du code + dossier tests global
- **Avantages** :
  - Tests unitaires, intégration et e2e
  - CI/CD facilité
  - Refactoring sécurisé

## Migration progressive

### Phase 1 : Structure de base
1. Créer la nouvelle arborescence
2. Migrer les utilitaires et types
3. Réorganiser les styles

### Phase 2 : Composants
1. Extraire les composants UI réutilisables
2. Créer les composables
3. Migrer les composants par domaine

### Phase 3 : Services et stores
1. Réorganiser les services
2. Séparer les stores par domaine
3. Créer les composables métier

### Phase 4 : Tests et optimisation
1. Ajouter les tests unitaires
2. Optimiser les performances
3. Documentation

## Bénéfices attendus

- **Maintenabilité** : Code organisé par responsabilité
- **Scalabilité** : Ajout de nouvelles fonctionnalités facilité
- **Testabilité** : Tests isolés et ciblés
- **Performance** : Lazy loading par domaine possible
- **Collaboration** : Équipes peuvent travailler en parallèle
- **Documentation** : Structure auto-documentée