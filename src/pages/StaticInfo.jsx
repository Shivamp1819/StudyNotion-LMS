import React, { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import Footer from "../components/Common/Footer"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import {
  FaShieldAlt,
  FaBookOpen,
  FaBriefcase,
  FaQuestionCircle,
  FaHandshake,
  FaArrowRight,
  FaCode,
  FaCheckCircle,
  FaCopy,
  FaCalendarAlt,
  FaCalculator,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaLaptopCode,
  FaAward,
  FaLightbulb,
} from "react-icons/fa"

export default function StaticInfo() {
  const location = useLocation()
  const rawPath = location.pathname.toLowerCase().replace(/\/$/, "")
  const path = rawPath || "/docs"

  // Dynamic state for various interactive widgets
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedIndex, setExpandedIndex] = useState(0)
  const [copiedKey, setCopiedKey] = useState(null)

  // Career / Salary Calculator state
  const [careerRole, setCareerRole] = useState("fullstack")
  const [yearsExp, setYearsExp] = useState(2)

  // Affiliate Calculator state
  const [referralsCount, setReferralsCount] = useState(15)

  // Code challenge simulator state
  const [selectedChallenge, setSelectedChallenge] = useState(0)
  const [codeRunning, setCodeRunning] = useState(false)
  const [codeSuccess, setCodeSuccess] = useState(false)

  // Careers application modal
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState("")
  const [appliedSuccess, setAppliedSuccess] = useState(false)

  const handleCopyCode = (text, key) => {
    copy(text)
    setCopiedKey(key)
    toast.success("Snippet copied to clipboard!")
    setTimeout(() => setCopiedKey(null), 2500)
  }

  const handleRunChallengeCode = () => {
    setCodeRunning(true)
    setCodeSuccess(false)
    setTimeout(() => {
      setCodeRunning(false)
      setCodeSuccess(true)
      toast.success("All test cases passed successfully! (+50 XP)")
    }, 1200)
  }

  const handleApplyJob = (e) => {
    e.preventDefault()
    setAppliedSuccess(true)
    toast.success(`Application for ${selectedJob} submitted! We will contact you soon.`)
    setTimeout(() => {
      setShowApplyModal(false)
      setAppliedSuccess(false)
    }, 2000)
  }

  // --- Dynamic Content & Interactive Modules Definitions ---

  // 1. Interview Prep Questions
  const interviewQuestions = [
    {
      category: "frontend",
      difficulty: "Medium",
      company: "Google / Meta",
      question: "How does React's Virtual DOM reconciliation and Fiber architecture work?",
      solution:
        "React uses Fiber, an internal engine that divides work into incremental units (fibers). It performs a two-phase reconciliation: the Render phase (asynchronous, interruptible diffing between current and work-in-progress fiber trees) and the Commit phase (synchronous DOM mutations). This enables concurrent rendering and smooth 60fps UI updates.",
    },
    {
      category: "backend",
      difficulty: "Hard",
      company: "Amazon / Uber",
      question: "How would you design a distributed rate limiter for high-throughput APIs?",
      solution:
        "Use Redis with the Token Bucket or Sliding Window Log algorithm. Using Redis Lua scripts ensures atomic execution of rate checks and increment operations across multiple microservice replicas, preventing race conditions with sub-millisecond latency.",
    },
    {
      category: "dsa",
      difficulty: "Medium",
      company: "Microsoft / Netflix",
      question: "Explain the Two Pointer vs Sliding Window technique with optimal time complexity.",
      solution:
        "Two Pointers work on sorted arrays or palindromes (often converging from ends, O(N) time, O(1) space). Sliding Window maintains a contiguous subsegment with dynamic left/right pointers, optimal for longest/shortest subarray problems with monotonic constraints.",
    },
    {
      category: "system-design",
      difficulty: "Hard",
      company: "Stripe / Coinbase",
      question: "What is Database Sharding and how do you handle cross-shard queries and rebalancing?",
      solution:
        "Sharding horizontally partitions data across database nodes using consistent hashing on a shard key (e.g. user_id). Cross-shard transactions utilize Two-Phase Commit (2PC) or Saga patterns with idempotent event queues to ensure eventual consistency.",
    },
  ]

  // 2. Code Challenges
  const challenges = [
    {
      title: "1. Two Sum Target Finder",
      difficulty: "Easy",
      tags: ["Array", "Hash Table"],
      starterCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
  return [];
}`,
      testCases: "Input: nums = [2,7,11,15], target = 9 -> Output: [0,1]",
    },
    {
      title: "2. Valid Parentheses Checker",
      difficulty: "Easy",
      tags: ["Stack", "String"],
      starterCode: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (!map[char]) stack.push(char);
    else if (stack.pop() !== map[char]) return false;
  }
  return stack.length === 0;
}`,
      testCases: "Input: s = '()[]{}' -> Output: true",
    },
    {
      title: "3. Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      tags: ["Sliding Window", "Set"],
      starterCode: `function lengthOfLongestSubstring(s) {
  let set = new Set(), l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    while (set.has(s[r])) { set.delete(s[l]); l++; }
    set.add(s[r]);
    max = Math.max(max, r - l + 1);
  }
  return max;
}`,
      testCases: "Input: s = 'abcabcbb' -> Output: 3",
    },
  ]

  // 3. Documentation & Cheat Sheets
  const cheatSheets = {
    javascript: [
      {
        title: "Array Methods Mastery",
        code: `// Modern array transformations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
const hasEven = numbers.some(n => n % 2 === 0);`,
      },
      {
        title: "Async / Await & Promise Handling",
        code: `// Clean asynchronous execution
async function fetchUser(userId) {
  try {
    const res = await fetch(\`/api/v1/users/\${userId}\`);
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
}`,
      },
    ],
    python: [
      {
        title: "List Comprehensions & Lambdas",
        code: `# Pythonic data processing
nums = [1, 2, 3, 4, 5, 6]
squares = [x**2 for x in nums if x % 2 == 0]
lookup = {f"key_{x}": x*10 for x in nums}
pairs = sorted([(3, 'c'), (1, 'a'), (2, 'b')], key=lambda x: x[0])`,
      },
      {
        title: "Context Managers & Exception Handling",
        code: `# Safe resource management
with open("data.json", "r") as file:
    content = json.load(file)

try:
    process_data(content)
except KeyError as err:
    print(f"Missing required field: {err}")`,
      },
    ],
    react: [
      {
        title: "Custom Hook for Debounced Search",
        code: `import { useState, useEffect } from "react";

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}`,
      },
    ],
  }

  // 4. Careers Open Roles
  const jobsList = [
    {
      title: "Senior Full Stack Engineer (MERN)",
      dept: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-Time",
      experience: "3+ Years",
      description: "Architect high-throughput learning microservices, interactive code sandboxes, and video delivery pipelines.",
    },
    {
      title: "AI / ML Curriculum Author",
      dept: "Content",
      location: "Remote",
      type: "Full-Time / Contract",
      experience: "2+ Years",
      description: "Author comprehensive PyTorch, GenAI, and Deep Learning curriculums with hands-on coding labs.",
    },
    {
      title: "UI / UX Product Designer",
      dept: "Design",
      location: "Remote",
      type: "Full-Time",
      experience: "2+ Years",
      description: "Design pixel-perfect dark theme dashboards, design systems, and delightful learning interactions.",
    },
    {
      title: "Developer Community Lead",
      dept: "Growth",
      location: "Remote",
      type: "Full-Time",
      experience: "1+ Years",
      description: "Foster our global Discord community, organize student hackathons, and mentor aspiring developers.",
    },
  ]

  // 5. Help Center FAQs
  const faqs = [
    {
      q: "How do I access my enrolled courses and video lectures?",
      a: "Once enrolled, all courses are accessible under your Dashboard -> Enrolled Courses. Lectures are available 24/7 with lifetime access, downloadable resources, and progress tracking.",
    },
    {
      q: "Are the course completion certificates verifiable?",
      a: "Yes! Every completed course generates a verifiable cryptographic credential with a unique certificate ID that can be shared on LinkedIn or verified by employers.",
    },
    {
      q: "What is the 30-day refund policy?",
      a: "If you are not satisfied with a purchased course, you can request a full refund within 30 days of purchase directly through your billing settings or by contacting our 24/7 support team.",
    },
    {
      q: "How does the email verification OTP work?",
      a: "When you sign up or reset your password, our pooled SMTP service delivers a secure 6-digit code to your inbox within seconds. If you don't see it, check your spam/promotions folder or click Resend.",
    },
  ]

  // Dynamic salary calculator helpers
  const baseSalaries = {
    fullstack: 65000,
    devops: 75000,
    ai: 85000,
    mobile: 62000,
  }
  const estimatedSalary = Math.round(
    (baseSalaries[careerRole] || 60000) * (1 + yearsExp * 0.14)
  )

  // Determine current page metadata
  const getPageInfo = () => {
    switch (path) {
      case "/interview-prep":
        return {
          title: "Technical Interview Preparation",
          subtitle: "Master DSA, System Design, and Behavioral challenges with company-tagged mock questions and solutions.",
          icon: FaLaptopCode,
          tag: "Interactive Simulator",
        }
      case "/professional-certification":
      case "/certifications":
        return {
          title: "Professional Certifications",
          subtitle: "Earn industry-recognized, verifiable certificates that prove your hands-on engineering capabilities.",
          icon: FaAward,
          tag: "Verified Credentials",
        }
      case "/career-paths":
      case "/career-services":
        return {
          title: "Career Services & Engineering Roadmaps",
          subtitle: "Explore compensation ranges, in-demand technical skills, and structured tracks to level up your career.",
          icon: FaBriefcase,
          tag: "Interactive Salary & Path Explorer",
        }
      case "/code-challenges":
        return {
          title: "Daily Code Challenges",
          subtitle: "Level up your algorithmic problem-solving with automated test cases and instant feedback.",
          icon: FaCode,
          tag: "Interactive Code Runner",
        }
      case "/docs":
      case "/chart-sheet":
      case "/cheat-sheet":
        return {
          title: "Developer Documentation & Cheatsheets",
          subtitle: "Curated syntax references, design patterns, and ready-to-use snippets for modern technologies.",
          icon: FaBookOpen,
          tag: "Quick Reference",
        }
      case "/careers":
        return {
          title: "Careers at StudyNotion",
          subtitle: "Join our mission to democratize elite tech education and empower developers globally.",
          icon: FaBriefcase,
          tag: "Hiring Across All Teams",
        }
      case "/affiliates":
        return {
          title: "StudyNotion Affiliate Partner Program",
          subtitle: "Earn generous recurring commissions by sharing high-quality coding courses with your network.",
          icon: FaHandshake,
          tag: "Up to 30% Revenue Share",
        }
      case "/help-center":
      case "/faq":
        return {
          title: "Help Center & FAQs",
          subtitle: "Instant solutions to common queries regarding courses, accounts, payments, and certificates.",
          icon: FaQuestionCircle,
          tag: "24/7 Learner Support",
        }
      case "/community":
      case "/forums":
      case "/events":
      case "/chapters":
        return {
          title: "Global Developer Community & Events",
          subtitle: "Connect with fellow engineers, attend weekly live workshops, and participate in global hackathons.",
          icon: FaCalendarAlt,
          tag: "50,000+ Active Members",
        }
      case "/privacy-policy":
        return {
          title: "Privacy Policy",
          subtitle: "We prioritize your data privacy. Learn how StudyNotion protects and manages your information.",
          icon: FaShieldAlt,
          tag: "Updated for 2025",
        }
      case "/cookie-policy":
        return {
          title: "Cookie Policy",
          subtitle: "Understanding how cookies ensure seamless authentication and personalized learning on StudyNotion.",
          icon: FaShieldAlt,
          tag: "Updated for 2025",
        }
      case "/terms":
      case "/terms-of-service":
        return {
          title: "Terms and Conditions",
          subtitle: "Guidelines and platform policies governing your use of StudyNotion educational content.",
          icon: FaBookOpen,
          tag: "Platform Agreement",
        }
      default:
        return {
          title: path
            .replace("/", "")
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          subtitle: "Explore curated modules, interactive tools, and certified roadmaps on StudyNotion.",
          icon: FaLightbulb,
          tag: "Learning Resource",
        }
    }
  }

  const pageInfo = getPageInfo()
  const PageIcon = pageInfo.icon

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-25">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden border-b border-richblack-700 bg-gradient-to-b from-richblack-800 to-richblack-900 py-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-44 w-[600px] bg-yellow-50/5 blur-[120px] pointer-events-none"></div>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-50/30 bg-yellow-50/10 px-4 py-1 text-xs font-semibold text-yellow-50">
            <PageIcon className="text-sm" /> {pageInfo.tag}
          </div>
          <h1 className="text-3xl font-bold text-richblack-5 sm:text-4xl md:text-5xl">
            {pageInfo.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-richblack-300">
            {pageInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Main Dynamic Interactive Container */}
      <div className="mx-auto w-11/12 max-w-maxContent py-12">
        {/* =========================================================================
            VIEW 1: INTERVIEW PREP
        ========================================================================== */}
        {(path === "/interview-prep" || path === "/interview") && (
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-richblack-700 pb-4">
              <div className="flex flex-wrap gap-2">
                {["all", "frontend", "backend", "dsa", "system-design"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                      activeTab === cat
                        ? "bg-yellow-50 text-richblack-900 shadow-md font-semibold"
                        : "bg-richblack-800 text-richblack-300 hover:bg-richblack-700 hover:text-white"
                    }`}
                  >
                    {cat.toUpperCase().replace("-", " ")}
                  </button>
                ))}
              </div>
              <span className="text-xs text-richblack-400">
                Showing {interviewQuestions.filter((q) => activeTab === "all" || q.category === activeTab).length} curated questions
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {interviewQuestions
                .filter((q) => activeTab === "all" || q.category === activeTab)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800/70 p-6 backdrop-blur-md transition-all hover:border-richblack-600"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-yellow-50/10 border border-yellow-50/20 px-2.5 py-0.5 text-[11px] font-semibold text-yellow-50">
                            {item.difficulty}
                          </span>
                          <span className="rounded-md bg-richblack-700 px-2.5 py-0.5 text-[11px] text-richblack-300">
                            {item.company}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-richblack-5">
                          {item.question}
                        </h3>
                      </div>
                      <button
                        onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                        className="rounded-lg bg-richblack-700 p-2 text-richblack-300 hover:bg-richblack-600 hover:text-white"
                        title="Toggle Solution"
                      >
                        {expandedIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>

                    {expandedIndex === idx && (
                      <div className="mt-4 rounded-xl border border-richblack-700/60 bg-richblack-900/80 p-4 text-sm leading-relaxed text-richblack-200">
                        <p className="font-semibold text-yellow-50 mb-1">
                          ✦ Optimal Solution & Architecture:
                        </p>
                        <p>{item.solution}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: CODE CHALLENGES (Interactive Simulator)
        ========================================================================== */}
        {path === "/code-challenges" && (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-richblack-700 bg-richblack-800 p-6">
              <div>
                <h2 className="text-xl font-bold text-richblack-5">Daily Practice Challenges</h2>
                <p className="text-xs text-richblack-300 mt-1">Run algorithms live and test your logic with sample assertions.</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-richblack-900 px-4 py-2 border border-richblack-700">
                <span className="text-yellow-50 font-bold">🔥 5 Day Streak</span>
              </div>
            </div>

            {/* Challenge selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {challenges.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedChallenge(idx)
                    setCodeSuccess(false)
                  }}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    selectedChallenge === idx
                      ? "border-yellow-50 bg-richblack-800 shadow"
                      : "border-richblack-700 bg-richblack-800/40 hover:border-richblack-600"
                  }`}
                >
                  <span className="text-xs font-semibold text-yellow-50">{ch.difficulty}</span>
                  <p className="font-semibold text-sm text-richblack-5 mt-1">{ch.title}</p>
                </button>
              ))}
            </div>

            {/* Code Box */}
            <div className="rounded-2xl border border-richblack-700 bg-richblack-950 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-richblack-800 bg-richblack-900/90 px-6 py-3">
                <span className="text-xs font-mono text-richblack-400">solution.js</span>
                <button
                  onClick={handleRunChallengeCode}
                  disabled={codeRunning}
                  className="rounded-lg bg-yellow-50 px-4 py-1.5 text-xs font-bold text-richblack-900 transition-all hover:bg-yellow-25 disabled:opacity-50"
                >
                  {codeRunning ? "Running Test Cases..." : "Run Code ▷"}
                </button>
              </div>
              <pre className="p-6 font-mono text-xs sm:text-sm text-yellow-25 overflow-x-auto leading-relaxed">
                {challenges[selectedChallenge].starterCode}
              </pre>
              <div className="border-t border-richblack-800 bg-richblack-900/60 p-4 text-xs font-mono text-richblack-300">
                <p className="text-richblack-400">Test Cases:</p>
                <p className="text-richblack-200 mt-1">{challenges[selectedChallenge].testCases}</p>
                {codeSuccess && (
                  <p className="mt-3 text-caribbeangreen-100 font-semibold flex items-center gap-1.5">
                    <FaCheckCircle /> All Test Cases Passed! Ready to submit.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: CAREER SERVICES & SALARY CALCULATOR
        ========================================================================== */}
        {(path === "/career-paths" || path === "/career-services") && (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="rounded-2xl border border-richblack-700 bg-richblack-800/80 p-8 shadow-xl">
              <div className="flex items-center gap-3 text-yellow-50">
                <FaCalculator className="text-2xl" />
                <h2 className="text-2xl font-bold text-richblack-5">Interactive Career & Salary Estimator</h2>
              </div>
              <p className="text-sm text-richblack-300 mt-2">
                Select a high-demand tech track and your target experience level to view projected market compensation.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-richblack-200">Role / Specialization</label>
                  <select
                    value={careerRole}
                    onChange={(e) => setCareerRole(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-richblack-600 bg-richblack-900 p-3 text-sm text-richblack-5 focus:outline-none focus:border-yellow-50"
                  >
                    <option value="fullstack">Full-Stack Web Architect (MERN / Next.js)</option>
                    <option value="ai">AI / Machine Learning Engineer</option>
                    <option value="devops">Cloud & DevOps Specialist (AWS / K8s)</option>
                    <option value="mobile">Mobile App Developer (React Native / Kotlin)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-richblack-200">
                    <span>Experience Level</span>
                    <span className="text-yellow-50">{yearsExp} {yearsExp === 1 ? "Year" : "Years"}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="1"
                    value={yearsExp}
                    onChange={(e) => setYearsExp(Number(e.target.value))}
                    className="mt-4 w-full accent-yellow-50 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-richblack-400 mt-1">
                    <span>Entry (0y)</span>
                    <span>Mid (3-4y)</span>
                    <span>Senior (8y+)</span>
                  </div>
                </div>
              </div>

              {/* Result Card */}
              <div className="mt-8 rounded-xl border border-yellow-50/20 bg-gradient-to-r from-yellow-50/10 via-richblack-900 to-richblack-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-richblack-400 font-semibold">Estimated Base Compensation</span>
                  <div className="text-3xl font-bold text-yellow-50 mt-1">
                    ${estimatedSalary.toLocaleString()} - ${(estimatedSalary + 25000).toLocaleString()} <span className="text-sm font-normal text-richblack-300">/ year</span>
                  </div>
                  <p className="text-xs text-richblack-400 mt-1">Based on active 2025 global tech hiring benchmarks.</p>
                </div>
                <Link
                  to="/catalog"
                  className="rounded-xl bg-yellow-50 px-6 py-3 text-xs font-bold text-richblack-900 shadow hover:bg-yellow-25 transition-all text-center"
                >
                  Start This Career Roadmap →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: AFFILIATE PROGRAM (With Dynamic Earnings Calculator)
        ========================================================================== */}
        {path === "/affiliates" && (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="rounded-2xl border border-richblack-700 bg-richblack-800 p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-richblack-5">Affiliate Revenue Calculator</h2>
              <p className="text-sm text-richblack-300 mt-1">
                Earn 30% recurring commission on every active learner referred through your custom link.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-richblack-200">
                  <span>Referred Students Per Month:</span>
                  <span className="text-xl font-bold text-yellow-50">{referralsCount}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={referralsCount}
                  onChange={(e) => setReferralsCount(Number(e.target.value))}
                  className="w-full accent-yellow-50 cursor-pointer"
                />
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-richblack-700 bg-richblack-900 p-6 text-center">
                  <p className="text-xs text-richblack-400 uppercase">Estimated Monthly Payout</p>
                  <p className="text-3xl font-bold text-yellow-50 mt-2">${(referralsCount * 36).toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-richblack-700 bg-richblack-900 p-6 text-center">
                  <p className="text-xs text-richblack-400 uppercase">Projected Annual Earnings</p>
                  <p className="text-3xl font-bold text-caribbeangreen-100 mt-2">${(referralsCount * 36 * 12).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-50 px-8 py-3 text-sm font-bold text-richblack-900 shadow hover:bg-yellow-25 transition-all"
                >
                  Join Affiliate Program Today <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 5: DEVELOPER DOCS & CHEATSHEETS
        ========================================================================== */}
        {(path === "/docs" || path === "/chart-sheet" || path === "/cheat-sheet") && (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-richblack-700 pb-4">
              <div className="flex gap-2">
                {["javascript", "python", "react"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    className={`rounded-xl px-5 py-2 text-xs sm:text-sm font-medium transition-all ${
                      (activeTab === "all" ? "javascript" : activeTab) === lang
                        ? "bg-yellow-50 text-richblack-900 font-bold shadow"
                        : "bg-richblack-800 text-richblack-300 hover:bg-richblack-700"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {(cheatSheets[activeTab === "all" ? "javascript" : activeTab] || cheatSheets.javascript).map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-richblack-700 bg-richblack-950 overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between border-b border-richblack-800 bg-richblack-900 px-6 py-3">
                    <span className="text-sm font-semibold text-richblack-5">{item.title}</span>
                    <button
                      onClick={() => handleCopyCode(item.code, idx)}
                      className="flex items-center gap-1.5 text-xs text-richblack-300 hover:text-yellow-50 transition-colors"
                    >
                      <FaCopy /> {copiedKey === idx ? "Copied!" : "Copy Snippet"}
                    </button>
                  </div>
                  <pre className="p-6 font-mono text-xs sm:text-sm text-yellow-25 overflow-x-auto leading-relaxed">
                    {item.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 6: CAREERS AT STUDYNOTION
        ========================================================================== */}
        {path === "/careers" && (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobsList.map((job, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-2xl border border-richblack-700 bg-richblack-800 p-6 shadow-md transition-all hover:border-richblack-600"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-richblack-700 px-2.5 py-0.5 text-xs font-semibold text-yellow-50">
                        {job.dept}
                      </span>
                      <span className="text-xs text-richblack-400">• {job.location}</span>
                    </div>
                    <h3 className="text-lg font-bold text-richblack-5">{job.title}</h3>
                    <p className="text-xs sm:text-sm text-richblack-300 leading-relaxed">{job.description}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-richblack-700/60 pt-4">
                    <span className="text-xs text-richblack-400">Experience: {job.experience}</span>
                    <button
                      onClick={() => {
                        setSelectedJob(job.title)
                        setShowApplyModal(true)
                      }}
                      className="rounded-lg bg-yellow-50 px-4 py-2 text-xs font-bold text-richblack-900 hover:bg-yellow-25 transition-all"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Modal */}
            {showApplyModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                <div className="w-full max-w-md rounded-2xl border border-richblack-700 bg-richblack-800 p-8 shadow-2xl">
                  <h3 className="text-xl font-bold text-richblack-5">Apply for {selectedJob}</h3>
                  <p className="text-xs text-richblack-300 mt-1">Submit your details and we will review your profile within 48h.</p>
                  <form onSubmit={handleApplyJob} className="mt-6 space-y-4">
                    <div>
                      <label className="text-xs text-richblack-300">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="mt-1 w-full rounded-xl border border-richblack-600 bg-richblack-900 p-2.5 text-sm text-richblack-5"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-richblack-300">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="mt-1 w-full rounded-xl border border-richblack-600 bg-richblack-900 p-2.5 text-sm text-richblack-5"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-richblack-300">Portfolio / GitHub / LinkedIn URL</label>
                      <input
                        required
                        type="url"
                        placeholder="https://github.com/yourhandle"
                        className="mt-1 w-full rounded-xl border border-richblack-600 bg-richblack-900 p-2.5 text-sm text-richblack-5"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowApplyModal(false)}
                        className="flex-1 rounded-xl border border-richblack-600 bg-richblack-700 py-2.5 text-xs font-semibold text-richblack-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={appliedSuccess}
                        className="flex-1 rounded-xl bg-yellow-50 py-2.5 text-xs font-bold text-richblack-900 hover:bg-yellow-25"
                      >
                        {appliedSuccess ? "Submitted!" : "Send Application"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            VIEW 7: HELP CENTER & FAQS
        ========================================================================== */}
        {(path === "/help-center" || path === "/faq") && (
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-3.5 text-richblack-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search troubleshooting questions, payments, certificates..."
                className="w-full rounded-2xl border border-richblack-700 bg-richblack-800 py-3.5 pl-12 pr-4 text-sm text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50"
              />
            </div>

            <div className="space-y-4">
              {faqs
                .filter((f) => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((f, idx) => (
                  <div key={idx} className="rounded-2xl border border-richblack-700 bg-richblack-800 p-6">
                    <h3 className="text-base font-semibold text-richblack-5 flex items-center gap-2">
                      <FaQuestionCircle className="text-yellow-50 text-sm" /> {f.q}
                    </h3>
                    <p className="mt-3 text-sm text-richblack-300 leading-relaxed border-t border-richblack-700/60 pt-3">
                      {f.a}
                    </p>
                  </div>
                ))}
            </div>

            <div className="rounded-2xl border border-yellow-50/20 bg-richblack-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-richblack-5">Still have questions?</p>
                <p className="text-xs text-richblack-400 mt-0.5">Our support engineers reply in under 15 minutes.</p>
              </div>
              <Link
                to="/contact"
                className="rounded-xl bg-yellow-50 px-5 py-2.5 text-xs font-bold text-richblack-900 hover:bg-yellow-25"
              >
                Contact Support Directly
              </Link>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 8: DEFAULT / LEGAL POLICIES / GENERAL INFORMATIONAL VIEWS
        ========================================================================== */}
        {!["/interview-prep", "/code-challenges", "/career-paths", "/career-services", "/affiliates", "/docs", "/chart-sheet", "/cheat-sheet", "/careers", "/help-center", "/faq"].includes(path) && (
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-2xl border border-richblack-700 bg-richblack-800/60 p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-richblack-5">1. Overview & Core Mission</h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-richblack-300">
                StudyNotion delivers modern full-stack programming instruction, production-level coding labs, and industry mentorship designed to transition learners into high-impact engineering careers.
              </p>
            </div>

            <div className="rounded-2xl border border-richblack-700 bg-richblack-800/60 p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-richblack-5">2. Standards, Security & Integrity</h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-richblack-300">
                All platform data is protected with enterprise TLS encryption, token authentication, and strict adherence to learner privacy rights. Course credentials undergo automated algorithmic validation.
              </p>
            </div>

            <div className="rounded-2xl border border-richblack-700 bg-richblack-800/60 p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-richblack-5">3. Dedicated Support & Inquiries</h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-richblack-300">
                Have questions or feedback? Our team is available 24/7. Reach out through our contact desk or browse our extensive course catalog to get started immediately.
              </p>
            </div>

            {/* Quick Action Footer Card */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-yellow-50/30 bg-gradient-to-r from-richblack-800 via-richblack-800 to-richblack-700 p-8 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-richblack-5">Ready to Build Something Great?</h3>
                <p className="text-xs text-richblack-300 mt-1">Enroll in hands-on courses or explore our certifications.</p>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/catalog"
                  className="rounded-xl bg-yellow-50 px-5 py-2.5 text-xs font-bold text-richblack-900 shadow hover:bg-yellow-25 transition-all"
                >
                  Browse Catalog →
                </Link>
                <Link
                  to="/contact"
                  className="rounded-xl border border-richblack-600 bg-richblack-800 px-5 py-2.5 text-xs font-medium text-richblack-100 hover:bg-richblack-700 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
