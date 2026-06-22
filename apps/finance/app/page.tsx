import { Card, CardContent, CardHeader, CardTitle } from '@frameitup/ui';

const kpis = [
  { label: 'Total Revenue', value: '$0', delta: '+0%', positive: true },
  { label: 'Gross Profit', value: '$0', delta: '+0%', positive: true },
  { label: 'Profit Margin', value: '0%', delta: '+0pp', positive: true },
  { label: 'MRR', value: '$0', delta: '+0%', positive: true },
  { label: 'Active Orders', value: '0', delta: '0 pending', positive: true },
  { label: 'Artist Payouts', value: '$0', delta: 'this month', positive: false },
];

export default function FinanceDashboard() {
  return (
    <main className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Finance Dashboard</h1>
        <p className="text-gray-400">Real-time profitability overview — FrameItUp</p>
      </div>

      {/* KPI Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-gray-800 bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-gray-400">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
              <p className={`text-xs ${kpi.positive ? 'text-green-400' : 'text-gray-500'}`}>
                {kpi.delta}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-white">Revenue by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-center justify-center text-gray-600">
              Chart renders here (Recharts)
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-white">Monthly Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-center justify-center text-gray-600">
              Chart renders here (Recharts)
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
