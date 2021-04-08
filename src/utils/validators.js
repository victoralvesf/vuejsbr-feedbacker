export function validateEmptyAndLength3 (value) {
  if (!value) return '*Campo obrigatório'

  if (value.length < 3) return '*Campo precisa de no mínimo 3 caracteres'

  return true
}

export function validateEmailAndNotEmpty (value) {
  if (!value) return '*Campo obrigatório'

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  if (!isValid) return '*Campo precisa ser um e-mail válido'

  return true
}
