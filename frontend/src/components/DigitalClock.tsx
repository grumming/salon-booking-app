import React, { useState, useEffect } from 'react';

interface TimeZone {
  name: string;
  offset: string;
  label: string;
}

const DigitalClock: React.FC = () => {
  const timeZones: TimeZone[] = [
    { name: 'UTC', offset: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { name: 'EST', offset: 'America/New_York', label: 'EST (Eastern Standard)' },
    { name: 'CST', offset: 'America/Chicago', label: 'CST (Central Standard)' },
    { name: 'MST', offset: 'America/Denver', label: 'MST (Mountain Standard)' },
    { name: 'PST', offset: 'America/Los_Angeles', label: 'PST (Pacific Standard)' },
    { name: 'GMT', offset: 'Europe/London', label: 'GMT (Greenwich Mean Time)' },
    { name: 'CET', offset: 'Europe/Paris', label: 'CET (Central European)' },
    { name: 'IST', offset: 'Asia/Kolkata', label: 'IST (Indian Standard)' },
    { name: 'JST', offset: 'Asia/Tokyo', label: 'JST (Japan Standard)' },
    { name: 'AEST', offset: 'Australia/Sydney', label: 'AEST (Australian Eastern)' }
  ];

  const [times, setTimes] = useState<{ [key: string]: string }>({});
  const [selectedZones, setSelectedZones] = useState<string[]>(
    timeZones.slice(0, 4).map(tz => tz.offset)
  );

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};

      timeZones.forEach(tz => {
        const date = new Date();
        let timeString: string;

        if (tz.offset === 'UTC') {
          timeString = date.toLocaleTimeString('en-US', {
            timeZone: 'UTC',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        } else {
          timeString = date.toLocaleTimeString('en-US', {
            timeZone: tz.offset,
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        }

        newTimes[tz.offset] = timeString;
      });

      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleZone = (offset: string) => {
    setSelectedZones(prev =>
      prev.includes(offset)
        ? prev.filter(z => z !== offset)
        : [...prev, offset]
    );
  };

  const displayedZones = timeZones.filter(tz => selectedZones.includes(tz.offset));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-4">
          🕐 Global Digital Clock
        </h1>
        <p className="text-center text-slate-300 mb-12">
          View current time across different time zones
        </p>

        {/* Clock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedZones.map(tz => (
            <div
              key={tz.offset}
              className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 shadow-2xl border border-slate-600 hover:border-blue-500 transition cursor-pointer"
              onClick={() => toggleZone(tz.offset)}
            >
              <h3 className="text-blue-400 font-semibold text-lg mb-2">
                {tz.name}
              </h3>
              <p className="text-slate-400 text-xs mb-4">{tz.label}</p>
              <div className="bg-slate-900 rounded-lg p-4 font-mono">
                <div className="text-4xl font-bold text-green-400 tracking-wider">
                  {times[tz.offset] || '--:--:--'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zone Selector */}
        <div className="bg-slate-700 rounded-xl p-8 border border-slate-600">
          <h2 className="text-white text-xl font-bold mb-6">
            Select Time Zones to Display
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {timeZones.map(tz => (
              <button
                key={tz.offset}
                onClick={() => toggleZone(tz.offset)}
                className={`py-3 px-4 rounded-lg font-medium transition ${
                  selectedZones.includes(tz.offset)
                    ? 'bg-blue-600 text-white border-2 border-blue-400'
                    : 'bg-slate-600 text-slate-300 border-2 border-transparent hover:bg-slate-500'
                }`}
              >
                {tz.name}
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-slate-700 rounded-xl p-8 border border-slate-600">
          <h2 className="text-white text-xl font-bold mb-4">ℹ️ Information</h2>
          <div className="text-slate-300 space-y-2">
            <p>• Click on any clock card to toggle it on/off</p>
            <p>• Use the buttons below to quickly select/deselect zones</p>
            <p>• All times update in real-time every second</p>
            <p>• Current selection: <span className="text-blue-400 font-semibold">{selectedZones.length} time zones</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
