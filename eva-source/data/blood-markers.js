/**
 * EVA™ Blood Biomarker Data
 * 70 markers across 6 systems (A-F)
 * Each system has main (always visible) and expanded (tap to reveal) markers
 * 
 * Marker shape: { name, val, unit, status, optimal, meaning, action }
 * Status: "optimal" | "suboptimal" | "abnormal"
 */

export const bloodSystems = [
    { id:"cardio", letter:"A", name:"Heart & Blood Vessels", ic:"\u2665",
      main:[
        { name:"ApoB",val:"112",unit:"mg/dL",status:"suboptimal",optimal:"<100 mg/dL (target-dependent)",meaning:"ApoB counts the number of cholesterol particles that can enter arteries and cause plaque buildup, driving heart attack risk.",action:"Supports ApoB reduction using Berberine to improve cholesterol clearance." },
        { name:"Lipoprotein(a)",val:"22",unit:"mg/dL",status:"optimal",optimal:"<30 mg/dL",meaning:"Lp(a) is an inherited cholesterol particle that increases the risk of heart attack and stroke.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ],
      expanded:[
        { name:"LDL Cholesterol",val:"118",unit:"mg/dL",status:"suboptimal",optimal:"<100 mg/dL",meaning:"LDL carries cholesterol through the bloodstream and contributes to plaque formation when elevated.",action:"Supports cholesterol metabolism through dietary optimisation." },
        { name:"HDL Cholesterol",val:"58",unit:"mg/dL",status:"optimal",optimal:"50–90 mg/dL",meaning:"HDL helps remove excess cholesterol from the bloodstream and transport it back to the liver.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Triglycerides",val:"142",unit:"mg/dL",status:"suboptimal",optimal:"<90 mg/dL",meaning:"Triglycerides measure circulating fats and reflect metabolic health and insulin sensitivity.",action:"Supports fat metabolism using Omega-3 fatty acids." },
      ]
    },
    { id:"sugar", letter:"B", name:"Blood Sugar Control", ic:"\u25C9",
      main:[
        { name:"HOMA-IR",val:"2.1",unit:"",status:"suboptimal",optimal:"≤1.5",meaning:"HOMA-IR estimates how resistant your body is to insulin, a key driver of metabolic disease.",action:"Supports insulin sensitivity using Berberine and Magnesium." },
        { name:"TG/HDL Ratio",val:"2.4",unit:"",status:"suboptimal",optimal:"≤1.5",meaning:"This ratio reflects how efficiently your body processes energy and indicates insulin resistance risk.",action:"Supports metabolic health using Omega-3 and Berberine." },
      ],
      expanded:[
        { name:"Fasting Glucose",val:"92",unit:"mg/dL",status:"optimal",optimal:"<95 mg/dL",meaning:"Fasting glucose measures how well your body maintains stable blood sugar levels.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Fasting Insulin",val:"9.2",unit:"µIU/mL",status:"suboptimal",optimal:"<6 µIU/mL",meaning:"Fasting insulin shows how much insulin your body needs to regulate blood sugar.",action:"Supports insulin sensitivity using Berberine." },
      ]
    },
    { id:"inflam", letter:"C", name:"Inflammation & Liver", ic:"\u26A0",
      main:[
        { name:"hs-CRP",val:"2.8",unit:"mg/L",status:"abnormal",optimal:"<0.6 mg/L",meaning:"hs-CRP measures inflammation in the body and is linked to chronic disease risk.",action:"Supports inflammation reduction using Omega-3 and Vitamin C." },
        { name:"GGT",val:"24",unit:"U/L",status:"suboptimal",optimal:"<11 U/L",meaning:"GGT is a liver enzyme that reflects oxidative stress and detoxification burden.",action:"Supports liver detox and metabolic recovery." },
      ],
      expanded:[
        { name:"AST",val:"28",unit:"U/L",status:"optimal",optimal:"17–30 U/L",meaning:"AST reflects liver and metabolic stress.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"ALT",val:"32",unit:"U/L",status:"suboptimal",optimal:"<29 U/L",meaning:"ALT measures liver cell stress and damage. It is more specific to liver stress compared to AST.",action:"Supports liver health through metabolic optimisation." },
        { name:"Uric Acid",val:"5.8",unit:"mg/dL",status:"optimal",optimal:"<6 mg/dL",meaning:"Uric acid reflects purine metabolism and is linked to inflammation, gout, and metabolic risk.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ]
    },
    { id:"nutrition", letter:"D", name:"Nutrition", ic:"\u2726",
      main:[
        { name:"Vitamin B12",val:"380",unit:"pg/mL",status:"suboptimal",optimal:">400 pg/mL",meaning:"Vitamin B12 supports nerve function, energy production, and methylation pathways.",action:"Supports methylation using Vitamin B12 supplementation." },
        { name:"Folate",val:"14",unit:"ng/mL",status:"optimal",optimal:"≥11 ng/mL",meaning:"Folate supports DNA repair and methylation processes.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Homocysteine",val:"11.2",unit:"µmol/L",status:"suboptimal",optimal:"<9 µmol/L",meaning:"Homocysteine rises when methylation is impaired and is linked to cardiovascular and brain risk.",action:"Supports methylation using L-Methylfolate and Vitamin B12." },
        { name:"Magnesium (RBC)",val:"4.2",unit:"mEq/L",status:"suboptimal",optimal:"≥4.5 mEq/L",meaning:"Magnesium supports energy production, sleep, and nervous system balance.",action:"Supports recovery using Magnesium Glycinate." },
        { name:"Vitamin D",val:"18",unit:"ng/mL",status:"abnormal",optimal:"50–80 ng/mL",meaning:"Vitamin D regulates immune function, bone health, and metabolic balance.",action:"Optimises levels using Vitamin D3 + K2." },
      ],
      expanded:[
        { name:"Zinc",val:"74",unit:"µg/dL",status:"suboptimal",optimal:"80–130 µg/dL",meaning:"Zinc supports immune function, hormone production, and cellular repair.",action:"Supports immune and hormone health using Zinc." },
        { name:"Ferritin",val:"89",unit:"ng/mL",status:"optimal",optimal:"70–200 ng/mL",meaning:"Ferritin reflects iron storage and oxygen delivery capacity, affecting energy, sleep, and hair/skin.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Hemoglobin",val:"14.8",unit:"g/dL",status:"optimal",optimal:">13 g/dL",meaning:"Hemoglobin carries oxygen in the blood and reflects overall oxygen transport.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ]
    },
    { id:"hormones", letter:"E", name:"Hormones", ic:"\u2642",
      main: gender === "male" ? [
        { name:"Testosterone",val:"680",unit:"ng/dL",status:"optimal",optimal:"500–900 ng/dL",meaning:"Testosterone regulates energy, muscle mass, mood, and metabolic health.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Cortisol (AM)",val:"14",unit:"µg/dL",status:"optimal",optimal:"6–20 µg/dL",meaning:"Cortisol regulates stress response, energy levels, and daily rhythm.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"IGF-1",val:"218",unit:"ng/mL",status:"optimal",optimal:"Age-adjusted median",meaning:"IGF-1 reflects growth hormone activity linked to muscle maintenance and metabolic health.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ] : [
        { name:"Estrogen (Estradiol)",val:"—",unit:"pg/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"Estrogen regulates reproductive health, bone strength, and metabolic balance.",action:"Book a telehealth consult with an EVA™ physician." },
        { name:"Progesterone",val:"—",unit:"ng/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"Progesterone supports menstrual balance, fertility, and mood regulation.",action:"Book a telehealth consult with an EVA™ physician." },
        { name:"LH",val:"—",unit:"mIU/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"LH regulates ovulation and reproductive hormone signalling.",action:"Book a telehealth consult with an EVA™ physician." },
        { name:"Cortisol (AM)",val:"14",unit:"µg/dL",status:"optimal",optimal:"6–20 µg/dL",meaning:"Cortisol regulates stress response, energy levels, and daily rhythm.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ],
      expanded:[
        { name:"TSH",val:"2.1",unit:"mIU/L",status:"optimal",optimal:"0.5–2.5 mIU/L",meaning:"TSH indicates thyroid function which regulates metabolism, energy, and body temperature.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Free T3",val:"0.38",unit:"ng/dL",status:"optimal",optimal:">0.35 ng/dL",meaning:"Free T3 is the active thyroid hormone that regulates metabolism at the cellular level.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Free T4",val:"1.2",unit:"ng/dL",status:"optimal",optimal:">1.0 ng/dL",meaning:"Free T4 is converted to active T3 and reflects thyroid output.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        ...(gender === "male" ? [
          { name:"SHBG",val:"38",unit:"nmol/L",status:"optimal",optimal:"Reference range",meaning:"SHBG binds testosterone and regulates free hormone availability.",action:"Book a telehealth consult with an EVA™ physician." },
          { name:"PSA",val:"0.8",unit:"ng/mL",status:"optimal",optimal:"<4.0 ng/mL",meaning:"PSA screens for prostate health and inflammation.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        ] : [
          { name:"FSH",val:"—",unit:"mIU/mL",status:"optimal",optimal:"Cycle-dependent",meaning:"FSH controls ovarian function and reproductive hormone balance.",action:"Book a telehealth consult with an EVA™ physician." },
        ]),
        { name:"DHEA",val:"320",unit:"µg/dL",status:"optimal",optimal:"Reference range",meaning:"DHEA is a precursor hormone supporting vitality and immune function.",action:"Book a telehealth consult with an EVA™ physician." },
      ]
    },
    { id:"kidney", letter:"F", name:"Kidney & Electrolytes", ic:"\u25CE",
      main:[
        { name:"Creatinine",val:"1.0",unit:"mg/dL",status:"optimal",optimal:"<1.2 mg/dL",meaning:"Creatinine reflects kidney function and filtration capacity.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Sodium",val:"141",unit:"mmol/L",status:"optimal",optimal:"138–145 mmol/L",meaning:"Sodium regulates fluid balance and nerve function.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Potassium",val:"4.2",unit:"mmol/L",status:"optimal",optimal:"3.8–5.5 mmol/L",meaning:"Potassium supports heart rhythm and muscle function.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ],
      expanded:[
        { name:"BUN",val:"16",unit:"mg/dL",status:"optimal",optimal:"7–20 mg/dL",meaning:"BUN reflects protein metabolism and kidney function.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
        { name:"Chloride",val:"102",unit:"mmol/L",status:"optimal",optimal:"98–106 mmol/L",meaning:"Chloride helps maintain fluid balance and acid-base stability.",action:"Maintain optimal levels via EVA™'s personalised protocol." },
      ]
    },
  ];

