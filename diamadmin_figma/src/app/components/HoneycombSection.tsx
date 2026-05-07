import { motion } from "motion/react";
import { useState } from "react";

interface HexagonProps {
  index: number;
  row: number;
  col: number;
}

function Hexagon({ index, row, col }: HexagonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const delay = (row + col) * 0.05;

  // Hexagon path
  const hexPath = "M 30 0 L 60 17.5 L 60 52.5 L 30 70 L 0 52.5 L 0 17.5 Z";

  // Diamond path (like logo - wider trapezoid top, pointed bottom)
  const diamondPath = "M 15 15 L 45 15 L 60 35 L 30 70 L 0 35 Z";

  return (
    <motion.svg
      width="60"
      height="70"
      viewBox="0 0 60 70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.path
        d={hexPath}
        initial={{ d: hexPath }}
        animate={{
          d: isHovered ? diamondPath : hexPath
        }}
        transition={{ duration: 0.4 }}
        fill={isHovered ? "#3DB5E6" : "#2E9AC9"}
        stroke="white"
        strokeWidth="1"
        opacity={0.3}
      />

      {/* Diamond facets when hovered - matching logo structure */}
      {isHovered && (
        <>
          {/* Top left facet */}
          <motion.path
            d="M 15 15 L 30 15 L 30 35 L 0 35 Z"
            fill="#1B75BB"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          />
          {/* Top center facet */}
          <motion.path
            d="M 30 15 L 45 15 L 30 35 Z"
            fill="#2E9AC9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />
          {/* Top right facet */}
          <motion.path
            d="M 45 15 L 60 35 L 30 35 Z"
            fill="#3DB5E6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          />
          {/* Bottom left facet */}
          <motion.path
            d="M 0 35 L 30 35 L 30 70 Z"
            fill="#3DB5E6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          />
          {/* Bottom right facet */}
          <motion.path
            d="M 30 35 L 60 35 L 30 70 Z"
            fill="#2E9AC9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          />
          {/* White lines - horizontal separator */}
          <motion.line
            x1="0" y1="35" x2="60" y2="35"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
          {/* White lines - left vertical */}
          <motion.line
            x1="15" y1="15" x2="0" y2="35"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
          {/* White lines - right vertical */}
          <motion.line
            x1="45" y1="15" x2="60" y2="35"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
          {/* White lines - center vertical */}
          <motion.line
            x1="30" y1="35" x2="30" y2="70"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </motion.svg>
  );
}

export function HoneycombSection() {
  const rows = 8;
  const cols = 12;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F4C75] via-[#1B75BB] to-[#2E9AC9] py-20 px-8 overflow-hidden">
      {/* Honeycomb grid - background layer */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <div className="flex flex-col items-center gap-1">
          {[...Array(rows)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-1"
              style={{
                marginLeft: rowIndex % 2 === 1 ? '30px' : '0px'
              }}
            >
              {[...Array(cols)].map((_, colIndex) => (
                <Hexagon
                  key={`${rowIndex}-${colIndex}`}
                  index={rowIndex * cols + colIndex}
                  row={rowIndex}
                  col={colIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Content layer - on top of honeycomb */}
      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Estructura perfecta
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Cada hexágono se transforma en un diamante de potencial
          </p>
          <p className="text-lg md:text-xl text-white/70">
            Pasa el cursor sobre el patrón y descubre la transformación
          </p>
        </motion.div>
      </div>
    </div>
  );
}
