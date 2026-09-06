import { useState, useEffect } from 'react'
import {
  Sparkles,
  GitBranch,
  CloudLightning,
  Terminal,
  CheckCircle2,
  ExternalLink,
  Code2,
  Activity,
  Play,
  Check,
  Clock,
  RefreshCw,
  Sun,
  Moon
} from 'lucide-react'

// Custom GitHub SVG Icon
function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

interface PipelineStep {
  id: number
  title: string
  subtitle: string
  icon: typeof Sparkles | typeof GithubIcon
  status: 'idle' | 'running' | 'completed'
  details: string
}

export default function App() {
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'completed'>('idle')
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1)
  const [promptInput, setPromptInput] = useState<string>('Create a real-time collaborative task manager with dark mode and analytics')
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null)
  const [commitCount, setCommitCount] = useState<number>(14)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const initialSteps: PipelineStep[] = [
    {
      id: 1,
      title: 'AI Code Generation',
      subtitle: 'Claude / Gemini Agent',
      icon: Sparkles,
      status: 'idle',
      details: 'Synthesizing architecture, React components, state hooks, and Tailwind classes.'
    },
    {
      id: 2,
      title: 'IDE Sync & Workspace',
      subtitle: 'VS Code Environment',
      icon: Terminal,
      status: 'idle',
      details: 'Files staged and formatted locally in scratch workspace with TypeScript verification.'
    },
    {
      id: 3,
      title: 'GitHub Commit & Push',
      subtitle: 'Git Version Control',
      icon: GithubIcon,
      status: 'idle',
      details: 'Automated commit "feat: AI app scaffold" pushed to origin/main branch.'
    },
    {
      id: 4,
      title: 'Vercel Edge Deployment',
      subtitle: 'Global CI/CD Pipeline',
      icon: CloudLightning,
      status: 'idle',
      details: 'Webhook triggered build, SSR asset optimization, and live deployment propagation.'
    }
  ]

  const [steps, setSteps] = useState<PipelineStep[]>(initialSteps)

  const triggerAutomatedRun = () => {
    if (pipelineState === 'running') return
    setPipelineState('running')
    setDeploymentUrl(null)
    setCurrentStepIndex(0)

    setSteps(prev => prev.map(s => ({ ...s, status: 'idle' })))

    // Step 1: AI Prompt
    setTimeout(() => {
      setSteps(prev => prev.map((s, idx) => idx === 0 ? { ...s, status: 'running' } : s))
      setCurrentStepIndex(0)
    }, 400)

    // Step 2: VS Code
    setTimeout(() => {
      setSteps(prev => prev.map((s, idx) => {
        if (idx === 0) return { ...s, status: 'completed' }
        if (idx === 1) return { ...s, status: 'running' }
        return s
      }))
      setCurrentStepIndex(1)
    }, 1800)

    // Step 3: GitHub Push
    setTimeout(() => {
      setSteps(prev => prev.map((s, idx) => {
        if (idx === 1) return { ...s, status: 'completed' }
        if (idx === 2) return { ...s, status: 'running' }
        return s
      }))
      setCurrentStepIndex(2)
      setCommitCount(c => c + 1)
    }, 3200)

    // Step 4: Vercel Deploy
    setTimeout(() => {
      setSteps(prev => prev.map((s, idx) => {
        if (idx === 2) return { ...s, status: 'completed' }
        if (idx === 3) return { ...s, status: 'running' }
        return s
      }))
      setCurrentStepIndex(3)
    }, 4600)

    // Final Done
    setTimeout(() => {
      setSteps(prev => prev.map(s => ({ ...s, status: 'completed' })))
      setPipelineState('completed')
      setDeploymentUrl('https://ai-automated-app.vercel.app')
    }, 6200)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200 transition-colors duration-300">
      {/* Background glow accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl rounded-full opacity-60" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full" />
      </div>

      {/* Navigation */}
      <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[11px] flex items-center justify-center">
                <CloudLightning className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:bg-gradient-to-r dark:from-white dark:via-slate-100 dark:to-slate-400 dark:bg-clip-text dark:text-transparent">
                AutomateFlow
              </span>
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                Pipeline Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>GitHub &bull; Vercel Live CI/CD</span>
            </div>
            <button
              onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 space-y-10">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> AI to Production in Seconds
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Code with AI. Sync in VS Code.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
              Auto-Deploy to Vercel.
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A seamless automated pipeline: Prompt your AI assistant inside your workspace, commit to GitHub, and let Vercel trigger global edge deployments automatically.
          </p>
        </section>

        {/* Live Interactive Trigger Console */}
        <section className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Code2 className="w-5 h-5 text-indigo-400" />
              </div>
              <input
                type="text"
                value={promptInput}
                onChange={e => setPromptInput(e.target.value)}
                placeholder="What app do you want to create?"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm sm:text-base font-medium"
              />
            </div>
            <button
              onClick={triggerAutomatedRun}
              disabled={pipelineState === 'running'}
              className="flex items-center justify-center gap-2.5 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
            >
              {pipelineState === 'running' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Deploying Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run Pipeline</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Quick Prompts:</span>
            {[
              'SaaS Billing & Subscriptions Portal',
              'Developer Markdown Documentation Hub',
              'AI Prompt Playground & Output Benchmarks'
            ].map(prompt => (
              <button
                key={prompt}
                onClick={() => setPromptInput(prompt)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/50 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </section>

        {/* Pipeline Architecture Visualizer */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              Automated Pipeline Workflow
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Status: <span className={pipelineState === 'completed' ? 'text-emerald-400 font-bold' : pipelineState === 'running' ? 'text-indigo-400 font-bold animate-pulse' : 'text-slate-500'}>
                {pipelineState.toUpperCase()}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCurrent = currentStepIndex === index && pipelineState === 'running'
              const isDone = step.status === 'completed'

              return (
                <div
                  key={step.id}
                  className={`relative p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500/80 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500'
                      : isDone
                      ? 'bg-white dark:bg-slate-900/80 border-emerald-500/40'
                      : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          isDone
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : isCurrent
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-slate-500">0{step.id}</span>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{step.title}</h3>
                      <p className="text-xs text-indigo-600 dark:text-indigo-300/80 font-medium">{step.subtitle}</p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.details}</p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs">
                    {isDone ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Synced
                      </span>
                    ) : isCurrent ? (
                      <span className="text-indigo-400 flex items-center gap-1 font-medium">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Processing
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Success Banner when deployment finished */}
          {pipelineState === 'completed' && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 text-sm">Deployment Succeeded!</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400/80">Code committed to Git, pushed to GitHub, and deployed on Vercel Edge.</p>
                </div>
              </div>
              <a
                href={deploymentUrl || 'https://vercel.com'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-md"
              >
                <span>Visit Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </section>

        {/* Real-time Status & Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs">
              <span>Avg Deployment Latency</span>
              <CloudLightning className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">28.4s</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">&uarr; 35% faster with edge caching</p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs">
              <span>GitHub Commits</span>
              <GitBranch className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{commitCount} commits</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">All pushed to <code className="text-indigo-600 dark:text-indigo-300">origin/main</code></p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs">
              <span>CI/CD Webhook Trigger</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">Active</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Vercel GitHub Integration 100% healthy</p>
          </div>
        </section>

        {/* How Option 1 Works (Educational Guide) */}
        <section className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <Terminal className="w-4 h-4 text-indigo-400" />
            Your Command Cheat Sheet (VS Code &bull; Git &bull; Vercel)
          </h3>
          <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-700 dark:text-slate-300 space-y-2 border border-slate-300 dark:border-slate-800/60 overflow-x-auto">
            <p className="text-slate-500"># 1. Prompt the AI agent to edit files or build new components</p>
            <p className="text-indigo-600 dark:text-indigo-300"># (The AI creates or modifies your files directly in VS Code)</p>
            <p className="text-slate-500"># 2. Stage and commit your changes</p>
            <p className="text-emerald-600 dark:text-emerald-400">git add . && git commit -m "feat: added new feature with AI"</p>
            <p className="text-slate-500"># 3. Push to GitHub (Triggers Vercel immediately!)</p>
            <p className="text-pink-600 dark:text-pink-400">git push</p>
          </div>
        </section>
        {/* Pricing Table — AI-Generated Feature Test */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-700 dark:text-pink-300 border border-pink-500/20 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI-Generated Feature — Live Test
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">This entire section was added by AI and auto-deployed to Vercel in one git push.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Free Tier */}
            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col gap-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-200 text-lg">Free</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Perfect for side projects & experiments</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm mb-1">/month</span>
              </div>
              <ul className="space-y-2 flex-1">
                {['1 Project', '3 AI Deployments/day', 'GitHub Integration', 'Community Support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-2 w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Get Started Free
              </button>
            </div>

            {/* Pro Tier — Highlighted */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/80 dark:to-slate-900/80 border border-indigo-500/50 flex flex-col gap-4 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/30">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-xs font-bold">
                Most Popular
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Pro</h3>
                <p className="text-indigo-700 dark:text-indigo-300/80 text-xs mt-1">For developers shipping real products</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$29</span>
                <span className="text-indigo-600 dark:text-indigo-300 text-sm mb-1">/month</span>
              </div>
              <ul className="space-y-2 flex-1">
                {['Unlimited Projects', 'Unlimited AI Deployments', 'GitHub + VS Code Sync', 'Vercel Edge CI/CD', 'Priority Support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-slate-800 dark:text-slate-200 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/25">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col gap-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-200 text-lg">Enterprise</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">For teams and organisations at scale</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$99</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm mb-1">/month</span>
              </div>
              <ul className="space-y-2 flex-1">
                {['Everything in Pro', 'Team Access & SSO', 'Custom AI Models', 'Dedicated Infra', 'SLA + Dedicated Support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-2 w-full py-2.5 rounded-xl border border-purple-500/50 text-purple-700 dark:text-purple-300 font-semibold text-sm hover:bg-purple-500/10 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 py-6 text-center text-xs text-slate-500">
        AutomateFlow AI &bull; Built with React, Vite, Tailwind CSS &amp; Lucide Icons &bull; Powered by Antigravity
      </footer>
    </div>
  )
}

