<script setup>
import { ref, computed } from 'vue'
const props = defineProps({ slides: { type: Array, default: () => [] } })
const index = ref(0)
const active = computed(() => props.slides[index.value % props.slides.length])
function move(delta) { index.value = (index.value + delta + props.slides.length) % props.slides.length }
let startX = null
function touchEnd(event) {
 if (startX === null) return
 const distance = event.changedTouches[0].clientX - startX
 if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1)
 startX = null
}
</script>
<template>
<div v-if="slides.length" class="slider" role="region" aria-roledescription="карусель" aria-label="Наша деятельность" tabindex="0" @keydown.left.prevent="move(-1)" @keydown.right.prevent="move(1)">
 <div class="slider-viewport" @touchstart.passive="startX=$event.touches[0].clientX" @touchend.passive="touchEnd">
  <Transition name="slide-fade" mode="out-in"><img :key="active.src" :src="active.src" :alt="active.alt" loading="lazy" draggable="false"></Transition>
 </div>
 <div v-if="slides.length > 1" class="slider-controls"><div class="slider-dots"><button v-for="(_,i) in slides" :key="i" :class="{selected:index===i}" :aria-label="`Перейти к изображению ${i+1}`" :aria-current="index===i ? 'true' : undefined" @click="index=i"></button></div><span class="slider-counter" aria-live="polite">{{String(index+1).padStart(2,'0')}} / {{String(slides.length).padStart(2,'0')}}</span><div class="slider-arrows"><button aria-label="Предыдущее изображение" @click="move(-1)">←</button><button aria-label="Следующее изображение" @click="move(1)">→</button></div></div>
</div>
</template>
