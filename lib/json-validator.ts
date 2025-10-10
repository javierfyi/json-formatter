export interface JsonValidationResult {
  isValid: boolean
  error?: string
}

export type JsonSpecification = 'rfc8259' | 'rfc7159' | 'ecma404'

/**
 * Validates JSON against specific JSON specifications
 * @param parsed - The parsed JSON object
 * @param specification - The JSON specification to validate against
 * @returns Validation result with success status and optional error message
 */
export function validateJsonSpecification(
  parsed: any,
  specification: JsonSpecification
): JsonValidationResult {
  switch (specification) {
    case 'ecma404':
      // ECMA-404 only allows objects and arrays as top-level values
      if (typeof parsed !== 'object' || parsed === null) {
        return {
          isValid: false,
          error: `ECMA-404 specification only allows objects and arrays as top-level values. Found: ${typeof parsed}`
        }
      }
      break

    case 'rfc7159':
      // RFC 7159 allows any JSON value but with stricter requirements
      if (typeof parsed !== 'object' && typeof parsed !== 'string' && typeof parsed !== 'number' && typeof parsed !== 'boolean' && parsed !== null) {
        return {
          isValid: false,
          error: `RFC 7159 specification requires valid JSON types. Found: ${typeof parsed}`
        }
      }
      
      // RFC 7159 has stricter requirements for numbers
      if (typeof parsed === 'number' && (!isFinite(parsed) || isNaN(parsed))) {
        return {
          isValid: false,
          error: `RFC 7159 specification requires finite numbers. Found: ${parsed}`
        }
      }
      break

    case 'rfc8259':
      // RFC 8259 allows any JSON value (most permissive)
      // No additional validation needed beyond basic JSON parsing
      break

    default:
      return {
        isValid: false,
        error: `Unknown JSON specification: ${specification}`
      }
  }

  return { isValid: true }
}

/**
 * Gets a user-friendly description of what each JSON specification allows
 */
export function getSpecificationDescription(specification: JsonSpecification): string {
  switch (specification) {
    case 'ecma404':
      return 'Only allows objects and arrays as top-level values'
    case 'rfc7159':
      return 'Allows any JSON value with stricter number requirements'
    case 'rfc8259':
      return 'Allows any valid JSON value (most permissive)'
    default:
      return 'Unknown specification'
  }
}
