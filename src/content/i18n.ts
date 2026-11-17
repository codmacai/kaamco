/**
 * All visible copy in English and Hindi.
 * English pages: /, /register, /services/*, /legal/*. Hindi pages: /hi, /hi/register.
 * Option `value`s stay in English so Google Sheets columns are consistent in both languages.
 *
 * Copy rules (KAAM-CO spec, 10 Nov 2026): four core services, Bengaluru only as an operational city,
 * no response-time promise, no public rates, no job/approval guarantees.
 */

export type Lang = "en" | "hi";

/** Localise an internal path: ("/register#find-work", "hi") → "/hi/register#find-work". */
export function lp(path: string, lang: Lang) {
  if (lang === "en") return path;
  if (path.startsWith("/#") || path === "/") return `/hi${path.slice(1)}`;
  return `/hi${path}`;
}

export type Opt = { value: string; label: string };
const o = (value: string, label = value): Opt => ({ value, label });
/** Build options from English values and a parallel list of labels. */
const opts = (values: string[], labels?: string[]) => values.map((v, i) => o(v, labels?.[i] ?? v));

/* Option values (English, stored in the Sheet) */
const V = {
  categories: ["Corporate Housekeeping", "Office Shifting", "Warehouse Support", "Facility Support", "Other"],
  companyCities: ["Bengaluru", "Other city"],
  duration: ["One day", "Short-term", "Recurring", "Ongoing", "Not sure"],
  budgetUnit: ["Per person / month", "Total project"],
  states: [
    "Uttar Pradesh",
    "Bihar",
    "Assam",
    "Chhattisgarh",
    "West Bengal",
    "Odisha",
    "Nagaland",
    "Jharkhand",
    "Madhya Pradesh",
    "Rajasthan",
    "Karnataka",
    "Tamil Nadu",
    "Kerala",
    "Andhra Pradesh",
    "Telangana",
    "Maharashtra",
    "Other state",
  ],
  work: ["Housekeeping", "Shifting", "Warehouse", "Facility", "General helper"],
  workCity: ["Bengaluru", "Anywhere", "Other city"],
  availability: ["Immediately", "Within 7 days", "Specific date", "Later"],
  relocate: ["Yes", "No", "Need discussion"],
  languages: ["Hindi", "English", "Bengali", "Odia", "Assamese", "Kannada", "Tamil", "Telugu", "Other"],
  experience: ["Fresher", "Less than 1 year", "1–3 years", "3+ years"],
  supply: ["Housekeeping", "Shifting", "Warehouse", "Facility", "General"],
  capacityType: ["Available now", "Estimated"],
  leadTime: ["Immediate", "3–7 days", "1–2 weeks", "Other"],
};
export const OPTION_VALUES = V;

