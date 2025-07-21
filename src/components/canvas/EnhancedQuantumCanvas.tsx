import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  NodeTypes,
  Panel,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { 
  Bot, 
  Zap, 
  Send, 
  GitBranch, 
  Clock, 
  Play, 
  RotateCcw,
  Settings,
  Maximize2,
  Grid,
  Eye,
  EyeOff,
  Save,
  Download,
  Upload,
  Plus,
  X,
  RefreshCw,
  Layers,
  Cpu,
  Home,
  Webhook,
  Mail,
  Bug,
} from 'lucide-react';

import { NodeConfigPanel } from '../ui/NodeConfig/NodeConfigPanel';
import { NodeData } from '../../types/canvas';
import { useEnhancedCanvasStore } from '../../stores/enhancedCanvasStore';
import { NeuralNetwork } from '../ui/NeuralNetwork';

// Import node components
import AgentNode from './nodes/AgentNode';
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import ConditionNode from './nodes/ConditionNode';
import DelayNode from './nodes/DelayNode';

// Node types configuration
const nodeTypes: NodeTypes = {
  agent: AgentNode,
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
} as any;

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: {
      label: 'Webhook Trigger',
      description: 'Receives incoming webhook requests',
      icon: Webhook,
      color: 'from-orange-400 to-orange-600',
      status: 'ready',
      triggerType: 'webhook',
      webhook: {
        url: 'https://api.example.com/webhook',
        method: 'POST'
      }
    },
  },
  {
    id: '2',
    type: 'agent',
    position: { x: 300, y: 200 },
    data: {
      label: 'Customer Support Agent',
      description: 'Handles customer inquiries',
      icon: Bot,
      color: 'from-blue-400 to-blue-600',
      status: 'ready',
      role: 'Customer Support Specialist',
      tools: ['Email', 'Knowledge Base', 'CRM'],
      personality: 'Professional and helpful'
    },
  },
  {
    id: '3',
    type: 'action',
    position: { x: 500, y: 300 },
    data: {
      label: 'Send Email',
      description: 'Sends automated email response',
      icon: Mail,
      color: 'from-green-400 to-green-600',
      status: 'pending',
      actionType: 'email',
      validation: {
        isValid: true,
        errors: []
      }
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

interface EnhancedQuantumCanvasProps {
  className?: string;
}

export const EnhancedQuantumCanvas: React.FC<EnhancedQuantumCanvasProps> = ({ className = '' }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const {
    canvasMode,
    setCanvasMode,
    selectedNodes,
    setSelectedNodes,
    isExecuting,
    setIsExecuting,
    showGrid,
    setShowGrid,
    showMinimap,
    setShowMinimap,
    showNeuralNetwork,
    setShowNeuralNetwork,
    showParticles,
    setShowParticles,
    particleIntensity,
    setParticleIntensity,
    viewport,
    setViewport,
    centerCanvas,
    zoomToFit,
    addToHistory,
    undo,
    redo,
    autoLayoutEnabled,
    setAutoLayoutEnabled,
    performanceMode,
    setPerformanceMode,
    debugMode,
    setDebugMode,
    currentTheme,
    setTheme,
  } = useEnhancedCanvasStore();

  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showNodePalette, setShowNodePalette] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      const edge = {
        ...params,
        id: `edge-${params.source}-${params.target}-${Date.now()}`,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      setEdges((eds) => addEdge(edge, eds));
      addToHistory(nodes, [...edges, edge] as any);
    },
    [nodes, edges, addToHistory, setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as Node<NodeData>);
    setSelectedNodes([node.id]);
  }, [setSelectedNodes]);

  const onNodeDoubleClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as Node<NodeData>);
  }, []);

  const onSelectionChange = useCallback((params: any) => {
    if (params.nodes.length > 0) {
      setSelectedNodes(params.nodes.map((n: Node) => n.id));
      setSelectedNode(params.nodes[0] as Node<NodeData>);
    } else {
      setSelectedNodes([]);
      setSelectedNode(null);
    }
  }, [setSelectedNodes]);

  const onNodesDelete = useCallback((deletedNodes: Node[]) => {
    console.log('Deleted nodes:', deletedNodes);
    addToHistory(nodes, edges);
  }, [nodes, edges, addToHistory]);

  const onEdgesDelete = useCallback((deletedEdges: Edge[]) => {
    console.log('Deleted edges:', deletedEdges);
    addToHistory(nodes, edges);
  }, [nodes, edges, addToHistory]);

  const handleSave = useCallback(() => {
    const canvasData = {
      nodes,
      edges,
      viewport,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('quantum-canvas-data', JSON.stringify(canvasData));
    console.log('Canvas saved successfully');
  }, [nodes, edges, viewport]);

  const handleLoad = useCallback(() => {
    const savedData = localStorage.getItem('quantum-canvas-data');
    if (savedData) {
      const { nodes: savedNodes, edges: savedEdges, viewport: savedViewport } = JSON.parse(savedData);
      setNodes(savedNodes);
      setEdges(savedEdges);
      setViewport(savedViewport);
      console.log('Canvas loaded successfully');
    }
  }, [setNodes, setEdges, setViewport]);

  const handleExport = useCallback(() => {
    const canvasData = {
      nodes,
      edges,
      viewport,
      metadata: {
        version: '1.0',
        exported: new Date().toISOString(),
        mode: canvasMode,
        theme: currentTheme,
      },
    };
    
    const dataStr = JSON.stringify(canvasData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'quantum-canvas-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [nodes, edges, viewport, canvasMode, currentTheme]);

  const handleUndo = useCallback(() => {
    const previousState = undo();
    if (previousState) {
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
    }
  }, [undo, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    const nextState = redo();
    if (nextState) {
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
    }
  }, [redo, setNodes, setEdges]);

  const handleExecute = useCallback(async () => {
    setIsExecuting(true);
    console.log('Executing workflow...');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsExecuting(false);
    console.log('Workflow execution completed');
  }, [setIsExecuting]);

  const handleNodeConfigUpdate = useCallback((nodeId: string, data: Partial<NodeData>) => {
    setNodes(currentNodes => 
      currentNodes.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, ...data } }
          : node
      )
    );
    addToHistory(nodes, edges);
  }, [setNodes, nodes, edges, addToHistory]);

  const handleNodeConfigDelete = useCallback((nodeId: string) => {
    setNodes(currentNodes => currentNodes.filter(node => node.id !== nodeId));
    setEdges(currentEdges => currentEdges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
    addToHistory(nodes, edges);
  }, [setNodes, setEdges, nodes, edges, addToHistory]);

  const nodePaletteItems = [
    { type: 'agent', label: 'AI Agent', icon: Bot, color: 'from-blue-400 to-blue-600' },
    { type: 'trigger', label: 'Trigger', icon: Zap, color: 'from-orange-400 to-orange-600' },
    { type: 'action', label: 'Action', icon: Send, color: 'from-green-400 to-green-600' },
    { type: 'condition', label: 'Condition', icon: GitBranch, color: 'from-yellow-400 to-yellow-600' },
    { type: 'delay', label: 'Delay', icon: Clock, color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <div className={`relative w-full h-full ${className}`}>
      {showNeuralNetwork && (
        <div className="absolute inset-0 z-0">
          <NeuralNetwork />
        </div>
      )}

      <div ref={canvasRef} className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onSelectionChange={onSelectionChange}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          nodeTypes={nodeTypes}
          className="bg-gradient-to-br from-slate-50 to-blue-50"
          fitView
          fitViewOptions={{
            padding: 0.2,
            includeHiddenNodes: false,
          }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.1}
          maxZoom={4}
          snapToGrid={showGrid}
          snapGrid={[15, 15]}
          onViewportChange={setViewport}
          deleteKeyCode={['Backspace', 'Delete']}
          selectionKeyCode={['Shift']}
          multiSelectionKeyCode={['Ctrl', 'Meta']}
          selectNodesOnDrag={false}
          panOnDrag={!isSelecting}
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick
          preventScrolling
          onSelectionStart={() => setIsSelecting(true)}
          onSelectionEnd={() => setIsSelecting(false)}
        >
          <Background 
            variant={showGrid ? BackgroundVariant.Dots : BackgroundVariant.Lines}
            gap={15}
            size={1}
            color="#e2e8f0"
            style={{ opacity: showGrid ? 0.5 : 0.2 }}
          />
          
          <Controls 
            showZoom={true}
            showFitView={true}
            showInteractive={true}
            position="bottom-right"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
            }}
          />
          
          {showMinimap && (
            <MiniMap
              position="top-right"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}
              nodeStrokeWidth={2}
              nodeColor={(node) => {
                switch (node.type) {
                  case 'agent': return '#3b82f6';
                  case 'trigger': return '#f59e0b';
                  case 'action': return '#10b981';
                  case 'condition': return '#eab308';
                  case 'delay': return '#8b5cf6';
                  default: return '#6b7280';
                }
              }}
            />
          )}

          <Panel position="top-left">
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 border border-gray-200">
              <div className="flex items-center space-x-1">
                {[
                  { mode: 'design', icon: Layers, label: 'Design' },
                  { mode: 'simulate', icon: Play, label: 'Simulate' },
                  { mode: 'deploy', icon: Cpu, label: 'Deploy' },
                  { mode: 'debug', icon: Bug, label: 'Debug' },
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setCanvasMode(mode as any)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded transition-colors ${
                      canvasMode === mode
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    title={label}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>

              <div className="w-px h-6 bg-gray-300" />

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleSave}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Save Canvas"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={handleLoad}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Load Canvas"
                >
                  <Upload className="h-4 w-4" />
                </button>
                <button
                  onClick={handleExport}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Export Canvas"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-300" />

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleUndo}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Undo"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={handleRedo}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Redo"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-300" />

              <div className="flex items-center space-x-1">
                <button
                  onClick={centerCanvas}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Center Canvas"
                >
                  <Home className="h-4 w-4" />
                </button>
                <button
                  onClick={zoomToFit}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Zoom to Fit"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-2 rounded transition-colors ${
                    showGrid 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Toggle Grid"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowMinimap(!showMinimap)}
                  className={`p-2 rounded transition-colors ${
                    showMinimap 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Toggle Minimap"
                >
                  {showMinimap ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </Panel>

          <Panel position="top-right">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setShowNodePalette(!showNodePalette)}
                className="flex items-center justify-center p-3 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                title="Node Palette"
              >
                <Plus className="h-5 w-5" />
              </button>

              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${
                  isExecuting
                    ? 'bg-yellow-500 text-white border-yellow-500 cursor-not-allowed'
                    : 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                }`}
                title={isExecuting ? 'Executing...' : 'Execute Workflow'}
              >
                {isExecuting ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center justify-center p-3 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </Panel>

          <Panel position="bottom-left">
            <div className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  canvasMode === 'design' ? 'bg-blue-500' :
                  canvasMode === 'simulate' ? 'bg-green-500' :
                  canvasMode === 'deploy' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`} />
                <span className="capitalize">{canvasMode}</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div>Nodes: {nodes.length}</div>
              <div>Edges: {edges.length}</div>
              <div>Selected: {selectedNodes.length}</div>
              {isExecuting && (
                <>
                  <div className="w-px h-4 bg-gray-300" />
                  <div className="flex items-center space-x-1">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Executing...</span>
                  </div>
                </>
              )}
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {showNodePalette && (
        <div className="absolute top-16 right-4 w-64 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">Node Palette</h3>
              <button
                onClick={() => setShowNodePalette(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {nodePaletteItems.map((item) => (
                <button
                  key={item.type}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/reactflow', item.type);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color}`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">Drag to canvas</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="absolute top-16 right-4 w-80 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">Canvas Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Visual</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Show Grid</span>
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Show Minimap</span>
                    <input
                      type="checkbox"
                      checked={showMinimap}
                      onChange={(e) => setShowMinimap(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Neural Network</span>
                    <input
                      type="checkbox"
                      checked={showNeuralNetwork}
                      onChange={(e) => setShowNeuralNetwork(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Particles</span>
                    <input
                      type="checkbox"
                      checked={showParticles}
                      onChange={(e) => setShowParticles(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Particle Intensity</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={particleIntensity}
                      onChange={(e) => setParticleIntensity(parseFloat(e.target.value))}
                      className="w-20"
                    />
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Performance</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Auto Layout</span>
                    <input
                      type="checkbox"
                      checked={autoLayoutEnabled}
                      onChange={(e) => setAutoLayoutEnabled(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Debug Mode</span>
                    <input
                      type="checkbox"
                      checked={debugMode}
                      onChange={(e) => setDebugMode(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <div>
                    <label className="text-sm text-gray-700">Performance Mode</label>
                    <select
                      value={performanceMode}
                      onChange={(e) => setPerformanceMode(e.target.value as any)}
                      className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="auto">Auto</option>
                      <option value="high">High</option>
                      <option value="balanced">Balanced</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Theme</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-700">Canvas Theme</label>
                    <select
                      value={currentTheme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="quantum">Quantum</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <NodeConfigPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onUpdate={handleNodeConfigUpdate}
        onDelete={handleNodeConfigDelete}
      />
    </div>
  );
};

export default EnhancedQuantumCanvas;
