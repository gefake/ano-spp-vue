<script setup>
const ticks = Array.from({ length: 72 }, (_, i) => i * 5)
</script>
<template>
<svg class="field-compass" viewBox="0 0 400 480" fill="none" aria-hidden="true" focusable="false">
 <defs>
  <linearGradient id="plate" x1="65" y1="140" x2="330" y2="450" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#bfd9d2" stop-opacity=".4"/></linearGradient>
  <radialGradient id="glass"><stop stop-color="#fff"/><stop offset=".8" stop-color="#eef3e7"/><stop offset="1" stop-color="#cbd6c4"/></radialGradient>
 </defs>
 <!-- Двойной шнур, продетый через отверстие планшета -->
 <path d="M196 172C182 125 92 141 69 87C43 24 150 3 239 32C324 60 318 117 273 122C230 126 234 79 290 71C361 61 375 115 338 145" stroke="#243e36" stroke-width="7" stroke-linecap="round"/>
 <path d="M196 172C182 125 92 141 69 87C43 24 150 3 239 32C324 60 318 117 273 122C230 126 234 79 290 71C361 61 375 115 338 145" stroke="#849b80" stroke-width="2" stroke-dasharray="3 6" stroke-linecap="round"/>
 <g class="compass-body">
  <path d="M111 153H285Q303 153 303 173V420Q303 438 285 438H111Q93 438 93 420V173Q93 153 111 153Z" fill="url(#plate)" stroke="#a8bdb0" stroke-width="2"/>
  <circle cx="198" cy="174" r="7" fill="#f5f7f0" stroke="#879f92" stroke-width="3"/>
  <path d="M122 203V411H272" stroke="#657d6b" stroke-width="1.5"/>
  <path v-for="n in 18" :key="n" :d="`M122 ${211+n*10}h${n%5===0?14:7}`" stroke="#657d6b"/>
  <path d="M184 396L198 376L212 396M198 376V416" stroke="#c43d31" stroke-width="2"/>
  <circle cx="198" cy="291" r="106" fill="#263e35" stroke="#122e25" stroke-width="3"/>
  <circle cx="198" cy="291" r="96" fill="url(#glass)" stroke="#aec1aa" stroke-width="2"/>
  <g v-for="angle in ticks" :key="angle" :transform="`rotate(${angle} 198 291)`"><path :d="`M198 199V${angle%30===0?214:angle%10===0?209:205}`" stroke="#354c3b" :stroke-width="angle%30===0?2:1"/></g>
  <g font-family="Arial,sans-serif" font-weight="700" font-size="18" text-anchor="middle" fill="#304b3b"><text x="198" y="236" fill="#c43d31">N</text><text x="198" y="360">S</text><text x="137" y="297">W</text><text x="260" y="297">E</text></g>
  <path d="M170 244V338M182 244V338M214 244V338M226 244V338" stroke="#bfd0b5" stroke-width="1"/>
  <g class="compass-needle"><path d="M198 222L210 291L198 284L186 291Z" fill="#dc483b"/><path d="M198 360L186 291L198 298L210 291Z" fill="#f8faf5" stroke="#9caca0"/><path d="M198 222V284L186 291Z" fill="#b8302b"/><circle cx="198" cy="291" r="7" fill="#d8c089" stroke="#66776a" stroke-width="2"/></g>
  <path d="M143 226C162 210 190 208 210 212" stroke="#fff" stroke-opacity=".65" stroke-width="6" stroke-linecap="round"/>
 </g>
</svg>
</template>
