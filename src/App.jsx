import { useState, useCallback } from "react";

const TRADES = {
  roofing: {
    label: "Roofing",
    color: "#1a4a8a",
    bg: "#e8eef7",
    sections: [
      {
        heading: "Asphalt — Class 3 (All-in per SQ)",
        note: "Includes: tear-off 1 layer, I&W shield, synthetic felt, drip edge, starter, ridge cap, step flashing, pipe boots, coil nails & sealants",
        items: [
          { id:"rf_c3_low",  label:"3/12–6/12  (OC Duration / Malarkey Highlander)", unit:"SQ", price:700 },
          { id:"rf_c3_mid",  label:"7/12–9/12  (OC Duration / Malarkey Highlander)", unit:"SQ", price:750 },
          { id:"rf_c3_high", label:"10/12–12/12  (OC Duration / Malarkey Highlander)", unit:"SQ", price:800 },
        ]
      },
      {
        heading: "Asphalt — Class 4 Impact (All-in per SQ)",
        note: "Preferred for hail claims — OC Flex / Malarkey Vista",
        items: [
          { id:"rf_c4_low",  label:"3/12–6/12  (OC Flex / Malarkey Vista)", unit:"SQ", price:750 },
          { id:"rf_c4_mid",  label:"7/12–9/12  (OC Flex / Malarkey Vista)", unit:"SQ", price:800 },
          { id:"rf_c4_high", label:"10/12–12/12  (OC Flex / Malarkey Vista)", unit:"SQ", price:875, note:"ND/SD high-wind zones recommended" },
        ]
      },
      {
        heading: "Metal Shake (All-in per SQ)",
        note: "EDCO Arrowline 30g. — includes clips, fasteners, ridge & trim pieces",
        items: [
          { id:"rf_metal_low",  label:"Std Colors  3/12–6/12", unit:"SQ", price:1750 },
          { id:"rf_metal_mid",  label:"Std Colors  7/12–9/12", unit:"SQ", price:1900 },
          { id:"rf_metal_high", label:"Std Colors  10/12–12/12", unit:"SQ", price:2050 },
        ]
      },
      {
        heading: "Metal Standing Seam (All-in per SQ)",
        items: [
          { id:"rf_ss_exp_low",  label:"Exposed Fastener  3/12–6/12", unit:"SQ", price:1400 },
          { id:"rf_ss_exp_high", label:"Exposed Fastener  7/12–12/12", unit:"SQ", price:1500 },
          { id:"rf_ss_con_low",  label:"Concealed Fastener  3/12–6/12", unit:"SQ", price:1650, note:"Premium hidden-fastener system" },
          { id:"rf_ss_con_high", label:"Concealed Fastener  7/12–12/12", unit:"SQ", price:1800 },
        ]
      },
      {
        heading: "Cedar Shake (All-in per SQ)",
        items: [
          { id:"rf_cedar_low", label:"Blue Label #1  3/12–6/12", unit:"SQ", price:1100 },
          { id:"rf_cedar_mid", label:"Blue Label #1  7/12–9/12", unit:"SQ", price:1200 },
        ]
      },
      {
        heading: "Flat Roofing — EPDM 60-mil (All-in per SQ)",
        note: "Includes membrane, adhesive, seam tape, drip edge",
        items: [
          { id:"rf_epdm_s",  label:"Layover, No Insulation  — < 10 SQ", unit:"SQ", price:2750 },
          { id:"rf_epdm_m",  label:"Layover, No Insulation  — 10–30 SQ", unit:"SQ", price:1900 },
          { id:"rf_epdm_l",  label:"Layover, N
