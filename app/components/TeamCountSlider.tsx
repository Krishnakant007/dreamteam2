



// interface TeamCountSliderProps {
//   value: number;
//   onChange: (value: number) => void;
// }

// export default function TeamCountSlider({ value, onChange }: TeamCountSliderProps) {
//   // Calculate position percentage (1-20 mapped to 0-100%)
//   const positionPercentage = ((value - 1) / 19) * 100;

//   return (
//     <div className="space-y-3">
//       <div className="flex justify-between items-center">
//         <label className="font-semibold text-lg">Number of Teams</label>
//         <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-bold text-white">
//           {value} {value === 1 ? 'Team' : 'Teams'} (₹{value * 100})
//         </span>
//       </div>
      
//       <div className="relative pt-4"> {/* Added padding-top for indicator space */}
//         <input
//           type="range"
//           min="1"
//           max="20"
//           value={value}
//           onChange={(e) => onChange(Number(e.target.value))}
//           className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-blue-400 to-purple-500"
//         />
//         <div 
//           className="absolute top-0 left-0 transform -translate-x-1/2 text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded-full shadow-md"
//           style={{
//             left: `${positionPercentage}%`,
//             transition: 'left 0.2s ease',
//           }}
//         >
//           {value}
//         </div>
//       </div>
      
//       <div className="flex justify-between text-xs text-gray-400 mt-2">
//          <span>1 Team (₹100)</span>
//         <span>10 Teams (₹1000)</span>
//         <span>20 Teams (₹2000)</span>
//       </div>
//     </div>
//   );
// }





interface TeamCountSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TeamCountSlider({ value, onChange }: TeamCountSliderProps) {
  // Calculate position percentage (1-20 mapped to 0-100%)
  const positionPercentage = ((value - 1) / 19) * 100;

  // Throttle the onChange events for better mobile performance
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="space-y-3 touch-none">
      <div className="flex justify-between items-center">
        <label className="font-semibold text-lg">Number of Teams</label>
        <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-bold text-white">
          {value} {value === 1 ? 'Team' : 'Teams'} (₹{value * 100})
        </span>
      </div>
      
      <div className="relative pt-4 touch-none"> {/* Added padding-top for indicator space */}
        <input
          type="range"
          min="1"
          max="20"
          value={value}
          onChange={handleChange}
          className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-blue-400 to-purple-500 touch-none"
          style={{
            WebkitTapHighlightColor: 'transparent'
          }}
        />
        <div 
          className="absolute top-0 left-0 transform -translate-x-1/2 text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded-full shadow-md pointer-events-none"
          style={{
            left: `${positionPercentage}%`,
            transition: 'left 0.1s ease-out',
            willChange: 'left' // Hint to browser for optimization
          }}
        >
          {value}
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-400 mt-2 touch-none">
        <span>1 Team (₹100)</span>
        <span>10 Teams (₹1000)</span>
        <span>20 Teams (₹2000)</span>
      </div>
    </div>
  );
}
