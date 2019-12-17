import uuidv4 from 'uuid/v4'

import { BLOCKCERTS_SCHEMA_VERSION_DEFAULT } from '../constants'
import hashCertificate from './hashCertificate'

export default class Certificate {
  constructor (data) {
    this.certificate = {
      '@context': [
        'https://w3id.org/openbadges/v2',
        `https://w3id.org/blockcerts/v${BLOCKCERTS_SCHEMA_VERSION_DEFAULT}`,
        {
          displayHtml: {
            '@id': 'https://schemas.learningmachine.com/2017/blockcerts/displayHtml',
            '@type': 'https://schemas.learningmachine.com/2017/types/text/html'
          },
          metadataJson: {
            '@id': 'https://schemas.learningmachine.com/2017/blockcerts/metadata',
            '@type': 'https://schemas.learningmachine.com/2017/types/text/json'
          },
          nonce: {
            '@id': 'https://schemas.learningmachine.com/2017/blockcerts/nonce',
            '@type': 'https://schema.org/Text'
          },
          universalIdentifier: {
            '@id': 'https://schemas.learningmachine.com/2017/blockcerts/identifier',
            '@type': 'https://schema.org/Text'
          }
        },
        {
          '@vocab': 'http://fallback.org/'
        }
      ],
      id: (data && data.id) ? data.id : `urn:uuid:${uuidv4()}`,
      type: 'Assertion',
      recipient: {
        type: 'email',
        identity: (data && data.recipient && data.recipient.identity) ? data.recipient.identity : 'recipient@example.org',
        hashed: (data && data.recipient && data.recipient.hashed) ? data.recipient.hashed : false
      },
      issuedOn: (data && data.issuedOn) ? data.issuedOn : new Date().toISOString(),
      verification: {
        type: [
          'MerkleProofVerification2017',
          'Extension'
        ],
        publicKey: ''
      },
      badge: {
        type: 'BadgeClass',
        id: (data && data.badge && data.badge.id) ? data.badge.id : `urn:uuid:${uuidv4()}`,
        name: (data && data.badge && data.badge.name) ? data.badge.name : '',
        description: (data && data.badge && data.badge.description) ? data.badge.description : '',
        image: (data && data.badge && data.badge.image) ? data.badge.image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        criteria: {
          narrative: (data && data.badge && data.badge.criteria && data.badge.criteria.narrative) ? data.badge.criteria.narrative : ''
        },
        issuer: {
          id: (data && data.badge && data.badge.issuer && data.badge.issuer.id) ? data.badge.issuer.id : '',
          type: 'Profile',
          name: (data && data.badge && data.badge.issuer && data.badge.issuer.name) ? data.badge.issuer.name : '',
          url: (data && data.badge && data.badge.issuer && data.badge.issuer.url) ? data.badge.issuer.url : '',
          email: (data && data.badge && data.badge.issuer && data.badge.issuer.email) ? data.badge.issuer.email : '',
          description: (data && data.badge && data.badge.issuer && data.badge.issuer.description) ? data.badge.issuer.description : '',
          image: (data && data.badge && data.badge.issuer && data.badge.issuer.image) ? data.badge.issuer.image : ''
        },
        signatureLines: [
          {
            type: [
              'SignatureLine',
              'Extension'
            ],
            jobTitle: (data && data.badge && data.badge.signatureLines && data.badge.signatureLines.jobTitle) ? data.badge.signatureLines.jobTitle : '',
            image: (data && data.badge && data.badge.signatureLines && data.badge.signatureLines.image) ? data.badge.signatureLines.image : ''
          }
        ]
      },
      recipientProfile: {
        type: [
          'RecipientProfile',
          'Extension'
        ],
        name: (data && data.recipientProfile && data.recipientProfile.name) ? data.recipientProfile.name : '',
        publicKey: (data && data.recipientProfile && data.recipientProfile.publicKey) ? data.recipientProfile.publicKey : ''
      },
      displayHtml: (data && data.displayHtml) ? data.displayHtml : ''
    }
    return this
  }

  get () {
    return this.certificate
  }

  async hash () {
    try {
      this.hash = await hashCertificate(this.certificate)
      return this.hash
    } catch (e) {
      return {
        error: e.message
      }
    }
  }

  getHash () {
    return this.hash
  }

  setMerkleProofs (proof, merkleRoot, targetHash) {
    this.certificate.signature = {
      type: [
        'MerkleProof2017',
        'Extension'
      ],
      proof,
      merkleRoot,
      targetHash
    }
  }

  sign (type, sourceId, chain) {
    this.certificate.signature.anchors = [
      {
        type,
        sourceId,
        chain
      }
    ]
  }
}
