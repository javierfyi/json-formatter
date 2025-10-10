export default function Docs() {
    return (
      <main className="min-h-screen pt-20">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-normal text-gray-900">What is JSON?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                JSON (JavaScript Object Notation) is a lightweight data interchange format that's easy for humans to read and write, and easy for machines to parse and generate. It's widely used for transmitting data between a server and web application, as an alternative to XML.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                JSON is built on two structures: a collection of name/value pairs (objects) and an ordered list of values (arrays). It's language-independent and supported by virtually all modern programming languages.
              </p>
            </div>
  
            <div className="space-y-4">
              <h2 className="text-sm font-normal text-gray-900">How to Use This Tool</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    01 - Input JSON →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Paste your JSON data into the input field. The tool will automatically validate and format your JSON, highlighting any syntax errors.
                  </p>
                </div>
  
                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    02 - Format & Validate →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Click "Format JSON" to beautify your JSON with proper indentation and line breaks. The tool will also validate the JSON structure and show any errors.
                  </p>
                </div>
  
                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    03 - Copy & Download →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Use the copy button to copy the formatted JSON to your clipboard, or download it as a .json file for easy storage and sharing.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-normal text-gray-900">Useful Links</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    01 - JSON.org →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The official JSON website with complete specification, examples, and documentation for JSON format.
                  </p>
                </div>
  
                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    02 - MDN JSON Guide →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Mozilla Developer Network's comprehensive guide to working with JSON in JavaScript, including parsing and stringifying.
                  </p>
                </div>
  
                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    03 - JSON Schema →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn about JSON Schema for validating and documenting JSON data structures with detailed specifications.
                  </p>
                </div>
  
               
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-normal text-gray-900">JSON Specifications</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    01 - RFC 8259 (Recommended) →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The most recent and widely adopted specification. Allows any JSON value (objects, arrays, strings, numbers, booleans, null) at the root level. Best for modern applications and APIs.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    02 - RFC 7159 →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Predecessor to RFC 8259, also allows any JSON value at the root level but with less strict requirements. Good for legacy system compatibility.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    03 - ECMA-404 →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    More restrictive specification that only allows objects and arrays as top-level values. Use for legacy systems that expect strict JSON format.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-normal text-gray-900">Privacy & Security</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    01 - No Data Storage →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your JSON data is processed entirely in your browser. Nothing is sent to our servers or stored anywhere. Your data remains completely private and secure.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    02 - Client-Side Processing →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All formatting, validation, and processing happens locally in your browser using JavaScript. No network requests are made with your JSON data.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-normal text-gray-900 mb-1">
                    03 - Open Source →
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This tool is open source and MIT licensed. You can review the code, run it locally, or even host your own instance for maximum privacy control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
  