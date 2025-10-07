import { useEffect, useState, useRef } from 'react';
import { TrendingUp, Users, Award } from 'lucide-react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const stats: Stat[] = [
  {
    value: 5500,
    suffix: '+',
    label: 'Machines Installed',
    icon: <TrendingUp className="w-7 h-7" />,
    color: 'from-blue-500 to-blue-700',
  },
  {
    value: 7200,
    suffix: '+',
    label: 'Customers Served',
    icon: <Users className="w-7 h-7" />,
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Years of Expertise',
    icon: <Award className="w-7 h-7" />,
    color: 'from-violet-500 to-violet-700',
  },
];

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function CountUp({ end, duration = 2000, suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOut * end));
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl font-semibold tracking-tight text-gray-900">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Track Record
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Delivering precision laser solutions to industries worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-10 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center relative"
              style={{
                animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div
                className={`flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-md group-hover:scale-105 transition-transform duration-300`}
              >
                {stat.icon}
              </div>

              <CountUp end={stat.value} suffix={stat.suffix} />

              <div className="text-gray-600 mt-2 text-base font-medium">
                {stat.label}
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm max-w-3xl mx-auto">
            Trusted by leading manufacturers across automotive, aerospace, electronics, and more.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
