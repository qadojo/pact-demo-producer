const { Verifier } = require('@pact-foundation/pact')
const server = require('../index.js')

require('dotenv').config()

describe('endpoint', () => {
  const port = 1234
  let serverInstance

  const opts = {
    provider: 'pact-demo-provider',
    providerBaseUrl: `http://localhost:${port}`,
    pactBrokerUrl: process.env.PACT_BROKER_URL,
    publishVerificationResult: process.env.PACT_BROKER_PUBLISH === 'true',
    pactBrokerUsername: process.env.PACT_BROKER_USER,
    pactBrokerPassword: process.env.PACT_BROKER_PASSWORD,
    providerVersion: process.env.ghprbActualCommit || process.env.GIT_COMMIT_SHORT_HASH || `${process.env.HOSTNAME}.${Date.now()}`,
  }

  beforeEach((done) => {
    serverInstance = server.listen(port, done)
  })

  it('should validate the expectations', () => {
    return new Verifier().verifyProvider(opts)
  })

  afterEach(async () => {
    await serverInstance.close()
  })
})
