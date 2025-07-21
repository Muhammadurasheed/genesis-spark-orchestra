
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import {
  Calendar,
  Users,
  MessageSquare,
  TrendingUp,
  Activity,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Zap,
  Brain,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';

interface AnalyticsDashboardProps {
  guildId: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ guildId }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'performance' | 'insights'>('overview');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - in Phase 2, this will be replaced with real API calls
  const overviewData = [
    { name: 'Mon', tasks: 24, interactions: 45, success: 22 },
    { name: 'Tue', tasks: 35, interactions: 52, success: 31 },
    { name: 'Wed', tasks: 28, interactions: 38, success: 26 },
    { name: 'Thu', tasks: 42, interactions: 65, success: 38 },
    { name: 'Fri', tasks: 38, interactions: 48, success: 35 },
    { name: 'Sat', tasks: 15, interactions: 22, success: 14 },
    { name: 'Sun', tasks: 18, interactions: 28, success: 16 },
  ];

  const agentPerformanceData = [
    { name: 'Customer Support', efficiency: 92, tasks: 156, rating: 4.8 },
    { name: 'Content Creator', efficiency: 87, tasks: 89, rating: 4.6 },
    { name: 'Data Analyst', efficiency: 94, tasks: 234, rating: 4.9 },
    { name: 'Social Media Manager', efficiency: 89, tasks: 123, rating: 4.7 },
  ];

  const taskDistribution = [
    { name: 'Completed', value: 75, color: '#10b981' },
    { name: 'In Progress', value: 15, color: '#f59e0b' },
    { name: 'Failed', value: 7, color: '#ef4444' },
    { name: 'Cancelled', value: 3, color: '#6b7280' },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    trend?: { value: number; positive: boolean };
    color?: string;
  }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '+' : ''}{trend.value}% from last period
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </Card>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value="1,234"
          icon={Target}
          trend={{ value: 12, positive: true }}
          color="blue"
        />
        <StatCard
          title="Active Agents"
          value="8"
          icon={Users}
          trend={{ value: 0, positive: true }}
          color="green"
        />
        <StatCard
          title="Success Rate"
          value="94.2%"
          icon={CheckCircle}
          trend={{ value: 2.1, positive: true }}
          color="purple"
        />
        <StatCard
          title="Avg Response Time"
          value="1.2s"
          icon={Clock}
          trend={{ value: -8, positive: true }}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Task Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={overviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="tasks" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="interactions" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="efficiency" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Agent Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentPerformanceData.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-gray-600">{agent.tasks} tasks completed</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(agent.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">{agent.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tasks" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="interactions" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="success" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-900">Performance Trend</span>
                </div>
                <p className="text-sm text-blue-800">
                  Your agents are performing 15% better this week. Customer Support agent shows exceptional improvement.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-900">Optimization Opportunity</span>
                </div>
                <p className="text-sm text-yellow-800">
                  Consider adding more automation to reduce manual intervention in Content Creator workflows.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="font-medium text-green-900">Success Metric</span>
                </div>
                <p className="text-sm text-green-800">
                  94.2% success rate achieved - exceeding your target of 90%. Great job!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { agent: 'Customer Support', action: 'Resolved ticket #1234', time: '2 minutes ago', status: 'success' },
                { agent: 'Data Analyst', action: 'Generated weekly report', time: '15 minutes ago', status: 'success' },
                { agent: 'Social Media Manager', action: 'Posted to LinkedIn', time: '1 hour ago', status: 'success' },
                { agent: 'Content Creator', action: 'Draft blog post created', time: '2 hours ago', status: 'warning' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{activity.agent}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      activity.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status === 'success' ? 'Complete' : 'In Progress'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Guild Analytics</h1>
              <p className="text-gray-600">Monitor your digital workforce performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2"
              >
                <Activity className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: TrendingUp },
              { key: 'agents', label: 'Agents', icon: Users },
              { key: 'performance', label: 'Performance', icon: Zap },
              { key: 'insights', label: 'AI Insights', icon: Brain },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === key
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'agents' && renderAgents()}
          {activeTab === 'performance' && renderPerformance()}
          {activeTab === 'insights' && renderInsights()}
        </div>
      </div>
    </div>
  );
};
