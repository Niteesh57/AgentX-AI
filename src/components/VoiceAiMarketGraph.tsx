import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  CheckCircle2,
  DollarSign,
  Clock,
  Sparkles,
  Zap,
  Award,
  ShieldCheck,
  Headphones,
  Stethoscope,
  Landmark,
  ShoppingBag,
  Radio,
  Umbrella,
  Plane,
  Utensils,
  Home,
  Factory,
  Truck,
  GraduationCap,
  UserCheck,
  Activity
} from 'lucide-react';

export interface IndustryData {
  id: string;
  industry: string;
  adoption2023: number;
  adoption2024: number;
  adoption2025: number;
  revenueGrowth: string;
  costSavings: string;
  useCases: string[];
  icon: React.ElementType;
}

export interface MarketGrowthData {
  year: string;
  marketSize: string;
  value: number;
  growth: string;
}

export interface BusinessBenefit {
  metric: string;
  result: string;
  percentage: number;
  description: string;
  icon: React.ElementType;
}

export interface GrowthLeader {
  rank: number;
  industry: string;
  driver: string;
  badge: string;
}

const INDUSTRY_ADOPTION: IndustryData[] = [
  {
    id: 'bpo',
    industry: 'Contact Centers / BPO',
    adoption2023: 20,
    adoption2024: 38,
    adoption2025: 60,
    revenueGrowth: '15–30%',
    costSavings: '30–50%',
    useCases: ['Customer support', 'IVR replacement', 'Sales'],
    icon: Headphones,
  },
  {
    id: 'telecom',
    industry: 'Telecom',
    adoption2023: 18,
    adoption2024: 32,
    adoption2025: 50,
    revenueGrowth: '10–20%',
    costSavings: '30–45%',
    useCases: ['Billing', 'Troubleshooting', 'SIM activation'],
    icon: Radio,
  },
  {
    id: 'banking',
    industry: 'Banking & Finance',
    adoption2023: 15,
    adoption2024: 28,
    adoption2025: 45,
    revenueGrowth: '10–25%',
    costSavings: '25–45%',
    useCases: ['Fraud alerts', 'Collections', 'Customer service'],
    icon: Landmark,
  },
  {
    id: 'retail',
    industry: 'Retail & E-commerce',
    adoption2023: 12,
    adoption2024: 25,
    adoption2025: 42,
    revenueGrowth: '15–35%',
    costSavings: '20–35%',
    useCases: ['Order tracking', 'Product support', 'Returns'],
    icon: ShoppingBag,
  },
  {
    id: 'insurance',
    industry: 'Insurance',
    adoption2023: 10,
    adoption2024: 22,
    adoption2025: 40,
    revenueGrowth: '10–20%',
    costSavings: '25–40%',
    useCases: ['Claims', 'Policy renewal', 'Customer support'],
    icon: Umbrella,
  },
  {
    id: 'travel',
    industry: 'Travel & Hospitality',
    adoption2023: 10,
    adoption2024: 24,
    adoption2025: 40,
    revenueGrowth: '15–30%',
    costSavings: '25–40%',
    useCases: ['Reservations', 'Cancellations', 'Concierge'],
    icon: Plane,
  },
  {
    id: 'food',
    industry: 'Restaurants / Food Service',
    adoption2023: 8,
    adoption2024: 18,
    adoption2025: 38,
    revenueGrowth: '10–25%',
    costSavings: '20–40%',
    useCases: ['Phone ordering', 'Reservations', 'Drive-thru AI'],
    icon: Utensils,
  },
  {
    id: 'healthcare',
    industry: 'Healthcare',
    adoption2023: 8,
    adoption2024: 18,
    adoption2025: 35,
    revenueGrowth: '10–20%',
    costSavings: '20–40%',
    useCases: ['Appointment booking', 'Patient follow-up', 'Clinical docs'],
    icon: Stethoscope,
  },
  {
    id: 'logistics',
    industry: 'Logistics & Supply Chain',
    adoption2023: 7,
    adoption2024: 18,
    adoption2025: 32,
    revenueGrowth: '10–20%',
    costSavings: '20–35%',
    useCases: ['Shipment tracking', 'Dispatch automation'],
    icon: Truck,
  },
  {
    id: 'realestate',
    industry: 'Real Estate',
    adoption2023: 6,
    adoption2024: 15,
    adoption2025: 30,
    revenueGrowth: '15–35%',
    costSavings: '20–40%',
    useCases: ['Lead qualification', 'Appointment scheduling'],
    icon: Home,
  },
  {
    id: 'hr',
    industry: 'Human Resources',
    adoption2023: 6,
    adoption2024: 16,
    adoption2025: 30,
    revenueGrowth: '10–20%',
    costSavings: '20–35%',
    useCases: ['Candidate screening', 'Interview scheduling'],
    icon: UserCheck,
  },
  {
    id: 'education',
    industry: 'Education',
    adoption2023: 5,
    adoption2024: 12,
    adoption2025: 25,
    revenueGrowth: '10–20%',
    costSavings: '15–30%',
    useCases: ['Student support', 'Admissions'],
    icon: GraduationCap,
  },
  {
    id: 'manufacturing',
    industry: 'Manufacturing',
    adoption2023: 5,
    adoption2024: 12,
    adoption2025: 22,
    revenueGrowth: '8–15%',
    costSavings: '15–30%',
    useCases: ['Maintenance support', 'Factory help desk'],
    icon: Factory,
  },
  {
    id: 'government',
    industry: 'Government',
    adoption2023: 4,
    adoption2024: 10,
    adoption2025: 20,
    revenueGrowth: 'Service-focused',
    costSavings: '15–30%',
    useCases: ['Citizen services', 'Helplines'],
    icon: Landmark,
  },
];

