import React from 'react';

interface DottedBorderProps {
  color?: string; // Border color
  orientation?: 'horizontal' | 'vertical'; // Horizontal or vertical orientation
  width?: string; // Width for horizontal or vertical (default: full width or height)
  height?: string; // Height for vertical or horizontal
  dotSpacing?: string; // Spacing between dots
  dotSize?: string; // Size of dots
}

const DottedBorder: React.FC<DottedBorderProps> = ({
  color = 'gray', // Default color
  orientation = 'horizontal', // Default orientation is horizontal
  width = '100%', // Default full width for horizontal
  height = '1px', // Default height
  dotSpacing = '5px', // Default dot spacing
  dotSize = '2px', // Default dot size
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={`relative`}
      style={{
        width: isHorizontal ? width : height,
        height: isHorizontal ? height : width,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${color} ${dotSize}, transparent ${dotSize})`,
          backgroundPosition: 'top left',
          backgroundSize: isHorizontal
            ? `${dotSpacing} ${height}` // For horizontal: control spacing with width
            : `${width} ${dotSpacing}`, // For vertical: control spacing with height
          backgroundRepeat: 'repeat',
          width: isHorizontal ? width : '1px', // Full width for horizontal, thin width for vertical
          height: isHorizontal ? '1px' : width, // Thin height for horizontal, full height for vertical
        }}
      />
    </div>
  );
};

export default DottedBorder;


