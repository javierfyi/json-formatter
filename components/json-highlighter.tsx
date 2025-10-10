interface JsonHighlighterProps {
  json: string
}

export function JsonHighlighter({ json }: JsonHighlighterProps) {
  const highlightJson = (jsonString: string) => {
    // Tokenize and highlight JSON
    const tokens: { type: string; value: string }[] = []
    let i = 0

    while (i < jsonString.length) {
      const char = jsonString[i]

      // Whitespace
      if (/\s/.test(char)) {
        let whitespace = ""
        while (i < jsonString.length && /\s/.test(jsonString[i])) {
          whitespace += jsonString[i]
          i++
        }
        tokens.push({ type: "whitespace", value: whitespace })
        continue
      }

      // Strings
      if (char === '"') {
        let str = '"'
        i++
        while (i < jsonString.length) {
          if (jsonString[i] === "\\" && i + 1 < jsonString.length) {
            str += jsonString[i] + jsonString[i + 1]
            i += 2
          } else if (jsonString[i] === '"') {
            str += '"'
            i++
            break
          } else {
            str += jsonString[i]
            i++
          }
        }

        // Check if this is a key (followed by colon) or a value
        let j = i
        while (j < jsonString.length && /\s/.test(jsonString[j])) j++
        const isKey = jsonString[j] === ":"

        tokens.push({ type: isKey ? "key" : "string", value: str })
        continue
      }

      // Numbers
      if (/[-0-9]/.test(char)) {
        let num = ""
        while (i < jsonString.length && /[-0-9.eE+]/.test(jsonString[i])) {
          num += jsonString[i]
          i++
        }
        tokens.push({ type: "number", value: num })
        continue
      }

      // Booleans and null
      if (char === "t" && jsonString.substring(i, i + 4) === "true") {
        tokens.push({ type: "boolean", value: "true" })
        i += 4
        continue
      }
      if (char === "f" && jsonString.substring(i, i + 5) === "false") {
        tokens.push({ type: "boolean", value: "false" })
        i += 5
        continue
      }
      if (char === "n" && jsonString.substring(i, i + 4) === "null") {
        tokens.push({ type: "null", value: "null" })
        i += 4
        continue
      }

      // Punctuation
      if (/[{}[\]:,]/.test(char)) {
        tokens.push({ type: "punctuation", value: char })
        i++
        continue
      }

      // Unknown character
      i++
    }

    return tokens
  }

  const tokens = highlightJson(json)

  const getColorClass = (type: string) => {
    switch (type) {
      case "key":
        return "text-[color:var(--color-json-key)]"
      case "string":
        return "text-[color:var(--color-json-string)]"
      case "number":
        return "text-[color:var(--color-json-number)]"
      case "boolean":
        return "text-[color:var(--color-json-boolean)]"
      case "null":
        return "text-[color:var(--color-json-null)]"
      case "punctuation":
        return "text-[color:var(--color-json-punctuation)]"
      default:
        return "text-foreground"
    }
  }

  return (
    <pre className="font-mono text-sm leading-relaxed">
      <code>
        {tokens.map((token, index) => (
          <span key={index} className={getColorClass(token.type)}>
            {token.value}
          </span>
        ))}
      </code>
    </pre>
  )
}
