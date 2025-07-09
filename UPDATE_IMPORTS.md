# Mise à jour des imports - Guide de migration

## Imports mis à jour

### Stores
```typescript
// Ancien
import { useAuthStore } from '../stores/auth'
import { useProgramStore } from '../stores/program'

// Nouveau
import { useAuthStore } from '../features/auth/stores'
import { useProgramStore } from '../features/program/stores'
```

### Services
```typescript
// Ancien
import { AuthService } from '../services/authService'
import api from '../services/axios'

// Nouveau
import { AuthService } from '../features/auth/services'
import { apiClient } from '../shared/services/api'
```

### Composants
```typescript
// Ancien
import Header from '../components/Header.vue'
import VideoModal from '../components/modal/VideoModal.vue'

// Nouveau
import { Header } from '../shared/components/layout'
import { VideoModal } from '../shared/components/common'
```

### Utilitaires
```typescript
// Ancien
import { formatCurrency, debounce } from '../utils/helpers'

// Nouveau
import { formatCurrency, debounce } from '../shared/utils'
```

### Types
```typescript
// Ancien
import type { User, LoginCredentials } from '../types/auth'

// Nouveau
import type { User, LoginCredentials } from '../shared/types'
// ou pour les types spécifiques au domaine
import type { LoginFormData } from '../features/auth/types'
```

### Configuration
```typescript
// Ancien
const API_URL = process.env.VITE_API_URL

// Nouveau
import { apiConfig } from '../app/config'
const API_URL = apiConfig.baseURL
```

## Fichiers créés

### Structure complète
- ✅ `src/shared/` - Code partagé
- ✅ `src/features/` - Domaines fonctionnels
- ✅ `src/app/` - Configuration globale
- ✅ `src/router/` - Routage organisé

### Composants UI réutilisables
- ✅ `src/shared/components/ui/Button/`
- ✅ `src/shared/components/common/VideoModal/`
- ✅ `src/shared/components/common/BookmakerLogo/`

### Services centralisés
- ✅ `src/shared/services/api/client.ts`
- ✅ `src/features/auth/services/auth.service.ts`

### Configuration centralisée
- ✅ `src/app/config/` - Toute la configuration
- ✅ `src/app/plugins/` - Plugins Vue

### Types organisés
- ✅ `src/shared/types/` - Types globaux
- ✅ `src/features/*/types/` - Types par domaine

## Prochaines étapes

1. **Migrer les composants restants** vers leurs domaines respectifs
2. **Créer les composants manquants** (HeroSection, FAQ, etc.)
3. **Ajouter les tests unitaires** pour chaque composant
4. **Optimiser les performances** avec le lazy loading
5. **Documenter l'architecture** pour l'équipe

## Bénéfices obtenus

- 🏗️ **Architecture claire** : Séparation par domaines
- 🔧 **Maintenabilité** : Code organisé et modulaire  
- 📈 **Scalabilité** : Ajout de fonctionnalités facilité
- 🧪 **Testabilité** : Tests isolés par composant
- ⚡ **Performance** : Lazy loading possible
- 👥 **Collaboration** : Travail en équipe facilité