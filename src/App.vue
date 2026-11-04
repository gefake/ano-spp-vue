<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { config, requisites, images } from './config'
import ImageSlider from './ImageSlider.vue'
import DocumentViewer from './DocumentViewer.vue'
import FieldCompass from './FieldCompass.vue'
import DonationEquipment from './DonationEquipment.vue'
const path = ref(location.pathname.replace(/\/$/, '') || '/')
const menu = ref(false), copied = ref(false)
const currentDoc = computed(() => config.documents.find(d => d.path === path.value))
const home = computed(() => ['/', '/page6', '/about'].includes(path.value))
const support = computed(() => ['/support', '/payment', '/page9'].includes(path.value))
const known = computed(() => home.value || support.value || currentDoc.value || ['/documents','/requisites','/page10','/news'].includes(path.value))
function sync(){ path.value = location.pathname.replace(/\/$/, '') || '/'; menu.value = false }
function go(url){ history.pushState({}, '', url); sync(); window.scrollTo({top:0,behavior:'smooth'}) }
onMounted(() => window.addEventListener('popstate',sync))
onUnmounted(() => window.removeEventListener('popstate',sync))
async function copy(){ try { await navigator.clipboard.writeText(requisites.map(([k,v])=>`${k}: ${v}`).join('\n')); copied.value=true; setTimeout(()=>copied.value=false,2500) } catch { window.alert('Не удалось скопировать. Выделите реквизиты вручную.') } }
// Локальная директива: корректно работает и после перехода между страницами.
const vReveal = {
 mounted(el) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  el.classList.add('reveal-ready')
  el._revealObserver = new IntersectionObserver(entries => {
   if (entries.some(entry => entry.isIntersecting)) {
    el.classList.add('revealed'); el._revealObserver.disconnect()
   }
  }, { threshold: 0.08 })
  el._revealObserver.observe(el)
 },
 unmounted(el) { el._revealObserver?.disconnect() }
}
let scrollFrame = 0
function onScroll() {
 if (scrollFrame || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
 scrollFrame = requestAnimationFrame(() => {
  document.documentElement.style.setProperty('--parallax', `${Math.min(window.scrollY, 850) * .18}px`)
  document.documentElement.style.setProperty('--scroll-progress', `${window.scrollY / Math.max(1,document.documentElement.scrollHeight-window.innerHeight) * 100}%`)
  scrollFrame = 0
 })
}
onMounted(() => { window.addEventListener('scroll',onScroll,{passive:true}); onScroll() })
onUnmounted(() => { window.removeEventListener('scroll',onScroll); cancelAnimationFrame(scrollFrame) })
</script>

<template>
<header class="header wrap"><a class="brand" href="/" @click.prevent="go('/')"><span>АНО СПП</span></a><button class="menu-toggle" @click="menu=!menu" :aria-expanded="menu" aria-label="Открыть меню">☰</button><nav :class="{open:menu}"><a href="/#mission" @click="menu=false">О нас</a><a href="/documents" @click.prevent="go('/documents')">Документы</a><a href="/#contacts" @click="menu=false">Контакты</a><a class="button small" href="/support" @click.prevent="go('/support')">Поддержать нас <span>↗</span></a></nav></header>
<main v-if="home">
<section class="hero" :style="{ '--hero-image': `url(&quot;${images.hero}&quot;)` }"><div class="hero-content wrap"><h1>Содействие поискам пропавших</h1><p>АНО "СПП" - это группа неравнодушных людей, целью которых является содействие поискам пропавших и развитие поискового добровольчества на территории Воронежской области</p><a class="button" href="/support" @click.prevent="go('/support')">Поддержать нас</a></div></section>
<section v-reveal id="mission" class="wrap section original-mission"><h2>Чем именно мы занимаемся?</h2><div class="divider"></div><p>Сотрудничаем с добровольческими поисково-спасательными организациями Воронежской области, анализируем их потребности в оборудовании, необходимом для проведения поисково-спасательных работ и ищем способы его приобретения;</p><p>Предоставляем площадку для проведения лекций, семинаров и тренингов для поисковиков-добровольцев;</p><p>Содействуем в реализации образовательных программ по подготовке инструкторов, проводящих обучение физических лиц поисковым работам;</p><p>Стремимся к популяризации поискового добровольчества на территории Воронежской области, путём участия в конференциях, выставках и освещения данного вопроса в средствах массовой информации.</p></section>
<section v-reveal class="section wrap original-activity"><h2>Наша деятельность</h2><p>Мы активно участвуем в обучении добровольцев Воронежской области и других регионов.</p><ImageSlider :slides="images.slides" /></section>
<section v-reveal id="contacts" class="section wrap original-contacts"><FieldCompass /><div class="contacts-copy"><h2>Адрес и контакты</h2><p>Мы находимся по адресу <strong>г. Воронеж, ул. Минская 67/1</strong> и будем рады оказать всем желающим содействие в организации различных мероприятий, лекций и учений.</p><p>Наше помещение открыто для желающих по предварительной договоренности.<br>Связаться с нами можно по номеру директора АНО<br><a href="tel:+79507757624"><strong>+7 950 775 7624</strong></a> (Ольга Землянникова)</p></div></section>
</main><main v-else class="wrap inner">
<div class="eyebrow">АНО «СПП» / {{support ? 'ПОДДЕРЖКА' : 'ОТКРЫТАЯ ИНФОРМАЦИЯ'}}</div>
<template v-if="support"><h1>Как поддержать нас?</h1><section class="qr-donation" aria-label="Пожертвование через СБП"><div class="qr-frame"><img :src="images.donationQr" alt="QR-код СБП для пожертвования АНО СПП" width="529" height="529"><a class="button" :href="config.paymentUrl" target="_blank" rel="noopener noreferrer">♥ Пожертвовать ↗</a></div><div class="qr-copy"><p>Поддержать нас материально можно по кнопке или QR-коду ниже либо с помощью ручного ввода <a href="/requisites" @click.prevent="go('/requisites')">банковских реквизитов АНО "СПП"</a> в вашем банковском приложении</p></div></section><DonationEquipment /></template><template v-else-if="currentDoc"><h1>{{currentDoc.title}}</h1><DocumentViewer v-if="currentDoc.pages?.length" :key="currentDoc.path" :document="currentDoc" /><a v-else-if="currentDoc.file" class="button" :href="currentDoc.file" target="_blank" rel="noopener">Открыть документ ↗</a><div v-else class="notice"><h3>Оригинал документа готовится к размещению</h3><p>Запросить актуальную копию можно у организации:</p><a href="mailto:ano.spp@yandex.ru">ano.spp@yandex.ru ↗</a></div><a class="text-link" href="/documents" @click.prevent="go('/documents')">← Все документы</a></template>
<template v-else-if="['/documents','/requisites'].includes(path)"><h1>{{path==='/documents' ? 'Документы' : 'Реквизиты'}}</h1><p class="lead">Документы и информация об АНО «Содействие поискам пропавших».</p><div v-if="path==='/documents'" class="document-list"><a v-for="doc in config.documents" :key="doc.path" :href="doc.path" @click.prevent="go(doc.path)"><span>↳</span><h3>{{doc.title}}<small v-if="doc.pages?.length" class="document-page-count">{{doc.pages.length}} {{doc.pages.length===1 ? 'страница' : doc.pages.length<5 ? 'страницы' : 'страниц'}} · Просмотр и скачивание</small></h3><span>↗</span></a></div><section v-if="path==='/requisites'" class="qr-donation" aria-labelledby="qr-title"><div class="qr-frame"><img :src="images.donationQr" alt="QR-код СБП для пожертвования АНО СПП" width="529" height="529"><a class="button" :href="config.paymentUrl" target="_blank" rel="noopener noreferrer">♥ Пожертвовать ↗</a></div><div class="qr-copy"><h2 id="qr-title">Как поддержать нас?</h2><p>Поддержать нас материально можно по кнопке или QR-коду либо с помощью ручного ввода банковских реквизитов АНО "СПП" в вашем банковском приложении</p></div></section><DonationEquipment v-if="path==='/requisites'" /><div class="requisites-heading"><h2>Реквизиты</h2><button class="outline" @click="copy">{{copied?'Скопировано ✓':'Скопировать всё ↗'}}</button></div><dl class="requisites"><div v-for="[key,value] in requisites" :key="key"><dt>{{key}}</dt><dd>{{value}}</dd></div></dl></template>
<template v-else-if="['/news','/page10'].includes(path)"><h1>Новости</h1><a class="button" href="mailto:ano.spp@yandex.ru">Написать нам ↗</a></template>
<template v-else><h1>Страница не найдена</h1><a class="button" href="/" @click.prevent="go('/')">На главную ↗</a></template>
</main>
<footer><div class="wrap footer-main"><a class="brand" href="/" @click.prevent="go('/')"><span>АНО СПП</span></a><a href="/documents" @click.prevent="go('/documents')">Документы и реквизиты ↗</a></div><div class="wrap footer-bottom"><span>© {{new Date().getFullYear()}} АНО «СПП»</span><a href="/personal" @click.prevent="go('/personal')">Персональные данные</a><a href="/oferta" @click.prevent="go('/oferta')">Оферта</a></div></footer>
</template>






