/* eslint-env jest */
import CertificateValidator from './CertificateValidator'
import certificateValid from '../../test/samples/certificateValid.json'
import certificateInvalidSchema from '../../test/samples/certificateInvalidSchema.json'

const certificateValidator = new CertificateValidator()

beforeAll(() => {
  return certificateValidator.init()
})

test('Initialize certificate validator', async () => {
  expect(await certificateValidator.init()).toBe(true)
})

test('Validate result should be true for a valid certificate', async () => {
  const result = certificateValidator.validate(certificateValid)
  expect(result).toBe(true)
})

test('Validate result should return adequate errors for an invalid certificate', async () => {
  const result = certificateValidator.validate(certificateInvalidSchema)
  expect(result).toHaveProperty('errors')
  expect(JSON.stringify(result.errors)).toBe(JSON.stringify([
    {
      keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: {
        missingProperty: 'recipient'
      },
      message: "should have required property 'recipient'"
    }
  ]))
})
