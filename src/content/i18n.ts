/**
 * All visible copy in English and Hindi.
 * English pages live at /, /register; Hindi pages at /hi, /hi/register.
 * Option `value`s stay in English so Google Sheets columns are consistent in both languages.
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

const en = {
  langSwitch: { label: "हिंदी", lang: "hi" as Lang, aria: "हिंदी में देखें" },
  nav: [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how-it-works" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  header: {
    cta: "I Need Manpower",
    findWork: "Find Work",
    findWorkSub: "काम खोजें" as string | undefined,
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "KAAM-CO home",
  },

  chooser: {
    step: "Step 01",
    choose: "Choose your path",
    title: ["What are you", "looking for?"],
    sub: "आप क्या ढूंढ रहे हैं?",
    subLang: "hi" as Lang,
    meta: "Takes under two minutes. No sign-up needed.",
    press: "Press",
    toChoose: "to choose",
    continue: "Continue",
  },

  paths: {
    company: {
      title: "I Need Manpower",
      sub: "मुझे कामगार चाहिए" as string | undefined,
      audience: "Companies & contractors",
      text: "Housekeeping, warehouse, construction, facility and more. Share your requirement in under two minutes.",
      tag: "Response in 2–4 hrs",
      alt: "Long warehouse aisle with stocked racks",
      formEyebrow: "Request manpower",
      formTitle: "Tell us about your requirement",
      formSub: undefined as string | undefined,
      next: [
        "Our team calls you within 2–4 business hours",
        "We qualify the requirement and match verified workers",
        "Deployment is coordinated and followed up to closure",
      ],
    },
    worker: {
      title: "I Am Looking for Work",
      sub: "काम चाहिए" as string | undefined,
      audience: "Job seekers",
      text: "Register from your phone in under three minutes. We call you when a suitable job is available.",
      tag: "English & हिंदी",
      alt: "Construction worker in hi-vis gear pouring concrete",
      formEyebrow: "Worker registration",
      formTitle: "Your details",
      formSub: "आपकी जानकारी" as string | undefined,
      next: [
        "Two short steps — name, phone, city and type of work",
        "We contact you when a suitable job is available",
        "Registration is free and does not guarantee a job",
      ],
    },
    supplier: {
      title: "I Want to Supply Manpower",
      sub: "मैं कामगार सप्लाई करता हूँ" as string | undefined,
      audience: "Agencies & contractors",
      text: "Join our verified partner network and receive manpower requirements across cities and states.",
      tag: "Verified partners",
      alt: "Site team in safety gear on a construction slab",
      formEyebrow: "Partner registration",
      formTitle: "Tell us about your agency",
      formSub: undefined as string | undefined,
      next: [
        "Share your agency, cities and the categories you supply",
        "We verify registration, GSTIN/PAN and compliance documents",
        "Receive requirements matched to your workforce",
      ],
    },
  },

  formView: {
    change: "Change selection",
    whatNext: "What happens next",
    choosePath: "Choose path",
    yourDetails: "Your details",
    progress: "Progress",
    privacy: "Your details are shared only with the KAAM-CO team and used to contact you about this request.",
  },

  register: {
    label: "Registration",
    visit: "Visit website",
    back: "Back to: What are you looking for?",
    rights: "The Force Behind Success",
    privacy: "Privacy",
    terms: "Terms",
    faq: "FAQ",
  },

  intro: {
    meta1: "Workforce platform · Est. 2026",
    meta2: "Bengaluru · Hyderabad · Chennai · Kochi",
    skip: "Skip intro",
  },

  services: {
    label: "Services",
    title: ["Manpower for", "every operation"],
    intro:
      "Trained, verified people for day-to-day operations, peak seasons and one-off projects — supplied from our own workforce and our partner network.",
    items: [
      { title: "Housekeeping & Cleaning", text: "Office, commercial and deep cleaning, janitorial and facility housekeeping." },
      { title: "Office Shifting & Relocation", text: "Loading, packing, dismantling, furniture shifting and material handling." },
      { title: "Warehouse & Logistics", text: "Pickers, packers, loaders, inventory helpers and dispatch assistants." },
      { title: "Industrial & General Labour", text: "Production helpers, factory workers and material handlers." },
      { title: "Hospital & Healthcare Support", text: "Housekeeping, non-clinical support and qualified care support staff." },
      { title: "Hospitality & Food Services", text: "Cooks, kitchen helpers, stewards, dishwashing and hotel housekeeping." },
      { title: "Construction & Project Support", text: "Site helpers, labourers, painters, electricians and skilled trades." },
      { title: "Facility Management", text: "Building maintenance, common-area cleaning, groundskeeping and assistants." },
    ],
    request: "Request staff",
    also: "Also available",
    alsoItems: [
      "Event manpower",
      "Retail assistants",
      "Office & pantry staff",
      "Maintenance",
      "Seasonal workforce",
      "Temporary workforce",
      "Skilled & semi-skilled manpower",
    ],
  },

  process: {
    label: "How it works",
    title: ["From requirement", "to deployment"],
    intro: "One simple flow for clients, workers and suppliers — tracked by our team from first form to final follow-up.",
    steps: [
      { title: "Choose your path", text: "Select client, worker or supplier." },
      { title: "Submit details", text: "Instant confirmation and a lead created for our team." },
      { title: "Verify & match", text: "Requirements are qualified and matched with available workforce." },
      { title: "Deploy & follow up", text: "Deployment is coordinated and tracked through to closure." },
    ],
  },

  about: {
    label: "About & coverage",
    title: ["The force behind", "your workforce"],
    p1: "KAAM-CO is a technology-enabled manpower platform that connects businesses that need people, individuals looking for work, and contractors who can supply workforce.",
    p2: "We fulfil requirements through our own workforce and verified partner suppliers, with clear processes, worker welfare commitments and transparent communication.",
    locations: "Service locations",
    live: "Live",
    more: "More cities coming",
    cities: ["Bengaluru", "Hyderabad", "Chennai", "Kochi"],
  },

  faq: {
    label: "FAQs",
    title: "Questions, answered",
    items: [
      { q: "How quickly will I hear back?", a: "Our target first response is within 2–4 business hours." },
      { q: "Does registering guarantee a job?", a: "No. We contact registered workers when a suitable opportunity becomes available." },
      {
        q: "Who employs deployed workers?",
        a: "Employment and wage responsibilities are stated in the service agreement shared with every client.",
      },
      {
        q: "How are suppliers verified?",
        a: "Through business registration, GSTIN/PAN, licences and compliance documents, reviewed by our team.",
      },
    ],
  },

  contact: {
    label: "Contact",
    title: ["Let’s talk", "workforce"],
    workers: "Workers & contractors",
    clients: "Clients",
    email: "Email",
    emailNone: "Address to be added",
    website: "Website",
    response: "Response time",
    responseValue: "First response within 2–4 business hours",
  },

  footer: {
    blurb: "Reliable manpower for businesses, flexible work for workers, growth for workforce partners.",
    explore: "Explore",
    legal: "Legal",
    rights: "All rights reserved.",
  },

  mobileCta: { work: "Find Work", workSub: "काम खोजें" as string | undefined, need: "I Need Manpower" },

  form: {
    select: "Select",
    mobile: "Mobile number",
    mobilePh: "10-digit mobile",
    mobileTitle: "10-digit Indian mobile number",
    submitting: "Submitting…",
    next: "Next",
    back: "Back",
    stepOf: (n: number) => `Step ${n} of 2`,
    contactPerson: "Contact person",
    other: "Other",
    worker: {
      name: "Full name",
      city: "City",
      workType: "Type of work",
      experience: "Experience",
      availability: "Available from",
      language: "Preferred language",
      submit: "Register",
    },
    // Hindi hints shown under English labels on the worker form.
    workerHints: {
      name: "पूरा नाम",
      mobile: "मोबाइल नंबर",
      city: "शहर",
      workType: "काम का प्रकार",
      experience: "अनुभव",
      availability: "कब से उपलब्ध",
      language: "पसंदीदा भाषा",
      step: "चरण",
      next: "आगे",
      submit: "रजिस्टर करें",
    } as Record<string, string> | null,
    supplier: {
      business: "Business / agency name",
      cities: "Cities you serve",
      citiesPh: "e.g. Bengaluru, Mysuru",
      size: "Workforce available",
      categories: "Categories you supply",
      gstin: "GSTIN (optional)",
      gstinPh: "15-character GSTIN",
      submit: "Join the partner network",
    },
    company: {
      company: "Company name",
      email: "Work email",
      workType: "Manpower needed",
      city: "Site city",
      headcount: "Number of workers",
      duration: "Duration",
      details: "Requirement details",
      detailsPh: "Shift timings, start date, skills…",
      submit: "Request manpower",
    },
    contact: {
      name: "Name",
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      received: "Message received",
      receivedText: (ref: string) => `Reference ${ref}. We’ll get back within 2–4 business hours.`,
    },
    options: {
      cities: [o("Bengaluru"), o("Hyderabad"), o("Chennai"), o("Kochi"), o("Other")],
      experience: [o("Fresher"), o("Less than 1 year"), o("1–3 years"), o("3+ years")],
      availability: [o("Immediately"), o("Within a week"), o("Within a month")],
      languages: ["Hindi", "English", "Kannada", "Telugu", "Tamil", "Malayalam", "Bengali", "Odia"].map((l) => o(l)),
      duration: [o("One day / event"), o("Up to 1 month"), o("1–6 months"), o("Long-term (6+ months)")],
      size: [o("1–10"), o("11–50"), o("51–200"), o("200+")],
    },
  },

  success: {
    received: "Received",
    thanks: "धन्यवाद! हम आपसे संपर्क करेंगे।" as string | undefined,
    respond: "Our team aims to respond within 2–4 business hours. Keep your reference ID handy.",
    ref: "Reference ID",
    referral: "Your referral link",
    another: "Submit another",
  },

  errors: {
    unknown: "Unknown form. Please refresh and try again.",
    check: "Please check the highlighted fields.",
    required: "Required",
    mobile: "Enter a valid 10-digit mobile number",
    email: "Enter a valid email",
  },
};

export type Dict = typeof en;

const hiCities = ["बेंगलुरु", "हैदराबाद", "चेन्नई", "कोच्चि"];

const hi: Dict = {
  langSwitch: { label: "English", lang: "en", aria: "View in English" },
  nav: [
    { label: "सेवाएँ", href: "#services" },
    { label: "कैसे काम करता है", href: "#how-it-works" },
    { label: "हमारे बारे में", href: "#about" },
    { label: "सवाल-जवाब", href: "#faq" },
    { label: "संपर्क", href: "#contact" },
  ],
  header: {
    cta: "मुझे कामगार चाहिए",
    findWork: "काम खोजें",
    findWorkSub: undefined,
    openMenu: "मेन्यू खोलें",
    closeMenu: "मेन्यू बंद करें",
    home: "KAAM-CO होम",
  },

  chooser: {
    step: "चरण 01",
    choose: "अपना रास्ता चुनें",
    title: ["आप क्या", "ढूंढ रहे हैं?"],
    sub: "What are you looking for?",
    subLang: "en",
    meta: "दो मिनट से कम समय। कोई साइन-अप नहीं।",
    press: "चुनने के लिए",
    toChoose: "दबाएँ",
    continue: "आगे बढ़ें",
  },

  paths: {
    company: {
      title: "मुझे कामगार चाहिए",
      sub: undefined,
      audience: "कंपनियाँ और ठेकेदार",
      text: "हाउसकीपिंग, वेयरहाउस, कंस्ट्रक्शन, फैसिलिटी और भी बहुत कुछ। दो मिनट में अपनी ज़रूरत बताइए।",
      tag: "2–4 घंटे में जवाब",
      alt: "सामान से भरी रैक वाला लंबा वेयरहाउस गलियारा",
      formEyebrow: "कामगारों का अनुरोध",
      formTitle: "अपनी ज़रूरत बताइए",
      formSub: undefined,
      next: [
        "हमारी टीम 2–4 कार्य घंटों में आपको कॉल करेगी",
        "हम ज़रूरत समझकर सत्यापित कामगारों से मिलान करते हैं",
        "तैनाती से लेकर काम पूरा होने तक हम फॉलो-अप करते हैं",
      ],
    },
    worker: {
      title: "मुझे काम चाहिए",
      sub: undefined,
      audience: "काम ढूंढने वाले",
      text: "अपने फ़ोन से तीन मिनट में रजिस्टर करें। सही काम मिलने पर हम आपको कॉल करेंगे।",
      tag: "हिंदी और English",
      alt: "सेफ़्टी जैकेट पहने कंक्रीट डालता हुआ कामगार",
      formEyebrow: "कामगार रजिस्ट्रेशन",
      formTitle: "आपकी जानकारी",
      formSub: undefined,
      next: [
        "दो छोटे चरण — नाम, फ़ोन, शहर और काम का प्रकार",
        "सही काम उपलब्ध होने पर हम आपसे संपर्क करेंगे",
        "रजिस्ट्रेशन मुफ़्त है, पर नौकरी की गारंटी नहीं है",
      ],
    },
    supplier: {
      title: "मैं कामगार सप्लाई करता हूँ",
      sub: undefined,
      audience: "एजेंसियाँ और ठेकेदार",
      text: "हमारे सत्यापित पार्टनर नेटवर्क से जुड़ें और कई शहरों व राज्यों से कामगारों की ज़रूरतें पाएँ।",
      tag: "सत्यापित पार्टनर",
      alt: "निर्माण स्थल पर सेफ़्टी गियर में साइट टीम",
      formEyebrow: "पार्टनर रजिस्ट्रेशन",
      formTitle: "अपनी एजेंसी के बारे में बताइए",
      formSub: undefined,
      next: [
        "अपनी एजेंसी, शहर और सप्लाई की श्रेणियाँ बताइए",
        "हम रजिस्ट्रेशन, GSTIN/PAN और कंप्लायंस दस्तावेज़ जाँचते हैं",
        "अपने कामगारों के अनुसार ज़रूरतें पाएँ",
      ],
    },
  },

  formView: {
    change: "चुनाव बदलें",
    whatNext: "आगे क्या होगा",
    choosePath: "रास्ता चुनें",
    yourDetails: "आपकी जानकारी",
    progress: "प्रगति",
    privacy: "आपकी जानकारी सिर्फ़ KAAM-CO टीम के साथ साझा होती है और इसी अनुरोध के लिए आपसे संपर्क करने में इस्तेमाल होती है।",
  },

  register: {
    label: "रजिस्ट्रेशन",
    visit: "वेबसाइट देखें",
    back: "वापस: आप क्या ढूंढ रहे हैं?",
    rights: "The Force Behind Success",
    privacy: "प्राइवेसी",
    terms: "शर्तें",
    faq: "सवाल-जवाब",
  },

  intro: {
    meta1: "वर्कफ़ोर्स प्लेटफ़ॉर्म · स्थापना 2026",
    meta2: hiCities.join(" · "),
    skip: "इंट्रो छोड़ें",
  },

  services: {
    label: "सेवाएँ",
    title: ["हर काम के लिए", "सही कामगार"],
    intro:
      "रोज़मर्रा के काम, पीक सीज़न और एक बार के प्रोजेक्ट के लिए प्रशिक्षित, सत्यापित लोग — हमारी अपनी टीम और पार्टनर नेटवर्क से।",
    items: [
      { title: "हाउसकीपिंग और सफ़ाई", text: "ऑफ़िस, कमर्शियल और डीप क्लीनिंग, जैनिटोरियल और फैसिलिटी हाउसकीपिंग।" },
      { title: "ऑफ़िस शिफ्टिंग और रीलोकेशन", text: "लोडिंग, पैकिंग, सामान खोलना-जोड़ना, फ़र्नीचर शिफ्टिंग और माल ढुलाई।" },
      { title: "वेयरहाउस और लॉजिस्टिक्स", text: "पिकर, पैकर, लोडर, इन्वेंटरी हेल्पर और डिस्पैच असिस्टेंट।" },
      { title: "इंडस्ट्रियल और सामान्य लेबर", text: "प्रोडक्शन हेल्पर, फ़ैक्टरी वर्कर और मटीरियल हैंडलर।" },
      { title: "अस्पताल और हेल्थकेयर सपोर्ट", text: "हाउसकीपिंग, नॉन-क्लिनिकल सपोर्ट और योग्य केयर सपोर्ट स्टाफ़।" },
      { title: "हॉस्पिटैलिटी और फ़ूड सर्विस", text: "कुक, किचन हेल्पर, स्टीवर्ड, बर्तन धोने वाले और होटल हाउसकीपिंग।" },
      { title: "कंस्ट्रक्शन और प्रोजेक्ट सपोर्ट", text: "साइट हेल्पर, मज़दूर, पेंटर, इलेक्ट्रीशियन और कुशल कारीगर।" },
      { title: "फैसिलिटी मैनेजमेंट", text: "बिल्डिंग मेंटेनेंस, कॉमन-एरिया की सफ़ाई, बागवानी और सहायक।" },
    ],
    request: "स्टाफ़ माँगें",
    also: "और भी उपलब्ध",
    alsoItems: [
      "इवेंट स्टाफ़",
      "रिटेल असिस्टेंट",
      "ऑफ़िस और पैंट्री स्टाफ़",
      "मेंटेनेंस",
      "सीज़नल कामगार",
      "अस्थायी कामगार",
      "कुशल और अर्ध-कुशल कामगार",
    ],
  },

  process: {
    label: "कैसे काम करता है",
    title: ["ज़रूरत से", "तैनाती तक"],
    intro: "क्लाइंट, कामगार और सप्लायर — सबके लिए एक आसान प्रक्रिया, पहले फ़ॉर्म से आख़िरी फॉलो-अप तक हमारी टीम की निगरानी में।",
    steps: [
      { title: "अपना रास्ता चुनें", text: "क्लाइंट, कामगार या सप्लायर चुनें।" },
      { title: "जानकारी भेजें", text: "तुरंत पुष्टि, और हमारी टीम के पास आपकी जानकारी।" },
      { title: "जाँच और मिलान", text: "ज़रूरत की जाँच करके उपलब्ध कामगारों से मिलान।" },
      { title: "तैनाती और फॉलो-अप", text: "तैनाती से लेकर काम पूरा होने तक पूरी निगरानी।" },
    ],
  },

  about: {
    label: "हमारे बारे में और कवरेज",
    title: ["आपकी टीम के", "पीछे की ताक़त"],
    p1: "KAAM-CO एक टेक्नोलॉजी आधारित मैनपावर प्लेटफ़ॉर्म है, जो कामगार चाहने वाले व्यवसायों, काम ढूंढने वाले लोगों और कामगार सप्लाई करने वाले ठेकेदारों को जोड़ता है।",
    p2: "हम अपनी टीम और सत्यापित पार्टनर सप्लायर्स के ज़रिए ज़रूरतें पूरी करते हैं — साफ़ प्रक्रिया, कामगार कल्याण और पारदर्शी बातचीत के साथ।",
    locations: "सेवा वाले शहर",
    live: "चालू",
    more: "और शहर जल्द",
    cities: hiCities,
  },

  faq: {
    label: "सवाल-जवाब",
    title: "आपके सवाल, हमारे जवाब",
    items: [
      { q: "मुझे जवाब कितनी जल्दी मिलेगा?", a: "हमारा लक्ष्य 2–4 कार्य घंटों में पहला जवाब देना है।" },
      { q: "क्या रजिस्टर करने से नौकरी पक्की है?", a: "नहीं। सही काम उपलब्ध होने पर हम रजिस्टर्ड कामगारों से संपर्क करते हैं।" },
      {
        q: "तैनात कामगारों का नियोक्ता कौन होता है?",
        a: "रोज़गार और वेतन की ज़िम्मेदारियाँ हर क्लाइंट के साथ होने वाले सर्विस एग्रीमेंट में लिखी होती हैं।",
      },
      {
        q: "सप्लायर्स की जाँच कैसे होती है?",
        a: "बिज़नेस रजिस्ट्रेशन, GSTIN/PAN, लाइसेंस और कंप्लायंस दस्तावेज़ों से, जिनकी समीक्षा हमारी टीम करती है।",
      },
    ],
  },

  contact: {
    label: "संपर्क",
    title: ["आइए, कामगारों की", "बात करें"],
    workers: "कामगार और ठेकेदार",
    clients: "क्लाइंट",
    email: "ईमेल",
    emailNone: "जल्द जोड़ा जाएगा",
    website: "वेबसाइट",
    response: "जवाब का समय",
    responseValue: "2–4 कार्य घंटों में पहला जवाब",
  },

  footer: {
    blurb: "व्यवसायों के लिए भरोसेमंद कामगार, कामगारों के लिए लचीला काम, पार्टनर्स के लिए तरक्की।",
    explore: "देखें",
    legal: "क़ानूनी",
    rights: "सर्वाधिकार सुरक्षित।",
  },

  mobileCta: { work: "काम खोजें", workSub: undefined, need: "कामगार चाहिए" },

  form: {
    select: "चुनें",
    mobile: "मोबाइल नंबर",
    mobilePh: "10 अंकों का मोबाइल नंबर",
    mobileTitle: "10 अंकों का भारतीय मोबाइल नंबर",
    submitting: "भेजा जा रहा है…",
    next: "आगे",
    back: "पीछे",
    stepOf: (n: number) => `चरण ${n} / 2`,
    contactPerson: "संपर्क व्यक्ति",
    other: "अन्य",
    worker: {
      name: "पूरा नाम",
      city: "शहर",
      workType: "काम का प्रकार",
      experience: "अनुभव",
      availability: "कब से उपलब्ध",
      language: "पसंदीदा भाषा",
      submit: "रजिस्टर करें",
    },
    workerHints: null,
    supplier: {
      business: "बिज़नेस / एजेंसी का नाम",
      cities: "आप किन शहरों में सप्लाई करते हैं",
      citiesPh: "जैसे बेंगलुरु, मैसूरु",
      size: "उपलब्ध कामगार",
      categories: "आप किन श्रेणियों में सप्लाई करते हैं",
      gstin: "GSTIN (वैकल्पिक)",
      gstinPh: "15 अक्षरों का GSTIN",
      submit: "पार्टनर नेटवर्क से जुड़ें",
    },
    company: {
      company: "कंपनी का नाम",
      email: "ईमेल",
      workType: "किस तरह के कामगार चाहिए",
      city: "साइट का शहर",
      headcount: "कामगारों की संख्या",
      duration: "अवधि",
      details: "ज़रूरत का विवरण",
      detailsPh: "शिफ़्ट का समय, शुरुआत की तारीख, कौशल…",
      submit: "कामगारों का अनुरोध करें",
    },
    contact: {
      name: "नाम",
      message: "संदेश",
      submit: "संदेश भेजें",
      sending: "भेजा जा रहा है…",
      received: "संदेश मिल गया",
      receivedText: (ref: string) => `रेफ़रेंस ${ref}। हम 2–4 कार्य घंटों में जवाब देंगे।`,
    },
    options: {
      cities: [...["Bengaluru", "Hyderabad", "Chennai", "Kochi"].map((c, i) => o(c, hiCities[i])), o("Other", "अन्य")],
      experience: [o("Fresher", "फ्रेशर"), o("Less than 1 year", "1 साल से कम"), o("1–3 years", "1–3 साल"), o("3+ years", "3+ साल")],
      availability: [o("Immediately", "तुरंत"), o("Within a week", "एक हफ़्ते में"), o("Within a month", "एक महीने में")],
      languages: [
        o("Hindi", "हिंदी"),
        o("English", "अंग्रेज़ी"),
        o("Kannada", "कन्नड़"),
        o("Telugu", "तेलुगु"),
        o("Tamil", "तमिल"),
        o("Malayalam", "मलयालम"),
        o("Bengali", "बांग्ला"),
        o("Odia", "ओड़िया"),
      ],
      duration: [
        o("One day / event", "एक दिन / इवेंट"),
        o("Up to 1 month", "1 महीने तक"),
        o("1–6 months", "1–6 महीने"),
        o("Long-term (6+ months)", "लंबी अवधि (6+ महीने)"),
      ],
      size: [o("1–10"), o("11–50"), o("51–200"), o("200+")],
    },
  },

  success: {
    received: "मिल गया!",
    thanks: undefined,
    respond: "हमारी टीम 2–4 कार्य घंटों में जवाब देगी। अपना रेफ़रेंस ID संभालकर रखें।",
    ref: "रेफ़रेंस ID",
    referral: "आपका रेफ़रल लिंक",
    another: "एक और भेजें",
  },

  errors: {
    unknown: "कृपया पेज रीफ़्रेश करके दोबारा कोशिश करें।",
    check: "कृपया लाल निशान वाले फ़ील्ड जाँचें।",
    required: "ज़रूरी है",
    mobile: "सही 10 अंकों का मोबाइल नंबर डालें",
    email: "सही ईमेल डालें",
  },
};

export const dict: Record<Lang, Dict> = { en, hi };

/** Service categories as form options: English value, localised label. */
export function workTypeOptions(lang: Lang): Opt[] {
  const d = dict[lang];
  return [...en.services.items.map((s, i) => o(s.title, d.services.items[i].title)), o("Other", d.form.other)];
}
