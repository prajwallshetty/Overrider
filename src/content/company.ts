import type { Industry, Service, TeamMember } from "./types";

/**
 * Company-wide settings. Values marked EDIT are placeholders that must be
 * replaced with verified company data before launch.
 */
export const site = {
  name: "Override-R",
  wordmark: "OVERRIDE-R",
  legalName: "Override-R", // EDIT: registered company name
  tagline: "Intelligent Fire & Building Safety Technology",
  description:
    "Override-R engineers control solutions for smoke management, pressurization, ventilation and fireman override systems — with AI and automation integration in development.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.override-r.com",
  contact: {
    email: "info@override-r.com", // EDIT
    salesEmail: "sales@override-r.com", // EDIT
    phone: "+00 000 000 0000", // EDIT
    whatsapp: "000000000000", // EDIT: international format, digits only (used for wa.me link)
    address: ["Registered office address", "City, Country"], // EDIT
    hours: "Monday – Friday, business hours", // EDIT
  },
  social: {
    linkedin: "", // EDIT: full URL — hidden while empty
  },
  /** Shown in footer and Our Story. */
  isPlaceholderContact: true,
};

export const industries: Industry[] = [
  { slug: "residential", name: "Residential buildings", body: "Stair pressurization, corridor smoke extract and basement car park ventilation for residential towers.", systems: ["pressurization", "smoke-management", "ventilation"] },
  { slug: "commercial", name: "Commercial buildings", body: "Office towers and mixed-use developments with multiple cores, lobbies and fire zones.", systems: ["smoke-management", "pressurization", "fireman-override-systems"] },
  { slug: "industrial", name: "Industrial facilities", body: "Warehouses and process buildings with large-volume smoke control and ventilation needs.", systems: ["smoke-management", "ventilation", "ai-automation-integration"] },
  { slug: "it-parks", name: "IT parks", body: "Campus-scale buildings where integration with BMS and central monitoring is essential.", systems: ["fireman-override-systems", "ai-automation-integration"] },
  { slug: "hospitals", name: "Hospitals", body: "Phased evacuation strategies requiring reliable, long-duration protection of escape routes.", systems: ["pressurization", "smoke-management"] },
  { slug: "hotels", name: "Hotels", body: "Occupants unfamiliar with the building — clear escape routes and dependable smoke control are critical.", systems: ["pressurization", "smoke-management", "ventilation"] },
  { slug: "infrastructure", name: "Infrastructure projects", body: "Transport, utility and public buildings with complex zoning and long operational lifetimes.", systems: ["smoke-management", "ventilation", "fireman-override-systems"] },
];

export const workflow = [
  { title: "Initial consultation", body: "We listen first: building type, stage, systems involved and what success looks like for your team." },
  { title: "Requirement analysis", body: "We review drawings, fire strategy and equipment schedules to define the control requirements precisely." },
  { title: "System planning", body: "Control philosophy, zoning, interfaces and the cause-and-effect logic are planned and agreed." },
  { title: "Product selection", body: "Panels and controllers are selected and configured to the project — nothing over-specified." },
  { title: "Installation coordination", body: "We coordinate with the electrical and MEP contractors on wiring, interfaces and site readiness." },
  { title: "Testing & handover", body: "Functional testing against the cause-and-effect, documentation and handover to the operating team." },
];

export const differentiators = [
  { title: "Engineering-focused", body: "Every recommendation starts from the fire strategy and the physics of air movement — not from a catalogue." },
  { title: "System integration", body: "Smoke control, pressurization, ventilation, fire alarm and BMS designed to work as one coherent system." },
  { title: "Practical solutions", body: "Panels and logic that installers can wire, commissioners can test and firefighters can understand." },
  { title: "Technical support", body: "Engineers available from early design questions through commissioning and beyond." },
  { title: "Innovation", body: "Developing AI and automation capabilities responsibly, on top of proven life-safety foundations." },
];

/**
 * Company milestones — PLACEHOLDER. Replace years and text with verified history.
 */
