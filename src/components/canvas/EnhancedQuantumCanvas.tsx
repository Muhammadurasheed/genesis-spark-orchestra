
import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Save, 
  Upload, 
  Download,
  Grid,
  Undo,
  Redo
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { toast } from 'react-hot-toast';
import { useCanvasStore } from '../../stores/canvasStore';
import { canvasService } from '../../services/canvasService';
import { NodeData, CanvasEdge } from '../../types/canvas';
import AgentNode from './nodes/AgentNode';
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import ConditionNode from './nodes/ConditionNode';
import DelayNode from './nodes/DelayNode';

const nodeTypes = {
  agent: AgentNode,
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
};

// Convert Edge[] to CanvasEdge[]
const convertToCanvasEdges = (edges: Edge[]): CanvasEdge[] => {
  return edges.map(edge => ({
    ...edge,
    type: edge.type || 'default',
    animated: edge.animated || false,
    markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed },
    sourceHandle: edge.sourceHandle || null,
    targetHandle: edge.targetHandle || null,
  }));
};

interface EnhancedQuantumCanvasProps {
  workflowId?: string;
  initialNodes?: Node<NodeData>[];
  initialEdges?: CanvasEdge[];
  onSave?: (nodes: Node<NodeData>[], edges: CanvasEdge[]) => void;
  onExecute?: (nodes: Node<NodeData>[], edges: CanvasEdge[]) => void;
  readOnly?: boolean;
  showControls?: boolean;
}

