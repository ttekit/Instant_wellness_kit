export const Row = ({ label, value }) => (<div className="flex items-center justify-between">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-xs font-semibold text-gray-800">{value}</span>
  </div>);
export function StepDots({ step }) {
    return (<div className="flex items-center gap-2 mb-5">
      {[1, 2, 3, 4].map(s => (<div key={s} className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${s < step ? 'bg-[#2596be] text-white' :
                s === step ? 'bg-[#1a5c3a] text-white ring-2 ring-[#1a5c3a]/30' :
                    'bg-gray-200 text-gray-400'}`}>
            {s < step ? (<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>) : s}
          </div>
          {s < 4 && <div className={`w-6 h-px transition-all duration-300 ${s < step ? 'bg-[#2596be]' : 'bg-gray-200'}`}/>}
        </div>))}
    </div>);
}
//# sourceMappingURL=ModalUI.jsx.map