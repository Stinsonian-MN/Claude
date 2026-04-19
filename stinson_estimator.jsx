import { useState, useCallback } from "react";

// ── PRICE DATABASE — items grouped into sections per trade ─────
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
          { id:"rf_epdm_l",  label:"Layover, No Insulation  — > 30 SQ", unit:"SQ", price:1600 },
          { id:"rf_epdm_to", label:"Tear-off + New ISO Insulation  — 10–30 SQ", unit:"SQ", price:2800 },
        ]
      },
      {
        heading: "Flat Roofing — TPO 60-mil (All-in per SQ)",
        items: [
          { id:"rf_tpo_m",  label:"Layover, No Insulation  — 10–30 SQ", unit:"SQ", price:2000 },
          { id:"rf_tpo_to", label:"Tear-off + New ISO Insulation  — 10–30 SQ", unit:"SQ", price:3000 },
        ]
      },
      {
        heading: "Add-Ons & Surcharges",
        note: "Add to base SQ price as applicable",
        items: [
          { id:"rf_layer",  label:"Additional Tear-Off Layer (per layer, per SQ)", unit:"SQ", price:35 },
          { id:"rf_deck",   label:"Deck Replacement / Re-sheet  7/16 OSB", unit:"SQ", price:80 },
          { id:"rf_2story", label:"2-Story Height Surcharge", unit:"SQ", price:25 },
          { id:"rf_3story", label:"3-Story Height Surcharge", unit:"SQ", price:55 },
        ]
      },
      {
        heading: "Flashings & Penetrations",
        items: [
          { id:"rf_chim_sm", label:"Chimney Flashing — Small (≤25\"×30\")", unit:"EA", price:500, note:"Includes step, counter & saddle materials" },
          { id:"rf_chim_lg", label:"Chimney Flashing — Large (> 25\"×30\")", unit:"EA", price:750 },
          { id:"rf_cricket", label:"Chimney Cricket / Saddle", unit:"EA", price:425 },
          { id:"rf_skyfix",  label:"Skylight — Fixed Replacement (avg)", unit:"EA", price:975, note:"Velux or equiv., flashing kit incl." },
          { id:"rf_skyven",  label:"Skylight — Vented Replacement (avg)", unit:"EA", price:1550 },
        ]
      },
      {
        heading: "Service & Minimums",
        items: [
          { id:"rf_emg",    label:"Emergency Repair — Business Hours  (2 hrs + materials)", unit:"EA", price:395 },
          { id:"rf_emg_ah", label:"Emergency Repair — After Hours", unit:"EA", price:695 },
          { id:"rf_min",    label:"Project Minimum", unit:"EA", price:650 },
        ]
      },
    ]
  },

  siding: {
    label: "Vinyl Siding",
    color: "#1a6640",
    bg: "#e6f2ec",
    sections: [
      {
        heading: ".042 Thickness — Mastic Ovation (All-in per SQ)",
        note: "Includes: siding, outside corners, J-channel, housewrap, starter strip, fanfold, labor",
        items: [
          { id:"vs_042L", label:"Light Colors", unit:"SQ", price:850 },
          { id:"vs_042D", label:"Dark Colors", unit:"SQ", price:900 },
        ]
      },
      {
        heading: ".044 Thickness — Mastic Carvedwood (All-in per SQ)",
        note: "Most common insurance replacement profile",
        items: [
          { id:"vs_044L", label:"Light Colors", unit:"SQ", price:850 },
          { id:"vs_044D", label:"Dark Colors", unit:"SQ", price:975 },
        ]
      },
      {
        heading: ".046 Thickness — Mastic Quest (All-in per SQ)",
        note: "Premium profile",
        items: [
          { id:"vs_046L", label:"Light Colors", unit:"SQ", price:1075 },
          { id:"vs_046D", label:"Dark Colors", unit:"SQ", price:1150 },
          { id:"vs_046C", label:"Cedar Colors (limited)", unit:"SQ", price:1525 },
        ]
      },
      {
        heading: "Specialty Vinyl (All-in per SQ)",
        items: [
          { id:"vs_spec", label:"Shakes / Scallops / Board & Batten", unit:"SQ", price:1875, note:"Higher labor intensity" },
        ]
      },
      {
        heading: "Removal Charges",
        items: [
          { id:"vs_layer", label:"Additional Siding Layer Removal (per layer beyond 1st)", unit:"SQ", price:80 },
          { id:"vs_lead",  label:"Lead Paint Siding Removal", unit:"SQ", price:225, note:"BID req. — EPA compliance" },
        ]
      },
      {
        heading: "Trim & Channel (per LF)",
        items: [
          { id:"vs_oc",  label:"Outside Corner 3/4\"", unit:"LF", price:5 },
          { id:"vs_ic",  label:"Inside Corner", unit:"LF", price:4 },
          { id:"vs_jch", label:"J-Channel 7/8\"", unit:"LF", price:3 },
          { id:"vs_us",  label:"Undersill / Finish Trim", unit:"LF", price:3 },
          { id:"vs_dc",  label:"Drip Cap / Brick Flashing", unit:"LF", price:5 },
          { id:"vs_ds",  label:"Remove / Rehang Downspouts", unit:"LF", price:7 },
        ]
      },
      {
        heading: "Penetrations & Accessories",
        items: [
          { id:"vs_light",  label:"Exterior Light R&R", unit:"EA", price:200 },
          { id:"vs_outlet", label:"Exterior Outlet R&R", unit:"EA", price:200 },
          { id:"vs_gv18",   label:"Gable Vent 18\"×24\" R&R", unit:"EA", price:185 },
          { id:"vs_gv12",   label:"Gable Vent 12\"×18\" R&R", unit:"EA", price:135 },
          { id:"vs_shut",   label:"R&R Shutters (per pair)", unit:"PR", price:125 },
        ]
      },
      {
        heading: "Window & Door Aluminum Wraps",
        items: [
          { id:"vs_ww1", label:"Single Window Wrap  (~6 SF)", unit:"EA", price:175, note:"J-ch, undersill, drip cap, butyl, caulk" },
          { id:"vs_ww2", label:"Double Window Wrap  (~16 SF)", unit:"EA", price:220 },
          { id:"vs_ww3", label:"Triple Window Wrap  (~25 SF)", unit:"EA", price:265 },
          { id:"vs_wd",  label:"Entry / Patio Door Wrap", unit:"EA", price:290 },
          { id:"vs_wg1", label:"Single Garage Door Wrap", unit:"EA", price:330 },
          { id:"vs_wg2", label:"Double Garage Door Wrap", unit:"EA", price:435 },
        ]
      },
      {
        heading: "Minimum",
        items: [
          { id:"vs_min", label:"Project Minimum", unit:"EA", price:750 },
        ]
      },
    ]
  },

  lp: {
    label: "LP SmartSide",
    color: "#8a4e00",
    bg: "#fdf0e0",
    sections: [
      {
        heading: "6\" Lap Siding (All-in per SQ)",
        note: "Includes: board, trim boards, corners, housewrap, caulk, labor, touch-up paint",
        items: [
          { id:"lp_6ef", label:"Expert Finish  (4-7/8\" exposure)", unit:"SQ", price:1375 },
          { id:"lp_6p",  label:"Primed  (paint not included)", unit:"SQ", price:1325 },
        ]
      },
      {
        heading: "8\" Lap Siding (All-in per SQ)",
        items: [
          { id:"lp_8ef", label:"Expert Finish  (6-7/8\" exposure)", unit:"SQ", price:1325 },
          { id:"lp_8p",  label:"Primed  (paint not included)", unit:"SQ", price:1275 },
        ]
      },
      {
        heading: "Specialty (All-in per SQ)",
        items: [
          { id:"lp_spec", label:"Shakes / Board & Batten", unit:"SQ", price:2175 },
        ]
      },
      {
        heading: "LP Trim Boards — Expert Finish (per LF)",
        items: [
          { id:"lp_t2",  label:"5/4×2", unit:"LF", price:20 },
          { id:"lp_t4",  label:"5/4×4", unit:"LF", price:24 },
          { id:"lp_t6",  label:"5/4×6", unit:"LF", price:29 },
          { id:"lp_t8",  label:"5/4×8", unit:"LF", price:34 },
          { id:"lp_t10", label:"5/4×10", unit:"LF", price:40 },
          { id:"lp_t12", label:"5/4×12", unit:"LF", price:44 },
        ]
      },
    ]
  },

  soffit: {
    label: "Soffit & Fascia",
    color: "#4a4a4a",
    bg: "#f0eee8",
    sections: [
      {
        heading: "Aluminum Soffit & Fascia R&R (per LF)",
        items: [
          { id:"sf_18",   label:"Up to 18\" wide", unit:"LF", price:17 },
          { id:"sf_30",   label:"18\"–30\" wide", unit:"LF", price:20 },
          { id:"sf_bent", label:"Custom Bent Alum Fascia — up to 8\"", unit:"LF", price:14 },
          { id:"sf_fac",  label:"Factory Fascia — up to 8\"", unit:"LF", price:11 },
        ]
      },
      {
        heading: "Special Conditions",
        items: [
          { id:"sf_porch", label:"Porch Soffit > 30\" wide", unit:"SF", price:9, note:"Billed per SF, not LF" },
          { id:"sf_box",   label:"Boxed Cornice / Returns", unit:"EA", price:95 },
        ]
      },
    ]
  },

  gutters: {
    label: "Gutters",
    color: "#1a4a8a",
    bg: "#e8eef7",
    sections: [
      {
        heading: "5\" Seamless Aluminum — Install",
        note: "White standard; EZ-Flow color add $0.50/LF",
        items: [
          { id:"gt_5nr", label:"New Install — No Removal", unit:"LF", price:16 },
          { id:"gt_5r",  label:"Replacement (incl. remove old)", unit:"LF", price:20 },
        ]
      },
      {
        heading: "6\" Seamless Aluminum — Install",
        items: [
          { id:"gt_6nr", label:"New Install — No Removal", unit:"LF", price:20 },
          { id:"gt_6r",  label:"Replacement (incl. remove old)", unit:"LF", price:24 },
        ]
      },
      {
        heading: "Gutter Protection — with New Gutter",
        items: [
          { id:"gt_rx5n", label:"Gutter Rx 5\" Screen Guard", unit:"LF", price:30 },
          { id:"gt_rx6n", label:"Gutter Rx 6\" Screen Guard", unit:"LF", price:35 },
          { id:"gt_ls5n", label:"Leaf Sentry 5\" Solid-Top Micro-Mesh", unit:"LF", price:36 },
          { id:"gt_ls6n", label:"Leaf Sentry 6\" Solid-Top Micro-Mesh", unit:"LF", price:41 },
        ]
      },
      {
        heading: "Gutter Protection — on Existing Gutter",
        items: [
          { id:"gt_rx5e", label:"Gutter Rx 5\" on Existing", unit:"LF", price:16 },
          { id:"gt_ls5e", label:"Leaf Sentry 5\" on Existing", unit:"LF", price:26 },
        ]
      },
      {
        heading: "Removal",
        items: [
          { id:"gt_rmhb", label:"Remove / Shear High-Back Gutters (incl. disposal)", unit:"LF", price:8 },
          { id:"gt_rm",   label:"Remove Alum / Steel / Vinyl (incl. disposal)", unit:"LF", price:5 },
        ]
      },
      {
        heading: "Downspouts",
        items: [
          { id:"gt_ds23",  label:"2×3 Downspout — Install", unit:"LF", price:15 },
          { id:"gt_ds34",  label:"3×4 Downspout — Install", unit:"LF", price:17 },
          { id:"gt_tipup", label:"Tip-Up Downspout", unit:"EA", price:50 },
        ]
      },
      {
        heading: "Accessories & Charges",
        items: [
          { id:"gt_mitre",  label:"Strip Mitre / Corner", unit:"EA", price:50 },
          { id:"gt_splash", label:"Splash Guard", unit:"EA", price:50 },
          { id:"gt_apron",  label:"Gutter Apron (behind gutter, eave)", unit:"LF", price:5 },
          { id:"gt_wedge",  label:"Slanted Fascia Wedge", unit:"LF", price:5 },
          { id:"gt_deck",   label:"Deck Cut", unit:"EA", price:125 },
          { id:"gt_3st",    label:"3-Story Height Surcharge", unit:"LF", price:5 },
          { id:"gt_min",    label:"Project Minimum", unit:"EA", price:1000 },
        ]
      },
    ]
  },

  windows: {
    label: "Windows & Doors",
    color: "#1a6640",
    bg: "#e6f2ec",
    sections: [
      {
        heading: "Window Replacement (double-pane vinyl R&R)",
        items: [
          { id:"wd_sm", label:"Small  (~6 SF)", unit:"EA", price:650 },
          { id:"wd_md", label:"Medium  (~12 SF)", unit:"EA", price:875 },
          { id:"wd_lg", label:"Large  (~25 SF)", unit:"EA", price:1125 },
          { id:"wd_xl", label:"XL  (~36 SF)", unit:"EA", price:1425 },
        ]
      },
      {
        heading: "Doors",
        items: [
          { id:"wd_entry", label:"Entry Door R&R  (fiberglass/steel standard)", unit:"EA", price:1225 },
          { id:"wd_patio", label:"Patio Door R&R", unit:"EA", price:2250 },
          { id:"wd_sg",    label:"Single Garage Door R&R", unit:"EA", price:1525 },
          { id:"wd_dg",    label:"Double Garage Door R&R", unit:"EA", price:2550 },
        ]
      },
    ]
  },

  other: {
    label: "Other",
    color: "#4a4a4a",
    bg: "#f0eee8",
    sections: [
      {
        heading: "Dumpsters",
        items: [
          { id:"ot_dump10", label:"10 Yard  (~20 SQ capacity)", unit:"EA", price:425 },
          { id:"ot_dump20", label:"20 Yard", unit:"EA", price:475 },
          { id:"ot_dump30", label:"30 Yard", unit:"EA", price:550 },
        ]
      },
      {
        heading: "Labor & Misc",
        items: [
          { id:"ot_lab",    label:"Skilled Labor Overage (per person)", unit:"HR", price:95, note:"Beyond scope" },
          { id:"ot_paint1", label:"Exterior Repaint — 1-Story  (prep + 2 coats)", unit:"SF", price:2.75 },
          { id:"ot_paint2", label:"Exterior Repaint — 2-Story", unit:"SF", price:3.25 },
          { id:"ot_sat",    label:"Satellite Dish R&R", unit:"EA", price:200 },
        ]
      },
    ]
  }
};