const MARKET_GROWTH: MarketGrowthData[] = [
  { year: '2023', marketSize: '~$1.8B', value: 1.8, growth: 'Baseline' },
  { year: '2024', marketSize: '~$2.4B', value: 2.4, growth: '+33% YoY' },
  { year: '2025', marketSize: '~$3.2B', value: 3.2, growth: '+33% YoY' },
];

const BUSINESS_BENEFITS: BusinessBenefit[] = [
  {
    metric: 'Call handling cost reduction',
    result: '30–50%',
    percentage: 50,
    description: 'Drastic reduction in per-call operational costs',
    icon: DollarSign,
  },
  {
    metric: 'Customer wait time reduction',
    result: '40–70%',
    percentage: 70,
    description: 'Zero hold queues with instant call processing',
    icon: Clock,
  },
  {
    metric: '24/7 availability',
    result: '100%',
    percentage: 100,
    description: 'Round-the-clock service across all timezones',
    icon: Zap,
  },
  {
    metric: 'Lead conversion improvement',
    result: '15–35%',
    percentage: 35,
    description: 'Higher conversion via instant callback & triage',
    icon: TrendingUp,
  },
  {
    metric: 'Customer satisfaction increase',
    result: '10–20%',
    percentage: 20,
    description: 'Elevated CSAT with human-like AI responses',
    icon: CheckCircle2,
  },
  {
    metric: 'Human agent workload reduction',
    result: '40–60%',
    percentage: 60,
    description: 'Frees agents for high-value complex escalations',
    icon: ShieldCheck,
  },
  {
    metric: 'ROI payback period',
    result: '6–12 months',
    percentage: 85,
    description: 'Rapid payback across enterprise deployments',
    icon: Award,
  },
];

