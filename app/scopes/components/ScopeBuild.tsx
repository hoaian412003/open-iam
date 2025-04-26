'use client';

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Node,
  Edge,
  useReactFlow,
  Panel,
} from '@xyflow/react';
import { useCallback, useEffect, useMemo } from 'react';
import Dagre from '@dagrejs/dagre';
import { Button } from '@heroui/button';
import Icons from '@/components/icons';
import { ScopeNode } from './ScopeNode';
import { updateScope } from '../action/update';
import { OutputNode } from './OutputNode';

const nodeTypes = {
  scopeNode: ScopeNode,
  outputNode: OutputNode
}

type TNode = {
  name: string,
  group: string,
  outputs: Array<string>,
}
type Props = {
  scopes: Array<TNode>;
  groups: Array<string>;
};

const getLayoutedElements = (nodes: (Node & any)[], edges: Edge[], options: any) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) + 200;
      const y = position.y - (node.measured?.height ?? 0) + 200;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};


export const ScopeBuild = ({ scopes, groups, ...props }: Props) => {

  const { fitView } = useReactFlow();

  const getScopeGroup = (scopes: Array<TNode>) => {
    const result: Record<string, Array<TNode>> = {};

    groups.map(key => result[key] = []);

    scopes.map((node) => {
      result[node.group] = [...(result[node.group] || []), node];
    })
    return result;
  }
  const groupedScopes = getScopeGroup(scopes);

  const initialNodes = useMemo(() => {
    return [
      ...Object.keys(groupedScopes).map(k => ({
        id: k,
        type: k === 'Output' ? 'outputNode' : 'scopeNode',
        position: { x: 0, y: 0 },
        data: {
          name: k,
          scopes: groupedScopes[k]
        }
      }))
    ]
  }, scopes)

  const initialEdges = useMemo(() => {
    let result: Array<Edge> = [];
    scopes.map((scope) => {
      if (scope.group === 'Output') {
        return undefined;
      }
      scope.outputs.map(output => {
        result.push(
          {
            id: `${scope.group}:${scope.name}:${output}`,
            source: `${scope.group}`,
            target: `Output`,
            sourceHandle: `${scope.group}:${scope.name}`,
            targetHandle: `Output:${output}`,
          }
        )
      })
    });
    return result;
  }, [scopes])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => {
      setEdges((eds) => addEdge(params, eds));
      updateScope({
        group: params.source,
        name: params.sourceHandle.split(':')[1],
      }, {
        outputs: {
          push: params.targetHandle.split(':')[1]
        }
      })
    },
    [setEdges],
  );

  const onLayout = useCallback(
    (direction: any) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      fitView();
    },
    [nodes, edges],
  );

  return <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    nodeTypes={nodeTypes}
    fitView
  >
    <Panel position="top-left">
      <Button color='primary' onClick={() => onLayout('TB')}><Icons.Layout />Layout</Button>
    </Panel>
    <Controls />
    <MiniMap />
    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
  </ReactFlow>
}
