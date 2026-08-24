import * as THREE from "three";

export interface GeometricFieldObjects {
  group: THREE.Group;
  update: (time: number, mouseX: number, mouseY: number, scrollY: number) => void;
  dispose: () => void;
}

/**
 * Creates a lightweight procedural geometric field representing the "design resource universe".
 * Constructed purely with wireframe geometry, grid planes, constellation points, and structural prisms.
 * Zero textures or heavy models. Low GPU/CPU footprint.
 */
export function createGeometricField(): GeometricFieldObjects {
  const group = new THREE.Group();
  const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

  // Theme Colors
  const accentColor = new THREE.Color("#C85A32");
  const secondaryColor = new THREE.Color("#D48265");
  const gridColor = new THREE.Color("#E5E2DC");
  const nodeColor = new THREE.Color("#18181B");

  // 1. Blueprint Horizon Grid Plane
  const gridHelper = new THREE.GridHelper(36, 24, accentColor, gridColor);
  gridHelper.position.y = -3.2;
  gridHelper.position.z = -2;
  (gridHelper.material as THREE.Material).transparent = true;
  (gridHelper.material as THREE.Material).opacity = 0.45;
  group.add(gridHelper);
  disposables.push(gridHelper.geometry, gridHelper.material as THREE.Material);

  // 2. Constellation Vertex Nodes (Floating Design Entities)
  const nodeCount = 38;
  const positions = new Float32Array(nodeCount * 3);
  const basePositions: [number, number, number][] = [];

  for (let i = 0; i < nodeCount; i++) {
    const x = (Math.random() - 0.5) * 22;
    const y = (Math.random() - 0.5) * 8 + 0.5;
    const z = (Math.random() - 0.5) * 12 - 3;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    basePositions.push([x, y, z]);
  }

  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pointMaterial = new THREE.PointsMaterial({
    color: nodeColor,
    size: 0.14,
    transparent: true,
    opacity: 0.75,
  });
  const points = new THREE.Points(pointGeometry, pointMaterial);
  group.add(points);
  disposables.push(pointGeometry, pointMaterial);

  // 3. Constellation Connecting Lines (Network of Design Disciplines)
  const lineIndices: number[] = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = basePositions[i][0] - basePositions[j][0];
      const dy = basePositions[i][1] - basePositions[j][1];
      const dz = basePositions[i][2] - basePositions[j][2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 4.2) {
        lineIndices.push(i, j);
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  lineGeometry.setIndex(lineIndices);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.22,
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lines);
  disposables.push(lineGeometry, lineMaterial);

  // 4. Floating Wireframe Spatial Prisms (Modular Component Blocks)
  const prismCount = 7;
  const prisms: { mesh: THREE.LineSegments; baseY: number; rotSpeedX: number; rotSpeedY: number }[] = [];

  for (let i = 0; i < prismCount; i++) {
    const w = 1.2 + (i % 3) * 0.4;
    const h = 0.8 + (i % 2) * 0.5;
    const d = 1.2 + (i % 2) * 0.4;
    const boxGeo = new THREE.BoxGeometry(w, h, d);
    const wireGeo = new THREE.WireframeGeometry(boxGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: i % 2 === 0 ? accentColor : secondaryColor,
      transparent: true,
      opacity: 0.35 + (i % 3) * 0.1,
    });
    const prism = new THREE.LineSegments(wireGeo, wireMat);

    const x = (i - (prismCount - 1) / 2) * 3.4 + (Math.random() - 0.5) * 1.5;
    const y = ((i % 3) - 1) * 1.6 + 0.2;
    const z = -4 - (i % 4) * 1.8;
    prism.position.set(x, y, z);
    prism.rotation.set(0.3 * i, 0.4 * i, 0);

    group.add(prism);
    prisms.push({
      mesh: prism,
      baseY: y,
      rotSpeedX: 0.0015 * (i % 2 === 0 ? 1 : -1),
      rotSpeedY: 0.002 * (i % 3 === 0 ? 1 : -1),
    });
    disposables.push(boxGeo, wireGeo, wireMat);
  }

  // Animation & Interactive Update Loop
  const update = (time: number, mouseX: number, mouseY: number, scrollY: number) => {
    // Subtle overall field tilt based on mouse position
    group.rotation.y = mouseX * 0.12;
    group.rotation.x = mouseY * 0.08 - scrollY * 0.0003;
    group.position.y = -scrollY * 0.0012;

    // Gentle wave animation for point vertices
    const posAttr = pointGeometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < nodeCount; i++) {
      const baseY = basePositions[i][1];
      const phase = time * 0.0008 + i * 0.4;
      posArray[i * 3 + 1] = baseY + Math.sin(phase) * 0.18;
    }
    posAttr.needsUpdate = true;
    (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // Rotate and bob modular prisms
    for (let i = 0; i < prisms.length; i++) {
      const p = prisms[i];
      p.mesh.rotation.x += p.rotSpeedX;
      p.mesh.rotation.y += p.rotSpeedY;
      p.mesh.position.y = p.baseY + Math.sin(time * 0.0012 + i) * 0.15;
    }
  };

  const dispose = () => {
    disposables.forEach((item) => {
      if ("dispose" in item) {
        item.dispose();
      }
    });
    group.clear();
  };

  return { group, update, dispose };
}
