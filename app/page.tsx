"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { JsonHighlighter } from "@/components/json-highlighter"
import { JsonSettings, JsonSettings as JsonSettingsType } from "@/components/json-settings"
import { validateJsonSpecification } from "@/lib/json-validator"
import { Check, Copy, Settings, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function JsonFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<JsonSettingsType>({
    indentation: 2,
    specification: 'rfc8259'
  })

  const formatJson = async () => {
    setError("")
    setOutput("")
    setIsLoading(true)

    if (!input.trim()) {
      setError("Please enter some JSON to format")
      setIsLoading(false)
      return
    }

    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 300))

    try {
      const parsed = JSON.parse(input)
      
      // Validate against selected specification
      const validation = validateJsonSpecification(parsed, settings.specification)
      if (!validation.isValid) {
        setError(validation.error || "Invalid JSON for selected specification")
        toast.error(`Invalid JSON for ${settings.specification.toUpperCase()} specification`)
        return
      }
      
      const formatted = JSON.stringify(parsed, null, settings.indentation)
      setOutput(formatted)
      toast.success("JSON formatted successfully")
    } catch (err) {
      if (err instanceof SyntaxError) {
        // Extract line number from error message if available
        const match = err.message.match(/position (\d+)/)
        const position = match ? Number.parseInt(match[1]) : null

        let errorMessage = err.message
        if (position !== null) {
          const lines = input.substring(0, position).split("\n")
          const lineNumber = lines.length
          const columnNumber = lines[lines.length - 1].length + 1
          errorMessage = `Syntax error at line ${lineNumber}, column ${columnNumber}: ${err.message}`
          toast.error('An error occurred while formatting JSON, check your JSON syntax')
        } else {
          errorMessage = `Syntax error: ${err.message}`
          toast.error('An error occurred while formatting JSON, check your JSON syntax')
        }

        setError(errorMessage)
      } else {
        setError("An unexpected error occurred")
        toast.error("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      toast.success("Copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const clearInput = () => {
    setInput("")
    setOutput("")
    setError("")
    toast.success("Input cleared")
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {/* Header */}
        <div className="my-12 text-center">
          <p className="text-foreground leading-relaxed text-sm relative overflow-hidden bg-white rounded-full max-w-md mx-auto py-2">
            <span className="inline-block bg-gradient-to-r from-foreground/20 via-foreground to-foreground/20 bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] bg-blue-600">
              Validate, beautify, and syntax highlight your JSON data
            </span>
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="json-input" className="block text-sm font-medium text-foreground">
              Input
            </label>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center h-8 transition-all duration-200 ease-out hover:scale-105 active:scale-95"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearInput}
                className="flex items-center h-8 mr-2 transition-all duration-200 ease-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={!input.trim()}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                onClick={formatJson}
                size="sm"
                disabled={!input.trim() || isLoading}
                className="px-3 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 ease-out hover:scale-105 active:scale-95 text-xs h-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  "Format JSON"
                )}
              </Button>
            </div>
          </div>
          
          <div className={`transition-all duration-300 ease-out ${showSettings ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
            <div className="bg-white rounded-lg p-4 border border-muted overflow-visible">
              <JsonSettings 
                settings={settings} 
                onSettingsChange={setSettings} 
              />
            </div>
          </div>
          <textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "example", "value": 123}'
            className="w-full h-48 px-4 py-3 font-mono text-sm bg-card border border-muted rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-ring/20 transition-shadow"
          />
        </div>


        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg animate-in slide-in-from-top-2 duration-300 ease-out">
            <p className="text-sm text-destructive leading-relaxed">{error}</p>
          </div>
        )}

        {/* Output Section */}
        {output && (
          <div className="animate-in slide-in-from-bottom-2 duration-500 ease-out">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-foreground">Output</label>
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                className="h-7 px-3 text-muted-foreground hover:text-foreground transition-all duration-200 ease-out hover:scale-105 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="bg-card border border-muted rounded-lg p-4 overflow-x-auto">
              <JsonHighlighter json={output} />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}