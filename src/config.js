export const config = {
  paymentUrl: 'https://qr.nspk.ru/BS1A0066NQETQPD38P8O7KDIC56K5MBQ?type=01&bank=100000000008&crc=D7C1', // Проверенная ссылка платёжного провайдера
  vkUrl: '', // Ссылка на сообщество организации
  documents: [
    { title: 'Устав организации', path: '/regulation', file: '/documents/ustav.zip', pages: Array.from({ length: 6 }, (_, i) => '/documents/ustav' + (i + 1) + '.jpg') },
    { title: 'Свидетельство ФНС', path: '/tax-document', file: '/documents/fns_svid.jpg', pages: ['/documents/fns_svid.jpg'] },
    { title: 'Политика обработки персональных данных', path: '/personal', file: '/documents/personal.zip', pages: Array.from({ length: 4 }, (_, i) => '/documents/personal_' + (i + 1) + '.jpeg') },
    { title: 'Публичная оферта', path: '/oferta', file: '/documents/oferta_donate.png', pages: ['/documents/oferta_donate.png'] },
  ],
}
export const requisites = [
 ['Полное наименование', 'Автономная некоммерческая организация «Содействие поискам пропавших»'],
 ['Сокращённое наименование', 'АНО «СПП»'], ['Дата регистрации', '26.09.2023'],
 ['Юридический и почтовый адрес', '394021, город Воронеж, ул. Минская, д. 67/1, помещ. VII'],
 ['ОГРН', '1233600016957'], ['ИНН', '3663164048'], ['КПП', '366301001'],
 ['Банк', 'АО «Альфа-Банк»'], ['Расчётный счёт', '40703810502940000222'],
 ['Корреспондентский счёт', '30101810200000000593'], ['БИК', '044525593'],
 ['Директор', 'Землянникова Ольга Юрьевна'], ['Телефон', '+7 950 775-76-24'], ['Email', 'ano.spp@yandex.ru'],
]

// Локальные файлы кладите в public/images и указывайте /images/имя.jpg.
export const images = {
  donationQr: '/images/donation-qr.png',
  hero: '/images/main.jpg',
  slides: [
    { src: '/images/2.jpg', alt: 'Группа людей идёт по лесному маршруту' },
    { src: '/images/1.jpg', alt: 'Лесной пейзаж' },
    { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85', alt: 'Солнечный свет в лесу' },
  ],
}


