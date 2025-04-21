"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  GhostIcon,
  Monitor,
  Layers,
  Terminal,
  Settings,
  FileText,
  Paintbrush,
  ChevronRight,
  Zap,
  Users,
} from "lucide-react"
import LoginScreen from "@/components/login-screen"
import SignupScreen from "@/components/signup-screen"
import Link from "next/link"

interface HomePageProps {
  onLogin: (username: string, password: string) => void
}

export default function HomePage({ onLogin }: HomePageProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const handleLoginClick = () => {
    console.log("Login button clicked")
    setShowLogin(true)
    setShowSignup(false)
  }

  const handleSignupClick = () => {
    console.log("Signup button clicked")
    setShowSignup(true)
    setShowLogin(false)
  }

  const handleBackToHome = () => {
    setShowLogin(false)
    setShowSignup(false)
  }

  if (showLogin) {
    return <LoginScreen onLogin={onLogin} onBack={handleBackToHome} />
  }

  if (showSignup) {
    return <SignupScreen onBack={handleBackToHome} onSignupComplete={() => setShowLogin(true)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-6">
                <GhostIcon className="h-10 w-10 text-purple-400" />
                <h1 className="text-3xl font-bold text-white">Phantom OS</h1>
              </div>
              <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
                Experience a Complete{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                  Desktop OS
                </span>{" "}
                in Your Browser
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Phantom OS recreates the desktop experience with windows, apps, and file management—all inside your
                browser.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleLoginClick}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-8 py-6"
                >
                  Log In
                </Button>
                <Button
                  onClick={handleSignupClick}
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl blur-sm"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                  <div className="h-8 bg-slate-900 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-4 relative h-[300px]">
                    {/* Mock Desktop */}
                    <div className="absolute bottom-4 left-0 right-0 h-10 bg-slate-900/80 backdrop-blur-sm"></div>
                    <div className="absolute top-6 left-6 flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-1">
                        <FileText className="h-6 w-6 text-blue-400" />
                      </div>
                      <span className="text-xs text-white">Notepad</span>
                    </div>
                    <div className="absolute top-6 left-24 flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-1">
                        <Terminal className="h-6 w-6 text-green-400" />
                      </div>
                      <span className="text-xs text-white">Terminal</span>
                    </div>

                    {/* Mock Window */}
                    <div className="absolute top-20 right-10 w-64 h-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
                      <div className="h-6 bg-slate-900 flex items-center justify-between px-2">
                        <span className="text-xs text-white">Notepad</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                        </div>
                      </div>
                      <div className="p-2 text-xs text-slate-300">Welcome to Phantom OS...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-16">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Monitor className="h-8 w-8 text-purple-400" />}
            title="Desktop Experience"
            description="Complete with windows, taskbar, and start menu just like a real OS."
          />
          <FeatureCard
            icon={<Layers className="h-8 w-8 text-indigo-400" />}
            title="Multiple Apps"
            description="Notepad, Terminal, Paint, Media Player, and more built-in applications."
          />
          <FeatureCard
            icon={<Terminal className="h-8 w-8 text-green-400" />}
            title="Terminal"
            description="Command-line interface with simulated file system commands."
          />
          <FeatureCard
            icon={<Settings className="h-8 w-8 text-blue-400" />}
            title="Customization"
            description="Change themes, wallpapers, and personalize your experience."
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-yellow-400" />}
            title="File Management"
            description="Browse, create, and organize files in a familiar interface."
          />
          <FeatureCard
            icon={<Paintbrush className="h-8 w-8 text-red-400" />}
            title="Creative Tools"
            description="Express yourself with the built-in Paint application."
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-20 bg-slate-900/50">
        <h2 className="text-3xl font-bold text-center text-white mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1. Create Account</h3>
            <p className="text-slate-300">Sign up for a Phantom OS account to get started with your virtual desktop.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Boot Up</h3>
            <p className="text-slate-300">
              Experience the boot sequence and log in to your personalized desktop environment.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <Monitor className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Start Using</h3>
            <p className="text-slate-300">
              Launch apps, manage files, and enjoy the full desktop experience in your browser.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-16">What Users Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="Phantom OS has completely changed how I think about browser applications. It's like having a full desktop environment wherever I go."
            author="Alex Johnson"
            role="Software Developer"
          />
          <TestimonialCard
            quote="The attention to detail is incredible. The windows actually feel like real windows, and the apps are surprisingly powerful."
            author="Sarah Chen"
            role="UX Designer"
          />
          <TestimonialCard
            quote="I use Phantom OS for teaching my students about operating systems. It's a perfect visual aid that runs right in the browser."
            author="Dr. Michael Rodriguez"
            role="Computer Science Professor"
          />
        </div>
      </div>

      {/* Technology Section */}
      <div className="container mx-auto px-4 py-20 bg-slate-900/50">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Powered By Modern Technology</h2>
        <p className="text-center text-slate-300 max-w-3xl mx-auto mb-16">
          Phantom OS leverages cutting-edge web technologies to create a seamless desktop experience right in your
          browser.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <TechItem icon={<div className="text-4xl font-bold text-blue-400">Py</div>} name="Python" />
          <TechItem icon={<div className="text-4xl font-bold text-green-400">Dj</div>} name="Django" />
          <TechItem icon={<div className="text-4xl font-bold text-purple-400">Hx</div>} name="HTMX" />
          <TechItem icon={<div className="text-4xl font-bold text-yellow-400">JS</div>} name="JavaScript" />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-16">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FaqItem
            question="Is Phantom OS a real operating system?"
            answer="No, Phantom OS is a simulated operating system that runs in your web browser. It recreates the look and feel of a desktop OS but doesn't replace your actual operating system."
          />
          <FaqItem
            question="Do I need to install anything?"
            answer="No installation required! Phantom OS runs entirely in your web browser, making it accessible from any device with an internet connection."
          />
          <FaqItem
            question="Can I save my work in Phantom OS?"
            answer="Yes, Phantom OS includes a virtual file system that allows you to create, edit, and save files within the simulation. Your data persists between sessions."
          />
          <FaqItem
            question="What browsers are supported?"
            answer="Phantom OS works best on modern browsers like Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience."
          />
          <FaqItem
            question="Is my data secure?"
            answer="Yes, your data in Phantom OS is stored securely and is only accessible to you. We implement industry-standard security practices to protect your information."
          />
          <FaqItem
            question="Can I add my own applications?"
            answer="Advanced users can create and add custom applications to Phantom OS through our developer API. Check our documentation for more details."
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to experience Phantom OS?</h2>
              <p className="text-slate-300 mb-6 md:mb-0">
                Create an account or log in to start using the most advanced browser-based operating system.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                  onClick={handleLoginClick}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-8 py-6"
                >
                  Log In
                </Button>
                <Button
                  onClick={handleSignupClick}
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Sign Up
                </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GhostIcon className="h-6 w-6 text-purple-400" />
                <span className="text-white font-bold">Phantom OS</span>
              </div>
              <p className="text-slate-400 text-sm">
                A simulated operating system built inside the browser using Django and HTMX.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Features</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Desktop Environment</li>
                <li>Window Management</li>
                <li>Built-in Applications</li>
                <li>File System</li>
                <li>Customization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Developer Guide</li>
                <li>Tutorials</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Phantom OS. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                GitHub
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 transition-colors">
      <div className="bg-slate-900 w-16 h-16 rounded-lg flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="mb-4 text-purple-400">"</div>
      <p className="text-slate-300 mb-6">{quote}</p>
      <div>
        <div className="font-bold text-white">{author}</div>
        <div className="text-sm text-slate-400">{role}</div>
      </div>
    </div>
  )
}

function TechItem({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-slate-800 rounded-lg flex items-center justify-center mb-3">{icon}</div>
      <span className="text-white">{name}</span>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-3">{question}</h3>
      <p className="text-slate-300">{answer}</p>
    </div>
  )
}
