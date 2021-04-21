export const emptyMessage = '* Campo obrigatório'
export const lengthMessage = (amount) => `* Campo precisa de no mínimo ${amount} caracteres`
export const invalidEmailMessage = '* Campo precisa ser um e-mail válido'

export function validateEmpty (value) {
  if (!value) return emptyMessage

  return true
}

export function validateEmptyAndLength3 (value) {
  if (!value) return emptyMessage

  if (value.length < 3) return lengthMessage(3)

  return true
}

export function validateEmailAndNotEmpty (value) {
  if (!value) return emptyMessage

  const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

  if (!isValid) return invalidEmailMessage

  return true
}
