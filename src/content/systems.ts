import type { SystemItem } from "./types";

/**
 * System families. Content is general engineering description; project-specific
 * design values must always come from the applicable code, authority and design
 * consultant — this is stated on every system page.
 */
export const systems: SystemItem[] = [
  {
    slug: "smoke-management",
    order: 1,
    name: "Smoke Management",
    shortName: "Smoke",
    category: "Life-safety ventilation",
    tagline: "Keep escape routes clear and visible when it matters most.",
    summary:
      "Coordinated smoke extract, make-up air and damper control that limits smoke spread and supports safe evacuation and firefighting access.",
    heroTitle: "Control smoke. Protect the path out.",
    heroIntro:
      "In most building fires, smoke — not flame — is the first and greatest threat to occupants. Override-R smoke management solutions coordinate extract fans, make-up air and dampers so that smoke is contained, diluted or removed in the way the fire engineering strategy intends.",
    visual: "smoke",
    facets: [
      { label: "Domain", value: "Life safety" },
      { label: "Integration", value: "Fire alarm · BMS" },
      { label: "Control", value: "Auto / Override" },
    ],
    menuLinks: [
      { label: "Working principle", anchor: "principle" },
      { label: "System architecture", anchor: "architecture" },
      { label: "Key components", anchor: "components" },
    ],
    relatedCategories: ["fireman-override-panels", "automatic-panels", "zone-control-panels"],
    status: "established",
    blocks: [
      {
        type: "overview",
        id: "overview",
        eyebrow: "Overview",
        title: "A system that behaves predictably on the worst day of a building's life.",
        body: [
          "Smoke management covers the equipment and control logic used to limit the movement of smoke during a fire. Depending on the building and the fire strategy, this can mean extracting smoke from the fire zone, supplying make-up air at low level, closing dampers to compartmentalise, or a combination of all three.",
          "The equipment is only half of the system. The other half is control: what starts, in what order, from which signal, and how the fire service can take over. Override-R focuses on that control layer — so every fan and damper responds the way the design intends.",
        ],
        points: [
          "Zone-based extract and make-up air sequencing",
          "Damper open/close coordination with fan start",
          "Status feedback for every controlled device",
          "Fire service override at a dedicated panel",
        ],
      },
      {
        type: "principle",
        id: "principle",
        title: "Working principle",
        intro:
          "A typical sequence links detection, decision and action. The exact cause-and-effect matrix is defined by the project's fire engineering strategy.",
        steps: [
          { title: "Detect", body: "The fire alarm system identifies an alarm in a specific zone and passes the signal to the smoke control panel." },
          { title: "Decide", body: "The control logic looks up the cause-and-effect for that zone: which fans start, which dampers open and which close." },
          { title: "Act", body: "Dampers are driven to their fire positions first, then extract and make-up air fans are started in the defined order." },
          { title: "Confirm", body: "Run and position feedback is monitored. Faults are annunciated so the fire service sees the real system state." },
          { title: "Override", body: "Firefighters can take manual control of each fan and damper from the fireman override panel at any time." },
        ],
      },
      {
        type: "architecture",
        id: "architecture",
        title: "System architecture",
        intro: "Three layers, one chain of responsibility — from the signal that starts the sequence to the device that moves the air.",
        layers: [
          { title: "Initiation", caption: "Signals in", items: ["Fire alarm panel interface", "Zone alarm inputs", "Manual call / fire service switch"] },
          { title: "Control", caption: "Logic & override", items: ["Smoke control panel", "Fireman override panel", "Cause-and-effect logic"] },
          { title: "Field", caption: "Devices out", items: ["Smoke extract fans", "Make-up air fans", "Motorised smoke dampers"] },
        ],
      },
      {
        type: "applications",
        title: "Where it is used",
        items: [
          { title: "Corridors & lobbies", body: "Keeping protected horizontal escape routes tenable in residential and commercial towers." },
          { title: "Atria & malls", body: "Large-volume spaces where smoke layers must be held above occupied levels." },
          { title: "Basements", body: "Below-ground areas with limited natural ventilation and longer escape distances." },
          { title: "Industrial halls", body: "Warehouses and process buildings where smoke can fill large floor plates quickly." },
        ],
      },
      {
        type: "components",
        id: "components",
        title: "Key components",
        items: [
          { name: "Smoke control panel", role: "Executes the cause-and-effect sequence and supervises field devices." },
          { name: "Fireman override panel", role: "Gives the fire service clear manual control and status of every fan and damper." },
          { name: "Extract & make-up air fans", role: "Rated for the smoke temperature and duration required by the design." },
          { name: "Motorised smoke dampers", role: "Open or close to direct airflow, with end-switch feedback." },
          { name: "Interface modules", role: "Connect the fire alarm, BMS and power supplies to the control layer." },
        ],
      },
      {
        type: "considerations",
        title: "Technical considerations",
        intro: "Points we review with consultants and contractors early, before panels are built.",
        items: [
          { title: "Cause-and-effect clarity", body: "Every alarm zone needs an unambiguous response. Gaps or overlaps in the matrix are the most common source of commissioning delays." },
          { title: "Power resilience", body: "Fire-mode supplies, changeover arrangements and cable survivability must align with the fire strategy and local regulations." },
          { title: "Feedback, not assumption", body: "Fans and dampers should report their actual state. A command sent is not the same as a damper confirmed open." },
          { title: "Interface with BMS", body: "Fire mode must take priority over normal building control. Hand-over signals are defined explicitly." },
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Design responsibility",
        body: "Airflow rates, fan duty points and zoning are determined by the project's fire engineer in line with applicable codes and the authority having jurisdiction. Override-R supports and implements the control strategy; it does not replace the design professional.",
      },
      { type: "related-products", title: "Products for smoke management" },
      {
        type: "faq",
        items: [
          { q: "Is smoke management the same as smoke ventilation?", a: "The terms are often used interchangeably. Smoke management is the broader term covering extract, pressurization, containment and their controls." },
          { q: "Can existing fans be integrated into a new control panel?", a: "Often, yes — subject to a site survey of the fans, motors, starters and cabling, and confirmation that the equipment meets the fire-rated requirements of the design." },
          { q: "Who defines the cause-and-effect matrix?", a: "The fire engineer or consultant defines it. We help translate it into control logic, wiring and test procedures." },
        ],
      },
      { type: "enquiry", title: "Planning a smoke management system?", body: "Share your drawings or fire strategy and our engineers will review the control requirements with you." },
    ],
  },
  {
    slug: "pressurization",
    order: 2,
    name: "Pressurization",
    shortName: "Pressurization",
    category: "Escape route protection",
    tagline: "Hold the pressure. Keep the stair clear.",
    summary:
      "Staircase and lobby pressurization controls that maintain a protected escape route by keeping smoke out through controlled pressure differential.",
    heroTitle: "A protected stair is a pressurized stair.",
    heroIntro:
      "Pressurization keeps smoke out of escape stairs, lobbies and lift shafts by maintaining a higher air pressure inside the protected space than in the fire floor. Override-R controls modulate supply air to hold that differential — whether one door or many are open.",
    visual: "pressurization",
    facets: [
      { label: "Domain", value: "Escape routes" },
      { label: "Method", value: "Pressure differential" },
      { label: "Control", value: "Modulating / Static" },
    ],
    menuLinks: [
      { label: "Staircase pressurization", anchor: "subsystems" },
      { label: "Static pressure systems", anchor: "subsystems" },
      { label: "Working principle", anchor: "principle" },
    ],
    relatedCategories: ["staircase-pressurization-controls", "static-pressure-controls", "fireman-override-panels"],
    status: "established",
    blocks: [
      {
        type: "overview",
        eyebrow: "Overview",
        title: "Positive pressure is an invisible wall against smoke.",
        body: [
          "When a fire is detected, supply fans deliver outside air into the protected space. The resulting pressure difference across closed doors prevents smoke leaking in, while airflow across open doors pushes smoke back toward the fire floor.",
          "The challenge is control. Pressure must be high enough to resist smoke, yet low enough that occupants can still open the door. Override-R controls continuously sense the differential and adjust supply to stay within the designed band.",
        ],
      },
      {
        type: "subsystems",
        id: "subsystems",
        title: "Two approaches, one objective",
        intro: "The right approach depends on the building, the code path and the fire engineer's strategy.",
        items: [
          {
            title: "Staircase pressurization",
            body: "Supply air is delivered into the stair shaft to maintain a pressure differential against adjacent floors. Variable-speed fans or relief dampers respond to doors opening and closing during evacuation.",
            bullets: ["Supply fan with variable-speed drive", "Differential pressure sensing", "Pressure relief arrangement", "Fire-mode start from alarm"],
            visual: "pressurization",
          },
          {
            title: "Static pressure systems",
            body: "Static pressure controls hold a fixed setpoint in ducts or protected spaces by modulating fan output against a measured reference — suited to lobbies, lift wells and duct-based supply systems.",
            bullets: ["Setpoint-based closed-loop control", "Duct or space pressure transmitters", "Alarm on high / low deviation", "Manual override available"],
            visual: "controller",
          },
        ],
      },
      {
        type: "principle",
        id: "principle",
        title: "Working principle",
        intro: "A closed control loop: measure, compare, correct — continuously, for the duration of the event.",
        steps: [
          { title: "Fire signal", body: "The fire alarm system signals fire mode and the pressurization panel starts the supply fan." },
          { title: "Measure", body: "Differential pressure transmitters compare the stair or lobby with the reference space." },
          { title: "Compare", body: "The controller compares the measured value with the designed setpoint band." },
          { title: "Correct", body: "Fan speed or relief damper position is adjusted to bring pressure back within the band as doors open and close." },
        ],
      },
      {
        type: "applications",
        title: "Applications",
        items: [
          { title: "High-rise residential", body: "Protected stairs as the primary escape and firefighting route." },
          { title: "Commercial towers", body: "Multiple stair cores and firefighting lobbies on every floor." },
          { title: "Hospitals", body: "Phased evacuation where routes must remain protected for extended durations." },
          { title: "Lift shafts & lobbies", body: "Firefighting and evacuation lifts requiring smoke-free approaches." },
        ],
      },
      {
        type: "components",
        title: "Components",
        items: [
          { name: "Pressurization control panel", role: "Fire-mode start, fan control and supervision." },
          { name: "Differential pressure transmitter", role: "Continuously measures the protected-space differential." },
          { name: "Variable-speed drive", role: "Modulates supply fan output in response to the control loop." },
          { name: "Supply air fan", role: "Delivers outside air to the protected space." },
          { name: "Relief / bypass damper", role: "Prevents over-pressure when doors are closed." },
        ],
      },
      {
        type: "considerations",
        title: "Technical considerations",
        items: [
          { title: "Door opening force", body: "Excessive pressure can prevent occupants opening stair doors. The control band must respect the applicable door-force limits." },
          { title: "Air intake location", body: "Supply air must be drawn from a location that will not be contaminated by smoke from the building." },
          { title: "Response time", body: "Control loops must react quickly enough to door openings without hunting or oscillation — tuning is done at commissioning." },
          { title: "Sensor placement", body: "Reference and measurement points must be selected so readings represent real conditions, not local turbulence." },
        ],
      },
      { type: "related-products", title: "Pressurization controls" },
      {
        type: "faq",
        items: [
          { q: "What pressure differential should a stair maintain?", a: "Design values are defined by the code and standard applicable to your project. We implement and commission the control to the specified values; we do not set them." },
          { q: "Do we need variable-speed fans?", a: "Not always. Some designs use fixed-speed fans with barometric or motorised relief. The choice depends on the strategy and the number of doors expected to be open." },
        ],
      },
      { type: "enquiry", title: "Discuss a pressurization project", body: "Tell us about the stair cores, lobbies and design basis — we will propose a control approach." },
    ],
  },
  {
    slug: "ventilation",
    order: 3,
    name: "Ventilation",
    shortName: "Ventilation",
    category: "Environmental & smoke clearance",
    tagline: "Everyday air quality. Emergency-ready control.",
    summary:
      "Car park and room ventilation controls that manage day-to-day air quality and switch seamlessly into fire mode when required.",
    heroTitle: "Ventilation that works every day — and on the one day that counts.",
    heroIntro:
      "Ventilation systems run for thousands of hours in normal mode and must still perform instantly in an emergency. Override-R ventilation controls handle both: demand-based operation for efficiency and a clear, prioritised fire mode.",
    visual: "ventilation",
    facets: [
      { label: "Domain", value: "Car parks · Rooms" },
      { label: "Modes", value: "Normal · Fire" },
      { label: "Integration", value: "Sensors · BMS" },
    ],
    menuLinks: [
      { label: "Car park ventilation", anchor: "subsystems" },
      { label: "Room ventilation", anchor: "subsystems" },
      { label: "System integration", anchor: "architecture" },
    ],
    relatedCategories: ["car-park-ventilation-controls", "room-ventilation-controls", "fireman-override-panels"],
    status: "established",
    blocks: [
      {
        type: "subsystems",
        id: "subsystems",
        title: "Ventilation families",
        intro: "Different spaces, different drivers — one consistent control philosophy.",
        items: [
          {
            title: "Car park ventilation",
            body: "Controls for impulse/jet fan and ducted car park systems. In normal mode, fans respond to pollutant levels; in fire mode, they follow the smoke clearance strategy for the affected zone.",
            bullets: ["Gas-sensor based demand control", "Zone-wise fire sequencing", "Jet fan group control", "Main extract fan coordination"],
            visual: "ventilation",
          },
          {
            title: "Room ventilation",
            body: "Controls for plant rooms, electrical rooms, kitchens, toilets and technical spaces — scheduled, temperature-based or interlocked with other equipment.",
            bullets: ["Time and temperature control", "Supply / extract interlocks", "Run and trip status", "Fire-mode shutdown or run"],
            visual: "controller",
          },
        ],
      },
      {
        type: "modes",
        id: "control",
        title: "Ventilation control",
        intro: "Every ventilation panel operates in clearly defined, prioritised modes.",
        modes: [
          { id: "normal", label: "Normal mode", summary: "Fans run to schedule or demand. Energy is used only when air quality or temperature requires it.", operator: "Automatic / BMS", sequence: ["Sensor or schedule demand", "Stage fans to required level", "Return to standby when clear"] },
          { id: "fire", label: "Fire mode", summary: "On a fire signal, normal operation is overridden and the smoke strategy for the zone takes over.", operator: "Fire alarm", sequence: ["Fire signal from alarm panel", "Normal control locked out", "Zone smoke sequence starts", "Status reported to override panel"] },
          { id: "manual", label: "Manual override", summary: "Fire service or authorised personnel control fans directly from the override panel.", operator: "Fire service", sequence: ["Key-switch enable", "Select fan or group", "Start / stop / auto per device"] },
        ],
      },
      {
        type: "architecture",
        id: "architecture",
        title: "System integration",
        intro: "Ventilation controls sit between sensors, life-safety systems and the building management system.",
        layers: [
          { title: "Inputs", caption: "Sensing", items: ["CO / NO₂ gas sensors", "Temperature sensors", "Fire alarm signals", "BMS commands"] },
          { title: "Control", caption: "Prioritised logic", items: ["Ventilation control panel", "Fire-mode priority", "Fireman override panel"] },
          { title: "Outputs", caption: "Air movement", items: ["Jet / impulse fans", "Main extract fans", "Supply fans", "Dampers"] },
        ],
      },
      {
        type: "applications",
        title: "Applications",
        items: [
          { title: "Basement car parks", body: "Residential, commercial and mixed-use developments." },
          { title: "Multi-level parking", body: "Enclosed parking structures with multiple fire zones." },
          { title: "Plant & electrical rooms", body: "Heat removal and fire-mode interlocks." },
          { title: "Commercial kitchens", body: "Extract interlocks with supply and fire suppression." },
        ],
      },
      {
        type: "considerations",
        title: "Technical considerations",
        items: [
          { title: "Mode priority", body: "Fire mode must always take precedence over BMS or demand control, with no path for normal logic to interfere." },
          { title: "Sensor maintenance", body: "Gas sensors drift and need periodic calibration — maintenance access should be planned from the start." },
          { title: "Zoning alignment", body: "Ventilation fire zones should match the fire alarm zones so the right fans respond to the right alarm." },
        ],
      },
      { type: "related-products", title: "Ventilation controls" },
      {
        type: "faq",
        items: [
          { q: "Can one panel control both normal and fire modes?", a: "Yes. A single panel can handle demand-based ventilation and fire mode, provided the fire-mode logic has clear priority and meets the project's life-safety requirements." },
          { q: "Do you supply the gas sensors?", a: "Sensor supply can be included in a project scope. Final selection depends on the specified gases and the design." },
        ],
      },
      { type: "enquiry", title: "Need car park or room ventilation control?", body: "Send us the fan schedule and zoning — we will review the control approach." },
    ],
  },
  {
    slug: "fireman-override-systems",
    order: 4,
    name: "Fireman Override Systems",
    shortName: "Fireman Override",
    category: "Fire service control",
    tagline: "Clear control for the people who run toward the fire.",
    summary:
      "Fireman override panels that give the fire service unambiguous status and manual control of every life-safety fan and damper in the building.",
    heroTitle: "When the fire service arrives, control must be instant and obvious.",
    heroIntro:
      "The fireman override panel is the fire service's single point of control for smoke management, pressurization and ventilation equipment. Override-R designs these panels around one principle: a firefighter under pressure must understand the system at a glance.",
    visual: "override",
    facets: [
      { label: "User", value: "Fire service" },
      { label: "Modes", value: "Auto · Semi-auto · Manual" },
      { label: "Scope", value: "Zone control" },
    ],
    menuLinks: [
      { label: "Operating modes", anchor: "modes" },
      { label: "Control philosophy", anchor: "philosophy" },
      { label: "System architecture", anchor: "architecture" },
    ],
    relatedCategories: ["fireman-override-panels", "automatic-panels", "semi-automatic-panels", "zone-control-panels"],
    status: "established",
    blocks: [
      {
        type: "overview",
        eyebrow: "Fireman override panel",
        title: "One panel. Every life-safety fan and damper. No ambiguity.",
        body: [
          "A fireman override panel (FOP) displays the status of smoke control equipment and allows authorised fire service personnel to override automatic operation — starting, stopping or returning each device to automatic control.",
          "Layout, labelling and switch logic matter as much as the electronics inside. Override-R panels are organised by zone and system so the panel mirrors the building, not the wiring.",
        ],
        points: [
          "Per-device Auto / On / Off control",
          "Run, trip and position indication",
          "Zone-based layout matching the building",
          "Key-switch protected enabling",
        ],
      },
      {
        type: "modes",
        id: "modes",
        title: "Operating modes",
        intro: "Each mode defines who — or what — is in control, and how the panel responds.",
        modes: [
          { id: "auto", label: "Automatic", summary: "The panel executes the cause-and-effect sequence directly from fire alarm signals, without operator input.", operator: "Fire alarm system", sequence: ["Alarm received from zone", "Cause-and-effect applied", "Fans and dampers driven to fire positions", "Status displayed on panel"] },
          { id: "semi", label: "Semi-automatic", summary: "The system prepares the response, but selected actions require confirmation or initiation by authorised personnel.", operator: "Alarm + operator confirmation", sequence: ["Alarm received and annunciated", "Recommended actions indicated", "Operator confirms or initiates", "Sequence executes with feedback"] },
          { id: "manual", label: "Manual control", summary: "Firefighters take direct control of individual devices, overriding all automatic logic.", operator: "Fire service", sequence: ["Key-switch to manual enable", "Select device on mimic", "Start / stop / open / close", "Return to auto when complete"] },
          { id: "zone", label: "Zone control", summary: "Groups of fans and dampers are controlled together per fire zone — one action, coordinated response.", operator: "Fire service / automatic", sequence: ["Select fire zone", "Zone sequence applied as a group", "Neighbouring zones held in defined state", "Group status shown per zone"] },
        ],
      },
      {
        type: "architecture",
        id: "architecture",
        title: "System architecture",
        intro: "The override panel sits above automatic control — it can always take precedence.",
        layers: [
          { title: "Signals", caption: "From the building", items: ["Fire alarm zone inputs", "Fan run / trip feedback", "Damper end-switch feedback", "Power status"] },
          { title: "Override panel", caption: "Fire service interface", items: ["Zone mimic & indication", "Auto / On / Off switches", "Key-switch enable", "Lamp / buzzer test"] },
          { title: "Field control", caption: "To the equipment", items: ["Fan starters / drives", "Smoke damper actuators", "Pressurization fans", "Car park jet fans"] },
        ],
      },
      {
        type: "considerations",
        id: "philosophy",
        title: "Control philosophy",
        intro: "The principles we design every override panel around.",
        items: [
          { title: "Override always wins", body: "A manual fire service command has priority over automatic, BMS and local control." },
          { title: "Show the real state", body: "Indication is driven by feedback from the device, not by the command sent to it." },
          { title: "Mirror the building", body: "Panel layout follows floors, zones and systems so it can be read without a drawing." },
          { title: "Fail visibly", body: "Faults, trips and loss of feedback are annunciated clearly rather than hidden." },
          { title: "Return to auto", body: "Every device can be returned to automatic control deliberately, one switch at a time." },
        ],
      },
      {
        type: "applications",
        title: "Applications",
        items: [
          { title: "High-rise buildings", body: "Multiple stair cores, lobbies and smoke zones controlled from the fire command location." },
          { title: "Malls & mixed use", body: "Large numbers of fans and dampers across interconnected zones." },
          { title: "Hospitals & hotels", body: "Complex occupancies where phased evacuation depends on reliable smoke control." },
          { title: "Car parks & basements", body: "Jet fan and extract systems grouped by fire zone." },
        ],
      },
      { type: "related-products", title: "Override and control panels" },
      {
        type: "faq",
        items: [
          { q: "Where should the fireman override panel be located?", a: "Typically at the fire command centre or fire service access point. The location is defined by the fire strategy and local authority requirements." },
          { q: "Can the panel be customised to our building layout?", a: "Yes. Panel layout and mimic are developed for each project from the zoning and equipment schedule." },
          { q: "What is the difference between semi-automatic and automatic?", a: "Automatic panels act directly on alarm signals. Semi-automatic panels require an operator to confirm or initiate selected actions. Which is appropriate depends on the strategy and authority requirements." },
        ],
      },
      { type: "enquiry", title: "Technical enquiry — fireman override", body: "Send us your equipment schedule and zoning. We will propose a panel layout and control philosophy for review." },
    ],
  },
  {
    slug: "ai-automation-integration",
    order: 5,
    name: "AI & Automation Integration",
    shortName: "AI & Automation",
    category: "Intelligent monitoring",
    tagline: "Adding intelligence to proven life-safety foundations.",
    summary:
      "Monitoring, automation and AI-assisted detection that supplement — never replace — code-compliant fire alarm and smoke control systems.",
    heroTitle: "Intelligence on top of proven safety foundations.",
    heroIntro:
      "Override-R is developing AI-assisted fire and smoke detection and connected monitoring to give building teams earlier awareness and better information. These technologies are designed to supplement certified fire detection and life-safety systems — not to replace them.",
    visual: "ai",
    facets: [
      { label: "Status", value: "In development" },
      { label: "Role", value: "Supplementary" },
      { label: "Integration", value: "CCTV · BMS" },
    ],
    menuLinks: [
      { label: "Intelligent monitoring", anchor: "subsystems" },
      { label: "AI fire & smoke detection", anchor: "subsystems" },
      { label: "Building automation", anchor: "architecture" },
    ],
    relatedCategories: ["ai-integration-products"],
    status: "in-development",
    blocks: [
      {
        type: "callout",
        tone: "notice",
        title: "Development status",
        body: "AI fire and smoke detection capabilities described on this page are under development and have not been certified as fire detection devices. They are not a substitute for mandatory, code-compliant fire alarm and detection systems. Availability, performance and approvals will be confirmed as validation progresses.",
      },
      {
        type: "subsystems",
        id: "subsystems",
        title: "Capability areas",
        intro: "Six directions we are building toward — each grounded in integration with established systems.",
        items: [
          { title: "Intelligent monitoring", body: "Centralised visibility of panel status, fan and damper feedback, faults and events across sites.", bullets: ["Live device status", "Event and fault history", "Maintenance indicators"], visual: "network" },
          { title: "AI fire detection", body: "Vision-based analysis of camera feeds to identify visible flame as an early-awareness supplement.", bullets: ["Under development", "Supplementary alerts only", "Human verification workflow"], visual: "ai" },
          { title: "AI smoke detection", body: "Vision-based identification of visible smoke in large or open spaces where early awareness is valuable.", bullets: ["Under development", "Large-volume spaces", "Alert routing to operators"], visual: "smoke" },
          { title: "CCTV integration", body: "Using existing camera infrastructure as an additional source of situational awareness for operators.", bullets: ["Standard camera streams", "Event-linked snapshots", "Operator dashboard"], visual: "sensor" },
          { title: "Building automation", body: "Structured, prioritised interfaces between life-safety controls and building management systems.", bullets: ["Defined hand-over signals", "Fire-mode priority preserved", "Status reporting to BMS"], visual: "controller" },
          { title: "Connected safety", body: "A longer-term direction toward connected, data-informed maintenance and readiness of life-safety equipment.", bullets: ["Future roadmap", "Readiness reporting", "Remote diagnostics concept"], visual: "network" },
        ],
      },
      {
        type: "architecture",
        id: "architecture",
        title: "How intelligence connects",
        intro: "AI and automation sit alongside the certified life-safety chain, adding awareness without taking control away from it.",
        layers: [
          { title: "Sources", caption: "Data in", items: ["CCTV streams", "Override panel status", "BMS points", "Fire alarm events (read-only)"] },
          { title: "Intelligence", caption: "Analysis", items: ["Vision models (in development)", "Event correlation", "Rules & thresholds"] },
          { title: "People", caption: "Awareness out", items: ["Operator dashboard", "Alerts & notifications", "Reports"] },
        ],
      },
      {
        type: "considerations",
        title: "Principles we hold ourselves to",
        items: [
          { title: "Supplement, never replace", body: "Certified detection and alarm systems remain the life-safety foundation. AI adds awareness on top." },
          { title: "Human in the loop", body: "AI-generated alerts are routed to people for verification before action." },
          { title: "Transparent status", body: "We clearly distinguish between what is in development, in pilot and commercially available." },
          { title: "Privacy by design", body: "Video analytics deployments must respect applicable data-protection requirements and site policies." },
        ],
      },
      { type: "related-products", title: "AI integration products" },
      {
        type: "faq",
        items: [
          { q: "Can AI detection replace smoke detectors?", a: "No. AI-assisted detection is being developed as a supplementary awareness tool. Code-compliant fire detection and alarm systems remain mandatory." },
          { q: "Is the AI detection available today?", a: "It is in development. We welcome conversations with building owners interested in future pilots." },
        ],
      },
      { type: "enquiry", title: "Interested in AI & automation?", body: "Talk to us about monitoring, integration or future pilot opportunities." },
    ],
  },
];
