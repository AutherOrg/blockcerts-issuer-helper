import Ajv from 'ajv'
import jsonSchemaDraft04 from 'ajv/lib/refs/json-schema-draft-04.json'

import getSchema from '../schema/getSchema'

export default class CertificateValidator {
  async init () {
    try {
      const schema = await getSchema()
      const ajv = new Ajv({
        schemaId: 'id',
        loadSchema: getSchema,
        logger: false
      })
      ajv.addMetaSchema(jsonSchemaDraft04)
      this.validator = await ajv.compileAsync(schema)
      return true
    } catch (e) {
      return ({
        error: e.message
      })
    }
  }

  validate (data) {
    try {
      return this.validator(data) || {
        errors: this.validator.errors
      }
    } catch (e) {
      return ({
        error: e.message
      })
    }
  }
}
