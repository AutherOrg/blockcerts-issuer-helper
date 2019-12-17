/* eslint-env jest */
import massCreateCertificates from './massCreateCertificates'
import createBatch from './createBatch'
import signBatch from './signBatch'

test('Sign batch of 10 certificates (with validation)', async () => {
  const certificates = massCreateCertificates(10)
  const { certificatesWithProofs } = await createBatch(certificates)
  const signedCertificates = await signBatch(certificatesWithProofs, 'ETHData', 'sourceIdSample', 'ethereumRopsten', { validate: true })
  expect(signedCertificates.length).toBe(10)
})
