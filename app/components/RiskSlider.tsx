

// app/components/RiskSlider.tsx
interface RiskSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function RiskSlider({ value, onChange }: RiskSliderProps) {
  const getRiskColor = (level: number) => {
    if (level < 20) return 'from-green-400 to-green-600';
    if (level < 40) return 'from-green-300 to-yellow-400';
    if (level < 60) return 'from-yellow-400 to-orange-500';
    if (level < 80) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-red-700';
  };

  const getRiskLabel = (level: number) => {
    if (level < 20) return 'Very Safe';
    if (level < 40) return 'Safe';
    if (level < 60) return 'Moderate';
    if (level < 80) return 'Risky';
    return 'Very Risky';
  };

  const getRiskEmoji = (level: number) => {
    if (level < 20) return '😊';
    if (level < 40) return '🙂';
    if (level < 60) return '😐';
    if (level < 80) return '😤';
    return '😡';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center pb-4">
        <label className="font-semibold text-lg">Risk Level</label>
        <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getRiskColor(value)} text-white`}>
          {getRiskLabel(value)} {getRiskEmoji(value)}
        </span>
      </div>
      
      <div className="relative">
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full h-3 rounded-full appearance-none cursor-pointer bg-gradient-to-r ${getRiskColor(value)}`}
        />
        <div 
          className="absolute top-0 transform -translate-y-full -translate-x-1/2 text-xs font-bold bg-white px-2 py-1 rounded-md shadow-sm"
          style={{
            left: `${value}%`,
            transition: 'left 0.2s ease',
            color: value > 60 ? 'white' : 'black',
            backgroundColor: value > 60 ? 'rgba(250, 105, 105, 0.9)' : 'white'
          }}
        >
          {value}%
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-400">
        <span className="text-green-500">Safe Picks</span>
        <span className="text-yellow-500">Balanced</span>
        <span className="text-red-500">Risky</span>
      </div>
    </div>
  );
}