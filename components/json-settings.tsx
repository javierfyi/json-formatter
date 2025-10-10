"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

import { JsonSpecification } from "@/lib/json-validator"

export interface JsonSettings {
  indentation: number
  specification: JsonSpecification
}

interface JsonSettingsProps {
  settings: JsonSettings
  onSettingsChange: (settings: JsonSettings) => void
}

export function JsonSettings({ settings, onSettingsChange }: JsonSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="indentation" className="text-sm font-medium text-foreground">
          JSON Template
        </Label>
        <Select
          value={settings.indentation.toString()}
          onValueChange={(value) => 
            onSettingsChange({ ...settings, indentation: Number.parseInt(value) })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 Space Tab</SelectItem>
            <SelectItem value="4">4 Space Tab</SelectItem>
            <SelectItem value="3">3 Space Tab</SelectItem>
            <SelectItem value="8">8 Space Tab</SelectItem>
            <SelectItem value="1">1 Space Tab</SelectItem>
            <SelectItem value="0">No Indentation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specification" className="text-sm font-medium text-foreground">
          JSON Specification
        </Label>
        <Select
          value={settings.specification}
          onValueChange={(value: 'rfc8259' | 'rfc7159' | 'ecma404') => 
            onSettingsChange({ ...settings, specification: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rfc8259">RFC 8259</SelectItem>
            <SelectItem value="rfc7159">RFC 7159</SelectItem>
            <SelectItem value="ecma404">ECMA-404</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
