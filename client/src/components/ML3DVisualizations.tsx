import { useEffect, useRef } from 'react';

// ─── Shared 3D math helpers ───────────────────────────────────────────────────

function project(
  x: number,
  y: number,
  z: number,
  rotX: number,
  rotY: number,
  cx: number,
  cy: number,
  fov: number
) {
  // Rotate around Y axis
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;

  // Rotate around X axis
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y1 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  const scale = fov / (fov + z2 + 200);
  return { sx: cx + x1 * scale, sy: cy + y1 * scale, scale, z: z2 };
}

// ─── Supervised Learning: Labeled scatter + decision plane ───────────────────

export function SupervisedViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const fov = 400;

    // Generate labeled points: class A (blue) and class B (orange)
    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };
    const rand = rng(42);

    const points: { x: number; y: number; z: number; cls: number }[] = [];
    for (let i = 0; i < 40; i++) {
      const cls = i < 20 ? 0 : 1;
      const offset = cls === 0 ? -40 : 40;
      points.push({
        x: (rand() - 0.5) * 120 + offset,
        y: (rand() - 0.5) * 120 + offset,
        z: (rand() - 0.5) * 120 + offset,
        cls,
      });
    }

    // Plane grid for decision boundary
    const planeSize = 130;
    const planeSteps = 6;

    let rotY = 0.3;
    let rotX = 0.25;
    let animId: number;
    let lastTime = 0;

    // Pulse animation for points
    let pulse = 0;

    const draw = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      rotY += dt * 0.4;
      pulse = time / 1000;

      ctx.clearRect(0, 0, W, H);

      // Draw axes
      const axisLen = 110;
      const axes = [
        { dx: axisLen, dy: 0, dz: 0, color: '#ef4444', label: 'X' },
        { dx: 0, dy: -axisLen, dz: 0, color: '#22c55e', label: 'Y' },
        { dx: 0, dy: 0, dz: axisLen, color: '#3b82f6', label: 'Z' },
      ];
      for (const ax of axes) {
        const o = project(0, 0, 0, rotX, rotY, cx, cy, fov);
        const e = project(ax.dx, ax.dy, ax.dz, rotX, rotY, cx, cy, fov);
        ctx.beginPath();
        ctx.moveTo(o.sx, o.sy);
        ctx.lineTo(e.sx, e.sy);
        ctx.strokeStyle = ax.color + '66';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw decision plane (semi-transparent)
      const step = (planeSize * 2) / planeSteps;
      for (let i = 0; i <= planeSteps; i++) {
        for (let j = 0; j <= planeSteps; j++) {
          const px = -planeSize + i * step;
          const pz = -planeSize + j * step;
          const py = 0; // flat plane at y=0

          if (i < planeSteps && j < planeSteps) {
            const p00 = project(px, py, pz, rotX, rotY, cx, cy, fov);
            const p10 = project(px + step, py, pz, rotX, rotY, cx, cy, fov);
            const p11 = project(px + step, py, pz + step, rotX, rotY, cx, cy, fov);
            const p01 = project(px, py, pz + step, rotX, rotY, cx, cy, fov);

            ctx.beginPath();
            ctx.moveTo(p00.sx, p00.sy);
            ctx.lineTo(p10.sx, p10.sy);
            ctx.lineTo(p11.sx, p11.sy);
            ctx.lineTo(p01.sx, p01.sy);
            ctx.closePath();
            ctx.fillStyle = 'rgba(99,179,237,0.06)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(99,179,237,0.2)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Sort points by depth
      const projected = points.map((p) => ({
        ...p,
        ...project(p.x, p.y, p.z, rotX, rotY, cx, cy, fov),
      }));
      projected.sort((a, b) => b.z - a.z);

      // Draw points
      for (const p of projected) {
        const r = 5 * p.scale;
        const glow = 0.7 + 0.3 * Math.sin(pulse * 2 + p.x * 0.05);
        const color = p.cls === 0 ? [59, 130, 246] : [251, 146, 60];
        const [cr, cg, cb] = color;

        // Glow
        const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 3);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${0.4 * glow})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Point
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},0.9)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,0.4)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Label (A/B)
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = `${Math.max(7, 9 * p.scale)}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(p.cls === 0 ? 'A' : 'B', p.sx, p.sy - r - 2);
      }

      // Legend
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(59,130,246,0.9)';
      ctx.fillRect(12, H - 44, 10, 10);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('Class A', 26, H - 35);
      ctx.fillStyle = 'rgba(251,146,60,0.9)';
      ctx.fillRect(12, H - 28, 10, 10);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('Class B', 26, H - 19);

      // Decision boundary label
      ctx.fillStyle = 'rgba(99,179,237,0.7)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('Decision Boundary', W - 10, H - 10);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={240}
      className="w-full rounded-lg"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
    />
  );
}

// ─── Unsupervised Learning: K-Means clustering in 3D ─────────────────────────

export function UnsupervisedViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const fov = 400;

    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };
    const rand = rng(7);

    // 3 clusters
    const clusterCenters = [
      { x: -70, y: -50, z: -40 },
      { x: 60, y: 40, z: -60 },
      { x: 0, y: -60, z: 80 },
    ];
    const clusterColors = [
      [34, 211, 238],   // cyan
      [168, 85, 247],   // purple
      [251, 191, 36],   // amber
    ];

    const points: { x: number; y: number; z: number; cluster: number }[] = [];
    for (let c = 0; c < 3; c++) {
      const center = clusterCenters[c];
      for (let i = 0; i < 18; i++) {
        points.push({
          x: center.x + (rand() - 0.5) * 80,
          y: center.y + (rand() - 0.5) * 80,
          z: center.z + (rand() - 0.5) * 80,
          cluster: c,
        });
      }
    }

    let rotY = 0.2;
    let rotX = 0.3;
    let animId: number;
    let lastTime = 0;
    let pulse = 0;

    const draw = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      rotY += dt * 0.35;
      pulse = time / 1000;

      ctx.clearRect(0, 0, W, H);

      // Draw cluster center markers
      for (let c = 0; c < 3; c++) {
        const center = clusterCenters[c];
        const p = project(center.x, center.y, center.z, rotX, rotY, cx, cy, fov);
        const [cr, cg, cb] = clusterColors[c];
        const r = 9 * p.scale;

        // Pulsing ring
        const ringR = r * (2 + 0.5 * Math.sin(pulse * 1.5 + c * 2));
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.3)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Center cross
        ctx.beginPath();
        ctx.moveTo(p.sx - r, p.sy);
        ctx.lineTo(p.sx + r, p.sy);
        ctx.moveTo(p.sx, p.sy - r);
        ctx.lineTo(p.sx, p.sy + r);
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.9)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Sort points by depth
      const projected = points.map((p) => ({
        ...p,
        ...project(p.x, p.y, p.z, rotX, rotY, cx, cy, fov),
      }));
      projected.sort((a, b) => b.z - a.z);

      // Draw lines from points to cluster centers
      for (const p of projected) {
        const center = clusterCenters[p.cluster];
        const cp = project(center.x, center.y, center.z, rotX, rotY, cx, cy, fov);
        const [cr, cg, cb] = clusterColors[p.cluster];
        ctx.beginPath();
        ctx.moveTo(p.sx, p.sy);
        ctx.lineTo(cp.sx, cp.sy);
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.12)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw points
      for (const p of projected) {
        const r = 4.5 * p.scale;
        const [cr, cg, cb] = clusterColors[p.cluster];
        const glow = 0.6 + 0.4 * Math.sin(pulse * 1.8 + p.x * 0.04);

        const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 3);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${0.35 * glow})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},0.85)`;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Legend
      const labels = ['Cluster 1', 'Cluster 2', 'Cluster 3'];
      for (let i = 0; i < 3; i++) {
        const [cr, cg, cb] = clusterColors[i];
        ctx.fillStyle = `rgba(${cr},${cg},${cb},0.9)`;
        ctx.fillRect(12, H - 44 + i * 16, 10, 10);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(labels[i], 26, H - 35 + i * 16);
      }

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('K-Means Clustering', W - 10, H - 10);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={240}
      className="w-full rounded-lg"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d2137 100%)' }}
    />
  );
}

