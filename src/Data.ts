export const CATEGORIES = [
  {
    id: "cutting",
    name: "Cutting",
    subs: [
      "Sheet Cutting Machine",
      "Tube Cutting Machine or Pipe Cutting Machine",
      "Sheet and Tube Cutting Machine",
      "Electrial Sheet / Eletrolamination Sheet Cutting Machine",
      "Fully Automatic Sheet Cutting Machine",
    ],
    products: [
  {
    id: "c1",
    name: "Bevel GFA Series",
    subcategory: "Sheet Cutting Machine",
    image:
      "https://www.lasertechnologies.co.in/images/homepage/list-page/bevel-gfa-series.webp",
    description:
      "High-precision industrial fiber laser cutting system engineered for superior accuracy, performance, and productivity.",
    detailedDescription: `The Bevel GFA Series is an advanced fiber laser cutting solution meticulously engineered for heavy-duty industrial applications demanding uncompromising precision, reliability, and repeatability. 
It integrates a robust dual-drive gantry architecture, high-speed linear motion technology, and an intelligent CNC control system that ensures flawless execution across continuous production cycles. 
The system’s automated material handling modules, including smart loading/unloading and stacking features, significantly reduce manual intervention and enhance overall throughput. 

Every unit undergoes multi-phase calibration, vibration damping optimization, and temperature-compensated alignment to maintain sub-millimeter tolerances even in demanding environments. 
Crafted using aerospace-grade alloys and precision machining, the Bevel GFA Series exemplifies next-generation manufacturing excellence.`,
    reliability: `Built for 24/7 industrial operation, the Bevel GFA Series incorporates modular design principles for easy maintenance and high uptime. 
Each subsystem—including optics, motion, and cooling—is independently serviceable to minimize downtime. 
The system undergoes over 1,000 hours of endurance and thermal stability testing. Remote diagnostics and predictive maintenance features further enhance operational continuity.`,
    safety: `Safety is integral to the Bevel GFA Series design. The fully enclosed cutting chamber, multi-zone emergency stop systems, and Class 1 laser-rated protective enclosure ensure maximum operator protection. 
Advanced optical sensors, automatic collision detection, and real-time material thickness sensing prevent hazards during operation. 
All safety features comply with international industrial safety standards (EN ISO 11553, CE Certified).`,
    video: "https://youtu.be/JNyYpAcVWs8?si=iqRvxhmdBUNcDkRX",
    features: [
      "Bevel and straight precision cutting with ±0.02 mm repeatability",
      "Automated sheet loading, unloading, and part sorting system",
      "Advanced nesting and cut-path optimization software for minimal wastage",
      "21.5” multi-touch BevelCNC Pro+ control panel with adaptive user interface",
      "Integrated fume extraction and dust filtration system for clean operation",
      "Optional robotic arm interface for fully automated workflow",
    ],
    technicalParameters: {
      power: "1000 W – 6000 W (configurable)",
      bedSize: "1500 × 3000 mm",
      repeatability: "±0.02 mm",
      positioningAccuracy: "±0.03 mm/m",
      weight: "3,200 kg",
      cooling: "Industrial-grade water-cooled chiller (40 kW)",
      maxCuttingThickness: "Stainless Steel: up to 35 mm",
      controller: "BevelCNC Pro+ with AI-assisted motion calibration",
      voltage: "380V / 50Hz, 3 Phase",
      assistGas: "Oxygen / Nitrogen / Air",
    },
    samples: [
      "https://www.lasertechnologies.co.in/images/homepage/list-page/bevel-gfa-series.webp",
    ],
  },
  {
    id: "c2",
    name: "GFA Series",
    subcategory: "Sheet Cutting Machine",
    image:
      "https://www.lasertechnologies.co.in/images/homepage/list-page/gfa-series.webp",
    description:
      "Robust fiber laser cutting system designed for high-efficiency industrial operations.",
    detailedDescription: `The GFA Series is designed for precision sheet cutting with maximum throughput and reliability. 
Featuring a high-speed gantry, smart CNC control, and automated material handling, it delivers consistent results for both thin and thick sheets. 
Its modular architecture allows easy maintenance and scalability for expanding production demands.`,
    reliability: `24/7 capable system with redundant critical components. Remote diagnostics and predictive maintenance ensure minimal downtime.`,
    safety: `Fully enclosed cutting area, multiple emergency stop zones, and optical interlocks protect operators and material during high-speed cutting.`,
    video: "https://youtu.be/VIDEO_ID_1",
    features: [
      "High-speed straight and bevel cutting",
      "Automated sheet loading/unloading",
      "Advanced nesting software",
      "User-friendly CNC interface",
    ],
    technicalParameters: {
      power: "1200 W – 5000 W",
      bedSize: "1500 × 3000 mm",
      repeatability: "±0.025 mm",
      weight: "3,000 kg",
      cooling: "Water-cooled chiller",
      maxCuttingThickness: "Carbon Steel: up to 30 mm",
      controller: "GFA CNC Touch Panel",
      voltage: "380V / 50Hz, 3 Phase",
      assistGas: "Oxygen / Nitrogen",
    },
    samples: [
      "https://www.lasertechnologies.co.in/images/homepage/list-page/gfa-series.webp",
    ],
  },
  {
    id: "c3",
    name: "C Series",
    subcategory: "Sheet Cutting Machine",
    image:
      "https://www.lasertechnologies.co.in/images/homepage/list-page/c-series.webp",
    description:
      "Compact, high-precision laser cutter suitable for medium-scale industrial applications.",
    detailedDescription: `The C Series combines precision and flexibility for sheet cutting tasks. 
Its compact footprint and intuitive control panel make it ideal for factories where space efficiency and high repeatability are required.`,
    reliability: `Designed for continuous operation with serviceable modules and built-in diagnostics to ensure reliability.`,
    safety: `Enclosed laser chamber with interlocks and emergency stops for operator protection.`,
    video: "https://youtu.be/VIDEO_ID_2",
    features: [
      "High-accuracy cutting",
      "Compact footprint",
      "Easy-to-use CNC control",
      "Automated material handling optional",
    ],
    technicalParameters: {
      power: "800 W – 4000 W",
      bedSize: "1200 × 2500 mm",
      repeatability: "±0.03 mm",
      weight: "2,500 kg",
      cooling: "Air-cooled / optional water-cooled",
      maxCuttingThickness: "Stainless Steel: up to 20 mm",
      controller: "C Series CNC Panel",
      voltage: "220V / 50Hz, 3 Phase",
      assistGas: "Oxygen / Air",
    },
    samples: [
      "https://www.lasertechnologies.co.in/images/homepage/list-page/c-series.webp",
    ],
  },
  {
    id: "c4",
    name: "GH Series",
    subcategory: "Sheet Cutting Machine",
    image:
      "https://www.lasertechnologies.co.in/images/homepage/list-page/gh-series.webp",
    description:
      "Heavy-duty fiber laser cutter optimized for high-volume industrial sheet production.",
    detailedDescription: `The GH Series is built for large-scale production with enhanced motion control and cutting precision. 
It features automated loading/unloading, advanced nesting, and robust CNC systems for minimal operator intervention.`,
    reliability: `Engineered for 24/7 operations with redundant systems and predictive maintenance.`,
    safety: `Multiple safety interlocks, emergency stops, and enclosed cutting area guarantee maximum operator safety.`,
    video: "https://youtu.be/VIDEO_ID_3",
    features: [
      "High-volume cutting capability",
      "Automated workflow integration",
      "Advanced CNC nesting",
      "Robust heavy-duty frame",
    ],
    technicalParameters: {
      power: "2000 W – 6000 W",
      bedSize: "2000 × 4000 mm",
      repeatability: "±0.02 mm",
      weight: "4,500 kg",
      cooling: "Water-cooled chiller",
      maxCuttingThickness: "Stainless Steel: up to 40 mm",
      controller: "GH CNC Touch Panel",
      voltage: "380V / 50Hz, 3 Phase",
      assistGas: "Oxygen / Nitrogen / Air",
    },
    samples: [
      "https://www.lasertechnologies.co.in/images/homepage/list-page/gh-series.webp",
    ],
  },
  {
    id: "c5",
    name: "GX Series",
    subcategory: "Sheet Cutting Machine",
    image:
      "https://www.lasertechnologies.co.in/images/homepage/list-page/gx-series.webp",
    description:
      "Next-generation fiber laser cutter with ultra-high precision and efficiency for industrial operations.",
    detailedDescription: `The GX Series integrates intelligent CNC controls with advanced motion systems to deliver precise and fast sheet cutting. 
Automated handling, nesting, and safety systems allow operators to focus on production management rather than manual intervention.`,
    reliability: `Continuous operation capable, with remote monitoring and modular design for easy maintenance.`,
    safety: `Enclosed cutting area, optical safety interlocks, and emergency stop zones protect operators and equipment.`,
    video: "https://youtu.be/VIDEO_ID_4",
    features: [
      "Ultra-precision cutting",
      "Automated sheet handling",
      "Advanced AI-assisted nesting",
      "Intuitive CNC interface",
    ],
    technicalParameters: {
      power: "1500 W – 5000 W",
      bedSize: "1500 × 3000 mm",
      repeatability: "±0.015 mm",
      weight: "3,500 kg",
      cooling: "Water-cooled chiller",
      maxCuttingThickness: "Carbon Steel: up to 35 mm",
      controller: "GX CNC Touch Panel",
      voltage: "380V / 50Hz, 3 Phase",
      assistGas: "Oxygen / Nitrogen",
    },
    samples: [
      "https://www.lasertechnologies.co.in/images/homepage/list-page/gx-series.webp",
    ],
  },
  {
    id: "c6",
    name: "GV SERIES",
    subcategory: "Sheet Cutting Machine",
    image:
      "https://www.lasertechnologies.co.in/images/homepage/list-page/gv-series.webp",
    description:
      "High-speed fiber laser cutting system engineered for precision and reliability in industrial production.",
    detailedDescription: `The GV Series offers fast, accurate sheet cutting with minimal downtime. 
Its integrated CNC controls, automated loading/unloading, and advanced motion technology deliver consistent production output and quality.`,
    reliability: `Built for high-duty cycles, with predictive maintenance and modular components for easy serviceability.`,
    safety: `Fully enclosed cutting area, multi-zone emergency stops, and laser interlocks for operator protection.`,
    video: "https://youtu.be/VIDEO_ID_5",
    features: [
      "High-speed precision cutting",
      "Automated sheet handling",
      "Advanced CNC nesting",
      "Operator-friendly interface",
    ],
    technicalParameters: {
      power: "1200 W – 4500 W",
      bedSize: "1500 × 3000 mm",
      repeatability: "±0.02 mm",
      weight: "3,200 kg",
      cooling: "Water-cooled chiller",
      maxCuttingThickness: "Stainless Steel: up to 30 mm",
      controller: "GV CNC Touch Panel",
      voltage: "380V / 50Hz, 3 Phase",
      assistGas: "Oxygen / Nitrogen / Air",
    },
    samples: [
      "https://www.lasertechnologies.co.in/images/homepage/list-page/gv-series.webp",
    ],
  },
    ],
  },
  {
    id: "laser-cutting-machines-2",
    name: "Laser Cutting Machines 2",
    subs: [
      "High Power",
      "Medium Power",
      "Compact Series",
      "Dual Beam",
      "Sheet Cutter",
      "Pipe Cutter",
    ],
    products: [
      {
        id: "l1",
        name: "DualBeam 2000",
        subcategory: "Dual Beam",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f8c?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        description: "Dual beam laser cutting for thick metals.",
        detailedDescription:
          "DualBeam 2000 uses two synchronized beams to split thermal load and increase cutting speed on thick plates. It includes active beam alignment and a ruggedized frame for stable operation.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        features: [
          "Dual-beam synchronization",
          "Adaptive power control",
          "Active beam alignment",
        ],
        technicalParameters: {
          power: "2000 W (combined)",
          bedSize: "2000 × 4000 mm",
          maxThickness: "60 mm (steel)",
        },
        samples: [
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f8c?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        ],
      },
      {
        id: "l2",
        name: "CompactEdge 500",
        subcategory: "Compact Series",
        image:
          "https://images.unsplash.com/photo-1614064642348-4f2d2eb22aa3?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        description: "Compact laser system ideal for workshops.",
        detailedDescription:
          "CompactEdge 500 is tailored for small to mid-sized workshops that need a reliable, low-footprint cutter with professional-grade optics and a simplified user experience.",
        features: [
          "Compact footprint",
          "Low operating cost",
          "Easy maintenance",
        ],
        technicalParameters: {
          power: "500 W",
          bedSize: "1200 × 2400 mm",
          repeatability: "±0.04 mm",
        },
        samples: [
          "https://images.unsplash.com/photo-1614064642348-4f2d2eb22aa3?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        ],
      },
      {
        id: "l3",
        name: "PipeLaser Max",
        subcategory: "Pipe Cutter",
        image:
          "https://images.unsplash.com/photo-1616627564585-7f5bdbb2cebe?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        description: "Precision pipe cutting with laser accuracy.",
        detailedDescription:
          "PipeLaser Max is an industry-leading pipe and tube cutting system with multi-axis control for chamfers, bevels, and precision end finishes. It supports various diameters with rapid changeover.",
        features: [
          "Multi-axis cutting head",
          "Quick diameter changeover",
          "Integrated clamp system",
        ],
        technicalParameters: {
          power: "1000 W",
          diameterRange: "20 mm – 800 mm",
          repeatability: "±0.05 mm",
        },
        samples: [
          "https://images.unsplash.com/photo-1616627564585-7f5bdbb2cebe?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        ],
      },
      {
        id: "l4",
        name: "SheetCut Ultra",
        subcategory: "Sheet Cutter",
        image:
          "https://images.unsplash.com/photo-1581092335307-6b8f5b7a5f25?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        description: "High-speed sheet metal cutting system.",
        detailedDescription:
          "SheetCut Ultra focuses on high-throughput sheet metal processing with industry-leading cycle times, efficient nesting, and optional pallet exchange to keep production continuous.",
        features: [
          "High-speed gantry",
          "Optimized nesting engine",
          "Optional pallet exchange",
        ],
        technicalParameters: {
          power: "1500 W",
          bedSize: "2500 × 6000 mm",
          throughput: "up to 1200 m²/month",
        },
        samples: [
          "https://images.unsplash.com/photo-1581092335307-6b8f5b7a5f25?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        ],
      },
    ],
  },
  {
    id: "laser-marking-machine",
    name: "Laser Marking Machine",
    subs: [
      "Fiber Marker",
      "CO2 Marker",
      "UV Marker",
      "Portable Marker",
      "3D Marker",
    ],
    products: [
      {
        id: "m1",
        name: "FiberMark Pro",
        subcategory: "Fiber Marker",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        description: "Permanent fiber marking for traceability.",
        detailedDescription:
          "FiberMark Pro provides high-contrast permanent marking on metals and engineered plastics. It is built for traceability in manufacturing and can be integrated into production lines for serialization.",
        features: [
          "High contrast marking",
          "Low power consumption",
          "Line-integration ready",
        ],
        technicalParameters: {
          power: "20 W",
          markingArea: "100 × 100 mm",
          markSpeed: "up to 2000 mm/s",
        },
        samples: [
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        ],
      },
      {
        id: "m2",
        name: "CO2 MarkJet",
        subcategory: "CO2 Marker",
        image:
          "https://images.unsplash.com/photo-1558981359-219d6364c9c7?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        description: "Versatile CO2 laser marking machine.",
        detailedDescription:
          "CO2 MarkJet excels at marking non-metal materials including wood, leather, and glass. It offers high resolution engraving and flexible fixturing options.",
        features: [
          "Excellent on non-metals",
          "High resolution engraving",
          "Flexible fixtures",
        ],
        technicalParameters: {
          power: "30 W",
          markingArea: "300 × 300 mm",
          resolution: "1200 dpi",
        },
        samples: [
          "https://images.unsplash.com/photo-1558981359-219d6364c9c7?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        ],
      },
      {
        id: "m3",
        name: "UV UltraMark 3D",
        subcategory: "3D Marker",
        image:
          "https://images.unsplash.com/photo-1556906781-9d9e9a08b3b0?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        description: "Advanced 3D UV marking technology.",
        detailedDescription:
          "UV UltraMark 3D is tailored for microtext, high-contrast marking, and delicate substrates where heat must be minimized. The 3D capability allows for marking on contoured surfaces.",
        features: [
          "Low-heat UV process",
          "3D surface following",
          "Microtext capability",
        ],
        technicalParameters: {
          power: "10 W",
          wavelength: "355 nm",
          minFeature: "50 μm",
        },
        samples: [
          "https://images.unsplash.com/photo-1556906781-9d9e9a08b3b0?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        ],
      },
    ],
  },
  {
    id: "gcc-plotter-laser-system",
    name: "GCC Plotter Laser System",
    subs: [
      "Entry Level",
      "Mid Range",
      "Pro Series",
      "Hybrid System",
      "SmartPlot",
    ],
    products: [
      {
        id: "g1",
        name: "GCC SmartPlot 500",
        subcategory: "SmartPlot",
        image:
          "https://images.unsplash.com/photo-1605184184764-1d4efcbac9b0?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        description: "Smart plotting system for modern industries.",
        detailedDescription:
          "GCC SmartPlot 500 integrates plotting and laser plotting capabilities for dynamic production environments. It offers variable toolheads and automatic calibration routines.",
        features: [
          "Hybrid plotting modes",
          "Automatic calibration",
          "Smart toolhead swap",
        ],
        technicalParameters: { power: "varies", bedSize: "1000 × 2000 mm" },
        samples: [
          "https://images.unsplash.com/photo-1605184184764-1d4efcbac9b0?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        ],
      },
      {
        id: "g2",
        name: "HybridEdge Pro",
        subcategory: "Hybrid System",
        image:
          "https://images.unsplash.com/photo-1629904853891-02d66a1e87c6?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        description: "Dual laser-plotting hybrid technology.",
        detailedDescription:
          "HybridEdge Pro combines precision plotting and laser cutting in one platform. It reduces footprint and increases flexibility for multi-step processes.",
        features: [
          "Dual-mode operation",
          "Integrated CAM",
          "High precision stages",
        ],
        technicalParameters: {
          power: "1000 W (laser)",
          bedSize: "1500 × 3000 mm",
        },
        samples: [
          "https://images.unsplash.com/photo-1629904853891-02d66a1e87c6?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        ],
      },
      {
        id: "g3",
        name: "EntryCut 200",
        subcategory: "Entry Level",
        image:
          "https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        description: "Affordable starter-level laser plotter.",
        detailedDescription:
          "EntryCut 200 is built for makers, schools, and small shops. It is easy to use, maintain, and upgrade as skills and needs grow.",
        features: [
          "Affordable",
          "Educational-friendly controls",
          "Upgradeable modules",
        ],
        technicalParameters: { power: "200 W", bedSize: "600 × 900 mm" },
        samples: [
          "https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=1600&auto=format&fit=crop&crop=entropy",
        ],
      },
    ],
  },
];
