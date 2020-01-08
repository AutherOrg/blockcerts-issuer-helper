import Certificate from '../certificate/Certificate'

export default length => {
  const certificates = []
  for (let i = 0; i < length; i++) {
    certificates.push(
      new Certificate({
        recipient: {
          identity: 'alice@example.org'
        },
        badge: {
          name: `Certificate #${i + 1}`,
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
    )
  }
  return certificates
}
