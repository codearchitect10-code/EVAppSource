/**
 * EVA™ DNA Analysis Data
 * 3 systems: Methylation Pathway, Diet & Sensitivities, Disease Risks
 * Variants include polygenic risk scores (1M+ variants each)
 * ApoE allele stratification on Alzheimer's
 * Gender-gated: Breast Cancer, Ovarian Cancer (female only)
 */

export const dnaSystems = [
  { id: "methylation", name: "Methylation Pathway", desc: "Supports DNA repair, detoxification, neurotransmitters, and long-term disease prevention.",
    rule: "Shows only impaired genes. Tap 'See all' for complete panel.",
    markers: [
      { gene: "MTHFR", status: "impaired", level: "orange", meaning: "MTHFR controls conversion of folate into its active form used for DNA repair and methylation.", action: "Supports methylation using L-Methylfolate and Vitamin B12." },
      { gene: "FOLH1", status: "normal", level: "green", meaning: "FOLH1 regulates absorption of folate from food in the gut.", action: "No action needed." },
      { gene: "DHFR", status: "normal", level: "green", meaning: "DHFR converts synthetic folic acid into active folate in the body.", action: "No action needed." },
      { gene: "MTR", status: "normal", level: "green", meaning: "MTR helps recycle homocysteine into methionine, a key step in methylation.", action: "No action needed." },
      { gene: "MTRR", status: "impaired", level: "orange", meaning: "MTRR regenerates active B12 required for methylation to function properly.", action: "Supports methylation using Vitamin B12." },
      { gene: "CUBN", status: "normal", level: "green", meaning: "CUBN affects absorption of Vitamin B12 from the gut.", action: "No action needed." },
      { gene: "PDXK", status: "normal", level: "green", meaning: "PDXK activates Vitamin B6, which supports homocysteine metabolism.", action: "No action needed." },
      { gene: "COMT", status: "impaired", level: "orange", meaning: "COMT controls the breakdown of dopamine, adrenaline, and oestrogen. Slow variants cause slower clearance of stress hormones, amplifying the anxiety and stress response.", action: "Regulate COMT activity via targeted Magnesium, Omega-3, and Vitamin C dosing." },
    ]
  },
  { id: "diet", name: "Diet & Sensitivities", desc: "Determines how your body responds to macronutrients and potential food triggers.",
    rule: "Shows macronutrient response and positive sensitivities only.",
    macros: [
      { name: "Carbohydrate Response", result: "Intermediate response", color: "gold", meaning: "Indicates how efficiently your body processes carbohydrates and regulates blood sugar.", action: "Personalises carbohydrate intake and plate structure." },
      { name: "Fat Response", result: "Worse response", color: "red", meaning: "Indicates how your body responds to dietary fats, especially saturated fats.", action: "Guides fat intake and saturated fat restriction." },
      { name: "Protein Response", result: "Better response", color: "emerald", meaning: "Indicates how effectively your body uses protein for muscle and metabolism.", action: "Sets personalised daily protein targets." },
    ],
    sensitivities: [
      { name: "Lactose Sensitivity", detected: true, meaning: "Indicates reduced ability to digest lactose, leading to bloating or discomfort.", action: "Initiate 3-week lactose elimination protocol." },
      { name: "Gluten Sensitivity", detected: false, meaning: "Indicates increased likelihood of sensitivity to gluten-containing foods.", action: "No sensitivity detected." },
      { name: "Histamine Sensitivity", detected: false, meaning: "Indicates reduced ability to break down histamine from foods.", action: "No sensitivity detected." },
      { name: "Oxalate Sensitivity", detected: false, meaning: "Indicates increased sensitivity to oxalate-rich foods.", action: "No sensitivity detected." },
      { name: "Salicylate Sensitivity", detected: false, meaning: "Indicates sensitivity to salicylates found in fruits, spices, and medications.", action: "No sensitivity detected." },
    ]
  },
  { id: "risk", name: "Disease Risks", desc: "Represents genetic predisposition — not diagnosis. Results indicate probabilities, not certainties.",
    rule: "Shows only higher/increased risk markers.",
    markers: [
      { name: "Coronary Artery Disease", category: "Cardiovascular", risk: "higher", variants: "1,049,366", meaning: "Estimates inherited risk of plaque buildup in heart arteries, the process that causes heart attacks.", action: "Aggressively optimise ApoB, inflammation, and insulin resistance." },
      { name: "Type 2 Diabetes", category: "Metabolic", risk: "average", variants: "1,048,858", meaning: "Estimates your genetic risk of developing Type 2 Diabetes, which is shaped by both lifestyle and genetics.", action: "No increased genetic risk detected." },
      { name: "Alzheimer's Disease (ApoE)", category: "Neurological", risk: "average", variants: "ApoE", alleles: "E3/E3", meaning: "Driven by ApoE genotype. One copy of E4 = slightly elevated risk. Two copies = significantly elevated. No E4 = average risk.", action: "No increased genetic risk detected." },
      { name: "Colorectal Cancer", category: "Cancer", risk: "average", variants: "1,049,410", meaning: "Indicates increased inherited risk of colon cancer.", action: "No increased genetic risk detected." },
      { name: "Prostate Cancer", category: "Cancer", risk: "higher", variants: "1,049,413", meaning: "Indicates increased inherited risk of prostate cancer.", action: "Initiate early screening including PSA blood test." },
      { name: "Lung Cancer", category: "Cancer", risk: "average", variants: "849,819", meaning: "Indicates increased inherited risk of lung cancer.", action: "No increased genetic risk detected." },
      { name: "Breast Cancer", category: "Cancer", risk: "average", variants: "TBC", meaning: "Indicates inherited risk of breast cancer.", action: "No increased genetic risk detected." },
      { name: "Ovarian Cancer", category: "Cancer", risk: "average", variants: "TBC", meaning: "Indicates inherited risk of ovarian cancer.", action: "No increased genetic risk detected." },
      { name: "Stroke", category: "Disease Risks", risk: "average", variants: "1,030,648", meaning: "Estimates inherited risk of stroke based on cardiovascular and clotting genetic markers.", action: "Optimise blood pressure, inflammation, and cardiovascular health." },
      { name: "Melanoma", category: "Disease Risks", risk: "average", variants: "1,049,396", meaning: "Indicates inherited risk of melanoma skin cancer.", action: "Prioritise sun protection and regular skin checks." },
      { name: "Pancreatic Cancer", category: "Disease Risks", risk: "average", variants: "35,160", meaning: "Indicates inherited risk of pancreatic cancer.", action: "Early screening." },
    ]
  },
];
