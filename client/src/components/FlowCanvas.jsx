import { useCallback, useMemo } from 'react'
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import InputNode from './nodes/InputNode'
import ResultNode from './nodes/ResultNode'

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
}

const initialEdges = [
  {
    id: 'e1-2',
    source: 'node-input',
    target: 'node-result',
    sourceHandle: 'output',
    targetHandle: 'input',
    type: 'smoothstep',
    style: { stroke: '#c4c4bc', strokeWidth: 1.5 },
  },
]

const FlowCanvas = ({ prompt, setPrompt, response, isLoading, error, isSaved }) => {
  const initialNodes = useMemo(() => [
    {
      id: 'node-input',
      type: 'inputNode',
      position: { x: 80, y: 160 },
      data: { prompt, setPrompt, isLoading },
      draggable: true,
    },
    {
      id: 'node-result',
      type: 'resultNode',
      position: { x: 500, y: 130 },
      data: { response, isLoading, error, isSaved },
      draggable: true,
    },
  ], [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const updatedNodes = useMemo(() =>
    nodes.map((node) => {
      if (node.id === 'node-input') return { ...node, data: { ...node.data, prompt, setPrompt, isLoading } }
      if (node.id === 'node-result') return { ...node, data: { ...node.data, response, isLoading, error, isSaved } }
      return node
    }),
    [nodes, prompt, setPrompt, response, isLoading, error, isSaved]
  )

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', style: { stroke: '#c4c4bc', strokeWidth: 1.5 } }, eds)),
    [setEdges]
  )

  return (
    <div style={{ width: '100%', height: '100%', background: '#f8f8f6' }}>
      <ReactFlow
        nodes={updatedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.4}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#ddddd8"
        />
        {/* <Controls /> */}
        {/* <MiniMap */}
          {/* nodeColor="#e8e8e4" */}
          {/* maskColor="rgba(248,248,246,0.85)" */}
        {/* /> */}
      </ReactFlow>
    </div>
  )
}

export default FlowCanvas