export const milestones = [
  { year: "Year TBC", title: "Company founded", body: "Override-R established with a focus on life-safety control systems. (Edit with verified details.)" },
  { year: "Year TBC", title: "First override panels delivered", body: "Placeholder milestone — replace with verified project history." },
  { year: "Year TBC", title: "Pressurization & ventilation controls", body: "Placeholder milestone — expansion of the control product range." },
  { year: "Present", title: "AI & automation development", body: "Development of AI-assisted detection and connected monitoring — in progress." },
];

/** PLACEHOLDER profiles — names, roles and bios must be replaced. Do not add credentials until verified. */
export const team: TeamMember[] = [
  { id: "f1", name: "Founder Name", role: "Founder & Managing Director", group: "founders", bio: "Founder biography to be added. Include verified background and areas of expertise only.", placeholder: true },
  { id: "f2", name: "Co-founder Name", role: "Co-founder & Technical Director", group: "founders", bio: "Co-founder biography to be added. Include verified background and areas of expertise only.", placeholder: true },
  { id: "l1", name: "Leader Name", role: "Head of Engineering", group: "leadership", bio: "Leadership profile to be added.", placeholder: true },
  { id: "l2", name: "Leader Name", role: "Head of Projects", group: "leadership", bio: "Leadership profile to be added.", placeholder: true },
  { id: "l3", name: "Leader Name", role: "Head of Business Development", group: "leadership", bio: "Leadership profile to be added.", placeholder: true },
  { id: "e1", name: "Engineer Name", role: "Control Systems Engineer", group: "engineering", bio: "Profile to be added.", placeholder: true },
  { id: "e2", name: "Engineer Name", role: "Design Engineer", group: "engineering", bio: "Profile to be added.", placeholder: true },
  { id: "e3", name: "Engineer Name", role: "Commissioning Engineer", group: "engineering", bio: "Profile to be added.", placeholder: true },
  { id: "e4", name: "Engineer Name", role: "AI & Software Engineer", group: "engineering", bio: "Profile to be added.", placeholder: true },
];

/** PLACEHOLDER partner slots — add real partner names/logos only with permission. */
export const partners = [
  { name: "Partner slot", type: "Technology partner" },
  { name: "Partner slot", type: "Manufacturing partner" },
  { name: "Partner slot", type: "Channel partner" },
  { name: "Partner slot", type: "Consultant network" },
  { name: "Partner slot", type: "Integration partner" },
  { name: "Partner slot", type: "Distribution partner" },
];

export const openRoles = [
  { title: "Control Systems Engineer", type: "Full-time", location: "Location TBC", team: "Engineering" },
  { title: "Project Coordinator — Life Safety", type: "Full-time", location: "Location TBC", team: "Projects" },
  { title: "Technical Sales Engineer", type: "Full-time", location: "Location TBC", team: "Business Development" },
];
// NOTE: open roles are illustrative placeholders — publish only real vacancies.

