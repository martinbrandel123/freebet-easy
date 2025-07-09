// Composable pour la gestion du localStorage
import { ref, watch, Ref } from 'vue'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  serializer = JSON
): [Ref<T>, (value: T) => void, () => void] {
  const storedValue = localStorage.getItem(key)
  const initialValue = storedValue !== null 
    ? serializer.parse(storedValue) 
    : defaultValue

  const state = ref<T>(initialValue)

  const setValue = (value: T) => {
    state.value = value
    localStorage.setItem(key, serializer.stringify(value))
  }

  const removeValue = () => {
    state.value = defaultValue
    localStorage.removeItem(key)
  }

  // Synchroniser avec le localStorage quand la valeur change
  watch(
    state,
    (newValue) => {
      localStorage.setItem(key, serializer.stringify(newValue))
    },
    { deep: true }
  )

  // Écouter les changements du localStorage depuis d'autres onglets
  window.addEventListener('storage', (e) => {
    if (e.key === key && e.newValue) {
      state.value = serializer.parse(e.newValue)
    }
  })

  return [state, setValue, removeValue]
}