export const EnhancedQuantumCanvas: React.FC<EnhancedQuantumCanvasProps> = ({
  workflowId,
  initialNodes = [],
  initialEdges = [],
  onSave,
  onExecute,
  readOnly = false,
  showControls = true,
}) => {
  const {
    setCanvasMode,
    isExecuting,
    setIsExecuting,
    viewport,
    setViewport,
    addToHistory,
    undo,
    redo,
    executionMetrics,
    updateExecutionMetrics,
  } = useCanvasStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [interactionMode] = useState<'select' | 'pan'>('select');
  const [autoSave] = useState(true);
  const [executionHistory, setExecutionHistory] = useState<any[]>([]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && nodes.length > 0) {
      const timeoutId = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [nodes, edges, autoSave]);

  // Update execution metrics
  useEffect(() => {
    updateExecutionMetrics({
      totalNodes: nodes.length,
      completedNodes: nodes.filter(node => node.data.status === 'completed').length,
      failedNodes: nodes.filter(node => node.data.status === 'error').length,
    });
  }, [nodes, updateExecutionMetrics]);

  const onConnect = useCallback((params: Connection) => {
    const newEdges = addEdge(params, edges);
    const canvasEdges = convertToCanvasEdges(newEdges);
    setEdges(canvasEdges);
    addToHistory(nodes, canvasEdges);
  }, [edges, nodes, setEdges, addToHistory]);

  const handleExecute = async () => {
    if (isExecuting || nodes.length === 0) return;

    try {
      setIsExecuting(true);
      setCanvasMode('simulate');
      
      // Reset node statuses
      const resetNodes = nodes.map(node => ({
        ...node,
        data: { ...node.data, status: 'ready' }
      }));
      setNodes(resetNodes);

      const canvasEdges = convertToCanvasEdges(edges);
      
      if (onExecute) {
        await onExecute(resetNodes, canvasEdges);
      } else {
        const result = await canvasService.executeWorkflow(
          workflowId || 'default',
          resetNodes,
          canvasEdges
        );
        
        toast.success('Workflow execution started');
        console.log('Execution result:', result);
        
        // Add to execution history
        setExecutionHistory(prev => [...prev, {
          id: result.executionId,
          timestamp: new Date(),
          status: 'running',
          nodes: resetNodes.length,
          edges: canvasEdges.length,
        }]);
      }
      
      updateExecutionMetrics({
        lastExecutionTime: new Date(),
      });
      
    } catch (error) {
      console.error('Execution failed:', error);
      toast.error('Failed to execute workflow');
    } finally {
      setIsExecuting(false);
      setCanvasMode('design');
    }
  };

  const handleSave = async () => {
    try {
      const canvasEdges = convertToCanvasEdges(edges);
      
      if (onSave) {
        await onSave(nodes, canvasEdges);
      } else {
        // Default save logic
        const workflowData = {
          id: workflowId || 'default',
          nodes,
          edges: canvasEdges,
          lastModified: new Date(),
        };
        
        localStorage.setItem(`workflow-${workflowId}`, JSON.stringify(workflowData));
        toast.success('Workflow saved successfully');
      }
      
      addToHistory(nodes, canvasEdges);
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save workflow');
    }
  };

  const handleUndo = () => {
    const historyState = undo();
    if (historyState) {
      setNodes(historyState.nodes);
      setEdges(historyState.edges);
      toast.success('Undone');
    }
  };

  const handleRedo = () => {
    const historyState = redo();
    if (historyState) {
      setNodes(historyState.nodes);
      setEdges(historyState.edges);
      toast.success('Redone');
    }
  };

  const handleReset = () => {
    setNodes([]);
    setEdges([]);
    setExecutionHistory([]);
    updateExecutionMetrics({
      totalNodes: 0,
      completedNodes: 0,
      failedNodes: 0,
    });
    toast.success('Canvas reset');
  };

  const handleExport = () => {
    const canvasEdges = convertToCanvasEdges(edges);
    const exportData = {
      nodes,
      edges: canvasEdges,
      metadata: {
        workflowId,
        exportDate: new Date(),
        version: '1.0',
      },
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-${workflowId || 'export'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Workflow exported');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importData = JSON.parse(e.target?.result as string);
            if (importData.nodes && importData.edges) {
              setNodes(importData.nodes);
              setEdges(importData.edges);
              toast.success('Workflow imported successfully');
            }
          } catch (error) {
            toast.error('Failed to import workflow');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="h-full w-full relative bg-gray-50 dark:bg-gray-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        defaultViewport={viewport}
        onViewportChange={setViewport}
        panOnScroll={interactionMode === 'pan'}
        selectionOnDrag={interactionMode === 'select'}
        className="transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Controls 
          showZoom={true}
          showFitView={true}
          showInteractive={true}
          position="bottom-right"
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
        />
        
        {isGridVisible && (
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1}
            className="opacity-50"
          />
        )}

        {showControls && (
          <Panel position="top-left" className="flex flex-col gap-2">
            <Card className="p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Workflow Controls</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  onClick={handleExecute}
                  disabled={isExecuting || nodes.length === 0}
                  className="flex items-center gap-1"
                >
                  {isExecuting ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  {isExecuting ? 'Running...' : 'Execute'}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSave}
                  disabled={readOnly}
                  className="flex items-center gap-1"
                >
                  <Save className="h-3 w-3" />
                  Save
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleUndo}
                  disabled={readOnly}
                  className="flex items-center gap-1"
                >
                  <Undo className="h-3 w-3" />
                  Undo
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRedo}
                  disabled={readOnly}
                  className="flex items-center gap-1"
                >
                  <Redo className="h-3 w-3" />
                  Redo
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  disabled={readOnly}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleExport}
                  className="flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  Export
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleImport}
                  disabled={readOnly}
                  className="flex items-center gap-1"
                >
                  <Upload className="h-3 w-3" />
                  Import
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsGridVisible(!isGridVisible)}
                  className="flex items-center gap-1"
                >
                  <Grid className="h-3 w-3" />
                  Grid
                </Button>
              </div>
            </Card>
          </Panel>
        )}

        {executionMetrics && (
          <Panel position="top-right" className="flex flex-col gap-2">
            <Card className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Nodes:</span>
                  <span>{executionMetrics.totalNodes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span className="text-green-600">{executionMetrics.completedNodes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Failed:</span>
                  <span className="text-red-600">{executionMetrics.failedNodes}</span>
                </div>
              </div>
            </Card>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};