export const services: Service[] = [
  {
    slug: "technical-consultation",
    name: "Technical Consultation",
    summary: "Early, practical engineering advice on smoke control, pressurization and override strategies.",
    intro: "The cheapest time to solve a control problem is before it is drawn. Our engineers review your concept, fire strategy or tender documents and give clear, practical guidance on the control systems required.",
    visual: "blueprint",
    scope: [
      { title: "Concept review", body: "Assess the proposed smoke control and ventilation approach from a control and integration perspective." },
      { title: "Specification input", body: "Help define panel, controller and interface requirements for tender documents." },
      { title: "Value engineering", body: "Identify where control architecture can be simplified without compromising the strategy." },
    ],
    deliverables: ["Technical review notes", "Control requirement summary", "Recommended system architecture"],
    process: ["Share documents", "Engineering review", "Consultation meeting", "Written recommendations"],
    whenToEngage: ["Concept and schematic design", "Tender preparation", "When an existing design raises questions"],
  },
  {
    slug: "system-design-support",
    name: "System Design Support",
    summary: "Control philosophy, zoning logic and panel design developed alongside your design team.",
    intro: "We work with consultants and contractors to turn the fire strategy into a buildable control design — control philosophy, cause-and-effect logic, panel layout and interface schedules.",
    visual: "override",
    scope: [
      { title: "Control philosophy", body: "Document how each system behaves in normal, fire and override modes." },
      { title: "Cause-and-effect", body: "Translate the fire strategy into a testable matrix of inputs and actions." },
      { title: "Panel design", body: "Develop override panel layouts and mimics that mirror the building." },
    ],
    deliverables: ["Control philosophy document", "Cause-and-effect matrix", "Panel layout drawings", "Interface schedule"],
    process: ["Requirement capture", "Draft philosophy", "Design review", "Issue for construction"],
    whenToEngage: ["Detailed design", "Contractor design portion", "Design-and-build projects"],
  },
  {
    slug: "fire-safety-system-integration",
    name: "Fire Safety System Integration",
    summary: "Making smoke control, fire alarm, BMS and override panels work as one system.",
    intro: "Most commissioning problems happen at the interfaces. We define and coordinate the connections between fire alarm, smoke control, BMS and fire service controls so that priorities are unambiguous.",
    visual: "network",
    scope: [
      { title: "Interface definition", body: "Signal lists, priorities and responsibilities between systems and contractors." },
      { title: "Priority logic", body: "Ensure fire mode and fire service override always take precedence." },
      { title: "Integration testing", body: "Plan and support end-to-end testing across systems." },
    ],
    deliverables: ["Interface matrix", "Signal schedules", "Integration test plan"],
    process: ["Interface workshop", "Signal schedule", "Coordination", "Integrated testing"],
    whenToEngage: ["Multi-contractor projects", "Retrofit integrations", "BMS upgrades"],
  },
  {
    slug: "project-coordination",
    name: "Project Coordination",
    summary: "A single technical point of contact through procurement, installation and testing.",
    intro: "We coordinate with MEP contractors, electrical installers and commissioning teams to keep life-safety control scope on track — from submittals to site readiness.",
    visual: "building",
    scope: [
      { title: "Submittals", body: "Prepare and track technical submittals and approvals." },
      { title: "Site coordination", body: "Align wiring, installation sequence and site readiness with contractors." },
      { title: "Progress tracking", body: "Visibility of open items through to handover." },
    ],
    deliverables: ["Submittal packages", "Coordination records", "Open-items tracker"],
    process: ["Kick-off", "Submittals", "Site coordination", "Handover readiness"],
    whenToEngage: ["Construction stage", "Fast-track projects", "Multi-building developments"],
  },
  {
    slug: "cfd-calculation",
    name: "CFD Calculation",
    summary: "Computational fluid dynamics analysis to support smoke control and ventilation design decisions.",
    intro: "CFD modelling helps visualise smoke movement, temperature and visibility in complex spaces — supporting design decisions for car parks, atria and other large volumes.",
    visual: "smoke",
    scope: [
      { title: "Model setup", body: "Geometry, fire scenarios and ventilation arrangements defined with the design team." },
      { title: "Simulation", body: "Analysis of smoke spread, visibility and temperature over the scenario duration." },
      { title: "Reporting", body: "Clear presentation of results to support design review." },
    ],
    deliverables: ["CFD report", "Scenario visualisations", "Design observations"],
    process: ["Scope & scenarios", "Model build", "Simulation", "Report & review"],
    whenToEngage: ["Car park jet fan design", "Atria and large volumes", "Performance-based design"],
    note: "Design fire sizes, acceptance criteria and scenarios are agreed with the project fire engineer and authority. CFD supports — and does not replace — the approval process.",
  },
  {
    slug: "technical-project-support",
    name: "Technical Project Support",
    summary: "Engineering support during testing, commissioning, handover and operation.",
    intro: "From functional testing to troubleshooting existing installations, our engineers support your team whenever control systems need expert attention.",
    visual: "controller",
    scope: [
      { title: "Testing & commissioning", body: "Functional tests against the cause-and-effect matrix." },
      { title: "Troubleshooting", body: "Diagnose control, interface and feedback issues on existing systems." },
      { title: "Training", body: "Familiarisation for facility teams on panel operation." },
    ],
    deliverables: ["Test records", "Issue reports", "Training sessions"],
    process: ["Request", "Site assessment", "Support activity", "Report"],
    whenToEngage: ["Commissioning", "Handover", "Existing system issues"],
  },
];
