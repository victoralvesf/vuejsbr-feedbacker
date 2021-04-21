import {
  validateEmailAndNotEmpty,
  validateEmptyAndLength3,
  validateEmpty,
  emptyMessage,
  lengthMessage,
  invalidEmailMessage
} from './validators'

describe('Validators', () => {
  describe('validate empty', () => {
    it('should return the required field message with empty payload', () => {
      expect(validateEmpty()).toBe(emptyMessage)
    })

    it('should return true if payload has any text', () => {
      expect(validateEmpty('someText')).toBe(true)
    })
  })

  describe('validate empty and length three', () => {
    it('should return the required field message with empty payload', () => {
      expect(validateEmptyAndLength3()).toBe(emptyMessage)
    })

    it('should return the length message when the payload is 2 characters', () => {
      expect(validateEmptyAndLength3('12')).toBe(lengthMessage(3))
    })

    it('should return true when the payload is 3 characters', () => {
      expect(validateEmptyAndLength3('123')).toBe(true)
    })
  })

  describe('validate email and not empty', () => {
    it('should return the required field message with empty payload', () => {
      expect(validateEmailAndNotEmpty()).toBe(emptyMessage)
    })

    it('should return the invalid email message when the payload is an invalid email', () => {
      expect(validateEmailAndNotEmpty('email@-example.com')).toBe(invalidEmailMessage)
    })

    it('should return true when the payload is a valid email', () => {
      expect(validateEmailAndNotEmpty('email@example.co.jp')).toBe(true)
    })
  })
})