// ─── Discovery-Based Learning: Exploring graph/network ───────────────────────

export function DiscoveryViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const fov = 400;

    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };
    const rand = rng(99);

    // Nodes arranged in a 3D sphere-ish layout
    const nodeCount = 22;
    const nodes: { x: number; y: number; z: number; discovered: boolean; discoveryTime: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 60 + rand() * 60;
      nodes.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        discovered: i === 0,
        discoveryTime: i === 0 ? 0 : Infinity,
      });
    }

    // Edges: connect nearby nodes
    const edges: [number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 90) edges.push([i, j]);
      }
    }

    let rotY = 0.1;
    let rotX = 0.2;
    let animId: number;
    let lastTime = 0;
    let elapsed = 0;

    // Discovery wave: reveal nodes over time
    const discoveryInterval = 0.6;
    let nextDiscovery = discoveryInterval;

    const draw = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      rotY += dt * 0.3;
      elapsed += dt;

      // Discover next node
      if (elapsed > nextDiscovery) {
        const undiscovered = nodes.filter((n) => !n.discovered);
        if (undiscovered.length > 0) {
          // Find undiscovered node adjacent to a discovered one
          let candidates: number[] = [];
          for (const [a, b] of edges) {
            if (nodes[a].discovered && !nodes[b].discovered) candidates.push(b);
            if (nodes[b].discovered && !nodes[a].discovered) candidates.push(a);
          }
          if (candidates.length === 0) {
            candidates = nodes.map((_, i) => i).filter((i) => !nodes[i].discovered);
          }
          const pick = candidates[Math.floor(rand() * candidates.length)];
          if (pick !== undefined) {
            nodes[pick].discovered = true;
            nodes[pick].discoveryTime = elapsed;
          }
        }
        nextDiscovery = elapsed + discoveryInterval * (0.5 + rand() * 0.8);
      }

      ctx.clearRect(0, 0, W, H);

      // Project all nodes
      const proj = nodes.map((n) => ({
        ...n,
        ...project(n.x, n.y, n.z, rotX, rotY, cx, cy, fov),
      }));

      // Draw edges
      for (const [a, b] of edges) {
        const pa = proj[a];
        const pb = proj[b];
        const bothDiscovered = nodes[a].discovered && nodes[b].discovered;
        const eitherDiscovered = nodes[a].discovered || nodes[b].discovered;

        if (!eitherDiscovered) continue;

        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.strokeStyle = bothDiscovered
          ? 'rgba(251,191,36,0.35)'
          : 'rgba(251,191,36,0.1)';
        ctx.lineWidth = bothDiscovered ? 1 : 0.5;
        ctx.stroke();
      }

      // Draw nodes sorted by depth
      const sorted = [...proj].sort((a, b) => b.z - a.z);
      for (const p of sorted) {
        const age = p.discovered ? elapsed - p.discoveryTime : -1;
        const r = 5 * p.scale;

        if (!p.discovered) {
          // Undiscovered: dim gray
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(100,116,139,0.3)';
          ctx.fill();
          continue;
        }

        // Discovery burst
        if (age < 0.5) {
          const burstR = r * (1 + (0.5 - age) * 8);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, burstR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251,191,36,${0.4 * (1 - age / 0.5)})`;
          ctx.fill();
        }

        // Glow
        const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 2.5);
        grad.addColorStop(0, 'rgba(251,191,36,0.5)');
        grad.addColorStop(1, 'rgba(251,191,36,0)');
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251,191,36,0.9)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Stats
      const discoveredCount = nodes.filter((n) => n.discovered).length;
      ctx.fillStyle = 'rgba(251,191,36,0.8)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Discovered: ${discoveredCount} / ${nodeCount}`, 12, H - 14);

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('Knowledge Graph Exploration', W - 10, H - 10);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={240}
      className="w-full rounded-lg"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1c1408 100%)' }}
    />
  );
}
