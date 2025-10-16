export interface Product {
  Segment: string;
  SubCategory: string;
  ProductName: string;
  ShortDescription?: string | null;
  Features?: string | null;
  ProductDescription?: string | null;
  TechnicalSpecifications?: string | null;
  ProductVideoURL?: string | null;
  CuttingSamplesURL?: string | null;
  ThumbnailURL?: string | null;
}

export interface ProductCategory {
  [subCategory: string]: Product[];
}

export interface Data {
  [segment: string]: ProductCategory;
}

export const data: Data = {
  Cutting: {
    "Sheet Cutting Machine": [
      {
        Segment: "Cutting",
        SubCategory: "Sheet Cutting Machine",
        ProductName: "C Series",
        ShortDescription:
          "High-performance fiber laser cutting machine with advanced automation, smart path optimization, and efficient material utilization for various sheet metals.",
        Features:
          "[Massive Production Database, Professional Nesting Software, Bus Control System, Real-time Component Monitoring, Millisecond-level Response, Smart Path Optimization, Small Size Bulk Transport, Easy Setup, High Cutting Precision]",
        ProductDescription:
          "Massive Production Database. While cutting sheets of different metals and thicknesses, the machine handler can invoke cutting-edge technology from the database. Comprises different thick sheet cutting technologies like air cutting, counterboring technology, perfect finish cut (PFC), lightning-fast piercing, etc. Less operational time is required as the machine optimizes the cutting path. A smart typesetting algorithm increases material utilization. Bus Control System enables fast and stable data transmission via EtherCAT. Monitor core components in real time. Open-type single platform structure allows loading from front, left, and right sides. Ship four C3015 units in one 40HQ container, saving overseas freight and ideal for bulk orders.",
        TechnicalSpecifications:
          `[
  {"Model": "C3015", "Power": "1500W-6000W", "Processing format (L*W)": "3048mm*1524mm", "X/Y-axis Positioning Accuracy": "±0.05mm/m"},
  {"Model": "C4020", "Power": "1500W-6000W", "Processing format (L*W)": "4064mm*2032mm", "X/Y-axis Positioning Accuracy": "±0.05mm/m"},
  {"Model": "C6025", "Power": "3000W-20000W", "Processing format (L*W)": "6096mm*2540mm", "X/Y-axis Positioning Accuracy": "±0.05mm/m"},
  {"Model": "C12025", "Power": "12000W-60000W", "Processing format (L*W)": "12500mm*2540mm", "X/Y-axis Positioning Accuracy": "±0.05mm/m"},
  {"Model": "C13030", "Power": "12000W-60000W", "Processing format (L*W)": "13100mm*3100mm", "X/Y-axis Positioning Accuracy": "±0.05mm/m"}
]
`,
        ProductVideoURL: "https://www.youtube.com/embed/ruvxBuI_DeY?si=As2QGO9XKjprNHbc",
        CuttingSamplesURL:
          '["https://www.lasertechnologies.co.in/images/products/c-series/sample1-web.webp", "https://www.lasertechnologies.co.in/images/products/c-series/sample7-web.webp"]',
        ThumbnailURL:
          "https://www.lasertechnologies.co.in/images/homepage/hsg-fiber-laser-cutting-machine/c-series-laser-cutter.webp",
      },
      {
        Segment: "Cutting",
        SubCategory: "Sheet Cutting Machine",
        ProductName: "GX Series",
        ShortDescription:
          "A laser cutting machine with a double exchange platform (3000W-6000W) designed for enhanced performance, precision, and optimized cutting paths for various metal sheets.",
        Features:
          "[Upgraded transmission system for high performance, Alpha T Bus CNC System, Intelligent path optimization, Smart vibration control, Torque protection of dual drives, Upgraded Matrix Machine Bed with improved rigidity, Lightweight fifth-generation aluminum beam]\n",
        ProductDescription:
          "The GX Series is designed for precision and efficiency in cutting metal sheets. With its double exchange platform, it optimizes production by allowing continuous operations while minimizing downtime. Features include advanced CNC control via the Alpha T Bus system, intelligent path optimization, vibration control, torque protection, and an upgraded matrix machine bed for superior rigidity. The lightweight fifth-generation aluminum beam enhances dynamic performance, allowing faster and accurate sheet cutting for various industrial applications.",
        TechnicalSpecifications:
          `[
  {"Model": "G3015X", "Power": "3000W-20000W", "Processing format (L*W)": "3048mm*1524mm", "X/Y-axis Positioning Accuracy": "±0.03mm/m"},
  {"Model": "G4020X", "Power": "3000W-20000W", "Processing format (L*W)": "4064mm*2040mm", "X/Y-axis Positioning Accuracy": "±0.03mm/m"},
  {"Model": "G6025X", "Power": "3000W-20000W", "Processing format (L*W)": "6096mm*2540mm", "X/Y-axis Positioning Accuracy": "±0.03mm/m"},
  {"Model": "G12025X", "Power": "12000W-30000W", "Processing format (L*W)": "12500mm*2540mm", "X/Y-axis Positioning Accuracy": "±0.03mm/m"}
]`,
        ProductVideoURL: "https://www.youtube.com/embed/5pAGM1vNdFA?si=DmInfo_BAdk3jWzb",
        CuttingSamplesURL:
          '["https://www.lasertechnologies.co.in/images/products/gx/gx-sample-8.webp" , "https://www.lasertechnologies.co.in/images/products/gx/gx-sample-3.webp"]',
        ThumbnailURL:
          "https://www.lasertechnologies.co.in/images/homepage/hsg-fiber-laser-cutting-machine/gx-series.webp",
      },
      {
        Segment: "Cutting",
        SubCategory: "Sheet Cutting Machine",
        ProductName: "GH Series",
        ShortDescription:
          "High-performance Fiber Laser Cutting Machine (3000W-30000W) for precise and high-speed sheet processing in industrial applications.",
        Features:
          "[Super dynamic performance for efficient processing, Bus Control System, Intelligent path optimization, Smart vibration control, Torque protection of dual drives, Heat protection without damage, High-precision transmission system, Upgraded matrix machine bed, Brand-new aluminum beam]\n",
        ProductDescription:
          "Maximum linkage speed can achieve 200m/min and the maximum linkage acceleration is 4.0G, creating a high-efficiency sheet processing scene. The upgraded bus control system ensures intelligent operations with minimal manual intervention. Heat protection devices prevent damage, while a high-precision transmission system ensures stable, long-term performance. The upgraded matrix machine bed and new aluminum beam improve structural rigidity, reduce vibration, and enhance cutting accuracy, even for complex or high-volume tasks.",
        TechnicalSpecifications:
          `[
  {"Model": "G3015H", "Power": "3000W-30000W", "Processing Format (L*W)": "3048*1524mm", "X/Y-axis Positioning Accuracy": "±0.03mm/m"},
  {"Model": "G4020H", "Power": "3000W-30000W", "Processing Format (L*W)": "4064*2032mm", "X/Y-axis Positioning Accuracy": "±0.03mm/m"},
  {"Model": "G6025H", "Power": "6000W-30000W", "Processing Format (L*W)": "6096*2540mm", "X/Y-axis Positioning Accuracy": "±0.03mm/m"},
  {"Model": "G8025H", "Power": "12000W-30000W", "Processing Format (L*W)": "8150*2540mm", "X/Y-axis Positioning Accuracy": "±0.03mm/m"},
  {"Model": "G12025H", "Power": "12000W-30000W", "Processing Format (L*W)": "12500*2540mm", "X/Y-axis Positioning Accuracy": "±0.03mm/m"}
]
`,
        ProductVideoURL: "https://www.youtube.com/embed/enoVPA0T2P4?si=8euD1JbyMVXtN2PR",
        CuttingSamplesURL:
          '["https://www.lasertechnologies.co.in/images/homepage/hsg-fiber-laser-cutting-machine/gh-series.webp"]',
        ThumbnailURL:
          "https://www.lasertechnologies.co.in/images/homepage/hsg-fiber-laser-cutting-machine/gh-series.webp",
      },
      {
        Segment: "Cutting",
        SubCategory: "Sheet Cutting Machine",
        ProductName: "GV Series",
        ShortDescription:
          "All-new flagship fiber laser cutting machine (6000W-60000W) optimized for thick sheet cutting and high-efficiency industrial applications.",
        Features:
          "[Advanced thick sheet cutting, Full direct-drive linear motor, German Rexroth guide rails, Intelligent visual edge detection, Bus Control System, Small size bulk transport, Ultimate strength lathe bed, Integrated measuring system, Enhanced graphic capabilities]\n",
        ProductDescription:
          "The GV Series offers laser powers ranging from 6kW to 60kW for rapid and precise cutting of thick sheet metals. It features a triaxial linear motor system with exceptional speed, acceleration, and repeatability. Intelligent visual edge detection enhances quality control for irregular plates. The robust lathe bed and dual-guide rail system ensure stability and rigidity. Advanced measuring systems and graphic capabilities optimize workflow and allow seamless integration with multiple file formats. Designed for high-volume, industrial-scale production with minimal downtime.",
        TechnicalSpecifications:
          `[
  {"Model": "G4020V", "Power": "6kW-60kW", "Processing Format (L*W)": "4064mm*2040mm", "X/Y-axis Positioning Accuracy": "±0.01mm/m", "X/Y-axis Repositioning Accuracy": "300m/min", "Max Linkage Acceleration": "6G"}
]
`,
        ProductVideoURL: null,
        CuttingSamplesURL:
          '["https://www.lasertechnologies.co.in/images/products/gv-series/8.jpg"]',
        ThumbnailURL:
          "https://www.lasertechnologies.co.in/images/homepage/hsg-fiber-laser-cutting-machine/gv-series.webp",
      },
      {
        Segment: "Cutting",
        SubCategory: "Sheet Cutting Machine",
        ProductName: "GFA Series",
        ShortDescription:
          "High-power, large-format laser cutting machine (12kW-30kW) capable of cutting large sheets and profile steels with customizable formats.",
        Features:
          "[Cuts large-format thick sheets, Alpha T Bus CNC System, Micro-connection cutting, Active obstacle avoidance, Real-time monitoring, HSG-NEST nesting software, Modular platform, Eco-friendly ventilation system, P10/P20/P30 Autofocus Laser Cutting Head\n]",
        ProductDescription:
          "The GFA Series is designed for large-format sheet and profile steel cutting with laser powers between 12kW and 30kW. It features a modular platform for flexibility, active obstacle avoidance, and a P10/P20/P30 autofocus laser cutting head to adapt to material thickness. The Alpha T Bus CNC System ensures efficient data transmission, while HSG-NEST software optimizes cutting paths. An eco-friendly ventilation system maintains clean operations, and real-time monitoring provides operational safety. Customizable format length and high precision make it ideal for industrial applications requiring large-scale sheet processing.",
        TechnicalSpecifications:
          `[
  {"Model": "G12025FA", "Power": "12000W - 60000W", "Processing Format (L*W)": "12100 × 2500 mm", "X/Y-Axis Positioning Accuracy": "±0.05 mm/m"}
]
`,
        ProductVideoURL:
          "https://www.youtube.com/embed/JNyYpAcVWs8?si=y2LDMhAtPye2vCE-",
        CuttingSamplesURL:
          '["https://www.lasertechnologies.co.in/images/products/bevel-gfa-series/gfa-sample-1.webp", "https://www.lasertechnologies.co.in/images/products/bevel-gfa-series/gfa-sample-7.webp"]',
        ThumbnailURL:
          "https://www.lasertechnologies.co.in/images/homepage/hsg-fiber-laser-cutting-machine/gfa-series-laser-cutting-machine.webp",
      },
      {
        Segment: "Cutting",
        SubCategory: "Sheet Cutting Machine",
        ProductName: "Bevel GFA Series",
        ShortDescription:
          "A large-format bevel laser cutting machine (12kW–30kW) with 45° bevel capability and modular platform design.",
        Features:
          "[Alpha T Bus CNC System, 45° Bevel Cutting, Large-Format Thick Sheet Cutting, P10/P20/P30 Autofocus Laser Head, Modular Platform, Eco-Friendly Ventilation, Real-Time Component Monitoring, Automatic Nozzle Management, High Precision Cutting]",
        ProductDescription:
          "The Bevel GFA Series is designed for cutting large-format thick sheets with precision and efficiency. Its 45° bevel capability allows V-, X-, and Y-shaped bevels to form in a single pass. Equipped with the Alpha T Bus CNC system, the machine ensures seamless data transmission and intelligent control. The modular platform enables flexibility in configuration, while eco-friendly ventilation and real-time monitoring keep operations safe and efficient. Its P10/P20/P30 autofocus laser cutting head adapts to material thickness, with active obstacle avoidance and automatic cooling. Regular maintenance reminders and high-precision cutting features make it ideal for professional manufacturing environments.",
        TechnicalSpecifications:
          `[
  {
    "Model": "Bevel-GFA-12025",
    "Power": "12000W-30000W",
    "Processing_Format_LxW": "24000 x 5000 mm",
    "X/Y_Axis_Positioning_Accuracy": "±0.05 mm/m"
  }
]
`,
        ProductVideoURL:
          "https://www.youtube.com/embed/JNyYpAcVWs8?si=CNsKkvKASuD-NOAz",
        CuttingSamplesURL:
          '["https://www.lasertechnologies.co.in/images/products/bevel-gfa-series/bevel-gfa-sample-2.webp" , "https://www.lasertechnologies.co.in/images/products/bevel-gfa-series/bevel-gfa-sample-7.webp"]',
        ThumbnailURL:
          "https://www.lasertechnologies.co.in/images/homepage/hsg-fiber-laser-cutting-machine/bevel-gfa-series.webp",
      },
    ],
    "Tube Cutting Machine or Pipe Cutting Machine": [
      { Segment: "Cutting", SubCategory: "Tube Cutting Machine or Pipe Cutting Machine", ProductName: "R1" },
      { Segment: "Cutting", SubCategory: "Tube Cutting Machine or Pipe Cutting Machine", ProductName: "R2" },
      { Segment: "Cutting", SubCategory: "Tube Cutting Machine or Pipe Cutting Machine", ProductName: "R3" },
      { Segment: "Cutting", SubCategory: "Tube Cutting Machine or Pipe Cutting Machine", ProductName: "T" },
      { Segment: "Cutting", SubCategory: "Tube Cutting Machine or Pipe Cutting Machine", ProductName: "TL" },
      { Segment: "Cutting", SubCategory: "Tube Cutting Machine or Pipe Cutting Machine", ProductName: "TX3R" },
      { Segment: "Cutting", SubCategory: "Tube Cutting Machine or Pipe Cutting Machine", ProductName: "T2" },
      { Segment: "Cutting", SubCategory: "Tube Cutting Machine or Pipe Cutting Machine", ProductName: "TS2" },
    ],
    "Sheet and Tube Cutting Machine": [
      { Segment: "Cutting", SubCategory: "Sheet and Tube Cutting Machine", ProductName: "GB" },
    ],
    "Fully Automatic Sheet Cutting Machine": [
      { Segment: "Cutting", SubCategory: "Fully Automatic Sheet Cutting Machine", ProductName: "ALG (Loading And Unloading) " },
    ],
    "Electrical Steel / Electrolamination Sheet Cutting Machine": [
      { Segment: "Cutting", SubCategory: "Electrical Steel / Electrolamination Sheet Cutting Machine", ProductName: "Effective S" },
      { Segment: "Cutting", SubCategory: "Electrical Steel / Electrolamination Sheet Cutting Machine", ProductName: "Effective L" },
    ],
  },
  SheetBending: {
    "NC Sheet Bending Machine (straightforward, repetitive, or simple-angle jobs.)": [
      { Segment: "Sheet Bending", SubCategory: "NC Sheet Bending Machine (straightforward, repetitive, or simple-angle jobs.)", ProductName: "Upstroke NC Press Brake" },
    ],
    "CNC Sheet Bending Machine (Complex Jobs- multi-angle, precise, and variable geometry jobs, including high-volume or highly customized applications.)": [
      { Segment: "Sheet Bending", SubCategory: "CNC Sheet Bending Machine (Complex Jobs- multi-angle, precise, and variable geometry jobs, including high-volume or highly customized applications.)", ProductName: "Downstroke CNC Press Brake" },
    ],
    "Pump-Controlled CNC Sheet Bending Machine (Mass Production and Energy Efficient) Designed for heavy-gauge, thick sheets, high tonnage, intricate curves, and large-scale or specialized components requiring strong hydraulic force.": [
      { Segment: "Sheet Bending", SubCategory: "Pump-Controlled CNC Sheet Bending Machine (Mass Production and Energy Efficient) Designed for heavy-gauge, thick sheets, high tonnage, intricate curves, and large-scale or specialized components requiring strong hydraulic force.", ProductName: "Pump Control CNC Press Brake" },
    ],
    "\"CNC V-Grooving Machine (CNC V-Grooving Machines are ideal for pre-scoring panels for bending, producing high-precision fold lines, and supporting complex, multi-angle, or aesthetic designs.\n\nWidely used in industries requiring repeatable folds, decorative panels, or functional sheet bending without deforming the material.)\"": [
      { Segment: "Sheet Bending", SubCategory: "\"CNC V-Grooving Machine (CNC V-Grooving Machines are ideal for pre-scoring panels for bending, producing high-precision fold lines, and supporting complex, multi-angle, or aesthetic designs.\n\nWidely used in industries requiring repeatable folds, decorative panels, or functional sheet bending without deforming the material.)\"", ProductName: "Double-Head Vertical CNC V-Grooving Machine" },
    ],
    PowerBend: [
      { Segment: "Sheet Bending", SubCategory: "Power Bend", ProductName: "Power Bend" },
    ],
    SmartBend: [
      { Segment: "Sheet Bending", SubCategory: "Smart Bend", ProductName: "Effective Bend" },
    ],
    PanelBender: [
      { Segment: "Sheet Bending", SubCategory: "Panel Bender", ProductName: "PBE Series" },
    ],
  },
  PipeAndTubeBending: {
    "Pipe and Tube Bending Machine ": [
      { Segment: "Pipe and Tube Bending", SubCategory: "Pipe and Tube Bending Machine ", ProductName: "BLMA" },
    ],
  },
  SheetPunching: {
    "CNC Turret Punch Press": [
      { Segment: "Sheet Punching", SubCategory: "CNC Turret Punch Press", ProductName: "Dardontech\n" },
    ],
  },
  Welding: {
    "Handheld Laser Welding Machine": [
      { Segment: "Welding", SubCategory: "Handheld Laser Welding Machine", ProductName: "Smart Weld" },
    ],
    "Air-Cooled Handheld Laser Welding Machine": [
      { Segment: "Welding", SubCategory: "Air-Cooled Handheld Laser Welding Machine", ProductName: "Air-Cooled" },
    ],
    "Robotic Laser Welding Machine": [
      { Segment: "Welding", SubCategory: "Robotic Laser Welding Machine", ProductName: "CoboWeld" },
    ],
    "Open Laser Welding Machine": [
      { Segment: "Welding", SubCategory: "Open Laser Welding Machine", ProductName: "AL Series" },
      { Segment: "Welding", SubCategory: "Open Laser Welding Machine", ProductName: "AL IN" },
      { Segment: "Welding", SubCategory: "Open Laser Welding Machine", ProductName: "AL-F OEM" },
      { Segment: "Welding", SubCategory: "Open Laser Welding Machine", ProductName: "AL-ROCK Modular" },
      { Segment: "Welding", SubCategory: "Open Laser Welding Machine", ProductName: "AL-TW" },
    ],
    "Closed Laser Welding Machine": [
      { Segment: "Welding", SubCategory: "Closed Laser Welding Machine", ProductName: "ALW" },
      { Segment: "Welding", SubCategory: "Closed Laser Welding Machine", ProductName: "ALV" },
      { Segment: "Welding", SubCategory: "Closed Laser Welding Machine", ProductName: "ALO 100 | 120" },
      { Segment: "Welding", SubCategory: "Closed Laser Welding Machine", ProductName: "VL 50" },
    ],
    "Pillow Plate Laser Welding Machine": [
      { Segment: "Welding", SubCategory: "Pillow Plate Laser Welding Machine", ProductName: "Pillow Plate Laser Welding Machine" },
    ],
  },
  Marking: {
    "Fiber Laser Marking Machine": [
      { Segment: "Marking", SubCategory: "Fiber Laser Marking Machine", ProductName: "iMark Series" },
    ],
    "CO₂ Laser Marking Machine": [
      { Segment: "Marking", SubCategory: "CO₂ Laser Marking Machine", ProductName: "iMark CO2" },
    ],
    "UV Laser Marking Machine": [
      { Segment: "Marking", SubCategory: "UV Laser Marking Machine", ProductName: "iMark UV" },
    ],
  },
  Engraving: {
    "CO₂ Laser Engraving Machine": [
      { Segment: "Engraving", SubCategory: "CO₂ Laser Engraving Machine", ProductName: "Spirit GLS Engraver" },
      { Segment: "Engraving", SubCategory: "CO₂ Laser Engraving Machine", ProductName: "Spirit GLS Hybrid" },
    ],
  },
};


