import { MerkleTree } from 'merkletreejs'
import sha256 from 'crypto-js/sha256'

import CertificateValidator from '../certificate/CertificateValidator'

export default async (certificates, options = { validate: false }) => {
  try {
    if (options.validate) {
      const certificateValidator = new CertificateValidator()
      await certificateValidator.init()
      const areValid = await Promise.all(
        certificates.map(certificate => {
          return certificateValidator.validate(certificate.get())
        })
      )
      const areAllValid = areValid.every(isValid => isValid)
      if (!areAllValid) {
        return {
          error: 'Some certificates do not validate the Blockcerts schema',
          areValid
        }
      }
    }

    /**
     * This implementation seems to stop working after around 6000 certificates.
     */
    // let i = 0
    // const leaves = await Promise.all(
    //   certificates.map(async (certificate, index) => {
    //     const hash = await certificate.hash()
    //     i++
    //     console.log(`hashed #${index}, progress: ${i}/${certificates.length}`)
    //     return hash
    //   })
    // )
    // console.log('HASHING FINISHED')

    /**
     * This implementation is fine but is horribly slow.
     */
    // const leaves = []
    // for (let i = 0; i < certificates.length; i++) {
    //   leaves.push(await certificates[i].hash())
    //   console.log(`hashed #${i}, progress: ${i}/${certificates.length}`)
    // }

    /**
     * Final implementation: by chunks.
     */
    const leaves = []
    let certificatesChunk = []
    const chunk = 1000
    for (let i = 0; i < certificates.length; i += chunk) {
      certificatesChunk = certificates.slice(i, i + chunk)
      leaves.push(
        ...await Promise.all(
          certificatesChunk.map(async certificate => {
            const hash = await certificate.hash()
            return hash
          })
        )
      )
    }

    const tree = new MerkleTree(leaves, sha256)
    const merkleTreeRoot = tree.getRoot().toString('hex')
    const certificatesWithProofs = certificates.map(certificate => {
      const proofs = tree.getProof(certificate.getHash())
      const processedProofs = proofs.map(proof => {
        return {
          [proof.position]: proof.data.toString('hex')
        }
      })
      certificate.setMerkleProofs(processedProofs, merkleTreeRoot, certificate.getHash())
      return certificate
    })
    return {
      merkleTreeRoot,
      certificatesWithProofs
    }
  } catch (e) {
    return {
      error: e.message
    }
  }
}
