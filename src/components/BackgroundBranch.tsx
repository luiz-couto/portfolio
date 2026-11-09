import './BackgroundBranch.css'

// A stylized leaf, base at the origin; placed via <g transform>.
const LEAF_PATH = 'M0 0 C 16 -16, 42 -18, 62 -2 C 42 14, 16 14, 0 0 Z'

interface Leaf {
  x: number
  y: number
  angle: number
  scale?: number
  delay: number
}

// The trunk is an S-shaped wave passing through these on-curve anchors:
//   (700,685) (640,540) (640,340) (420,250) (350,202) tip (310,110)
// Every side branch starts at one of them so the tree stays connected.
const STEMS = [
  {
    d: 'M 880 800 C 720 730, 640 650, 640 540 S 700 420, 640 340 S 480 260, 420 250 S 330 180, 310 110',
    width: 6,
    delay: 0,
    duration: 1.8,
  },
  { d: 'M 700 685 C 760 660, 810 650, 860 648', width: 4, delay: 0.25, duration: 0.9 },
  { d: 'M 640 540 C 580 520, 520 515, 460 525', width: 4, delay: 0.55, duration: 0.9 },
  { d: 'M 640 340 C 700 315, 755 308, 810 300', width: 3.5, delay: 1.0, duration: 0.9 },
  { d: 'M 420 250 C 365 255, 315 270, 270 295', width: 3.5, delay: 1.4, duration: 0.9 },
  { d: 'M 350 202 C 385 165, 420 148, 465 135', width: 3.5, delay: 1.6, duration: 0.9 },
]

// Leaves sit on branch endpoints, midpoints and trunk anchors, base-first.
const LEAVES: Leaf[] = [
  // Low right branch.
  { x: 860, y: 648, angle: -5, delay: 1.2 },
  { x: 792, y: 653, angle: 45, scale: 0.7, delay: 1.35 },
  // Left branch from (640,540).
  { x: 460, y: 525, angle: 173, delay: 1.5 },
  { x: 522, y: 516, angle: -135, scale: 0.7, delay: 1.65 },
  // Upper-right branch from (640,340).
  { x: 810, y: 300, angle: -8, delay: 1.95 },
  { x: 748, y: 309, angle: 42, scale: 0.65, delay: 2.1 },
  // Left branch from (420,250).
  { x: 270, y: 295, angle: 160, delay: 2.35 },
  { x: 320, y: 272, angle: -155, scale: 0.7, delay: 2.5 },
  // Upper branch from (350,202).
  { x: 465, y: 135, angle: -25, delay: 2.55 },
  { x: 414, y: 152, angle: 40, scale: 0.7, delay: 2.7 },
  // Trunk tip cluster.
  { x: 310, y: 110, angle: -115, delay: 2.75 },
  { x: 310, y: 110, angle: -160, scale: 0.8, delay: 2.9 },
  { x: 322, y: 130, angle: -60, scale: 0.7, delay: 3.0 },
  // A couple directly along the trunk.
  { x: 640, y: 540, angle: 120, scale: 0.8, delay: 1.6 },
  { x: 640, y: 340, angle: 145, scale: 0.75, delay: 2.2 },
]

/** Decorative branch that draws itself in the bottom-right corner. */
function BackgroundBranch() {
  return (
    <svg
      className="background-branch"
      viewBox="0 0 900 800"
      fill="none"
      aria-hidden="true"
    >
      {STEMS.map((stem) => (
        <path
          key={stem.d}
          className="branch-stem"
          d={stem.d}
          pathLength={1}
          strokeWidth={stem.width}
          style={{
            animationDelay: `${stem.delay}s`,
            animationDuration: `${stem.duration}s`,
          }}
        />
      ))}
      {LEAVES.map((leaf) => (
        <g
          key={`${leaf.x}-${leaf.y}-${leaf.angle}`}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.angle}) scale(${leaf.scale ?? 1})`}
        >
          <path
            className="branch-leaf"
            d={LEAF_PATH}
            style={{ animationDelay: `${leaf.delay}s` }}
          />
        </g>
      ))}
    </svg>
  )
}

export default BackgroundBranch
