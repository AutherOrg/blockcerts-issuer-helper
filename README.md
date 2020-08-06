# Blockcerts issuer helper

[![Tests](https://github.com/AutherOrg/blockcerts-issuer-helper/workflows/Tests/badge.svg)](https://github.com/AutherOrg/blockcerts-issuer-helper/actions?query=workflow%3A%22Tests%22)
[![Lint](https://github.com/AutherOrg/blockcerts-issuer-helper/workflows/Lint/badge.svg)](https://github.com/AutherOrg/blockcerts-issuer-helper/actions?query=workflow%3A%22Lint%22)
[![Code style](https://img.shields.io/badge/Code_style-standard-brightgreen.svg)](https://github.com/standard/standard)

## Introduction

**Blockcerts issuer helper** is a opensource JavaScript library for Node and the browser, originally developed for [Auther](https://auther.org) and that allows to create and issue [Blockcerts](https://www.blockcerts.org) certificates.

### What this library does

+ Easily create unsigned Blockcerts certificates (without displayHtml);
+ Easily create Blockcerts certificates batches and return the Merkle tree root that you just have to sign on your blockchain of choice afterwards, plus the list of the certificates with their Merkle proofs;
+ Easily insert the blockchain signature.

### What this library does not do

+ It does not sign the blockchain transaction for you, because this library is primarily designed for use in a client-side application in which issuers securely manage their Ethereum private keys with wallets like Metamask;
+ It does not create displayHtml;
+ It does not manage the images conversion to base64;
+ It does not manage the issuer profile and revocation list JSON.

## Installation

````
yarn add blockcerts-issuer-helper
````

## How to use

In ES6 (for instance React or Node with transliteration / native):
````
import { Certificate, CertificateValidator, createBatch, signBatch } from 'blockcerts-issuer-helper'

  const issue = async () => {
    // Create unsigned certificates.
    const certificate1 = new Certificate({
      recipient: {
        identity: 'alice@example.org'
      },
      badge: {
        name: 'Certificate #1',
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
    })

  const certificate2 = new Certificate({
      recipient: {
        identity: 'bob@example.org'
      },
      badge: {
        name: 'Certificate #2',
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
        name: 'Bob'
      },
      displayHtml: '<h1>Computer Science MS Degree, Fictional University</h1>'
    })

  // Create a batch of the certificates, compute hashes, Merkle tree root and insert Merkle proofs in the certificates:
  const { merkleTreeRoot, certificatesWithProofs }  = await createBatch([
      certificate1,
      certificate2
  ], {
    validate: true
  })

  // Then send a blockchain burn transaction with the Merkle tree root and note the transaction hash txHash.
  // ...

  // Finally add the signature into the certificates:
  const certificates = await signBatch(
    certificatesWithProofs,
    'ETHData',
    txHash,
    'ethereumRopsten', {
      validate: true
    })

  // You now have signed certificates!
}

issue()
````

### Certificate

Create a certificate object from data, where data is like above:
````
const certificate = new Certificate(data)
````

Get the certificate JSON (used by createBatch, not useful otherwise):
````
const certificateJson = certificate.get()
````

Hash the certificate, store the hash and return the hash (used by createBatch, not useful otherwise):
````
const hash = certificate.hash()
````

Get the stored hash again (used by createBatch, not useful otherwise):
````
const hash = certificate.getHash()
````

Set the Merkle proofs (used by createBatch, not useful otherwise; Merkle proofs and tree root are generated in createBatch):
````
certificate.setMerkleProofs(proof, merkleRoot, targetHash)
````

Sign the certificate (used by createBatch, not useful otherwise):
````
certificate.sign(type, sourceId, chain)
````
+ string type = 'ETHData' for Ethereum, 'BTCOpReturn' for Bitcoin
+ string sourceId = Ethereum or Bitcoin transaction hash
+ string chain = 'ethereumMainnet' for Ethereum MainNet, 'ethereumRopsten' for Ethereum Ropsten testnet, 'bitcoinMainnet' for Bitcoin Mainnet

### CertificateValidator

Helper to validate a certificate against the Blockcerts schema (optionally used by createBatch, not very useful otherwise):
````
const certificateValidator = new CertificateValidator()
await certificateValidator.init()
const result = certificateValidator.validate(certificate)
````
Init takes a while because it has to fetch all the JSON schemas and compile them through Ajv, that's why we implemented it as a class that has the init() method, so init can be done once only to verify many certificates.

The result is ````true```` or an object with an ````errors```` property that lists all the problems identified in the verification against the shema.

### createBatch

Create a batch from unsigned certificates, compute their hashes, compute the Merkle tree root and insert Merkle proofs in the certificates:
````
const batch = await createBatch(certificates, options)
````
+ array certificates = array of unsigned certificates objects that are instances of the Certificate class
+ object options = optional, only option for now is ````validate```` (false by default)

For performances reasons, if you are issuing big batches you should probably not use the validate option (without validation, a batch of 10000 certificates still takes around 5 minutes on a 2012 i5 laptop):
````
const batch = await createBatch(certificates)
````

In case of success, batch is an object containing 2 properties:
````
{
  merkleTreeRoot = string
  certificatesWithProofs = array of unsigned certificates (instances of Certificate class) with Merkle proofs
}
````

In case of errors, batch is an object with the ````errors```` property.

### signBatch

Insert the blockchain signature in each of the unsigned certificates with Merkle proofs, and returns final signed certificates:
````
const certificates = signBatch(certificates, type, sourceId, chain, options)
````
+ array certificates = array of unsigned certificates (instances of Certificate class) with Merkle proofs = batch.certificatesWithProofs
+ string type = 'ETHData' for Ethereum, 'BTCOpReturn' for Bitcoin
+ string sourceId = Ethereum or Bitcoin transaction hash
+ string chain = 'ethereumMainnet' for Ethereum MainNet, 'ethereumRopsten' for Ethereum Ropsten testnet, 'bitcoinMainnet' for Bitcoin Mainnet
+ object options = optional, only option for now is ````validate```` (false by default)

## Issues

Please report issues [here](https://github.com/openblockcerts/blockcerts-issuer-helper/issues).

## Development

Please read the [contribution guidelines](CONTRIBUTING.md).

## Credits

+ [GIZ](https://www.giz.de/en/html/index.html) (Deutsche Gesellschaft für Internationale Zusammenarbeit GmbH): this library has been originally developed with financial support by GIZ Lab.
+ [SEAMEO INNOTECH](https://www.seameo-innotech.org/) (Regional Center for Educational Innovation and Technology, Southeast Asian Ministers of Education Organization) : this library has been originally developed for SEAMEO-INNOTECH.
