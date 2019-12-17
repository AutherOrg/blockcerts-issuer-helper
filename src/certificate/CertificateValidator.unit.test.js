/* eslint-env jest */
import CertificateValidator from './CertificateValidator'
import certificateValid from '../../test/samples/certificateValid.json'
import certificateInvalidSchema from '../../test/samples/certificateInvalidSchema.json'

test('Validate certificate', async () => {
  const certificateValidator = new CertificateValidator()
  expect(await certificateValidator.init()).toBe(true)
  expect(certificateValidator.validate(certificateValid)).toBe(true)
  expect(certificateValidator.validate(certificateInvalidSchema)).toHaveProperty('errors')
})
