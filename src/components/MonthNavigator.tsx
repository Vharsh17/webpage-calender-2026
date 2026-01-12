import { useState, useEffect } from 'react';

interface MonthNavigatorProps {
  currentMonth: number;
  monthNames: string[];
  monthColors: { [key: number]: string };
  onSelectMonth: (month: number) => void;
}

export function MonthNavigator({
  currentMonth,
  monthNames,
  monthColors,
  onSelectMonth
}: MonthNavigatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <div className="bg-gray-200 rounded-full px-3 py-2 shadow-lg flex items-center gap-2">
        {monthNames.map((name, index) => {
          const isActive = index === currentMonth;
          const shortName = name.substring(0, 3);
          
          return (
            <button
              key={name}
              onClick={() => onSelectMonth(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-300'
              }`}
              style={{
                backgroundColor: isActive ? monthColors[index] : 'transparent'
              }}
            >
              {shortName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
