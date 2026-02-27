window.SubjectCircle = function SubjectCircle({ subject, onClick }) {
  const { name, attended, total } = subject;
  const pctNum = total ? (attended / total) * 100 : 0;
  const pct = pctNum.toFixed(1);
  const radius = 38; // Perfectly sized for the responsive viewbox
  const circumference = 2 * Math.PI * radius;
  const offset = total ? circumference - (attended / total) * circumference : circumference;

  // --- SMART 85% BUNKING LOGIC ---
  let statusMessage = "No classes yet";
  let statusColor = "text-slate-400";
  let ringColor = "#3b82f6"; // Default Blue
  let textColor = "text-blue-400"; // Default Blue

  if (total > 0) {
    if (pctNum >= 85) {
      // Math: (Attended - 0.85 * Total) / 0.85 calculates safe bunks
      const canBunk = Math.floor((attended - 0.85 * total) / 0.85);
      statusMessage = canBunk > 0 ? `Safe to bunk: ${canBunk}` : "Exactly at 85%";
      statusColor = "text-emerald-400"; 
      ringColor = "#10b981"; // Turns Green
      textColor = "text-emerald-400"; 
    } else {
      // Math: (0.85 * Total - Attended) / 0.15 calculates required attendance
      const needToAttend = Math.ceil((0.85 * total - attended) / 0.15);
      statusMessage = `Must attend: ${needToAttend}`;
      statusColor = "text-rose-400";
      ringColor = "#f43f5e"; // Turns Red
      textColor = "text-rose-400"; 
    }
  }

  return (
    <div
      role="button"
      tabIndex="0"
      aria-label={`${name}: ${attended}/${total}, ${pct}%`}
      onClick={onClick}
      onKeyPress={e => { if (e.key === 'Enter') onClick(); }}
      className="relative flex flex-col items-center justify-center bg-slate-900 border border-slate-700 rounded-2xl shadow-md hover:shadow-xl hover:border-slate-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50 group p-4 aspect-square w-full overflow-hidden"
    >
      {/* The Responsive SVG Ring */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-4 transform transition-transform duration-500 group-hover:scale-105">
        {/* Background track */}
        <circle cx="50" cy="50" r={radius} stroke="#334155" strokeWidth="7" fill="none" />
        {/* Dynamic Progress ring */}
        <circle
          cx="50" cy="50" r={radius} stroke={ringColor} strokeWidth="7" fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 1s ease-out, stroke 0.5s ease-in-out', transformOrigin: '50px 50px' }}
        />
      </svg>
      
      {/* The Text Content Perfectly Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full mt-1 w-full">
        <div className="font-bold text-xl text-white truncate w-full px-2 mb-0.5 text-center">{name}</div>
        
        {/* Percentage dynamically changes color */}
        <div className={`text-3xl font-black tracking-tight mb-2 transition-colors duration-500 ${textColor}`}>
          {pct}<span className="text-lg ml-0.5">%</span>
        </div>
        
        <div className="text-xs font-semibold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-600 shadow-sm mb-2">
          {attended} / {total}
        </div>

        {/* The 85% Goal Status Badge */}
        <div className={`text-[10px] font-bold tracking-wide uppercase ${statusColor} bg-slate-950/50 px-2 py-1 rounded shadow-inner whitespace-nowrap`}>
          {statusMessage}
        </div>
      </div>
    </div>
  );
}