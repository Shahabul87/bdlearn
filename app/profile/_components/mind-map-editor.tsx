"use client";

import { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Save } from "lucide-react";

interface MindMapEditorProps {
  mind: {
    id: string;
    title: string;
    content: any;
  };
  onClose: () => void;
  onSave: (content: any) => void;
}

const initialNodes: Node[] = [
  {
    id: 'root',
    type: 'input',
    data: { label: 'Central Topic' },
    position: { x: 0, y: 0 },
    style: {
      background: 'rgb(147, 51, 234)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
    },
  },
];

export const MindMapEditor = ({ mind, onClose, onSave }: MindMapEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    mind.content.nodes || initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(mind.content.edges || []);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [newNodeText, setNewNodeText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => {
      const edge = {
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#9333ea' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#9333ea',
        },
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setNewNodeText(node.data.label);
  };

  const addChildNode = () => {
    if (!selectedNode) return;

    const newNode: Node = {
      id: `node-${nodes.length + 1}`,
      data: { label: 'New Topic' },
      position: {
        x: selectedNode.position.x + 200,
        y: selectedNode.position.y + (nodes.length * 80 - 160),
      },
      style: {
        background: '#1f2937',
        color: '#e5e7eb',
        border: '1px solid #374151',
        borderRadius: '8px',
        padding: '8px 16px',
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      {
        id: `edge-${edges.length + 1}`,
        source: selectedNode.id,
        target: newNode.id,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#9333ea' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#9333ea',
        },
      },
    ]);
  };

  const updateNodeText = () => {
    if (!selectedNode || !newNodeText.trim()) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: { ...node.data, label: newNodeText },
          };
        }
        return node;
      })
    );
    setNewNodeText('');
    setSelectedNode(null);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await onSave({ nodes, edges });
      onClose();
    } catch (error) {
      console.error('Failed to save mind map:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] h-[90vh] bg-gray-900/95 border-gray-800">
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="border-gray-600 bg-gray-800/50 text-gray-200 hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={isSubmitting}
            className="border-purple-500/50 bg-purple-500/5 text-purple-300 hover:bg-purple-500/10"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="h-full pt-12">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            fitView
            className="bg-gray-900"
          >
            <Background color="#374151" gap={16} />
            <Controls className="bg-gray-800 border-gray-700 fill-gray-400" />
          </ReactFlow>

          {/* Node Editor */}
          {selectedNode && (
            <div className="absolute bottom-4 left-4 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
              <div className="flex gap-2">
                <Input
                  value={newNodeText}
                  onChange={(e) => setNewNodeText(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-gray-200"
                  placeholder="Enter topic text"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={updateNodeText}
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={addChildNode}
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 