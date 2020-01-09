import fetch from 'isomorphic-fetch'

import { BLOCKCERTS_SCHEMA_FULL_VERSION_DEFAULT } from '../constants'

export default async (schemaUri = `https://w3id.org/blockcerts/schema/${BLOCKCERTS_SCHEMA_FULL_VERSION_DEFAULT}/schema.json`) => {
  try {
    const response = await fetch(schemaUri)
    const schema = await response.json()
    return schema
  } catch (e) {
    return ({
      error: e.message
    })
  }
}
