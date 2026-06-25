import { useEffect, useRef } from "react";
import { useInView, animate } from "motion/react";
import { Settings, Users, Clock, Factory } from "lucide-react";

const METRICS = [
  { id: 1, label: "Machines Deployed Across India", value: "5500+", icon: Settings },
  { id: 2, label: "Customers Served", value: "7200+", icon: Users },
  { id: 3, label: "Years of Manufacturing Excellence", value: "15+", icon: Clock },
  { id: 4, label: "Industries Served", value: "10+", icon: Factory }
];

const Counter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    const element = ref.current;
    if (!element || !inView) return;
    const match = value.match(/(\d+)(.*)/);
    if (!match) {
      element.textContent = value;
      return;
    }
    const end = parseInt(match[1], 10);
    const suffix = match[2];
    const controls = animate(0, end, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v: number) {
        element.textContent = Math.floor(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [value, inView]);

  return (
    <span
      ref={ref}
      className="tabular-nums"
      style={{ opacity: inView ? 1 : 0, transition: "opacity 0.3s" }}
    >
      {value}
    </span>
  );
};

export default function AdsTrustBar() {
  return (
    <div className="relative z-20 -mt-10 md:-mt-14 container mx-auto px-6">
      <div className="bg-white shadow-2xl rounded-sm grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-100">
        {METRICS.map((m) => (
          <div
            key={m.id}
            className="p-6 md:p-8 text-center bg-white group hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-2xl md:text-4xl font-medium text-red-600 mb-2 font-primary tracking-tight">
              <Counter value={m.value} />
            </h3>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-medium">
              {m.label}
            </p>
          </div>
        ))}
      </div>
      <br />
      <div className="text-center mt-4 text-gray-550 font-secondary text-sm md:text-base flex items-center justify-center gap-4">
        <span className="text-[#f31524] font-bold text-lg">✓</span>
        <span className="tracking-wide">Pan-India Sales & Service Network</span>
      </div>
    </div>
  );
}