const TRADE_KEYS = ["roofing","siding","lp","soffit","gutters","windows","other"];

function fmt(n) {
  if (n >= 1000000) return "$" + (n/1000000).toFixed(2).replace(/\.?0+$/,"") + "M";
  if (n >= 1000) return "$" + n.toLocaleString("en-US");
  if (n < 10) return "$" + n.toFixed(2);
  return "$" + Math.round(n).toLocaleString("en-US");
}

function getAllItems(trade) {
  return trade.sections.flatMap(s => s.items);
}

export default function App() {
  const [customer, setCustomer] = useState({ name:"", address:"", phone:"", email:"", rep:"", date: new Date().toISOString().split("T")[0] });
  const [lineItems, setLineItems] = useState([]);
  const [deductible, setDeductible] = useState("");
  const [nonRecoverable, setNonRecoverable] = useState("");
  const [activeTab, setActiveTab] = useState("roofing");
  const [view, setView] = useState("build");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState("");

  const addItem = useCallback((item) => {
    setLineItems(prev => {
      const ex = prev.find(l => l.id === item.id);
      if (ex) return prev.map(l => l.id === item.id ? {...l, qty: l.qty + 1} : l);
      return [...prev, { ...item, qty: 1, customPrice: null }];
    });
  }, []);

  const updateQty = (id, val) => {
    const n = parseFloat(val) || 0;
    if (n <= 0) setLineItems(prev => prev.filter(l => l.id !== id));
    else setLineItems(prev => prev.map(l => l.id === id ? {...l, qty: n} : l));
  };

  const updatePrice = (id, val) => {
    const n = parseFloat(val.replace(/[^0-9.]/g,"")) || null;
    setLineItems(prev => prev.map(l => l.id === id ? {...l, customPrice: n} : l));
  };

  const removeItem = (id) => setLineItems(prev => prev.filter(l => l.id !== id));

  const total = lineItems.reduce((s, l) => s + (l.customPrice ?? l.price) * l.qty, 0);
  const ded = parseFloat(deductible) || 0;
  const nr = parseFloat(nonRecoverable) || 0;
  const insuranceFunds = total - ded - nr;
  const outOfPocket = ded + nr;

  const allItems = TRADE_KEYS.flatMap(k => getAllItems(TRADES[k]).map(i => ({...i, tradeKey: k})));
  const searchResults = search.length > 1
    ? allItems.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
    : [];

  const REPS = ["Heidi Stinson","Jeff Vacanti","Jim Anderson","Ryan Stinson"];

  return (
    <div style={{fontFamily:"'DM Sans', system-ui, sans-serif", background:"#f5f3ee", minHeight:"100vh", color:"#0f1117"}}>

      {/* ── TOP BAR ── */}
      <div style={{background:"#0f1117", borderBottom:"3px solid #1a4a8a", padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div>
          <div style={{fontFamily:"'DM Serif Display', Georgia, serif", fontSize:20, fontWeight:400, color:"#fff", lineHeight:1.1}}>
            Stinson Services — <span style={{color:"#8fa8d0", fontStyle:"italic"}}>Good Faith Estimator</span>
          </div>
          <div style={{fontFamily:"monospace", fontSize:10, color:"#8fa8d0", marginTop:3, letterSpacing:"0.08em"}}>
            MN · WI · IA · ND · SD  ·  Sep 2025 Pricing  ·  ≥50% GP target
          </div>
        </div>
        <div style={{display:"flex", gap:8}}>
          {["build","summary"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              fontFamily:"monospace", fontSize:11, letterSpacing:"0.06em", textTransform:"uppercase",
              padding:"7px 16px", border:"1px solid", borderRadius:5, cursor:"pointer",
              background: view===v ? "#1a4a8a" : "transparent",
              borderColor: view===v ? "#1a4a8a" : "#3a4a6a",
              color: view===v ? "#fff" : "#8fa8d0",
            }}>{v === "build" ? "Build Estimate" : `Review (${lineItems.length})`}</button>
          ))}
        </div>
      </div>

      {view === "build" ? (
        <div style={{display:"grid", gridTemplateColumns:"220px 1fr 320px", gap:0, height:"calc(100vh - 65px)"}}>

          {/* ── LEFT: trade nav + customer ── */}
          <div style={{background:"#ede9e1", borderRight:"1px solid #d4cfc5", overflowY:"auto", display:"flex", flexDirection:"column"}}>

            {/* search */}
            <div style={{padding:"12px 14px", borderBottom:"1px solid #d4cfc5", position:"relative"}}>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search all items…"
                style={{width:"100%", padding:"7px 10px", fontSize:12, border:"1px solid #d4cfc5", borderRadius:5, background:"#f5f3ee", color:"#0f1117", boxSizing:"border-box"}}
              />
              {search.length > 1 && (
                <div style={{marginTop:6, background:"#fff", border:"1px solid #d4cfc5", borderRadius:6, maxHeight:220, overflowY:"auto"}}>
                  {searchResults.length === 0
                    ? <div style={{padding:"10px 12px", fontSize:12, color:"#a8aab2"}}>No results</div>
                    : searchResults.map(item => {
                        const t = TRADES[item.tradeKey];
                        return (
                          <div key={item.id} onClick={() => { addItem(item); setSearch(""); }}
                            style={{padding:"8px 12px", fontSize:12, cursor:"pointer", borderBottom:"1px solid #f0eeea", display:"flex", alignItems:"center", gap:8}}
                            onMouseEnter={e => e.currentTarget.style.background="#f0f4fb"}
                            onMouseLeave={e => e.currentTarget.style.background=""}
                          >
                            <div style={{width:6, height:6, borderRadius:"50%", background:t.color, flexShrink:0}} />
                            <div style={{flex:1}}>
                              <div style={{lineHeight:1.3}}>{item.label}</div>
                              <div style={{fontSize:10, color:"#a8aab2", fontFamily:"monospace"}}>{t.label} · {item.unit}</div>
                            </div>
                            <div style={{fontFamily:"monospace", fontSize:11, fontWeight:700, color:t.color}}>{fmt(item.price)}</div>
                          </div>
                        );
                      })
                  }
                </div>
              )}
            </div>

            {/* trade tabs */}
            <div>
              {TRADE_KEYS.map(key => {
                const t = TRADES[key];
                const count = lineItems.filter(l => getAllItems(t).some(i => i.id === l.id)).length;
                const active = activeTab === key;
                return (
                  <div key={key} onClick={() => setActiveTab(key)}
                    style={{
                      padding:"9px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:9,
                      background: active ? "#fff" : "transparent",
                      borderLeft: `3px solid ${active ? t.color : "transparent"}`,
                      borderBottom:"1px solid #e2ddd4",
                      transition:"background 0.1s",
                    }}
                    onMouseEnter={e => { if(!active) e.currentTarget.style.background="#e8e4dc"; }}
                    onMouseLeave={e => { if(!active) e.currentTarget.style.background="transparent"; }}
                  >
                    <div style={{width:7, height:7, borderRadius:"50%", background:t.color, flexShrink:0}} />
                    <span style={{fontSize:12, fontWeight: active ? 600 : 400, flex:1, color: active ? "#0f1117" : "#3a3d47"}}>{t.label}</span>
                    {count > 0 && (
                      <span style={{fontSize:10, fontFamily:"monospace", background:t.bg, color:t.color, padding:"2px 6px", borderRadius:3, fontWeight:700}}>{count}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* customer fields */}
            <div style={{padding:"12px 14px", borderTop:"1px solid #d4cfc5", marginTop:"auto"}}>
              <div style={{fontSize:10, fontFamily:"monospace", color:"#a8aab2", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:8}}>Customer</div>
              {[
                {key:"name", label:"Name", type:"text"},
                {key:"address", label:"Address", type:"text"},
                {key:"phone", label:"Phone", type:"tel"},
                {key:"rep", label:"Sales Rep", type:"select"},
                {key:"date", label:"Date", type:"date"},
              ].map(f => (
                <div key={f.key} style={{marginBottom:6}}>
                  <div style={{fontSize:10, color:"#72757f", marginBottom:2}}>{f.label}</div>
                  {f.type === "select" ? (
                    <select value={customer.rep} onChange={e => setCustomer(c => ({...c, rep:e.target.value}))}
                      style={{width:"100%", fontSize:12, padding:"4px 6px", border:"1px solid #d4cfc5", borderRadius:4, background:"#f5f3ee", color:"#0f1117"}}>
                      <option value="">Select…</option>
                      {REPS.map(r => <option key={r}>{r}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} value={customer[f.key]} onChange={e => setCustomer(c => ({...c, [f.key]:e.target.value}))}
                      style={{width:"100%", fontSize:12, padding:"4px 6px", border:"1px solid #d4cfc5", borderRadius:4, background:"#f5f3ee", color:"#0f1117", boxSizing:"border-box"}} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── CENTER: sectioned list ── */}
          <div style={{overflowY:"auto", background:"#f5f3ee"}}>
            {TRADE_KEYS.filter(k => k === activeTab).map(key => {
              const t = TRADES[key];
              return (
                <div key={key}>
                  {/* sticky trade header */}
                  <div style={{
                    padding:"13px 24px 11px",
                    borderBottom:`2px solid ${t.color}`,
                    background:"#fff",
                    position:"sticky", top:0, zIndex:5,
                    display:"flex", alignItems:"center", gap:10,
                  }}>
                    <div style={{width:10, height:10, borderRadius:"50%", background:t.color}} />
                    <span style={{fontFamily:"'DM Serif Display', Georgia, serif", fontSize:18, fontWeight:400}}>{t.label}</span>
                    <span style={{fontFamily:"monospace", fontSize:10, color:"#a8aab2", marginLeft:4}}>
                      {getAllItems(t).length} items
                    </span>
                  </div>

                  {/* sections */}
                  {t.sections.map((sec, si) => (
                    <div key={si} style={{marginBottom:0}}>

                      {/* section heading bar */}
                      <div style={{
                        padding:"8px 24px 6px",
                        background: t.bg,
                        borderBottom:`1px solid ${t.color}22`,
                        borderTop: si > 0 ? "1px solid #e2ddd4" : "none",
                        display:"flex", alignItems:"baseline", gap:10,
                      }}>
                        <div style={{fontSize:11, fontWeight:700, color:t.color, textTransform:"uppercase", letterSpacing:"0.07em"}}>{sec.heading}</div>
                        {sec.note && <div style={{fontSize:11, color:"#72757f", fontStyle:"italic"}}>{sec.note}</div>}
                      </div>

                      {/* list rows */}
                      {sec.items.map((item, ii) => {
                        const inList = lineItems.find(l => l.id === item.id);
                        const isAlt = ii % 2 === 1;
                        return (
                          <div key={item.id}
                            onClick={() => addItem(item)}
                            style={{
                              display:"flex", alignItems:"center", gap:12,
                              padding:"8px 24px 8px 20px",
                              background: inList ? t.bg : (isAlt ? "#eeeae4" : "#f5f3ee"),
                              borderBottom:"1px solid #e2ddd4",
                              borderLeft:`3px solid ${inList ? t.color : "transparent"}`,
                              cursor:"pointer",
                              transition:"background 0.08s, border-color 0.08s",
                            }}
                            onMouseEnter={e => {
                              if(!inList) {
                                e.currentTarget.style.background = t.bg;
                                e.currentTarget.style.borderLeftColor = t.color + "88";
                              }
                            }}
                            onMouseLeave={e => {
                              if(!inList) {
                                e.currentTarget.style.background = isAlt ? "#eeeae4" : "#f5f3ee";
                                e.currentTarget.style.borderLeftColor = "transparent";
                              }
                            }}
                          >
                            {/* qty bubble */}
                            <div style={{
                              width:20, height:20, borderRadius:"50%", flexShrink:0,
                              background: inList ? t.color : "#d4cfc5",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              fontSize:10, color:"#fff", fontWeight:700,
                              transition:"background 0.1s",
                            }}>
                              {inList ? inList.qty : ""}
                            </div>

                            {/* label + note */}
                            <div style={{flex:1, minWidth:0}}>
                              <div style={{
                                fontSize:13,
                                color: inList ? t.color : "#1a1c22",
                                fontWeight: inList ? 600 : 400,
                                lineHeight:1.35,
                              }}>
                                {item.label}
                              </div>
                              {item.note && (
                                <div style={{fontSize:11, color:"#72757f", marginTop:1, lineHeight:1.3}}>{item.note}</div>
                              )}
                            </div>

                            {/* unit pill + price */}
                            <div style={{display:"flex", alignItems:"center", gap:8, flexShrink:0}}>
                              <span style={{
                                fontSize:10, fontFamily:"monospace", color:"#72757f",
                                background:"#e2ddd4", padding:"2px 7px", borderRadius:3,
                              }}>{item.unit}</span>
                              <span style={{
                                fontFamily:"monospace", fontSize:13, fontWeight:700,
                                color: inList ? t.color : "#1a4a8a",
                                minWidth:64, textAlign:"right",
                              }}>{fmt(item.price)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <div style={{height:28}} />
                </div>
              );
            })}
          </div>

          {/* ── RIGHT: estimate panel ── */}
          <div style={{background:"#fff", borderLeft:"1px solid #d4cfc5", display:"flex", flexDirection:"column", height:"100%"}}>

            {/* total header */}
            <div style={{padding:"14px 18px 12px", borderBottom:"1px solid #e2ddd4", background:"#ede9e1"}}>
              <div style={{fontFamily:"monospace", fontSize:10, color:"#72757f", letterSpacing:"0.08em", textTransform:"uppercase"}}>Estimate total</div>
              <div style={{fontFamily:"'DM Serif Display', Georgia, serif", fontSize:28, fontWeight:400, color:"#0f1117", marginTop:2, lineHeight:1}}>
                {fmt(total)}
              </div>
              {lineItems.length > 0 && (
                <div style={{fontSize:11, color:"#72757f", marginTop:4, fontFamily:"monospace"}}>
                  {lineItems.length} line item{lineItems.length !== 1 ? "s" : ""}
                </div>
              )}
            </div>

            {/* line items */}
            <div style={{flex:1, overflowY:"auto"}}>
              {lineItems.length === 0 ? (
                <div style={{padding:"40px 20px", textAlign:"center"}}>
                  <div style={{fontSize:32, marginBottom:10, color:"#d4cfc5"}}>+</div>
                  <div style={{fontSize:13, color:"#a8aab2", lineHeight:1.6}}>Click any item on the left<br/>to add it to the estimate</div>
                </div>
              ) : lineItems.map(l => {
                const tradeKey = TRADE_KEYS.find(k => getAllItems(TRADES[k]).some(i => i.id === l.id)) || "other";
                const t = TRADES[tradeKey];
                const lineTotal = (l.customPrice ?? l.price) * l.qty;
                return (
                  <div key={l.id} style={{padding:"10px 16px", borderBottom:"1px solid #f0eeea", borderLeft:`3px solid ${t.color}`}}>
                    <div style={{fontSize:11, fontWeight:600, color:t.color, lineHeight:1.3, marginBottom:7}}>{l.label}</div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:8}}>
                      <div style={{display:"flex", alignItems:"center", gap:5, flexWrap:"wrap"}}>
                        <span style={{fontSize:10, color:"#a8aab2", fontFamily:"monospace"}}>Qty</span>
                        <input type="number" value={l.qty} min="0" step="0.5"
                          onChange={e => updateQty(l.id, e.target.value)}
                          onClick={e => e.stopPropagation()}
                          style={{width:46, fontSize:12, padding:"2px 5px", border:"1px solid #d4cfc5", borderRadius:4, textAlign:"center"}} />
                        <span style={{fontSize:10, color:"#a8aab2", fontFamily:"monospace"}}>{l.unit} @</span>
                        <div style={{position:"relative"}}>
                          <span style={{position:"absolute", left:5, top:"50%", transform:"translateY(-50%)", fontSize:11, color:"#72757f"}}>$</span>
                          <input type="text" value={l.customPrice ?? l.price}
                            onChange={e => updatePrice(l.id, e.target.value)}
                            onClick={e => e.stopPropagation()}
                            style={{width:66, fontSize:12, padding:"2px 5px 2px 13px", border:"1px solid #d4cfc5", borderRadius:4, textAlign:"right"}} />
                        </div>
                      </div>
                      <div style={{textAlign:"right", flexShrink:0}}>
                        <div style={{fontFamily:"monospace", fontSize:13, fontWeight:700, color:"#1a4a8a"}}>{fmt(lineTotal)}</div>
                        <button onClick={() => removeItem(l.id)}
                          style={{background:"none", border:"none", cursor:"pointer", fontSize:10, color:"#c0302e", marginTop:2, padding:0, fontFamily:"monospace"}}>✕ remove</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* insurance footer */}
            <div style={{borderTop:"2px solid #d4cfc5", padding:"13px 16px", background:"#f9f8f5"}}>
              <div style={{fontFamily:"monospace", fontSize:10, color:"#72757f", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8}}>Insurance</div>
              {[
                {label:"Deductible", val:deductible, set:setDeductible},
                {label:"Non-Recoverable Dep.", val:nonRecoverable, set:setNonRecoverable},
              ].map(f => (
                <div key={f.label} style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6}}>
                  <span style={{fontSize:11, color:"#72757f"}}>{f.label}</span>
                  <div style={{position:"relative"}}>
                    <span style={{position:"absolute", left:6, top:"50%", transform:"translateY(-50%)", fontSize:11, color:"#72757f"}}>$</span>
                    <input type="text" value={f.val} onChange={e => f.set(e.target.value)} placeholder="0"
                      style={{width:90, fontSize:12, padding:"3px 6px 3px 16px", border:"1px solid #d4cfc5", borderRadius:4, textAlign:"right", background:"#fff"}} />
                  </div>
                </div>
              ))}
              <div style={{borderTop:"1px solid #d4cfc5", marginTop:8, paddingTop:8}}>
                {[
                  {label:"Contract total", val:total, bold:true, color:"#1a4a8a"},
                  {label:"Ins. funds est.", val:Math.max(0, insuranceFunds), bold:false, color:"#1a6640"},
                  {label:"Out-of-pocket", val:outOfPocket, bold:false, color:"#8a4e00"},
                ].map(row => (
                  <div key={row.label} style={{display:"flex", justifyContent:"space-between", marginBottom:4}}>
                    <span style={{fontSize:11, color:"#72757f"}}>{row.label}</span>
                    <span style={{fontFamily:"monospace", fontSize:12, fontWeight:row.bold?700:500, color:row.color}}>{fmt(row.val)}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setView("summary")}
                style={{width:"100%", marginTop:10, padding:"9px", background:"#1a4a8a", color:"#fff", border:"none",
                  borderRadius:6, fontSize:11, fontFamily:"monospace", letterSpacing:"0.07em", textTransform:"uppercase",
                  cursor:"pointer", fontWeight:600}}>
                Review & Print →
              </button>
            </div>
          </div>
        </div>

      ) : (
        /* ── SUMMARY / PRINT ── */
        <div style={{maxWidth:820, margin:"0 auto", padding:"32px 24px 80px"}}>
          <button onClick={() => setView("build")}
            style={{fontFamily:"monospace", fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase",
              padding:"6px 14px", border:"1px solid #d4cfc5", borderRadius:4, background:"transparent",
              cursor:"pointer", marginBottom:24, color:"#72757f"}}>← Back to estimate</button>

          {/* GFE header */}
          <div style={{background:"#0f1117", color:"#fff", padding:"24px 28px", borderRadius:"10px 10px 0 0", borderBottom:"3px solid #1a4a8a"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
              <div>
                <div style={{fontFamily:"'DM Serif Display', Georgia, serif", fontSize:22, fontWeight:400}}>
                  Stinson Services — <span style={{color:"#8fa8d0", fontStyle:"italic"}}>Good Faith Estimate</span>
                </div>
                <div style={{fontFamily:"monospace", fontSize:10, color:"#8fa8d0", marginTop:4}}>
                  952-933-4510 · 7391 Bush Lake Rd, Edina MN · stinsonservices.com
                </div>
              </div>
              <div style={{textAlign:"right", fontFamily:"monospace", fontSize:11, color:"#8fa8d0"}}>
                <div>{customer.date || new Date().toLocaleDateString()}</div>
                {customer.rep && <div style={{color:"#fff", marginTop:2}}>{customer.rep}</div>}
              </div>
            </div>
          </div>

          {/* customer block */}
          <div style={{background:"#ede9e1", padding:"14px 28px", borderBottom:"1px solid #d4cfc5"}}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
              {[["Customer",customer.name||"—"],["Address",customer.address||"—"],["Phone",customer.phone||"—"],["Email",customer.email||"—"]].map(([k,v]) => (
                <div key={k}>
                  <div style={{fontSize:10, fontFamily:"monospace", color:"#a8aab2", letterSpacing:"0.06em", textTransform:"uppercase"}}>{k}</div>
                  <div style={{fontSize:13, fontWeight:600, marginTop:2}}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* grouped line items */}
          <div style={{background:"#fff", border:"1px solid #d4cfc5", borderTop:"none"}}>
            {TRADE_KEYS.map(key => {
              const t = TRADES[key];
              const items = lineItems.filter(l => getAllItems(t).some(i => i.id === l.id));
              if (!items.length) return null;
              const tradeTotal = items.reduce((s,l) => s + (l.customPrice ?? l.price) * l.qty, 0);
              return (
                <div key={key}>
                  <div style={{background:t.bg, padding:"9px 24px", borderBottom:"1px solid #d4cfc5",
                    display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div style={{fontSize:11, fontWeight:700, color:t.color, fontFamily:"monospace", letterSpacing:"0.08em", textTransform:"uppercase"}}>{t.label}</div>
                    <div style={{fontFamily:"monospace", fontSize:13, fontWeight:700, color:t.color}}>{fmt(tradeTotal)}</div>
                  </div>
                  <table style={{width:"100%", borderCollapse:"collapse"}}>
                    <thead>
                      <tr style={{background:"#f9f8f5"}}>
                        {["Line Item","Unit","Qty","Unit Price","Total"].map((h,i) => (
                          <th key={h} style={{padding:"6px 16px", fontSize:10, fontFamily:"monospace",
                            letterSpacing:"0.07em", textTransform:"uppercase", color:"#a8aab2",
                            textAlign: i > 1 ? "right" : "left", borderBottom:"1px solid #e8e4dc"}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((l,i) => {
                        const lineTotal = (l.customPrice ?? l.price) * l.qty;
                        return (
                          <tr key={l.id} style={{background: i%2===0 ? "#fff" : "#fcfbf9"}}>
                            <td style={{padding:"8px 16px", fontSize:12, borderBottom:"1px solid #f0eeea"}}>{l.label}</td>
                            <td style={{padding:"8px 16px", fontSize:11, fontFamily:"monospace", color:"#a8aab2", borderBottom:"1px solid #f0eeea"}}>{l.unit}</td>
                            <td style={{padding:"8px 16px", fontSize:12, fontFamily:"monospace", textAlign:"right", borderBottom:"1px solid #f0eeea"}}>{l.qty}</td>
                            <td style={{padding:"8px 16px", fontSize:12, fontFamily:"monospace", textAlign:"right", borderBottom:"1px solid #f0eeea"}}>{fmt(l.customPrice ?? l.price)}</td>
                            <td style={{padding:"8px 16px", fontSize:12, fontFamily:"monospace", fontWeight:700, color:"#1a4a8a", textAlign:"right", borderBottom:"1px solid #f0eeea"}}>{fmt(lineTotal)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>

          {/* financial summary + notes */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:20}}>
            <div style={{background:"#fff", border:"1px solid #d4cfc5", borderRadius:8, padding:"18px 20px"}}>
              <div style={{fontFamily:"monospace", fontSize:10, color:"#a8aab2", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:12}}>Financial summary</div>
              {[
                {label:"Total contract value", val:total, bold:true, color:"#1a4a8a"},
                {label:"Deductible", val:-ded, color:"#8a4e00"},
                {label:"Non-recoverable depreciation", val:-nr, color:"#8a4e00"},
                {label:"Expected insurance funds", val:Math.max(0,insuranceFunds), bold:true, color:"#1a6640"},
                {label:"Estimated out-of-pocket", val:outOfPocket, color:"#8a1a1a"},
              ].map(row => (
                <div key={row.label} style={{display:"flex", justifyContent:"space-between", marginBottom:8, paddingBottom:8, borderBottom:"1px solid #f0eeea"}}>
                  <span style={{fontSize:12, color:"#3a3d47"}}>{row.label}</span>
                  <span style={{fontFamily:"monospace", fontSize:13, fontWeight:row.bold?700:500, color:row.color}}>
                    {row.val < 0 ? "(" + fmt(Math.abs(row.val)) + ")" : fmt(row.val)}
                  </span>
                </div>
              ))}
            </div>
            <div style={{background:"#fff", border:"1px solid #d4cfc5", borderRadius:8, padding:"18px 20px"}}>
              <div style={{fontFamily:"monospace", fontSize:10, color:"#a8aab2", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:10}}>Notes</div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Scope notes, conditions, special items…"
                style={{width:"100%", minHeight:120, fontSize:12, padding:"10px", border:"1px solid #d4cfc5",
                  borderRadius:6, background:"#f9f8f5", color:"#0f1117", resize:"vertical", fontFamily:"inherit",
                  lineHeight:1.6, boxSizing:"border-box"}} />
            </div>
          </div>

          {/* signature block */}
          <div style={{background:"#fff", border:"1px solid #d4cfc5", borderRadius:8, padding:"20px 24px", marginTop:16}}>
            <div style={{fontFamily:"monospace", fontSize:10, color:"#a8aab2", letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:14}}>Authorization</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:16}}>
              {["Property Owner","Project Manager / Sales Rep"].map(role => (
                <div key={role}>
                  <div style={{borderBottom:"1px solid #0f1117", height:38, marginBottom:6}} />
                  <div style={{fontSize:11, color:"#72757f"}}>{role} — accepted this date: ___ / ___ / ___</div>
                </div>
              ))}
            </div>
            <div style={{padding:"10px 14px", background:"#f9f8f5", borderRadius:6, fontSize:11, color:"#72757f", lineHeight:1.6}}>
              This is a Good Faith Estimate provided as required by state law. Final pricing is subject to scope confirmation and adjuster approval.
              Stinson Services · 7391 Bush Lake Rd, Edina MN 55439 · 952-933-4510 · stinsonservices.com
            </div>
          </div>

          <div style={{marginTop:20, textAlign:"center"}}>
            <button onClick={() => window.print()}
              style={{padding:"12px 32px", background:"#1a4a8a", color:"#fff", border:"none", borderRadius:6,
                fontSize:12, fontFamily:"monospace", letterSpacing:"0.07em", textTransform:"uppercase",
                cursor:"pointer", fontWeight:600}}>Print / Save PDF</button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        input:focus, textarea:focus, select:focus { outline: 2px solid #1a4a8a; outline-offset: 1px; }
        @media print {
          button { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
