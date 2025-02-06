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
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] h-[95vh] sm:h-[90vh] p-3 sm:p-6 bg-gray-900/95 border-gray-800">
        {/* Header Controls */}
        <div className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10 flex items-center gap-1 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-gray-600 bg-gray-800/50 text-gray-200 hover:bg-gray-700"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={isSubmitting}
            className="h-8 sm:h-9 border-purple-500/50 bg-purple-500/5 text-purple-300 hover:bg-purple-500/10 text-xs sm:text-sm"
          >
            <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Save Changes</span>
            <span className="xs:hidden">Save</span>
          </Button>
        </div>

        <div className="h-full pt-10 sm:pt-12">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            fitView
            className="bg-gray-900"
            minZoom={0.2}
            maxZoom={4}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
            zoomOnScroll={false}
            zoomOnPinch={true}
            panOnScroll={true}
            panOnDrag={[1, 2]} // Enable panning with one or two fingers
          >
            <Background color="#374151" gap={16} />
            <Controls 
              className="bg-gray-800 border-gray-700 fill-gray-400 !bottom-20 sm:!bottom-4 !right-2"
              showInteractive={false}
              position="bottom-right"
            />
          </ReactFlow>

          {/* Node Editor - Mobile Optimized */}
          {selectedNode && (
            <div className="absolute bottom-4 left-0 right-0 mx-2 sm:mx-4 p-3 sm:p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
              <div className="flex flex-col xs:flex-row gap-2">
                <Input
                  value={newNodeText}
                  onChange={(e) => setNewNodeText(e.target.value)}
                  className="flex-1 h-8 sm:h-9 bg-gray-900 border-gray-700 text-gray-200 text-sm"
                  placeholder="Enter topic text"
                />
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={updateNodeText}
                    className="flex-1 xs:flex-none h-8 sm:h-9 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 text-xs sm:text-sm"
                  >
                    <Save className="w-3 h-3 sm:w-4 sm:h-4 xs:mr-1.5" />
                    <span className="xs:hidden">Save</span>
                    <span className="hidden xs:inline">Update</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addChildNode}
                    className="flex-1 xs:flex-none h-8 sm:h-9 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 text-xs sm:text-sm"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 xs:mr-1.5" />
                    <span className="xs:hidden">Add</span>
                    <span className="hidden xs:inline">Add Child</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 