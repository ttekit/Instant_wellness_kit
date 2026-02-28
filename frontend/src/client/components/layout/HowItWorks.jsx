function HowItWorks() {
    const steps = [
        {
            number: 1,
            title: 'Pick Your Kit',
            desc: 'Browse our curated collection and choose the wellness reset that fits your moment.',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2596be]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 11l8-4"/>
        </svg>)
        },
        {
            number: 2,
            title: 'Share Your Location',
            desc: 'We use your GPS coordinates to pinpoint exactly where you are for precise delivery.',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2596be]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>)
        },
        {
            number: 3,
            title: 'Drone Takes Flight',
            desc: 'A drone picks up your kit from our NYC partner and flies it straight to your pin.',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2596be]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
        </svg>)
        },
        {
            number: 4,
            title: 'Reset Your Day',
            desc: 'In 20–30 minutes, unbox your instant wellness experience wherever you are.',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2596be]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>)
        },
    ];
    return (<section className="bg-[#e8eceb] py-16 px-8 text-center">
      <p className="text-xs tracking-widest text-[#2596be] uppercase mb-2">Simple Process</p>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">How It Works</h2>
      <p className="text-sm text-gray-500 max-w-md mx-auto mb-12">From selection to delivery, the entire process takes less time than your lunch break.</p>

      <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
        {steps.map((step) => (<div key={step.number} className="flex flex-col items-center relative">
            <span className="absolute -top-3 -left-3 bg-yellow-400 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{step.number}</span>
            <div className="bg-[#e0f2f9] rounded-2xl p-5 mb-4 flex items-center justify-center w-20 h-20">
              {step.icon}
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
          </div>))}
      </div>
    </section>);
}
export default HowItWorks;
//# sourceMappingURL=HowItWorks.jsx.map