const FASTEST_GROWING: GrowthLeader[] = [
  { rank: 1, industry: 'Contact Centers', driver: 'Human-like AI agents replacing IVR', badge: '#1 Adoption Leader' },
  { rank: 2, industry: 'Healthcare', driver: 'Patient scheduling and documentation', badge: 'High Growth' },
  { rank: 3, industry: 'Banking', driver: 'Customer service and collections', badge: 'Security Focus' },
  { rank: 4, industry: 'Retail', driver: 'Shopping support and order management', badge: 'High Volume' },
  { rank: 5, industry: 'Telecom', driver: 'High call volumes and support automation', badge: 'Scale Driver' },
  { rank: 6, industry: 'Insurance', driver: 'Claims automation', badge: 'Fast Payback' },
  { rank: 7, industry: 'Hospitality', driver: 'Reservation automation', badge: '24/7 Global' },
  { rank: 8, industry: 'Restaurants', driver: 'AI phone ordering', badge: 'Drive-Thru AI' },
  { rank: 9, industry: 'Logistics', driver: 'Shipment support', badge: 'Dispatch Auto' },
  { rank: 10, industry: 'HR', driver: 'AI recruiting assistants', badge: 'Talent Screening' },
];

export const VoiceAiMarketGraph: React.FC = () => {
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);

  return (
    <section id="reports" className="bg-white text-slate-900 py-20 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              Industry Analytics & Adoption Benchmark
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Voice AI Industry Adoption (2023 – 2025)
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-2xl leading-relaxed">
              Comparative analysis of Voice AI adoption rates across 14 enterprise sectors, global revenue growth drivers, and economic cost reduction benefits.
            </p>
          </div>

          {/* Legend Badges */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
              <span className="text-xs font-semibold text-slate-700">2023 Adoption</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
              <span className="text-xs font-semibold text-slate-700">2024 Adoption</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block text-white" />
              <span className="text-xs font-bold text-emerald-700">2025 Adoption</span>
            </div>
          </div>
        </div>

        {/* Global Market Size Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Global Market Growth */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50/50 border border-amber-200/80 rounded-2xl p-6 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase text-orange-700 tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-orange-600" />
                Global Market Expansion
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
                +33% YoY
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              $3.2 Billion <span className="text-xs font-medium text-slate-500">(2025 Est.)</span>
            </div>
            
            {/* Clean Bar Visualization for Market Growth */}
            <div className="mt-6 space-y-2.5">
              {MARKET_GROWTH.map((mg) => (
                <div key={mg.year} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Year {mg.year}</span>
                    <span className="font-bold text-slate-900">{mg.marketSize}</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-amber-200/60 p-0.5">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-amber-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(mg.value / 3.2) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Cost Reduction Impact */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Business Impact</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">30% – 50%</h3>
              <p className="text-xs font-medium text-emerald-600 mt-0.5">Call Handling Cost Reduction</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Substantial reduction in per-interaction costs by automating routine call routing and repetitive phone inquiries.
              </p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mt-4 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[45%]" />
            </div>
          </div>

          {/* Card 3: Wait Time & CSAT */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Operational Speed</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">40% – 70%</h3>
              <p className="text-xs font-medium text-orange-600 mt-0.5">Wait Time Reduction</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Zero hold queues with 100% 24/7 immediate response times, significantly driving up customer satisfaction.
              </p>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mt-4 overflow-hidden">
              <div className="bg-orange-600 h-full rounded-full w-[65%]" />
            </div>
          </div>
        </div>

        {/* MAIN BAR GRAPH SECTION: 14 Industry Adoption Rates */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                Industry Adoption Rate Comparison (2023 vs 2024 vs 2025)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bar graph displaying Voice AI penetration growth (%) across 14 major industries.
              </p>
            </div>
          </div>

          {/* Clean Bar Charts Stack */}
          <div className="space-y-4">
            {INDUSTRY_ADOPTION.map((item) => {
              const isHovered = hoveredIndustry === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIndustry(item.id)}
                  onMouseLeave={() => setHoveredIndustry(null)}
                  className={`bg-white border rounded-2xl p-4 sm:p-5 transition-all ${
                    isHovered
                      ? 'border-orange-400 shadow-md bg-orange-50/20'
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-3">
                    {/* Industry Title & Badges */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-amber-200/60">
                        {React.createElement(item.icon, { className: "w-5 h-5" })}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base text-slate-900">{item.industry}</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {item.useCases.map((uc, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium"
                            >
                              {uc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats & Growth Callouts */}
                    <div className="flex items-center gap-4 text-xs font-semibold shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-extrabold text-slate-400 block">Revenue Impact</span>
                        <span className="text-emerald-600 font-bold font-mono">{item.revenueGrowth}</span>
                      </div>
                      <div className="h-7 w-[1px] bg-slate-200" />
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-extrabold text-slate-400 block">Cost Savings</span>
                        <span className="text-orange-600 font-bold font-mono">{item.costSavings}</span>
                      </div>
                      <div className="h-7 w-[1px] bg-slate-200" />
                      <div className="text-right min-w-[70px]">
                        <span className="text-[10px] uppercase font-extrabold text-slate-400 block">2025 Adoption</span>
                        <span className="text-lg font-black text-emerald-600 font-mono">{item.adoption2025}%</span>
                      </div>
                    </div>
                  </div>

                  {/* VISUAL BAR GRAPH (Grouped 3-Year Progress Bars) */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {/* 2025 Bar */}
                    <div className="flex items-center gap-3">
                      <span className="w-12 text-[11px] font-bold text-emerald-700 font-mono">2025</span>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${item.adoption2025}%` }}
                        />
                      </div>
                      <span className="w-9 text-right text-xs font-bold text-emerald-600 font-mono">{item.adoption2025}%</span>
                    </div>

                    {/* 2024 Bar */}
                    <div className="flex items-center gap-3">
                      <span className="w-12 text-[11px] font-semibold text-orange-600 font-mono">2024</span>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5">
                        <div
                          className="bg-orange-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${item.adoption2024}%` }}
                        />
                      </div>
                      <span className="w-9 text-right text-xs font-semibold text-orange-600 font-mono">{item.adoption2024}%</span>
                    </div>

                    {/* 2023 Bar */}
                    <div className="flex items-center gap-3">
                      <span className="w-12 text-[11px] font-medium text-slate-400 font-mono">2023</span>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden p-0.5">
                        <div
                          className="bg-slate-300 h-full rounded-full transition-all duration-700"
                          style={{ width: `${item.adoption2023}%` }}
                        />
                      </div>
                      <span className="w-9 text-right text-xs font-medium text-slate-400 font-mono">{item.adoption2023}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM DUAL GRID: Business Benefits & Top 10 Growth Leaders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Business Benefits Grid */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              Quantified Business Benefits & ROI
            </h3>
            <p className="text-xs text-slate-500 mb-6">Empirical efficiency gains reported across enterprise Voice AI deployments.</p>

            <div className="space-y-4">
              {BUSINESS_BENEFITS.map((b, i) => (
                <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900">{b.metric}</span>
                    <span className="text-base font-black text-emerald-600 font-mono">{b.result}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{b.description}</p>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-emerald-500 h-full rounded-full"
                      style={{ width: `${b.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 10 Growth Leaders */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Fastest-Growing Industries (2023–2025)
            </h3>
            <p className="text-xs text-slate-500 mb-6">Top 10 industries ranked by adoption speed & AI automation adoption drivers.</p>

            <div className="space-y-3">
              {FASTEST_GROWING.map((fg) => (
                <div
                  key={fg.rank}
                  className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-sm hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                        fg.rank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : fg.rank === 2
                          ? 'bg-slate-300 text-slate-950 font-bold'
                          : fg.rank === 3
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 font-semibold'
                      }`}
                    >
                      #{fg.rank}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{fg.industry}</h4>
                      <p className="text-xs text-slate-500">{fg.driver}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-bold shrink-0">
                    {fg.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VoiceAiMarketGraph;
