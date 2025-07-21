import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  MarkerType,
  BackgroundVariant,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '../ui/Button';
import { Play, Save, Undo, Redo, Trash2, Settings, Eye, Copy, Download, Upload, RefreshCw, Zap } from 'lucide-react';
import { NodeConfigPanel } from '../ui/NodeConfig/NodeConfigPanel';
import { useCanvasControls } from '../../hooks/useCanvasControls';
import { CanvasEdge } from '../../types/canvas';

// Import our custom nodes with default imports
import AgentNode from './nodes/AgentNode';
import ActionNode from './nodes/ActionNode';
import TriggerNode from './nodes/TriggerNode';
import ConditionNode from './nodes/ConditionNode';
import DelayNode from './nodes/DelayNode';

// Define node types
const nodeTypes = {
  agent: AgentNode,
  action: ActionNode,
  trigger: TriggerNode,
  condition: ConditionNode,
  delay: DelayNode,
} as any;

// Helper function to convert Edge[] to CanvasEdge[]
const convertToCanvasEdges = (edges: Edge[]): CanvasEdge[] => {
  return edges.map(edge => ({
    id: edge.id,
    type: edge.type || 'default',
    animated: edge.animated || false,
    markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed },
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle || null,
    targetHandle: edge.targetHandle || null,
  }));
};

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: 'trigger-1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { label: 'New Message', triggerType: 'message' },
  },
  {
    id: 'agent-1',
    type: 'agent',
    position: { x: 300, y: 100 },
    data: { label: 'Customer Support Agent', agentType: 'support' },
  },
  {
    id: 'action-1',
    type: 'action',
    position: { x: 500, y: 100 },
    data: { label: 'Send Response', actionType: 'response' },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'trigger-1',
    target: 'agent-1',
    type: 'default',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e2-3',
    source: 'agent-1',
    target: 'action-1',
    type: 'default',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

export const EnhancedQuantumCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed] = useState(1);
  const [autoSave] = useState(true);
  const [nodeCounter, setNodeCounter] = useState(4);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [showExecutionPanel, setShowExecutionPanel] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  const { fitView } = useReactFlow();

  // Canvas controls hook
  const {
    selectedNode,
    isNodeConfigOpen,
    openNodeConfig,
    closeNodeConfig,
    updateNodeData,
    deleteNode,
    canUndo,
    canRedo,
    addToHistory,
    undo,
    redo,
  } = useCanvasControls();

  // Add initial state to history
  useEffect(() => {
    addToHistory(initialNodes, convertToCanvasEdges(initialEdges));
  }, [addToHistory]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave) {
      const autoSaveInterval = setInterval(() => {
        handleSave();
      }, 30000); // Auto-save every 30 seconds

      return () => clearInterval(autoSaveInterval);
    }
  }, [autoSave, nodes, edges]);

  // Handle node selection
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    openNodeConfig(node.id);
  }, [openNodeConfig]);

  // Handle connection creation
  const onConnect = useCallback(
    (params: Connection) => {
      const edge = {
        ...params,
        id: `e${params.source}-${params.target}`,
        type: 'default',
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
      };
      const newEdges = addEdge(edge, edges);
      setEdges(newEdges);
      addToHistory(nodes, convertToCanvasEdges(newEdges));
    },
    [nodes, edges, addToHistory, setEdges]
  );

  // Handle selection changes
  const onSelectionChange = useCallback((params: { nodes: Node[]; edges: Edge[] }) => {
    if (params.nodes.length === 1) {
      openNodeConfig(params.nodes[0].id);
    } else if (params.nodes.length === 0) {
      closeNodeConfig();
    }
  }, [openNodeConfig, closeNodeConfig]);

  const onNodesDelete = useCallback(() => {
    console.log('Deleted nodes');
    addToHistory(nodes, convertToCanvasEdges(edges));
  }, [nodes, edges, addToHistory]);

  const onEdgesDelete = useCallback(() => {
    console.log('Deleted edges');
    addToHistory(nodes, convertToCanvasEdges(edges));
  }, [nodes, edges, addToHistory]);

  const handleSave = useCallback(() => {
    // Save workflow logic here
    console.log('Saving workflow...', { nodes, edges });
    setLastSaved(new Date());
    
    // Add to history
    addToHistory(nodes, convertToCanvasEdges(edges));
  }, [nodes, edges, addToHistory]);

  const handleExport = useCallback(() => {
    const workflow = {
      nodes,
      edges,
      name: workflowName,
      createdAt: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${workflowName.replace(/\s+/g, '_')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [nodes, edges, workflowName]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const workflow = JSON.parse(e.target?.result as string);
            setNodes(workflow.nodes || []);
            setEdges(workflow.edges || []);
            setWorkflowName(workflow.name || 'Imported Workflow');
            addToHistory(workflow.nodes || [], convertToCanvasEdges(workflow.edges || []));
          } catch (error) {
            console.error('Error importing workflow:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [setNodes, setEdges, addToHistory]);

  const nodePaletteItems = [
    { type: 'trigger', label: 'Trigger', icon: Zap, color: 'bg-yellow-500' },
    { type: 'agent', label: 'Agent', icon: Settings, color: 'bg-blue-500' },
    { type: 'action', label: 'Action', icon: Play, color: 'bg-green-500' },
    { type: 'condition', label: 'Condition', icon: Eye, color: 'bg-purple-500' },
    { type: 'delay', label: 'Delay', icon: RefreshCw, color: 'bg-orange-500' },
  ];

  const handleAddNode = useCallback((nodeType: string) => {
    const newNode: Node = {
      id: `${nodeType}-${nodeCounter}`,
      type: nodeType,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: { 
        label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} ${nodeCounter}`,
        [`${nodeType}Type`]: 'default'
      },
    };
    
    setNodes(currentNodes => [...currentNodes, newNode]);
    setNodeCounter(prev => prev + 1);
    addToHistory([...nodes, newNode], convertToCanvasEdges(edges));
  }, [nodeCounter, nodes, edges, addToHistory, setNodes]);

  const handleClearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
    closeNodeConfig();
    setNodeCounter(1);
  }, [setNodes, setEdges, closeNodeConfig]);

  const handleFitView = useCallback(() => {
    fitView({ padding: 0.1 });
  }, [fitView]);

  const handleDuplicateNode = useCallback(() => {
    if (selectedNode) {
      const newNode: Node = {
        ...selectedNode,
        id: `${selectedNode.type}-${nodeCounter}`,
        position: {
          x: selectedNode.position.x + 50,
          y: selectedNode.position.y + 50,
        },
        data: {
          ...selectedNode.data,
          label: `${selectedNode.data.label} (Copy)`,
        },
      };
      
      setNodes(currentNodes => [...currentNodes, newNode]);
      setNodeCounter(prev => prev + 1);
      addToHistory([...nodes, newNode], convertToCanvasEdges(edges));
    }
  }, [selectedNode, nodeCounter, nodes, edges, addToHistory, setNodes]);

  const handleSimulation = useCallback(async () => {
    setIsSimulating(true);
    setShowExecutionPanel(true);
    setExecutionLogs([]);
    
    // Simulate workflow execution
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      setExecutionLogs(prev => [...prev, `Executing ${node.data.label}...`]);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000 / simulationSpeed));
      
      setExecutionLogs(prev => [...prev, `✓ ${node.data.label} completed`]);
    }
    
    setIsSimulating(false);
  }, [nodes, simulationSpeed]);

  const handleUndo = useCallback(() => {
    const result = undo();
    if (result) {
      setNodes(result.nodes);
      setEdges(result.edges);
    }
  }, [undo, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    const result = redo();
    if (result) {
      setNodes(result.nodes);
      setEdges(result.edges);
    }
  }, [redo, setNodes, setEdges]);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0"
          />
          {lastSaved && (
            <span className="text-sm text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={!canUndo}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRedo}
            disabled={!canRedo}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleImport}
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSimulation}
            disabled={isSimulating}
          >
            <Play className="h-4 w-4" />
            {isSimulating ? 'Running...' : 'Simulate'}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Node Palette */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <h3 className="font-semibold mb-4">Node Palette</h3>
          <div className="space-y-2">
            {nodePaletteItems.map((item) => (
              <button
                key={item.type}
                onClick={() => handleAddNode(item.type)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-2">Canvas Controls</h4>
            <div className="space-y-2">
              <button
                onClick={handleFitView}
                className="w-full flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
              >
                <Eye className="h-4 w-4" />
                <span className="text-sm">Fit View</span>
              </button>
              <button
                onClick={handleDuplicateNode}
                disabled={!selectedNode}
                className="w-full flex items-center space-x-2 p-2 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <Copy className="h-4 w-4" />
                <span className="text-sm">Duplicate</span>
              </button>
              <button
                onClick={handleClearCanvas}
                className="w-full flex items-center space-x-2 p-2 rounded hover:bg-gray-50 text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                <span className="text-sm">Clear Canvas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onSelectionChange={onSelectionChange}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            className="bg-gray-50"
          >
            <Controls />
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1} 
              color="#e5e7eb"
            />
          </ReactFlow>
        </div>

        {/* Configuration Panel */}
        {isNodeConfigOpen && selectedNode && (
          <div className="w-80 bg-white border-l border-gray-200">
            <NodeConfigPanel
              node={selectedNode as any}
              onUpdate={updateNodeData}
              onDelete={deleteNode}
              onClose={closeNodeConfig}
            />
          </div>
        )}
      </div>

      {/* Execution Panel */}
      {showExecutionPanel && (
        <div className="h-48 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Execution Logs</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExecutionPanel(false)}
            >
              Hide
            </Button>
          </div>
          <div className="h-32 overflow-y-auto bg-gray-50 rounded p-2 text-sm font-mono">
            {executionLogs.map((log, index) => (
              <div key={index} className="text-gray-700">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
