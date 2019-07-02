const input = document.getElementById('input') as HTMLInputElement | null
if (!input) throw new Error('Input box not found!')

input.addEventListener('change', () => {
  const file = input && input.files && input.files[0]
  if (!file) return
})
