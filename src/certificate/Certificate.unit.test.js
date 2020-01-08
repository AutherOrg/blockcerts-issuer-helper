/* eslint-env jest */
import Certificate from './Certificate'
import CertificateValidator from './CertificateValidator'

const certificateValidator = new CertificateValidator()
const certificateFromDataSample = {
  id: 'urn:uuid:f3c91f77-3797-43e9-a3c2-2d8f4f839108',
  recipient: {
    identity: 'alice@example.org'
  },
  issuedOn: '2019-12-09T10:49:00.352Z',
  badge: {
    id: 'urn:uuid:e94775bc-e1cb-4df8-ad73-8b41849a3185',
    name: 'Computer Science MS Degree, Fictional University',
    description: 'Fictional University delivers this Computer Science MS Degree.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    criteria: {
      narrative: 'Fictional University delivers this Computer Science MS Degree.'
    },
    issuer: {
      id: 'https://raw.githubusercontent.com/guix77/blockcerts-certificates/master/ethereum/ropsten/issuers/fictionaluniversity/issuer.json',
      name: 'Fictional University',
      url: 'https://raw.githubusercontent.com/guix77/blockcerts-certificates/master/ethereum/ropsten/issuers/fictionaluniversity/www.md',
      email: 'fictionaluniversity@example.org',
      description: 'The Fictional University is a fictional university.',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    },
    signatureLines: {
      jobTitle: 'President',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    }
  },
  recipientProfile: {
    name: 'Alice'
  },
  displayHtml: '<h1>Computer Science MS Degree, Fictional University</h1>'
}

beforeAll(() => {
  return certificateValidator.init()
})

test('Create new empty certificate', async () => {
  const certificate = new Certificate()
  expect(certificateValidator.validate(certificate.get())).toBe(true)
})

test('Create new certificate from data', async () => {
  const certificate = new Certificate(certificateFromDataSample)
  expect(certificateValidator.validate(certificate.get())).toBe(true)
})

test('Hash certificate', async () => {
  const certificate = new Certificate(certificateFromDataSample)
  expect(await certificate.hash()).toBe('DnfqwkiUAvltEIVDh1bkG9fM8ZZgRSMXeiqqqvJVcE4=')
  expect(certificate.getHash()).toBe('DnfqwkiUAvltEIVDh1bkG9fM8ZZgRSMXeiqqqvJVcE4=')
})

test('Set certificate Merkle proofs', async () => {
  const certificate = new Certificate(certificateFromDataSample)
  certificate.setMerkleProofs('proofSample', 'merkleRootSample', 'targetHashSample')
  expect(JSON.stringify(certificate.get().signature)).toBe(JSON.stringify({
    type: [
      'MerkleProof2017',
      'Extension'
    ],
    proof: 'proofSample',
    merkleRoot: 'merkleRootSample',
    targetHash: 'targetHashSample'
  }))
})

test('Sign certificate', async () => {
  const certificate = new Certificate(certificateFromDataSample)
  certificate.setMerkleProofs('proofSample', 'merkleRootSample', 'targetHashSample')
  certificate.sign('ETHData', 'sourceIdSample', 'ethereumRopsten')
  expect(JSON.stringify(certificate.get().signature)).toBe(JSON.stringify({
    type: [
      'MerkleProof2017',
      'Extension'
    ],
    proof: 'proofSample',
    merkleRoot: 'merkleRootSample',
    targetHash: 'targetHashSample',
    anchors: [
      {
        type: 'ETHData',
        sourceId: 'sourceIdSample',
        chain: 'ethereumRopsten'
      }
    ]
  }))
})