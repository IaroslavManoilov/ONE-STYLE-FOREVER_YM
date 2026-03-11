export default defineNuxtPlugin(() => {
  const { loadFromStorage } = useCart()
  loadFromStorage()
})
