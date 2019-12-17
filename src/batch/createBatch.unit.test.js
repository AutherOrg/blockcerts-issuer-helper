/* eslint-env jest */
import massCreateCertificates from './massCreateCertificates'
import createBatch from './createBatch'

test('Create batch of 10 certificates (with validation)', async () => {
  const certificates = massCreateCertificates(10)
  const batch = await createBatch(certificates, { validate: true })
  expect(batch.certificatesWithProofs.length).toBe(10)
})

test('Create batch of 1000 certificates (without validation)', async () => {
  const certificates = massCreateCertificates(1000)
  const batch = await createBatch(certificates)
  expect(batch.certificatesWithProofs.length).toBe(1000)
})

/**
 * This one can be uncommented but it's very long (around 5 minutes on a 2012 i5 laptop).
 */
// test('Create batch of 10000 certificates (without validation)', async () => {
//   const certificates = massCreateCertificates(10000)
//   const batch = await createBatch(certificates)
//   expect(batch.certificatesWithProofs.length).toBe(10000)
// })
