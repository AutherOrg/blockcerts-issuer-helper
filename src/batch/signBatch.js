import CertificateValidator from '../certificate/CertificateValidator'

export default async (certificates, type, sourceId, chain, options = { validate: false }) => {
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
    return certificates.map(certificate => {
      certificate.sign(type, sourceId, chain)
      return certificate.get()
    })
  } catch (e) {
    return {
      error: e.message
    }
  }
}
