
import React, { useState } from 'react';
import { Search, Star, Download, Filter, Bot, Users, Zap, Shield, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { MagicalBackground } from '../ui/MagicalBackground';

export const MarketplacePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', icon: Bot },
    { id: 'customer-support', name: 'Customer Support', icon: Users },
    { id: 'marketing', name: 'Marketing', icon: Zap },
    { id: 'analytics', name: 'Analytics', icon: Shield },
    { id: 'content', name: 'Content Creation', icon: Plus }
  ];

  const agents = [
    {
      id: 'agent-1',
      name: 'Customer Support Pro',
      description: 'Advanced customer support agent with multilingual capabilities',
      category: 'customer-support',
      price: '$49/month',
      rating: 4.8,
      downloads: 1234,
      verified: true,
      developer: 'Genesis Labs',
      avatar: '👩‍💼',
      features: ['24/7 Support', 'Multi-language', 'CRM Integration', 'Analytics'],
      tags: ['Support', 'Customer Service', 'Multilingual']
    },
    {
      id: 'agent-2',
      name: 'Social Media Wizard',
      description: 'Automate your social media presence across all platforms',
      category: 'marketing',
      price: '$39/month',
      rating: 4.6,
      downloads: 892,
      verified: true,
      developer: 'MarketBot Inc.',
      avatar: '🎨',
      features: ['Auto-posting', 'Content Generation', 'Analytics', 'Scheduling'],
      tags: ['Social Media', 'Content', 'Marketing']
    },
    {
      id: 'agent-3',
      name: 'Data Insights Master',
      description: 'Turn your data into actionable business insights',
      category: 'analytics',
      price: '$79/month',
      rating: 4.9,
      downloads: 567,
      verified: true,
      developer: 'Analytics Pro',
      avatar: '📊',
      features: ['Advanced Analytics', 'Real-time Insights', 'Custom Reports', 'Predictions'],
      tags: ['Analytics', 'Data', 'Business Intelligence']
    },
    {
      id: 'agent-4',
      name: 'Content Creator AI',
      description: 'Generate high-quality content for blogs, ads, and more',
      category: 'content',
      price: '$59/month',
      rating: 4.7,
      downloads: 1456,
      verified: true,
      developer: 'Creative AI',
      avatar: '✍️',
      features: ['Blog Writing', 'Ad Copy', 'SEO Optimization', 'Multi-format'],
      tags: ['Content', 'Writing', 'SEO', 'Creative']
    },
    {
      id: 'agent-5',
      name: 'Sales Assistant Pro',
      description: 'Boost your sales with intelligent lead qualification',
      category: 'customer-support',
      price: '$69/month',
      rating: 4.5,
      downloads: 743,
      verified: false,
      developer: 'SalesBot Co.',
      avatar: '💼',
      features: ['Lead Qualification', 'CRM Integration', 'Follow-up Automation', 'Reports'],
      tags: ['Sales', 'CRM', 'Lead Generation']
    },
    {
      id: 'agent-6',
      name: 'Email Marketing Expert',
      description: 'Create and manage email campaigns that convert',
      category: 'marketing',
      price: '$45/month',
      rating: 4.4,
      downloads: 654,
      verified: true,
      developer: 'Email Pro',
      avatar: '📧',
      features: ['Campaign Creation', 'A/B Testing', 'Automation', 'Analytics'],
      tags: ['Email', 'Marketing', 'Automation']
    }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MagicalBackground variant="quantum" intensity="subtle">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Agent Marketplace</h1>
            <p className="text-white/80 text-lg">
              Discover and deploy pre-built AI agents to supercharge your business
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Marketplace Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="backdrop-blur-sm bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">250+</h3>
                <p className="text-white/60">Available Agents</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">180+</h3>
                <p className="text-white/60">Verified Agents</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">15K+</h3>
                <p className="text-white/60">Active Users</p>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">50K+</h3>
                <p className="text-white/60">Downloads</p>
              </CardContent>
            </Card>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-2xl">
                        {agent.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-white/60">{agent.developer}</span>
                          {agent.verified && (
                            <Shield className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{agent.price}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-white/80">{agent.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-white/70 mb-4">{agent.description}</p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white/80 mb-2">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {agent.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-xs text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {agent.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4 text-white/60" />
                        <span className="text-sm text-white/70">{agent.downloads}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="primary" size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                      <Download className="w-4 h-4 mr-2" />
                      Install
                    </Button>
                    <Button variant="outline" size="sm" className="text-white/80 border-white/20 hover:bg-white/10">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No agents found</h3>
              <p className="text-white/60 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-white/80 border-white/20 hover:bg-white/10"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MagicalBackground>
  );
};