const en = {
  langSwitch: { label: "हिंदी", lang: "hi" as Lang, aria: "हिंदी में देखें" },
  nav: [
    { label: "Services", href: "/#services" },
    { label: "For Businesses", href: "/register#need-manpower" },
    { label: "Find Work", href: "/register#find-work" },
    { label: "Become a Partner", href: "/register#supply-manpower" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  header: {
    cta: "Request Manpower",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "KAAM-CO home",
  },

  hero: {
    eyebrow: "Bengaluru · Workforce coordination",
    title: ["Your Requirement.", "Our Coordination."],
    lead: "Housekeeping, office shifting, warehouse support and general workforce solutions.",
    meta: "Tell us the workforce category, location, headcount and deployment date. Our team will review your requirement and discuss availability and terms.",
    cardsLabel: "Choose what you need",
  },

  paths: {
    company: {
      audience: "Businesses",
      title: "Need manpower?",
      sub: "कामगार चाहिए?" as string | undefined,
      text: "Share work category, location, headcount and deployment date.",
      cta: "Request Manpower",
      tag: "Budget kept confidential",
      alt: "Long warehouse aisle with stocked racks",
      formEyebrow: "Request manpower",
      formTitle: "Your Requirement. Our Coordination.",
      formIntro:
        "Share workforce category, location, headcount and deployment date. We will review your need and discuss availability and terms." as
          | string
          | undefined,
      formSub: undefined as string | undefined,
      next: [
        "Our team reviews your requirement during business hours",
        "We call to confirm scope, timing and terms",
        "Availability is confirmed before any deployment",
      ],
    },
    worker: {
      audience: "Workers",
      title: "Looking for work?",
      sub: "काम चाहिए?" as string | undefined,
      text: "Register without a resume and get contacted for suitable opportunities.",
      cta: "Register for Work",
      tag: "English & हिंदी",
      alt: "Construction worker in hi-vis gear pouring concrete",
      formEyebrow: "Register for work",
      formTitle: "Your details",
      formIntro: "No resume, email or documents needed." as string | undefined,
      formSub: "आपकी जानकारी" as string | undefined,
      next: [
        "Two short steps — name, phone, location and preferred work",
        "We contact you when a suitable opportunity matches your profile",
        "Registration is free and does not guarantee a job",
      ],
    },
    supplier: {
      audience: "Contractors",
      title: "Supply manpower?",
      sub: "कामगार सप्लाई करते हैं?" as string | undefined,
      text: "Tell us your workforce capacity and operating locations.",
      cta: "Become a Partner",
      tag: "Agencies & contractors",
      alt: "Site team in safety gear on a construction slab",
      formEyebrow: "Become a partner",
      formTitle: "Tell us about your workforce",
      formIntro: "No documents needed at this stage." as string | undefined,
      formSub: undefined as string | undefined,
      next: [
        "Share your categories, capacity and coverage",
        "We call to understand how you operate",
        "Verification happens later, only if we move forward — registering is not an approval",
      ],
    },
  },

  formView: {
    change: "Change selection",
    whatNext: "What happens next",
    choosePath: "Choose path",
    yourDetails: "Your details",
    progress: "Progress",
  },

  register: {
    label: "Registration",
    visit: "Visit website",
    back: "Back to: what do you need?",
    rights: "The Force Behind Success",
    privacy: "Privacy",
    terms: "Terms",
    faq: "FAQ",
  },

  intro: {
    meta1: "Workforce coordination · Bengaluru",
    meta2: "Businesses · Workers · Contractors",
    skip: "Skip intro",
  },

  services: {
    label: "Services",
    title: ["Four core", "workforce services"],
    intro:
      "Focused manpower support for businesses in Bengaluru. Every requirement is reviewed by our team before we discuss availability and terms.",
    items: [
      { title: "Corporate Housekeeping", text: "Office and commercial housekeeping personnel for corporate locations." },
      { title: "Office Shifting", text: "Manpower for loading, furniture moving, packing support and material handling as scoped." },
      { title: "Warehouse Support", text: "Helpers for picking, packing, loading, dispatch and related support activities." },
      { title: "Facility Support", text: "Support workforce for common areas, pantry, cleaning and other agreed site needs." },
    ],
    details: "View service",
    request: "Request this service",
    general: "General workforce solutions",
    generalText: "Need another kind of support? Choose “Other” in the form — we’ll tell you honestly whether we can help.",
  },

  process: {
    label: "How it works",
    title: ["From requirement", "to deployment"],
    intro: "One clear process for businesses, workers and partners.",
    steps: [
      { title: "Submit", text: "Choose your path and share your details. You get a reference ID straight away." },
      { title: "Review & call", text: "Our team reviews your details and calls to understand the need." },
      { title: "Verify & match", text: "Requirements and supply are verified before we propose a match." },
      { title: "Confirm & follow up", text: "Availability and terms are confirmed in writing, and we follow up to closure." },
    ],
  },

  about: {
    label: "About & coverage",
    title: ["The force behind", "your workforce"],
    p1: "KAAM-CO is a manpower coordination company connecting businesses that need people, individuals looking for work, and contractors who supply workforce.",
    p2: "We work with our own team and partner contractors. Employment, wages and statutory responsibilities for each assignment are set out in the agreement for that assignment.",
    locations: "Where we operate",
    city: "Bengaluru",
    cityStatus: "Operational",
    other: "Other cities",
    otherText: "Tell us your location — we’ll confirm honestly whether we can support it.",
  },

  faq: {
    label: "FAQs",
    title: "Questions, answered",
    items: [
      {
        q: "How soon will someone contact me?",
        a: "Our team reviews every submission and contacts you during business hours. You get a reference ID as soon as your form is saved.",
      },
      {
        q: "Do you publish rates?",
        a: "No. Pricing depends on category, location, headcount, shift and duration. Share a confidential budget in the form and we’ll discuss terms directly.",
      },
      {
        q: "Does registering guarantee a job?",
        a: "No. Registration is free. We contact you when a suitable opportunity matches your profile.",
      },
      {
        q: "Do workers need a resume or documents to register?",
        a: "No. Name, mobile, location and preferred work are enough to start. Documents are requested later, only if a specific role needs them.",
      },
      {
        q: "Who employs deployed workers?",
        a: "Employment, wages and statutory contributions for each assignment are set out in the agreement for that assignment.",
      },
      {
        q: "How are contractors approved?",
        a: "Registering does not approve a partner. If we move forward, we verify registration, GST/PAN, licences and references as applicable.",
      },
    ],
  },

  contact: {
    label: "Contact",
    title: ["Let’s talk", "workforce"],
    phone: "Phone & WhatsApp",
    call: "Call",
    email: "Email",
    location: "Location",
    locationValue: "Bengaluru, Karnataka",
    response: "Response",
    responseValue: "During business hours",
  },

  footer: {
    blurb: "Workforce coordination for businesses, workers and manpower partners in Bengaluru.",
    explore: "Explore",
    services: "Services",
    legal: "Legal",
    rights: "All rights reserved.",
  },

  mobileCta: { work: "Register for Work", workSub: "काम खोजें" as string | undefined, need: "Request Manpower" },

  form: {
    required: "required",
    optional: "optional",
    select: "Select",
    mobile: "Mobile number",
    mobilePh: "98765 43210",
    mobileTitle: "10-digit Indian mobile number",
    next: "Next",
    back: "Back",
    stepOf: (n: number) => `Step ${n} of 2`,
    submitting: "Sending…",
    consentPre: "I agree that KAAM-CO may contact me about this request and use my details as described in the ",
    privacyLink: "Privacy Notice",
    consentPost: ".",
    company: {
      steps: ["Contact & company", "Workforce requirement"],
      company: "Company name",
      contact: "Contact person (full name)",
      email: "Work email",
      city: "Deployment city",
      otherCity: "City name",
      locality: "Locality / site area",
      localityPh: "e.g. Whitefield, ITPL",
      category: "Workforce category",
      categoryOther: "Describe the workforce you need",
      headcount: "Headcount",
      date: "Deployment date",
      flexible: "Immediate / date flexible",
      duration: "Duration",
      budget: "Confidential budget (₹)",
      budgetUnit: "Budget is",
      budgetHelp:
        "Confidential. Used only by our authorized team to understand your requirement. No public pricing will be displayed.",
      shift: "Site / shift details",
      shiftPh: "Operating hours, shifts, site notes",
      notes: "Additional notes",
      submit: "Send Workforce Requirement",
    },
    worker: {
      steps: ["About you", "Work you want"],
      name: "Full name",
      state: "Current state",
      location: "Current location (city/village and district)",
      locationPh: "e.g. Darbhanga, Darbhanga district",
      work: "Preferred work",
      workCity: "Preferred work city",
      availability: "Available from",
      availableDate: "Date you can start",
      relocate: "Can you relocate?",
      language: "Language",
      experience: "Experience",
      submit: "Register",
    },
    supplier: {
      steps: ["Your business", "Capacity & coverage"],
      business: "Agency / business name",
      contact: "Contact person",
      state: "State you source workers from",
      district: "District / city",
      categories: "Categories you supply",
      capacity: "Workforce available (headcount)",
      capacityType: "This number is",
      coverage: "Cities you can deploy to",
      coveragePh: "e.g. Bengaluru, Mysuru",
      leadTime: "Time to mobilise workers",
      docsNote:
        "GST/PAN, licences and references are not needed now. If we move forward, we’ll request them through a secure verification step.",
      submit: "Send Partner Details",
    },
    contact: {
      name: "Name",
      message: "Message",
      submit: "Send message",
    },
    options: {
      categories: opts(V.categories),
      companyCities: opts(V.companyCities),
      duration: opts(V.duration),
      budgetUnit: opts(V.budgetUnit),
      states: opts(V.states),
      work: opts(V.work, ["Housekeeping", "Shifting / loading", "Warehouse", "Facility support", "General helper"]),
      workCity: opts(V.workCity, ["Bengaluru", "Anywhere", "Other city"]),
      availability: opts(V.availability),
      relocate: opts(V.relocate),
      languages: opts(V.languages),
      experience: opts(V.experience),
      supply: opts(V.supply),
      capacityType: opts(V.capacityType),
      leadTime: opts(V.leadTime),
    },
  },

  success: {
    company: { title: "Thank you. Your requirement was received.", body: "Our team will review it and contact you during business hours." },
    worker: {
      title: "Thank you. Your registration was received.",
      body: "Our team will contact you when a suitable opportunity matches your profile. Registration does not guarantee a job.",
    },
    supplier: {
      title: "Thank you. Your details were received.",
      body: "Our team will review them and call you. Registering does not mean approval.",
    },
    contact: { title: "Thank you. Your message was received.", body: "Our team will reply during business hours." },
    ref: "Reference",
    reach: "Need to reach us sooner?",
    call: "Call",
    whatsapp: "WhatsApp",
    another: "Submit another",
  },

  errors: {
    unknown: "Something went wrong. Please refresh the page and try again.",
    check: "Please correct the highlighted fields.",
    required: "This is required",
    mobile: "Enter a valid 10-digit mobile number",
    email: "Enter a valid email",
    name: "Enter a valid name",
    headcount: "Enter a number from 1 to 5000",
    date: "Choose today or a future date",
    budget: "Enter a valid amount",
    consent: "Please agree to continue",
    invalid: "Please choose an option from the list",
    save: "Your details could not be saved. Please try again, or call +91 81290 53828.",
    network: "Connection problem. Your details are still in the form — please try again.",
    rate: "Too many attempts. Please try again in a few minutes.",
  },
};

export type Dict = typeof en;

const hiStates = [
  "उत्तर प्रदेश",
  "बिहार",
  "असम",
  "छत्तीसगढ़",
  "पश्चिम बंगाल",
  "ओडिशा",
  "नागालैंड",
  "झारखंड",
  "मध्य प्रदेश",
  "राजस्थान",
  "कर्नाटक",
  "तमिलनाडु",
  "केरल",
  "आंध्र प्रदेश",
  "तेलंगाना",
  "महाराष्ट्र",
  "अन्य राज्य",
];

const hi: Dict = {
  langSwitch: { label: "English", lang: "en", aria: "View in English" },
  nav: [
    { label: "सेवाएँ", href: "/#services" },
    { label: "व्यवसायों के लिए", href: "/register#need-manpower" },
    { label: "काम खोजें", href: "/register#find-work" },
    { label: "पार्टनर बनें", href: "/register#supply-manpower" },
    { label: "कैसे काम करता है", href: "/#how-it-works" },
    { label: "हमारे बारे में", href: "/#about" },
    { label: "संपर्क", href: "/#contact" },
  ],
  header: {
    cta: "कामगार चाहिए",
    openMenu: "मेन्यू खोलें",
    closeMenu: "मेन्यू बंद करें",
    home: "KAAM-CO होम",
  },

  hero: {
    eyebrow: "बेंगलुरु · वर्कफ़ोर्स कोऑर्डिनेशन",
    title: ["आपकी ज़रूरत।", "हमारा तालमेल।"],
    lead: "हाउसकीपिंग, ऑफ़िस शिफ्टिंग, वेयरहाउस सपोर्ट और सामान्य वर्कफ़ोर्स समाधान।",
    meta: "काम का प्रकार, जगह, कामगारों की संख्या और शुरुआत की तारीख बताइए। हमारी टीम आपकी ज़रूरत देखकर उपलब्धता और शर्तों पर बात करेगी।",
    cardsLabel: "चुनिए आपको क्या चाहिए",
  },

  paths: {
    company: {
      audience: "व्यवसाय",
      title: "कामगार चाहिए?",
      sub: undefined,
      text: "काम का प्रकार, जगह, कामगारों की संख्या और शुरुआत की तारीख बताइए।",
      cta: "कामगारों का अनुरोध करें",
      tag: "बजट गोपनीय रहता है",
      alt: "सामान से भरी रैक वाला लंबा वेयरहाउस गलियारा",
      formEyebrow: "कामगारों का अनुरोध",
      formTitle: "आपकी ज़रूरत। हमारा तालमेल।",
      formIntro:
        "काम का प्रकार, जगह, कामगारों की संख्या और तैनाती की तारीख बताइए। हम आपकी ज़रूरत देखकर उपलब्धता और शर्तों पर बात करेंगे।",
      formSub: undefined,
      next: [
        "हमारी टीम कार्य समय के दौरान आपकी ज़रूरत देखती है",
        "काम, समय और शर्तें तय करने के लिए हम कॉल करते हैं",
        "किसी भी तैनाती से पहले उपलब्धता पक्की की जाती है",
      ],
    },
    worker: {
      audience: "कामगार",
      title: "काम चाहिए?",
      sub: undefined,
      text: "बिना रिज़्यूमे रजिस्टर करें; सही काम मिलने पर हम आपसे संपर्क करेंगे।",
      cta: "काम के लिए रजिस्टर करें",
      tag: "हिंदी और English",
      alt: "सेफ़्टी जैकेट पहने कंक्रीट डालता हुआ कामगार",
      formEyebrow: "काम के लिए रजिस्ट्रेशन",
      formTitle: "आपकी जानकारी",
      formIntro: "रिज़्यूमे, ईमेल या दस्तावेज़ की ज़रूरत नहीं।",
      formSub: undefined,
      next: [
        "दो छोटे चरण — नाम, फ़ोन, जगह और पसंद का काम",
        "आपकी प्रोफ़ाइल से मेल खाता काम मिलने पर हम संपर्क करेंगे",
        "रजिस्ट्रेशन मुफ़्त है, पर इससे नौकरी पक्की नहीं होती",
      ],
    },
    supplier: {
      audience: "ठेकेदार",
      title: "कामगार सप्लाई करते हैं?",
      sub: undefined,
      text: "अपनी वर्कफ़ोर्स क्षमता और काम करने वाले शहर बताइए।",
      cta: "पार्टनर बनें",
      tag: "एजेंसियाँ और ठेकेदार",
      alt: "निर्माण स्थल पर सेफ़्टी गियर में साइट टीम",
      formEyebrow: "पार्टनर बनें",
      formTitle: "अपनी वर्कफ़ोर्स के बारे में बताइए",
      formIntro: "अभी किसी दस्तावेज़ की ज़रूरत नहीं।",
      formSub: undefined,
      next: [
        "अपनी श्रेणियाँ, क्षमता और शहर बताइए",
        "आपके काम करने का तरीका समझने के लिए हम कॉल करते हैं",
        "जाँच बाद में, आगे बढ़ने पर ही होती है — रजिस्टर करना मंज़ूरी नहीं है",
      ],
    },
  },

  formView: {
    change: "चुनाव बदलें",
    whatNext: "आगे क्या होगा",
    choosePath: "रास्ता चुनें",
    yourDetails: "आपकी जानकारी",
    progress: "प्रगति",
  },

  register: {
    label: "रजिस्ट्रेशन",
    visit: "वेबसाइट देखें",
    back: "वापस: आपको क्या चाहिए?",
    rights: "The Force Behind Success",
    privacy: "प्राइवेसी",
    terms: "शर्तें",
    faq: "सवाल-जवाब",
  },

  intro: {
    meta1: "वर्कफ़ोर्स कोऑर्डिनेशन · बेंगलुरु",
    meta2: "व्यवसाय · कामगार · ठेकेदार",
    skip: "इंट्रो छोड़ें",
  },

  services: {
    label: "सेवाएँ",
    title: ["चार मुख्य", "वर्कफ़ोर्स सेवाएँ"],
    intro:
      "बेंगलुरु में व्यवसायों के लिए केंद्रित मैनपावर सहायता। उपलब्धता और शर्तों पर बात करने से पहले हमारी टीम हर ज़रूरत को देखती है।",
    items: [
      { title: "कॉर्पोरेट हाउसकीपिंग", text: "कॉर्पोरेट जगहों के लिए ऑफ़िस और कमर्शियल हाउसकीपिंग स्टाफ़।" },
      { title: "ऑफ़िस शिफ्टिंग", text: "तय काम के अनुसार लोडिंग, फ़र्नीचर शिफ्टिंग, पैकिंग में मदद और सामान ढुलाई के लिए कामगार।" },
      { title: "वेयरहाउस सपोर्ट", text: "पिकिंग, पैकिंग, लोडिंग, डिस्पैच और इनसे जुड़े कामों के लिए हेल्पर।" },
      { title: "फैसिलिटी सपोर्ट", text: "कॉमन एरिया, पैंट्री, सफ़ाई और साइट की अन्य तय ज़रूरतों के लिए सपोर्ट स्टाफ़।" },
    ],
    details: "सेवा देखें",
    request: "यह सेवा माँगें",
    general: "सामान्य वर्कफ़ोर्स समाधान",
    generalText: "कोई और तरह की मदद चाहिए? फ़ॉर्म में “अन्य” चुनिए — हम साफ़ बताएँगे कि हम मदद कर सकते हैं या नहीं।",
  },

  process: {
    label: "कैसे काम करता है",
    title: ["ज़रूरत से", "तैनाती तक"],
    intro: "व्यवसायों, कामगारों और पार्टनर्स के लिए एक साफ़ प्रक्रिया।",
    steps: [
      { title: "जानकारी भेजें", text: "अपना रास्ता चुनें और जानकारी भरें। आपको तुरंत एक रेफ़रेंस ID मिलेगा।" },
      { title: "समीक्षा और कॉल", text: "हमारी टीम जानकारी देखती है और ज़रूरत समझने के लिए कॉल करती है।" },
      { title: "जाँच और मिलान", text: "मिलान सुझाने से पहले ज़रूरत और सप्लाई की जाँच होती है।" },
      { title: "पुष्टि और फॉलो-अप", text: "उपलब्धता और शर्तें लिखित में तय होती हैं, और काम पूरा होने तक फॉलो-अप होता है।" },
    ],
  },

  about: {
    label: "हमारे बारे में और कवरेज",
    title: ["आपकी टीम के", "पीछे की ताक़त"],
    p1: "KAAM-CO एक मैनपावर कोऑर्डिनेशन कंपनी है, जो कामगार चाहने वाले व्यवसायों, काम ढूंढने वाले लोगों और कामगार सप्लाई करने वाले ठेकेदारों को जोड़ती है।",
    p2: "हम अपनी टीम और पार्टनर ठेकेदारों के साथ काम करते हैं। हर असाइनमेंट के लिए रोज़गार, वेतन और वैधानिक ज़िम्मेदारियाँ उसी असाइनमेंट के एग्रीमेंट में लिखी होती हैं।",
    locations: "हम कहाँ काम करते हैं",
    city: "बेंगलुरु",
    cityStatus: "चालू",
    other: "दूसरे शहर",
    otherText: "अपनी जगह बताइए — हम साफ़ बताएँगे कि हम वहाँ सहायता कर सकते हैं या नहीं।",
  },

  faq: {
    label: "सवाल-जवाब",
    title: "आपके सवाल, हमारे जवाब",
    items: [
      {
        q: "मुझसे कितनी जल्दी संपर्क होगा?",
        a: "हमारी टीम हर फ़ॉर्म देखती है और कार्य समय के दौरान आपसे संपर्क करती है। फ़ॉर्म सेव होते ही आपको रेफ़रेंस ID मिल जाता है।",
      },
      {
        q: "क्या आप रेट बताते हैं?",
        a: "नहीं। कीमत काम के प्रकार, जगह, कामगारों की संख्या, शिफ़्ट और अवधि पर निर्भर करती है। फ़ॉर्म में अपना गोपनीय बजट बताइए, हम सीधे शर्तों पर बात करेंगे।",
      },
      {
        q: "क्या रजिस्टर करने से नौकरी पक्की है?",
        a: "नहीं। रजिस्ट्रेशन मुफ़्त है। आपकी प्रोफ़ाइल से मेल खाता काम मिलने पर हम संपर्क करते हैं।",
      },
      {
        q: "क्या रजिस्टर करने के लिए रिज़्यूमे या दस्तावेज़ चाहिए?",
        a: "नहीं। शुरुआत के लिए नाम, मोबाइल, जगह और पसंद का काम काफ़ी है। दस्तावेज़ बाद में, सिर्फ़ किसी खास काम के लिए ज़रूरत होने पर माँगे जाते हैं।",
      },
      {
        q: "तैनात कामगारों का नियोक्ता कौन होता है?",
        a: "हर असाइनमेंट के लिए रोज़गार, वेतन और वैधानिक योगदान उसी असाइनमेंट के एग्रीमेंट में लिखे होते हैं।",
      },
      {
        q: "ठेकेदारों को मंज़ूरी कैसे मिलती है?",
        a: "रजिस्टर करना मंज़ूरी नहीं है। आगे बढ़ने पर हम ज़रूरत के अनुसार रजिस्ट्रेशन, GST/PAN, लाइसेंस और रेफ़रेंस की जाँच करते हैं।",
      },
    ],
  },

  contact: {
    label: "संपर्क",
    title: ["आइए, कामगारों की", "बात करें"],
    phone: "फ़ोन और WhatsApp",
    call: "कॉल करें",
    email: "ईमेल",
    location: "जगह",
    locationValue: "बेंगलुरु, कर्नाटक",
    response: "जवाब",
    responseValue: "कार्य समय के दौरान",
  },

  footer: {
    blurb: "बेंगलुरु में व्यवसायों, कामगारों और मैनपावर पार्टनर्स के लिए वर्कफ़ोर्स कोऑर्डिनेशन।",
    explore: "देखें",
    services: "सेवाएँ",
    legal: "क़ानूनी",
    rights: "सर्वाधिकार सुरक्षित।",
  },

  mobileCta: { work: "काम के लिए रजिस्टर", workSub: undefined, need: "कामगार चाहिए" },

  form: {
    required: "ज़रूरी",
    optional: "वैकल्पिक",
    select: "चुनें",
    mobile: "मोबाइल नंबर",
    mobilePh: "98765 43210",
    mobileTitle: "10 अंकों का भारतीय मोबाइल नंबर",
    next: "आगे",
    back: "पीछे",
    stepOf: (n: number) => `चरण ${n} / 2`,
    submitting: "भेजा जा रहा है…",
    consentPre: "मैं सहमत हूँ कि KAAM-CO इस अनुरोध के बारे में मुझसे संपर्क करे और मेरी जानकारी का इस्तेमाल ",
    privacyLink: "प्राइवेसी नोटिस",
    consentPost: " के अनुसार करे।",
    company: {
      steps: ["संपर्क और कंपनी", "वर्कफ़ोर्स की ज़रूरत"],
      company: "कंपनी का नाम",
      contact: "संपर्क व्यक्ति (पूरा नाम)",
      email: "ऑफ़िस ईमेल",
      city: "तैनाती का शहर",
      otherCity: "शहर का नाम",
      locality: "इलाका / साइट का क्षेत्र",
      localityPh: "जैसे: व्हाइटफ़ील्ड, ITPL",
      category: "काम का प्रकार",
      categoryOther: "किस तरह के कामगार चाहिए, लिखें",
      headcount: "कामगारों की संख्या",
      date: "तैनाती की तारीख",
      flexible: "तुरंत / तारीख तय नहीं",
      duration: "अवधि",
      budget: "गोपनीय बजट (₹)",
      budgetUnit: "बजट किसके लिए",
      budgetHelp:
        "गोपनीय। सिर्फ़ हमारी अधिकृत टीम आपकी ज़रूरत समझने के लिए इसका इस्तेमाल करती है। कोई सार्वजनिक कीमत नहीं दिखाई जाती।",
      shift: "साइट / शिफ़्ट विवरण",
      shiftPh: "काम के घंटे, शिफ़्ट, साइट की ज़रूरी बातें",
      notes: "अन्य जानकारी",
      submit: "वर्कफ़ोर्स की ज़रूरत भेजें",
    },
    worker: {
      steps: ["आपके बारे में", "आपको कैसा काम चाहिए"],
      name: "पूरा नाम",
      state: "अभी किस राज्य में हैं",
      location: "अभी कहाँ हैं (शहर/गाँव और ज़िला)",
      locationPh: "जैसे: दरभंगा, ज़िला दरभंगा",
      work: "पसंद का काम",
      workCity: "किस शहर में काम करना है",
      availability: "कब से काम कर सकते हैं",
      availableDate: "किस तारीख से",
      relocate: "क्या आप दूसरे शहर जा सकते हैं?",
      language: "भाषा",
      experience: "अनुभव",
      submit: "रजिस्टर करें",
    },
    supplier: {
      steps: ["आपका बिज़नेस", "क्षमता और कवरेज"],
      business: "एजेंसी / बिज़नेस का नाम",
      contact: "संपर्क व्यक्ति",
      state: "आप किस राज्य से कामगार लाते हैं",
      district: "ज़िला / शहर",
      categories: "आप किस काम के लिए कामगार देते हैं",
      capacity: "उपलब्ध कामगार (संख्या)",
      capacityType: "यह संख्या",
      coverage: "किन शहरों में कामगार भेज सकते हैं",
      coveragePh: "जैसे: बेंगलुरु, मैसूरु",
      leadTime: "कामगार भेजने में कितना समय लगेगा",
      docsNote:
        "GST/PAN, लाइसेंस और रेफ़रेंस अभी नहीं चाहिए। आगे बढ़ने पर ही इन्हें सुरक्षित जाँच के ज़रिए माँगा जाएगा।",
      submit: "पार्टनर जानकारी भेजें",
    },
    contact: {
      name: "नाम",
      message: "संदेश",
      submit: "संदेश भेजें",
    },
    options: {
      categories: opts(V.categories, ["कॉर्पोरेट हाउसकीपिंग", "ऑफ़िस शिफ्टिंग", "वेयरहाउस सपोर्ट", "फैसिलिटी सपोर्ट", "अन्य"]),
      companyCities: opts(V.companyCities, ["बेंगलुरु", "दूसरा शहर"]),
      duration: opts(V.duration, ["एक दिन", "कम अवधि", "बार-बार (रिकरिंग)", "लगातार", "पक्का नहीं"]),
      budgetUnit: opts(V.budgetUnit, ["प्रति व्यक्ति / महीना", "पूरा प्रोजेक्ट"]),
      states: opts(V.states, hiStates),
      work: opts(V.work, ["हाउसकीपिंग", "शिफ्टिंग / लोडिंग", "वेयरहाउस", "फैसिलिटी सपोर्ट", "सामान्य हेल्पर"]),
      workCity: opts(V.workCity, ["बेंगलुरु", "कहीं भी", "दूसरा शहर"]),
      availability: opts(V.availability, ["तुरंत", "7 दिन के अंदर", "किसी तय तारीख से", "बाद में"]),
      relocate: opts(V.relocate, ["हाँ", "नहीं", "बात करनी है"]),
      languages: opts(V.languages, ["हिंदी", "अंग्रेज़ी", "बांग्ला", "ओड़िया", "असमिया", "कन्नड़", "तमिल", "तेलुगु", "अन्य"]),
      experience: opts(V.experience, ["फ्रेशर (अनुभव नहीं)", "1 साल से कम", "1–3 साल", "3 साल से ज़्यादा"]),
      supply: opts(V.supply, ["हाउसकीपिंग", "शिफ्टिंग", "वेयरहाउस", "फैसिलिटी", "सामान्य"]),
      capacityType: opts(V.capacityType, ["अभी उपलब्ध", "अनुमानित"]),
      leadTime: opts(V.leadTime, ["तुरंत", "3–7 दिन", "1–2 हफ़्ते", "अन्य"]),
    },
  },

  success: {
    company: { title: "धन्यवाद। आपकी ज़रूरत मिल गई।", body: "हमारी टीम इसे देखकर कार्य समय के दौरान आपसे संपर्क करेगी।" },
    worker: {
      title: "धन्यवाद। आपका रजिस्ट्रेशन मिल गया।",
      body: "आपकी प्रोफ़ाइल से मेल खाता काम मिलने पर हमारी टीम संपर्क करेगी। रजिस्ट्रेशन से नौकरी पक्की नहीं होती।",
    },
    supplier: {
      title: "धन्यवाद। आपकी जानकारी मिल गई।",
      body: "हमारी टीम इसे देखकर आपको कॉल करेगी। रजिस्टर करना मंज़ूरी नहीं है।",
    },
    contact: { title: "धन्यवाद। आपका संदेश मिल गया।", body: "हमारी टीम कार्य समय के दौरान जवाब देगी।" },
    ref: "रेफ़रेंस",
    reach: "जल्दी बात करनी है?",
    call: "कॉल करें",
    whatsapp: "WhatsApp",
    another: "एक और भेजें",
  },

  errors: {
    unknown: "कुछ गड़बड़ हुई। कृपया पेज रीफ़्रेश करके दोबारा कोशिश करें।",
    check: "कृपया लाल निशान वाले फ़ील्ड ठीक करें।",
    required: "यह ज़रूरी है",
    mobile: "सही 10 अंकों का मोबाइल नंबर डालें",
    email: "सही ईमेल डालें",
    name: "सही नाम लिखें",
    headcount: "1 से 5000 के बीच संख्या डालें",
    date: "आज या आगे की कोई तारीख चुनें",
    budget: "सही राशि डालें",
    consent: "आगे बढ़ने के लिए सहमति ज़रूरी है",
    invalid: "कृपया सूची में से एक विकल्प चुनें",
    save: "आपकी जानकारी सेव नहीं हो पाई। कृपया दोबारा कोशिश करें या +91 81290 53828 पर कॉल करें।",
    network: "कनेक्शन में दिक्कत है। आपकी जानकारी फ़ॉर्म में बनी हुई है — कृपया दोबारा भेजें।",
    rate: "बहुत ज़्यादा कोशिशें हुईं। कुछ मिनट बाद फिर कोशिश करें।",
  },
};

export const dict: Record<Lang, Dict> = { en, hi };
