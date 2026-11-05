import React, { useMemo } from 'react';
import { ReactFlow, Controls, MarkerType, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Lock, Unlock, CheckCircle, Star } from 'lucide-react';

const CustomNode = ({ data }) => {
  const { level, status, onClick, stars } = data;
  
  let bgColor = 'bg-gray-200 text-gray-500';
  let Icon = Lock;
  let cursor = 'cursor-not-allowed';

  if (status === 'completed') {
    bgColor = 'bg-success text-white shadow-clay-primary';
    Icon = CheckCircle;
    cursor = 'cursor-pointer hover:scale-105 transition-transform';
  } else if (status === 'unlocked') {
    bgColor = 'bg-primary text-white shadow-clay-primary';
    Icon = Unlock;
    cursor = 'cursor-pointer hover:scale-105 transition-transform';
  }

  return (
    <div className="flex flex-col items-center relative">
      <Handle type="target" position={Position.Top} id="top-t" className="opacity-0" />
      <Handle type="target" position={Position.Bottom} id="bottom-t" className="opacity-0" />
      <Handle type="target" position={Position.Left} id="left-t" className="opacity-0" />
      <Handle type="target" position={Position.Right} id="right-t" className="opacity-0" />

      <Handle type="source" position={Position.Top} id="top-s" className="opacity-0" />
      <Handle type="source" position={Position.Bottom} id="bottom-s" className="opacity-0" />
      <Handle type="source" position={Position.Left} id="left-s" className="opacity-0" />
      <Handle type="source" position={Position.Right} id="right-s" className="opacity-0" />

      <div 
        className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 border-white ${bgColor} ${cursor} relative z-10`}
        onClick={() => status !== 'locked' && onClick(level)}
      >
        <Icon size={24} className="mb-1" />
        <span className="font-bold text-sm">Lvl {level}</span>
      </div>
      
      {/* Stars Container */}
      <div className="flex space-x-1 mt-2 bg-white/80 backdrop-blur-md rounded-full px-2 py-1 shadow-sm border border-gray-100">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            className={i < stars ? "text-yellow-400 fill-yellow-400 drop-shadow-sm" : "text-gray-300 fill-gray-200"} 
          />
        ))}
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const SkillTree = ({ userLevel, onNodeClick, progressHistory = [] }) => {
  // Generate 100 nodes in a winding snake pattern
  const { nodes, edges } = useMemo(() => {
    const nds = [];
    const eds = [];
    
    // Algorithmic generator for 100 levels
    const getPos = (i) => {
      const row = Math.floor((i - 1) / 5);
      const col = (i - 1) % 5;
      
      let x;
      // Alternate direction every row (S-curve)
      if (row % 2 === 0) {
        x = 100 + (col * 150);
      } else {
        x = 700 - (col * 150);
      }
      
      // Add slight vertical wave
      const wave = (col % 2 !== 0) ? 40 : 0;
      const y = 100 + (row * 180) + wave;

      return { x, y };
    };

    for (let i = 1; i <= 100; i++) {
      let status = 'locked';
      if (i < userLevel) status = 'completed';
      if (i === userLevel) status = 'unlocked';

      const levelProgresses = progressHistory.filter(p => p.level === i);
      const highestScore = levelProgresses.length > 0 ? Math.max(...levelProgresses.map(p => p.score)) : 0;
      const stars = Math.floor(highestScore / 20);

      nds.push({
        id: `level-${i}`,
        type: 'custom',
        position: getPos(i),
        data: { level: i, status, onClick: onNodeClick, stars },
      });

      if (i > 1) {
        const edgeColor = status === 'completed' ? '#00C853' : (status === 'unlocked' ? '#6C63FF' : '#d1d5db');
        
        // Calculate which side of the nodes the arrows should connect to
        let sourceHandle = 'right-s';
        let targetHandle = 'left-t';

        const row1 = Math.floor((i - 2) / 5);
        const row2 = Math.floor((i - 1) / 5);
        
        if (row1 !== row2) {
          // Drop down edge
          sourceHandle = 'bottom-s';
          targetHandle = 'top-t';
        } else {
          // Horizontal edge
          if (row1 % 2 === 0) {
            sourceHandle = 'right-s'; // moving right
            targetHandle = 'left-t';
          } else {
            sourceHandle = 'left-s'; // moving left
            targetHandle = 'right-t';
          }
        }

        eds.push({
          id: `e-${i-1}-${i}`,
          source: `level-${i-1}`,
          target: `level-${i}`,
          sourceHandle: sourceHandle,
          targetHandle: targetHandle,
          type: 'bezier',
          animated: status === 'completed' || status === 'unlocked',
          style: { 
            stroke: edgeColor, 
            strokeWidth: 4,
            strokeDasharray: '8 8'
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: edgeColor,
          }
        });
      }
    }
    return { nodes: nds, edges: eds };
  }, [userLevel, onNodeClick, progressHistory]);

  return (
    <div 
      className="w-full h-full rounded-clay overflow-hidden relative shadow-clay-light-inset border-4 border-white"
      style={{
        backgroundImage: "url('/tree-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-white/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm text-xs sm:text-sm font-bold text-primary flex items-center space-x-2">
        <span>Level {userLevel} / 100</span>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 0.75 }}
        panOnScroll={true}
        panOnDrag={true}
        zoomOnScroll={false}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        translateExtent={[[-100, -100], [1000, 4000]]}
        className="z-10"
      >
        <Controls showZoom={true} />
      </ReactFlow>
    </div>
  );
};

export default SkillTree;
