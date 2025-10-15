"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icons } from "@/components/icons"

export function Header() {
  const pathname = usePathname()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-medium text-foreground">JSON Formatter</h1>
          </div>

          <nav className="flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              href="/" 
              className={`text-sm transition-all duration-200 ease-out flex items-center hover:scale-105 ${
                pathname === '/' 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div 
                className={`w-1.5 h-1.5 bg-foreground rounded-full mr-2 transition-all duration-300 ease-out ${
                  pathname === '/' 
                    ? 'scale-100 opacity-100' 
                    : 'scale-0 opacity-0'
                }`}
              />
              Home
            </Link>
            <Link 
              href="/docs" 
              className={`text-sm transition-all duration-200 ease-out flex items-center hover:scale-105 ${
                pathname === '/docs' 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div 
                className={`w-1.5 h-1.5 bg-foreground rounded-full mr-2 transition-all duration-300 ease-out ${
                  pathname === '/docs' 
                    ? 'scale-100 opacity-100' 
                    : 'scale-0 opacity-0'
                }`}
              />
              Documentation
            </Link>
          </nav>

          {/* GitHub Icon */}
          <div className="flex items-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 transition-all duration-200 ease-out hover:scale-110 active:scale-95"
            >
              <Icons.gitHub className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
