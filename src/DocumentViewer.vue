<script setup>
import { ref, onUnmounted } from 'vue'
const props = defineProps({ document: { type: Object, required: true } })
const index = ref(0)
const zoom = ref(false)
const modal = ref(null)
const closeButton = ref(null)
let previousFocus = null
let previousOverflow = ''
function openModal() {
 previousFocus = window.document.activeElement
 previousOverflow = window.document.body.style.overflow
 window.document.body.style.overflow = 'hidden'
 zoom.value = false
 modal.value.showModal()
 closeButton.value?.focus()
}
function restore() {
 window.document.body.style.overflow = previousOverflow
 previousFocus?.focus()
}
function closeModal() { modal.value.close() }
onUnmounted(() => { if (modal.value?.open) restore() })
const failed = ref(false)
function move(step) { index.value = Math.max(0, Math.min(props.document.pages.length - 1, index.value + step)); failed.value=false }
let start = null
function swipe(event) { if(start!==null){const delta=event.changedTouches[0].clientX-start;if(Math.abs(delta)>55) move(delta<0?1:-1)}start=null }
</script>
<template>
<section class="document-viewer" :aria-label="document.title" tabindex="0" @keydown.left.prevent="move(-1)" @keydown.right.prevent="move(1)">
 <div class="document-toolbar"><div v-if="document.pages.length>1" class="document-paging"><button :disabled="index===0" aria-label="Предыдущая страница" @click="move(-1)">←</button><span aria-live="polite">Страница {{index+1}} из {{document.pages.length}}</span><button :disabled="index===document.pages.length-1" aria-label="Следующая страница" @click="move(1)">→</button></div><span v-else>1 страница</span><a class="button document-download" :href="document.file" download>{{document.pages.length>1?'Скачать все страницы (ZIP) ↓':'Скачать документ ↓'}}</a></div>
 <div v-if="document.pages.length>1" class="document-thumbnails" aria-label="Страницы документа"><button v-for="(page,i) in document.pages" :key="page" :class="{active:i===index}" :aria-label="`Страница ${i+1}`" :aria-current="i===index ? 'page' : undefined" @click="index=i;failed=false"><img :src="page" alt="" loading="lazy"><span>{{i+1}}</span></button></div>
 <div class="document-scan" @touchstart.passive="start=$event.touches[0].clientX" @touchend.passive="swipe"><img v-show="!failed" role="button" tabindex="0" aria-label="Открыть документ крупнее" @click="openModal" @keydown.enter.prevent="openModal" @keydown.space.prevent="openModal" :key="document.pages[index]" :src="document.pages[index]" :alt="`${document.title}, страница ${index+1}`" @error="failed=true"><p v-if="failed">Не удалось загрузить страницу. <a :href="document.pages[index]" target="_blank" rel="noopener">Открыть оригинал ↗</a></p></div>
 <div class="document-actions"><button class="outline" @click="openModal">Открыть и увеличить ↗</button><a :href="document.pages[index]" target="_blank" rel="noopener">Открыть оригинал ↗</a><a :href="document.pages[index]" download>Скачать страницу ↓</a></div>
 <div v-if="document.pages.length>1" class="document-bottom"><button class="outline" :disabled="index===0" @click="move(-1)">← Назад</button><span>{{index+1}} / {{document.pages.length}}</span><button class="outline" :disabled="index===document.pages.length-1" @click="move(1)">Далее →</button></div>
<Teleport to="body"><dialog ref="modal" class="document-modal" :aria-label="document.title" @close="restore" @click="$event.target===modal && closeModal()" @keydown.left.prevent="move(-1)" @keydown.right.prevent="move(1)">
 <div class="document-modal-shell"><header class="document-modal-toolbar"><strong>{{document.title}}</strong><button ref="closeButton" class="outline" aria-label="Закрыть просмотр документа" @click="closeModal">Закрыть ✕</button><div class="modal-tools"><button class="outline" :disabled="index===0" aria-label="Предыдущая страница" @click="move(-1)">←</button><span aria-live="polite">{{index+1}} / {{document.pages.length}}</span><button class="outline" :disabled="index===document.pages.length-1" aria-label="Следующая страница" @click="move(1)">→</button><button class="outline" :aria-pressed="zoom" @click="zoom=!zoom">{{zoom?'Уменьшить −':'Увеличить +'}}</button><a :href="document.pages[index]" download>Скачать страницу ↓</a><a v-if="document.pages.length>1" :href="document.file" download>Скачать всё (ZIP) ↓</a></div></header><div class="document-modal-canvas" :class="{zoom}"><img :src="document.pages[index]" :alt="`${document.title}, страница ${index+1}`"></div></div>
</dialog></Teleport>
</section>
</template>


