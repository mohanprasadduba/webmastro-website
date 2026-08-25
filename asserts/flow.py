# We don't need svgwrite module since we wrote raw SVG string!
svg_code = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&amp;display=swap');
      
      text {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
      }
      
      .main-title {
        font-size: 28px;
        font-weight: 700;
        fill: #e2e8f0;
        letter-spacing: 3px;
        text-transform: uppercase;
      }
      
      .step-num {
        font-weight: 800;
        font-size: 90px;
        dominant-baseline: central;
      }
      
      .circle-title {
        font-size: 20px;
        font-weight: 700;
        text-anchor: middle;
      }
      
      .body-header {
        font-size: 15px;
        font-weight: 700;
        fill: #ffffff;
        text-anchor: middle;
      }
      
      .body-desc {
        font-size: 12.5px;
        font-weight: 400;
        fill: #94a3b8;
        text-anchor: middle;
        line-height: 1.4;
      }
      
      .tagline {
        font-size: 13px;
        font-weight: 600;
        font-style: italic;
        text-anchor: middle;
      }
    </style>
    
    <!-- Drop Shadow Filter -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1600" height="900" fill="#1e232d" />
  
  <!-- Header Section -->
  <g transform="translate(100, 100)">
    <text x="0" y="0" class="main-title">PROCESS FLOW INFOGRAPHICS</text>
    <line x1="480" y1="-8" x2="1500" y2="-8" stroke="#333e4f" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- Process Steps Container -->
  <!-- Centers:
       Step 1: X=230, Y=380
       Step 2: X=510, Y=380
       Step 3: X=790, Y=380
       Step 4: X=1070, Y=380
       Step 5: X=1350, Y=380
  -->

  <!-- ==================== STEP 1 ==================== -->
  <g transform="translate(230, 370)">
    <!-- Arc & Dashed Lines -->
    <!-- Top Arc (Blue: #2a8bf2) -->
    <path d="M -90,-25 A 110,110 0 0,1 90,-25" fill="none" stroke="#2a8bf2" stroke-width="12" stroke-linecap="round" />
    <!-- Bottom Dashed Arc -->
    <path d="M -85,35 A 110,110 0 0,0 85,35" fill="none" stroke="#2a8bf2" stroke-width="2" stroke-dasharray="6,6" opacity="0.6" />
    <path d="M -95,45 A 120,120 0 0,0 95,45" fill="none" stroke="#2a8bf2" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.3" />

    <!-- Big Number behind/left -->
    <text x="-135" y="5" class="step-num" fill="#2a8bf2" opacity="0.4" text-anchor="middle">1</text>

    <!-- Main Circle -->
    <circle cx="0" cy="0" r="85" fill="#262d3a" filter="url(#shadow)" stroke="#313a4a" stroke-width="2"/>

    <!-- Icon: Vision / Search -->
    <g transform="translate(0, -22)" stroke="#2a8bf2" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="-3" cy="-3" r="14" />
      <line x1="7" y1="7" x2="18" y2="18" />
      <path d="M-3,-9 L-3,-13 M-9,-3 L-13,-3 M3,-3 L7,-3 M-3,3 L-3,7" stroke-width="2" opacity="0.7"/>
    </g>

    <!-- Title inside circle -->
    <text x="0" y="32" class="circle-title" fill="#2a8bf2">Vision</text>

    <!-- Content Below Circle -->
    <g transform="translate(0, 140)">
      <text x="0" y="0" class="body-header">01 — Tell Us Your Vision</text>
      <text x="0" y="24" class="body-desc">You tell us about your business,</text>
      <text x="0" y="42" class="body-desc">goals, requirements &amp; preferences.</text>
      <text x="0" y="60" class="body-desc">No technical knowledge needed.</text>
      <text x="0" y="90" class="tagline" fill="#2a8bf2">"You bring the vision"</text>
    </g>
  </g>

  <!-- ==================== STEP 2 ==================== -->
  <g transform="translate(510, 370)">
    <!-- Bottom Arc (Teal: #00c9a7) -->
    <path d="M -90,25 A 110,110 0 0,0 90,25" fill="none" stroke="#00c9a7" stroke-width="12" stroke-linecap="round" />
    <!-- Top Dashed Arc -->
    <path d="M -85,-35 A 110,110 0 0,1 85,-35" fill="none" stroke="#00c9a7" stroke-width="2" stroke-dasharray="6,6" opacity="0.6" />
    <path d="M -95,-45 A 120,120 0 0,1 95,-45" fill="none" stroke="#00c9a7" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.3" />

    <!-- Big Number behind/left -->
    <text x="-135" y="5" class="step-num" fill="#00c9a7" opacity="0.4" text-anchor="middle">2</text>

    <!-- Main Circle -->
    <circle cx="0" cy="0" r="85" fill="#262d3a" filter="url(#shadow)" stroke="#313a4a" stroke-width="2"/>

    <!-- Icon: Lightbulb / Sample -->
    <g transform="translate(0, -22)" stroke="#00c9a7" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M -12,-5 C -12,-15 12,-15 12,-5 C 12,2 5,7 5,14 L -5,14 C -5,7 -12,2 -12,-5 Z" />
      <line x1="-4" y1="19" x2="4" y2="19" stroke-width="3"/>
      <line x1="-2" y1="24" x2="2" y2="24" stroke-width="2"/>
      <line x1="0" y1="-20" x2="0" y2="-24" />
      <line x1="-16" y1="-16" x2="-12" y2="-12" />
      <line x1="16" y1="-16" x2="12" y2="-12" />
    </g>

    <!-- Title inside circle -->
    <text x="0" y="32" class="circle-title" fill="#00c9a7">Quote</text>

    <!-- Content Below Circle -->
    <g transform="translate(0, 140)">
      <text x="0" y="0" class="body-header">02 — Sample + Clear Quote</text>
      <text x="0" y="24" class="body-desc">We present a suitable sample,</text>
      <text x="0" y="42" class="body-desc">explain scope, and provide clear</text>
      <text x="0" y="60" class="body-desc">quotation &amp; estimated timeline.</text>
      <text x="0" y="90" class="tagline" fill="#00c9a7">"See direction, then decide"</text>
    </g>
  </g>

  <!-- ==================== STEP 3 ==================== -->
  <g transform="translate(790, 370)">
    <!-- Top Arc (Green: #88d498) -->
    <path d="M -90,-25 A 110,110 0 0,1 90,-25" fill="none" stroke="#88d498" stroke-width="12" stroke-linecap="round" />
    <!-- Bottom Dashed Arc -->
    <path d="M -85,35 A 110,110 0 0,0 85,35" fill="none" stroke="#88d498" stroke-width="2" stroke-dasharray="6,6" opacity="0.6" />
    <path d="M -95,45 A 120,120 0 0,0 95,45" fill="none" stroke="#88d498" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.3" />

    <!-- Big Number behind/left -->
    <text x="-135" y="5" class="step-num" fill="#88d498" opacity="0.4" text-anchor="middle">3</text>

    <!-- Main Circle -->
    <circle cx="0" cy="0" r="85" fill="#262d3a" filter="url(#shadow)" stroke="#313a4a" stroke-width="2"/>

    <!-- Icon: Gear / Design Finalize -->
    <g transform="translate(0, -22)" stroke="#88d498" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="0" cy="0" r="7" />
      <path d="M0,-16 L0,-12 M0,12 L0,16 M-16,0 L-12,0 M12,0 L16,0 M-11,-11 L-8,-8 M8,8 L11,11 M-11,11 L-8,8 M8,-8 L11,-11" stroke-width="3.5"/>
      <circle cx="0" cy="0" r="14" stroke-dasharray="4,3" stroke-width="1.5"/>
    </g>

    <!-- Title inside circle -->
    <text x="0" y="32" class="circle-title" fill="#88d498">Design</text>

    <!-- Content Below Circle -->
    <g transform="translate(0, 140)">
      <text x="0" y="0" class="body-header">03 — Finalize Design</text>
      <text x="0" y="24" class="body-desc">We finalize design, content, structure</text>
      <text x="0" y="42" class="body-desc">&amp; features together so both sides</text>
      <text x="0" y="60" class="body-desc">are aligned before development.</text>
      <text x="0" y="90" class="tagline" fill="#88d498">"Aligned before building"</text>
    </g>
  </g>

  <!-- ==================== STEP 4 ==================== -->
  <g transform="translate(1070, 370)">
    <!-- Bottom Arc (Amber/Yellow: #ffc048) -->
    <path d="M -90,25 A 110,110 0 0,0 90,25" fill="none" stroke="#ffc048" stroke-width="12" stroke-linecap="round" />
    <!-- Top Dashed Arc -->
    <path d="M -85,-35 A 110,110 0 0,1 85,-35" fill="none" stroke="#ffc048" stroke-width="2" stroke-dasharray="6,6" opacity="0.6" />
    <path d="M -95,-45 A 120,120 0 0,1 95,-45" fill="none" stroke="#ffc048" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.3" />

    <!-- Big Number behind/left -->
    <text x="-135" y="5" class="step-num" fill="#ffc048" opacity="0.4" text-anchor="middle">4</text>

    <!-- Main Circle -->
    <circle cx="0" cy="0" r="85" fill="#262d3a" filter="url(#shadow)" stroke="#313a4a" stroke-width="2"/>

    <!-- Icon: Clock/Time/Build -->
    <g transform="translate(0, -22)" stroke="#ffc048" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="0" cy="0" r="14" />
      <polyline points="0,-8 0,0 6,4" />
      <path d="M-10,-10 L-14,-14 M10,-10 L14,-14" stroke-width="3"/>
    </g>

    <!-- Title inside circle -->
    <text x="0" y="32" class="circle-title" fill="#ffc048">Build</text>

    <!-- Content Below Circle -->
    <g transform="translate(0, 140)">
      <text x="0" y="0" class="body-header">04 — Build &amp; Go Live</text>
      <text x="0" y="24" class="body-desc">We handle development, responsive</text>
      <text x="0" y="42" class="body-desc">implementation, testing &amp; tweaks</text>
      <text x="0" y="60" class="body-desc">— then your website goes live.</text>
      <text x="0" y="90" class="tagline" fill="#ffc048">"Launch with confidence"</text>
    </g>
  </g>

  <!-- ==================== STEP 5 ==================== -->
  <g transform="translate(1350, 370)">
    <!-- Top Arc (Red/Orange: #ff6b6b) -->
    <path d="M -90,-25 A 110,110 0 0,1 90,-25" fill="none" stroke="#ff6b6b" stroke-width="12" stroke-linecap="round" />
    <!-- Bottom Dashed Arc -->
    <path d="M -85,35 A 110,110 0 0,0 85,35" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-dasharray="6,6" opacity="0.6" />
    <path d="M -95,45 A 120,120 0 0,0 95,45" fill="none" stroke="#ff6b6b" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.3" />

    <!-- Big Number behind/left -->
    <text x="-135" y="5" class="step-num" fill="#ff6b6b" opacity="0.4" text-anchor="middle">5</text>

    <!-- Main Circle -->
    <circle cx="0" cy="0" r="85" fill="#262d3a" filter="url(#shadow)" stroke="#313a4a" stroke-width="2"/>

    <!-- Icon: Target / Goal / Maintain -->
    <g transform="translate(0, -22)" stroke="#ff6b6b" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="0" cy="0" r="16" />
      <circle cx="0" cy="0" r="10" />
      <circle cx="0" cy="0" r="4" fill="#ff6b6b"/>
      <path d="M 8,-8 L 16,-16 M 12,-16 L 16,-16 L 16,-12" stroke-width="2.5"/>
    </g>

    <!-- Title inside circle -->
    <text x="0" y="32" class="circle-title" fill="#ff6b6b">Maintain</text>

    <!-- Content Below Circle -->
    <g transform="translate(0, 140)">
      <text x="0" y="0" class="body-header">05 — Maintain — If Needed</text>
      <text x="0" y="24" class="body-desc">We're still here after launch</text>
      <text x="0" y="42" class="body-desc">for content updates, design changes</text>
      <text x="0" y="60" class="body-desc">or technical improvements.</text>
      <text x="0" y="90" class="tagline" fill="#ff6b6b">"Still here after launch"</text>
    </g>
  </g>

</svg>
"""

with open("process_flow.svg", "w") as f:
    f.write(svg_code)

print("SVG created successfully!")