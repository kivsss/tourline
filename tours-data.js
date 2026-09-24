/* ============================================
   TOURLINE — БАЗА ТУРОВ (24 тура)
   6 туров на каждый сезон: spring, summer, autumn, winter
============================================ */

const TOURS = {

  /* ==================== ВЕСНА ==================== */

  'toscana-villas-wine':{id:'toscana-villas-wine'
,title:'Тоскана: виллы, вино и кипарисовые аллеи',country:'Италия',region:'Тоскана',type:'cities',season:'spring',price:128000,days:'8 дней / 7 ночей',nights:7,group:'До 14 человек',meals:'Завтраки и ужины',transport:'Авиа + автобус',rating:4.9,reviews:127,badge:'−15%',
          image:'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80',
            gallery:[
              'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
              'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=400&q=80',
              'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=400&q=80',
              'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80',
              'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80'
                    ],
  shortDesc:'Виноградники и виллы · 7 ночей',description:'Темп спокойный: каждый день начинается до 18:00, а два дня оставлены полностью свободными.',itinerary:[{n:'01',title:'Прилёт во Флоренцию',text:'Трансфер из аэропорта, заселение на вилле среди виноградников и ужин в семейной траттории.',tags:['Трансфер','Ужин']},{n:'02',title:'Флоренция и галерея Уффици',text:'Прогулка по историческому центру с гидом, входные билеты в Уффици.',tags:['Гид','Билеты']},{n:'03',title:'Винодельни Кьянти',text:'Дегустация в двух хозяйствах, обед с видом на виноградники.',tags:['Дегустация','Обед']},{n:'04',title:'Сиена и Сан-Джиминьяно',text:'Средневековые города, смотровые башни и местные рынки.',tags:['Гид','Трансфер']},{n:'05',title:'Побережье',text:'Переезд на побережье, два дня свободных.',tags:['Свободное время']}],included:['Проживание на вилле 7 ночей','Завтраки и три ужина','Все трансферы и переезды','Русскоязычный гид четыре дня','Медицинская страховка'],excluded:['Обеды и ужины вне программы','Личные расходы и сувениры','Виза и консульский сбор'],pricing:[{name:'Standard',desc:'Номер в отеле 4 звезды, 24 кв. м',price:128000,note:'за человека при 2 гостях',features:['Проживание 7 ночей','Завтраки','Трансфер из аэропорта'],featured:false},{name:'Deluxe',desc:'Вилла с террасой и видом на холмы',price:164000,note:'за человека при 2 гостях',features:['Завтраки и два ужина','Терраса с видом','Аренда авто на 4 дня'],featured:true},{name:'Villa',desc:'Отдельная вилла, 3 спальни',price:212000,note:'за человека при 6 гостях',features:['Вилла на 6 гостей','Полупансион и бассейн','Личный гид весь тур'],featured:false}],manager:{name:'Ольга Морозова',role:'Менеджер направления Италия',phone:'+7 495 120-45-80',email:'olga@tourline.ru',avatar:'https://i.pravatar.cc/80?img=47'}},

  'kyoto-temples-gardens':{id:'kyoto-temples-gardens',
title:'Киото: храмы, сады и цветение сакуры',country:'Япония',region:'Киото',type:'excursion',season:'spring',price:168000,days:'9 дней / 8 ночей',nights:8,group:'До 12 человек',meals:'Завтраки',transport:'Авиа + поезд',rating:4.7,reviews:89,badge:null,
            image:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
                gallery:[
                  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
                  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80',
                  'https://images.unsplash.com/photo-1522547902298-51566e4fb383?w=400&q=80',
                  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80',
                  'https://images.unsplash.com/photo-1554797589-7241bb691973?w=400&q=80'
                        ],
    shortDesc:'Храмы и сады · 8 ночей',description:'Спокойный темп, прогулки по традиционным кварталам и входные билеты в главные храмы Киото.',itinerary:[{n:'01',title:'Прилёт в Осаку',text:'Трансфер в Киото, заселение в рёкан и вечерняя прогулка по району Гион.',tags:['Трансфер','Рёкан']},{n:'02',title:'Золотой павильон и сад камней',text:'Кинкаку-дзи, Рёан-дзи и философская тропа.',tags:['Гид','Билеты']},{n:'03',title:'Арасияма и бамбуковая роща',text:'Бамбуковый лес, обезьяний парк и река Кацура.',tags:['Гид']},{n:'04',title:'Фусими Инари',text:'Тысячи красных ворот и мастер-класс чайной церемонии.',tags:['Церемония']},{n:'05',title:'Нара и олени',text:'Однодневная поездка в древнюю столицу Нара.',tags:['Поезд','Гид']}],included:['Проживание в рёкане 8 ночей','Завтраки','JR Pass на 7 дней','Русскоязычный гид','Медицинская страховка'],excluded:['Обеды и ужины','Личные расходы','Виза'],pricing:[{name:'Standard',desc:'Рёкан 4*, стандартный номер',price:168000,note:'за человека при 2 гостях',features:['Проживание 8 ночей','Завтраки','JR Pass'],featured:false},{name:'Deluxe',desc:'Рёкан с онсэном',price:215000,note:'за человека при 2 гостях',features:['Онсэн','Ужины кайсэки','JR Pass'],featured:true},{name:'Premium',desc:'Отель 5* в центре',price:268000,note:'за человека при 2 гостях',features:['Отель 5*','Полупансион','Личный гид'],featured:false}],manager:{name:'Илья Бондарь',role:'Руководитель отдела Азии',phone:'+7 495 120-45-80',email:'ilya@tourline.ru',avatar:'https://i.pravatar.cc/80?img=12'}},

  'madeira-ocean-laurel':{id:'madeira-ocean-laurel',
title:'Мадейра: океан, фуншу и лавровые леса',country:'Португалия',region:'Мадейра',type:'mountains',season:'spring',price:92000,days:'7 дней / 6 ночей',nights:6,group:'До 16 человек',meals:'Завтраки',transport:'Авиа + авто',rating:4.9,reviews:156,badge:'−10%',
              image:'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=600&q=80',
                gallery:[
                  'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80',
                  'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400&q=80',
                  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80',
                  'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&q=80',
                  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80'
                        ],
    shortDesc:'Океан и лавровые леса · 6 ночей',description:'Остров вечной весны: цветы, океан, левады и лучший ром в Европе.',itinerary:[{n:'01',title:'Прилёт в Фуншал',text:'Заселение, прогулка по набережной и ужин с фаду.',tags:['Трансфер','Ужин']},{n:'02',title:'Левады и водопады',text:'Пешая прогулка по левадам Рабасал.',tags:['Треккинг','Гид']},{n:'03',title:'Мыс Сан-Висенти',text:'Вулканические бассейны и смотровые площадки.',tags:['Авто']},{n:'04',title:'Дегустация вин',text:'Винодельни и ромовая фабрика.',tags:['Дегустация']},{n:'05',title:'Свободный день',text:'Пляж, спа или поездка в Камара-де-Лобуш.',tags:['Свободное время']}],included:['Проживание в отеле 6 ночей','Завтраки','Аренда авто','Медицинская страховка'],excluded:['Обеды и ужины','Топливо','Канатная дорога'],pricing:[{name:'Standard',desc:'Отель 4*, вид на город',price:92000,note:'за человека при 2 гостях',features:['6 ночей','Завтраки','Аренда авто'],featured:false},{name:'Deluxe',desc:'Отель 5*, вид на океан',price:124000,note:'за человека при 2 гостях',features:['Вид на океан','Полупансион','Авто выше классом'],featured:true},{name:'Villa',desc:'Вилла с бассейном',price:176000,note:'за человека при 4 гостях',features:['Вилла с бассейном','Завтраки','Личный гид'],featured:false}],manager:{name:'Ольга Морозова',role:'Менеджер направления Португалия',phone:'+7 495 120-45-80',email:'olga@tourline.ru',avatar:'https://i.pravatar.cc/80?img=47'}},

  'amsterdam-tulips-canals':{id:'amsterdam-tulips-canals',
title:'Амстердам: тюльпаны и каналы',country:'Нидерланды',region:'Амстердам',type:'cities',season:'spring',price:89000,days:'5 дней / 4 ночи',nights:4,group:'До 12 человек',meals:'Завтраки',transport:'Авиа + поезд',rating:4.8,reviews:74,badge:null,
                image:'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80',
                  gallery:[
                    'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
                    'https://images.unsplash.com/photo-1565018886540-a29a1b2b3a7c?w=400&q=80',
                    'https://images.unsplash.com/photo-1459679749680-18eb1eb37418?w=400&q=80',
                    'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=400&q=80',
                    'https://images.unsplash.com/photo-1584007294209-2c9a5b1b8bd2?w=400&q=80'
                          ],
  shortDesc:'Тюльпаны и каналы · 4 ночи',description:'Пик цветения тюльпанов в Кёкенхофе, велосипеды, каналы и музеи.',itinerary:[{n:'01',title:'Прилёт в Амстердам',text:'Заселение, круиз по каналам на закате.',tags:['Круиз','Трансфер']},{n:'02',title:'Кёкенхоф и тюльпаны',text:'Парк тюльпанов и мастер-класс по букетам.',tags:['Билеты','Гид']},{n:'03',title:'Музеи Ван Гога и Рейксмузеум',text:'Две главные галереи города с гидом.',tags:['Билеты','Гид']},{n:'04',title:'Велосипеды и Заансе-Сханс',text:'Поездка к мельницам и сыроварням.',tags:['Велосипед','Дегустация']},{n:'05',title:'Свободное время и вылет',text:'Шопинг на Дамрак и трансфер в аэропорт.',tags:['Свободное время']}],included:['Отель 4 ночи','Завтраки','Круиз по каналам','Билеты в музеи','Медицинская страховка'],excluded:['Обеды и ужины','Билеты в Кёкенхоф','Личные расходы'],pricing:[{name:'Standard',desc:'Отель 3*, центр',price:89000,note:'за человека при 2 гостях',features:['4 ночи','Завтраки','Круиз'],featured:false},{name:'Comfort',desc:'Отель 4*, у канала',price:118000,note:'за человека при 2 гостях',features:['Вид на канал','Билеты в музеи','Велосипеды'],featured:true},{name:'Premium',desc:'Отель 5*, люкс',price:165000,note:'за человека при 2 гостях',features:['Люкс','Полупансион','Личный гид'],featured:false}],manager:{name:'Светлана Дроздова',role:'Менеджер направления Европа',phone:'+7 495 120-45-80',email:'svetlana@tourline.ru',avatar:'https://i.pravatar.cc/80?img=32'}},

  'morocco-cities-desert':{id:'morocco-cities-desert',
title:'Марокко: города и пустыня Сахара',country:'Марокко',region:'Марракеш · Фес · Мерзуга',type:'excursion',season:'spring',price:108000,days:'8 дней / 7 ночей',nights:7,group:'До 10 человек',meals:'Завтраки и ужины',transport:'Авиа + авто',rating:4.8,reviews:112,badge:null,
image:'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80', 
gallery:[
'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80',
'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400&q=80',
'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80',
'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80',
'https://images.unsplash.com/photo-1597211833712-5e41f5d6b1a8?w=400&q=80'
],
  shortDesc:'Города и Сахара · 7 ночей',description:'Марракеш, Фес, ночь в палатке в Сахаре и Атласские горы.',itinerary:[{n:'01',title:'Прилёт в Марракеш',text:'Заселение в риад, вечер на площади Джемаа эль-Фна.',tags:['Трансфер','Риад']},{n:'02',title:'Марракеш',text:'Сад Мажорель, дворец Бахия, рынки.',tags:['Гид']},{n:'03',title:'Переезд в Айт-Бен-Хадду',text:'Крепость ЮНЕСКО и Атласские горы.',tags:['Авто','Гид']},{n:'04',title:'Долина Тодга и Мерзуга',text:'Прибытие в пустыню, катание на верблюдах.',tags:['Верблюды','Ужин']},{n:'05',title:'Ночь в палатке',text:'Рассвет в дюнах, возвращение через Фес.',tags:['Палатка','Рассвет']}],included:['Проживание 7 ночей','Завтраки и 3 ужина','Все трансферы','Русскоязычный гид','Медицинская страховка'],excluded:['Обеды','Личные расходы','Виза'],pricing:[{name:'Standard',desc:'Риады 3–4*, палатка',price:108000,note:'за человека при 2 гостях',features:['7 ночей','Завтраки','Трансферы'],featured:false},{name:'Deluxe',desc:'Риады 4–5*, люкс-палатка',price:145000,note:'за человека при 2 гостях',features:['Люкс-палатка','Полупансион','Личный водитель'],featured:true},{name:'Private',desc:'Индивидуальный тур',price:198000,note:'за человека при 4 гостях',features:['Приватный гид','Авто 4x4','Отели 5*'],featured:false}],manager:{name:'Илья Бондарь',role:'Менеджер направления Африка',phone:'+7 495 120-45-80',email:'ilya@tourline.ru',avatar:'https://i.pravatar.cc/80?img=12'}},

  'croatia-dubrovnik-islands':{id:'croatia-dubrovnik-islands',
title:'Хорватия: Дубровник и острова',country:'Хорватия',region:'Далмация',type:'beach',season:'spring',price:94000,days:'7 дней / 6 ночей',nights:6,group:'До 14 человек',meals:'Завтраки',transport:'Авиа + яхта',rating:4.8,reviews:98,badge:'−12%',
image:'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80',
gallery:[
  'https://picsum.photos/seed/croatia-dubrovnik-1/1200/800',
  'https://picsum.photos/seed/croatia-hvar-2/800/600',
  'https://picsum.photos/seed/croatia-korcula-3/800/600',
  'https://picsum.photos/seed/croatia-sea-4/800/600',
  'https://picsum.photos/seed/croatia-old-town-5/800/600'
],
shortDesc:'Дубровник и острова · 6 ночей',description:'Старый город Дубровника, острова Хвар и Корчула на яхте.',itinerary:[{n:'01',title:'Прилёт в Дубровник',text:'Заселение, прогулка по стенам старого города.',tags:['Трансфер','Прогулка']},{n:'02',title:'Старый город',text:'Экскурсия с гидом и панорамный вид на город.',tags:['Гид','Билеты']},{n:'03',title:'Остров Хвар',text:'Переезд на яхте, лавандовые поля и вино.',tags:['Яхта','Дегустация']},{n:'04',title:'Корчула и вина',text:'Родина Марко Поло и винные погреба.',tags:['Яхта','Дегустация']},{n:'05',title:'Свободное время',text:'Пляжи и купание в Адриатике.',tags:['Свободное время']}],included:['Проживание 6 ночей','Завтраки','Поездки на яхте','Гид в Дубровнике','Медицинская страховка'],excluded:['Обеды и ужины','Входные билеты','Личные расходы'],pricing:[{name:'Standard',desc:'Отель 4*, вид на город',price:94000,note:'за человека при 2 гостях',features:['6 ночей','Завтраки','Яхта на 2 дня'],featured:false},{name:'Deluxe',desc:'Отель 5*, вид на море',price:128000,note:'за человека при 2 гостях',features:['Вид на море','Полупансион','Приватная яхта'],featured:true},{name:'Villa',desc:'Вилла с бассейном',price:172000,note:'за человека при 4 гостях',features:['Вилла','Бассейн','Аренда авто'],featured:false}],manager:{name:'Андрей Гущин',role:'Менеджер направления Балканы',phone:'+7 495 120-45-80',email:'andrey@tourline.ru',avatar:'https://i.pravatar.cc/80?img=68'}},

  /* ==================== ЛЕТО ==================== */

  'santorini-white-sunsets':{id:'santorini-white-sunsets',
title:'Санторини: белые закаты и кальдера',country:'Греция',region:'Санторини',type:'beach',season:'summer',price:112000,days:'6 дней / 5 ночей',nights:5,group:'До 12 человек',meals:'Завтраки',transport:'Авиа + паром',rating:4.8,reviews:184,badge:'−12%',
                  image:'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80',
                    gallery:[
                      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
                      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&q=80',
                      'https://images.unsplash.com/photo-1503152394-c571994fd383?w=400&q=80',
                      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80',
                      'https://images.unsplash.com/photo-1555990538-1e6c1c4c7d9b?w=400&q=80'
                              ],
  shortDesc:'Кальдера и белые города · 5 ночей',description:'Ия и Фира, вулканические пляжи и закаты над Эгейским морем.',itinerary:[{n:'01',title:'Прилёт на Санторини',text:'Трансфер в отель, первый закат в Ие.',tags:['Трансфер','Закат']},{n:'02',title:'Фира и кальдера',text:'Столица острова и прогулка по краю кальдеры.',tags:['Гид']},{n:'03',title:'Круиз на катамаране',text:'Вулкан, горячие источники и ужин на борту.',tags:['Катамаран','Ужин']},{n:'04',title:'Красный и Чёрный пляжи',text:'Вулканические пляжи и дегустация вин.',tags:['Пляж','Дегустация']},{n:'05',title:'Свободный день',text:'Спа, шопинг и повторный закат в Ие.',tags:['Свободное время']}],included:['Проживание 5 ночей','Завтраки','Трансферы','Круиз на катамаране','Медицинская страховка'],excluded:['Обеды и ужины','Аренда авто','Личные расходы'],pricing:[{name:'Standard',desc:'Отель 4*, 10 минут до Фира',price:112000,note:'за человека при 2 гостях',features:['5 ночей','Завтраки','Трансферы'],featured:false},{name:'Caldera View',desc:'Отель с видом на кальдеру',price:158000,note:'за человека при 2 гостях',features:['Вид на кальдеру','Полупансион','Круиз'],featured:true},{name:'Suite',desc:'Люкс с джакузи',price:224000,note:'за человека при 2 гостях',features:['Джакузи','Приватный ужин','Личный консьерж'],featured:false}],manager:{name:'Ольга Морозова',role:'Менеджер направления Греция',phone:'+7 495 120-45-80',email:'olga@tourline.ru',avatar:'https://i.pravatar.cc/80?img=47'}},

  'lofoten-fjords-midnight':{id:'lofoten-fjords-midnight',
title:'Лофотены: фьорды и белые ночи',country:'Норвегия',region:'Лофотенские острова',type:'mountains',season:'summer',price:142000,days:'6 дней / 5 ночей',nights:5,group:'До 10 человек',meals:'Завтраки',transport:'Авиа + авто',rating:4.8,reviews:67,badge:null,
                  image:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
                    gallery:[
                      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
                      'https://images.unsplash.com/photo-1520769945061-0a448c463865?w=400&q=80',
                      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80',
                      'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=400&q=80',
                      'https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=400&q=80'
                              ],
shortDesc:'Фьорды и белые ночи · 5 ночей',description:'Рыбацкие деревни, треккинг по горам и солнце до полуночи.',itinerary:[{n:'01',title:'Прилёт в Эвенес',text:'Трансфер в рыбацкую деревню, первый ужин.',tags:['Трансфер','Ужин']},{n:'02',title:'Рейне и Хеннингсвер',text:'Самые живописные деревни архипелага.',tags:['Авто','Фото']},{n:'03',title:'Треккинг на Рейнебринген',text:'Подъём на смотровую площадку 448 м.',tags:['Треккинг','Гид']},{n:'04',title:'Сафари на морских орлов',text:'Лодочная прогулка среди фьордов.',tags:['Лодка','Фото']},{n:'05',title:'Свободный день',text:'Рыбалка, пляжи и белые ночи.',tags:['Свободное время']}],included:['Проживание в рыбацких домиках','Завтраки','Аренда авто','Лодочное сафари','Медицинская страховка'],excluded:['Обеды и ужины','Топливо','Личные расходы'],pricing:[{name:'Rorbu Standard',desc:'Рыбацкий домик',price:142000,note:'за человека при 2 гостях',features:['Домик','Завтраки','Авто'],featured:false},{name:'Rorbu Deluxe',desc:'Домик с видом на фьорд',price:184000,note:'за человека при 2 гостях',features:['Вид на фьорд','Полупансион','Каяк'],featured:true},{name:'Hotel',desc:'Отель 4* в Сволвере',price:218000,note:'за человека при 2 гостях',features:['Отель','Полупансион','Гид все дни'],featured:false}],manager:{name:'Андрей Гущин',role:'Гид и тревел-эксперт',phone:'+7 495 120-45-80',email:'andrey@tourline.ru',avatar:'https://i.pravatar.cc/80?img=68'}},

  'provence-lavender':{id:'provence-lavender',
title:'Прованс: лаванда и винные деревни',country:'Франция',region:'Прованс',type:'cities',season:'summer',price:78000,days:'5 дней / 4 ночи',nights:4,group:'До 12 человек',meals:'Завтраки',transport:'Авиа + авто',rating:4.9,reviews:143,badge:'−20%',
                  image:'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=600&q=80',
                    gallery:[
                      'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&q=80',
                      'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&q=80',
                      'https://images.unsplash.com/photo-1471623432079-b009d30b6729?w=400&q=80',
                      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
                      'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=400&q=80'
                              ],
shortDesc:'Лаванда и винные деревни · 4 ночи',description:'Поля лаванды в Валансоле, Живерни и лучшие вина Роны.',itinerary:[{n:'01',title:'Прилёт в Марсель',text:'Переезд в Экс-ан-Прованс, заселение.',tags:['Трансфер']},{n:'02',title:'Поля лаванды',text:'Валансоль и аббатство Сенанк.',tags:['Авто','Фото']},{n:'03',title:'Винные деревни',text:'Шатонёф-дю-Пап и дегустация.',tags:['Дегустация']},{n:'04',title:'Живерни и Моне',text:'Сад Моне и дом-музей.',tags:['Билеты','Гид']},{n:'05',title:'Свободное время',text:'Рынок в Эксе и трансфер в аэропорт.',tags:['Свободное время']}],included:['Проживание 4 ночи','Завтраки','Аренда авто','Дегустации','Медицинская страховка'],excluded:['Обеды и ужины','Входные билеты','Топливо'],pricing:[{name:'Standard',desc:'Отель 3*, Экс-ан-Прованс',price:78000,note:'за человека при 2 гостях',features:['4 ночи','Завтраки','Авто'],featured:false},{name:'Bastide',desc:'Прованская бастида',price:112000,note:'за человека при 2 гостях',features:['Бастида','Полупансион','Дегустации'],featured:true},{name:'Chateau',desc:'Шато с виноградниками',price:168000,note:'за человека при 4 гостях',features:['Шато','Виноградники','Приватный гид'],featured:false}],manager:{name:'Светлана Дроздова',role:'Менеджер направления Франция',phone:'+7 495 120-45-80',email:'svetlana@tourline.ru',avatar:'https://i.pravatar.cc/80?img=32'}},

  'amalfi-coast':{id:'amalfi-coast',
title:'Амальфи: побережье и лимоны',country:'Италия',region:'Амальфитанское побережье',type:'beach',season:'summer',price:134000,days:'7 дней / 6 ночей',nights:6,group:'До 12 человек',meals:'Завтраки',transport:'Авиа + авто',rating:4.9,reviews:156,badge:null,
          image:'https://picsum.photos/seed/amalfi-coast-positan/800/600',
              gallery:[
                'https://images.unsplash.com/photo-1533165850316-b1c8c4b1b8ba?w=800&q=80',
                'https://images.unsplash.com/photo-1534003003886-a9b0e0a8d5d9?w=400&q=80',
                'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=400&q=80',
                'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80',
                'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80'
                      ],
    shortDesc:'Побережье и лимоны · 6 ночей',description:'Позитано, Амальфи, Равелло и Капри — всё лучшее побережье Италии.',itinerary:[{n:'01',title:'Прилёт в Неаполь',text:'Трансфер в Сорренто, первое лимончелло.',tags:['Трансфер']},{n:'02',title:'Позитано',text:'Прогулка по городу и пляж Спьяджа-Гранде.',tags:['Гид','Пляж']},{n:'03',title:'Амальфи и Равелло',text:'Кафедральный собор и виллы Равелло.',tags:['Гид','Билеты']},{n:'04',title:'Остров Капри',text:'Голубой грот и канатная дорога.',tags:['Паром','Гид']},{n:'05',title:'Свободное время',text:'Пляжи, спа и кулинарный мастер-класс.',tags:['Свободное время']}],included:['Проживание 6 ночей','Завтраки','Трансферы','Паром на Капри','Медицинская страховка'],excluded:['Обеды и ужины','Входные билеты','Голубой грот'],pricing:[{name:'Standard',desc:'Отель 4*, Сорренто',price:134000,note:'за человека при 2 гостях',features:['6 ночей','Завтраки','Паром'],featured:false},{name:'Sea View',desc:'Отель с видом на море',price:178000,note:'за человека при 2 гостях',features:['Вид на море','Полупансион','Капри'],featured:true},{name:'Villa',desc:'Вилла на склоне',price:246000,note:'за человека при 4 гостях',features:['Вилла','Бассейн','Приватный водитель'],featured:false}],manager:{name:'Ольга Морозова',role:'Менеджер направления Италия',phone:'+7 495 120-45-80',email:'olga@tourline.ru',avatar:'https://i.pravatar.cc/80?img=47'}},

  'iceland-geysers-waterfalls':{id:'iceland-geysers-waterfalls',
title:'Исландия: гейзеры, водопады и ледники',country:'Исландия',region:'Золотое кольцо',type:'mountains',season:'summer',price:186000,days:'7 дней / 6 ночей',nights:6,group:'До 10 человек',meals:'Завтраки',transport:'Авиа + авто 4x4',rating:4.9,reviews:78,badge:null,
            image:'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80',
              gallery:[
                'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80',
                'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=400&q=80',
                'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=400&q=80',
                'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80',
                'https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=400&q=80'
                      ],
    shortDesc:'Гейзеры и водопады · 6 ночей',description:'Золотое кольцо, ледниковая лагуна, чёрные пляжи и северное сияние.',itinerary:[{n:'01',title:'Прилёт в Рейкьявик',text:'Заселение, прогулка по городу, ужин.',tags:['Трансфер']},{n:'02',title:'Золотое кольцо',text:'Гейзер Гейсир, водопад Гюдльфосс, кратер Керид.',tags:['Авто','Гид']},{n:'03',title:'Южное побережье',text:'Водопады Сельяландсфосс и Скогафосс.',tags:['Авто','Фото']},{n:'04',title:'Ледниковая лагуна',text:'Йёкюльсаурлоун и чёрный пляж Даймонд.',tags:['Авто','Фото']},{n:'05',title:'Свободный день',text:'Ледниковая прогулка или спа в Рейкьявике.',tags:['Свободное время']}],included:['Проживание 6 ночей','Завтраки','Аренда авто 4x4','Медицинская страховка'],excluded:['Обеды и ужины','Топливо','Экскурсии на ледник'],pricing:[{name:'Standard',desc:'Гостевые дома и отели 3*',price:186000,note:'за человека при 2 гостях',features:['6 ночей','Завтраки','Авто 4x4'],featured:false},{name:'Comfort',desc:'Отели 4* и бутик-отели',price:234000,note:'за человека при 2 гостях',features:['Отели 4*','Полупансион','Экскурсии'],featured:true},{name:'Luxury',desc:'Отели 5* и лоджи',price:312000,note:'за человека при 2 гостях',features:['Отели 5*','Приватный гид','Вертолёт'],featured:false}],manager:{name:'Андрей Гущин',role:'Гид и тревел-эксперт',phone:'+7 495 120-45-80',email:'andrey@tourline.ru',avatar:'https://i.pravatar.cc/80?img=68'}},

  'bali-temples-ocean':{id:'bali-temples-ocean',
title:'Бали: храмы, рисовые террасы и океан',country:'Индонезия',region:'Бали',type:'beach',season:'summer',price:118000,days:'10 дней / 9 ночей',nights:9,group:'До 14 человек',meals:'Завтраки',transport:'Авиа + авто',rating:4.7,reviews:201,badge:null,
      image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
          gallery:[
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80',
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80',
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=400&q=80',
        'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&q=80'
      ],
      shortDesc:'Храмы и океан · 9 ночей',description:'Убуд, рисовые террасы, вулкан Батур и пляжи Чангу и Семиньяка.',itinerary:[{n:'01',title:'Прилёт в Денпасар',text:'Трансфер в Убуд, заселение в бутик-отеле.',tags:['Трансфер']},{n:'02',title:'Убуд: храмы и рынок',text:'Храм Сарасвати и обезьяний лес.',tags:['Гид']},{n:'03',title:'Рисовые террасы Тегалаланг',text:'Утренний треккинг и завтрак с видом.',tags:['Треккинг']},{n:'04',title:'Восход на вулкане Батур',text:'Ночной подъём и рассвет над кальдерой.',tags:['Треккинг','Рассвет']},{n:'05',title:'Переезд в Чангу',text:'Пляжи, серфинг, кафе и закаты.',tags:['Пляж','Свободное время']}],included:['Проживание 9 ночей','Завтраки','Трансферы','Треккинг на Батур','Медицинская страховка'],excluded:['Обеды и ужины','Аренда авто','Личные расходы'],pricing:[{name:'Standard',desc:'Бутик-отель 4*',price:118000,note:'за человека при 2 гостях',features:['9 ночей','Завтраки','Трансферы'],featured:false},{name:'Deluxe',desc:'Вилла с бассейном',price:168000,note:'за человека при 2 гостях',features:['Вилла','Бассейн','Полупансион'],featured:true},{name:'Luxury',desc:'Резорт 5* на пляже',price:234000,note:'за человека при 2 гостях',features:['Резорт 5*','Всё включено','Спа'],featured:false}],manager:{name:'Илья Бондарь',role:'Руководитель отдела Азии',phone:'+7 495 120-45-80',email:'ilya@tourline.ru',avatar:'https://i.pravatar.cc/80?img=12'}},

  /* ==================== ОСЕНЬ ==================== */

  'rome-vatican':{id:'rome-vatican',
title:'Рим и Ватикан: вечный город',country:'Италия',region:'Рим',type:'cities',season:'autumn',price:92000,days:'5 дней / 4 ночи',nights:4,group:'До 14 человек',meals:'Завтраки',transport:'Авиа + автобус',rating:4.8,reviews:203,badge:'−18%',
    image:'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
          gallery:[
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&q=80',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&q=80',
      'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=400&q=80',
      'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&q=80'
            ],
    shortDesc:'Рим и Ватикан · 4 ночи',description:'Колизей, Ватикан, фонтан Треви и лучшая паста в Трастевере.',itinerary:[{n:'01',title:'Прилёт в Рим',text:'Заселение в центре, вечерняя прогулка к Треви.',tags:['Трансфер','Прогулка']},{n:'02',title:'Колизей и Римский форум',text:'Древний Рим с гидом, билеты без очереди.',tags:['Гид','Билеты']},{n:'03',title:'Ватикан',text:'Музеи Ватикана и собор Святого Петра.',tags:['Гид','Билеты']},{n:'04',title:'Трастевере и Пантеон',text:'Ужин в Трастевере и старейший Пантеон.',tags:['Ужин','Гид']},{n:'05',title:'Свободное время',text:'Шопинг на Виа-дель-Корсо и трансфер.',tags:['Свободное время']}],included:['Проживание 4 ночи','Завтраки','Трансферы','Билеты в Колизей и Ватикан','Медицинская страховка'],excluded:['Обеды и ужины','Личные расходы','Чаевые'],pricing:[{name:'Standard',desc:'Отель 3*, центр',price:92000,note:'за человека при 2 гостях',features:['4 ночи','Завтраки','Билеты'],featured:false},{name:'Comfort',desc:'Отель 4*, рядом с Треви',price:122000,note:'за человека при 2 гостях',features:['Центр','Завтраки','Ужин в Трастевере'],featured:true},{name:'Luxury',desc:'Отель 5* с террасой',price:178000,note:'за человека при 2 гостях',features:['Отель 5*','Терраса','Личный гид'],featured:false}],manager:{name:'Ольга Морозова',role:'Менеджер направления Италия',phone:'+7 495 120-45-80',email:'olga@tourline.ru',avatar:'https://i.pravatar.cc/80?img=47'}},

  'liguria-coast':{id:'liguria-coast',
title:'Побережье Лигурии: Чинкве-Терре',country:'Италия',region:'Лигурия',type:'beach',season:'autumn',price:138000,days:'7 дней / 6 ночей',nights:6,group:'До 12 человек',meals:'Завтраки',transport:'Авиа + поезд',rating:4.9,reviews:134,badge:null,
      image:'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80',
          gallery:[
            'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80',
            'https://images.unsplash.com/photo-1533165850316-b1c8c4b1b8ba?w=400&q=80',
            'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=400&q=80',
            'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80',
            'https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=400&q=80'
                   ],
      shortDesc:'Чинкве-Терре · 6 ночей',description:'Пять разноцветных деревень, песто, вино и поезда вдоль моря.',itinerary:[{n:'01',title:'Прилёт в Геную',text:'Заселение, прогулка по старому порту.',tags:['Трансфер']},{n:'02',title:'Монтероссо',text:'Первая деревня, пляж и треккинг.',tags:['Поезд','Треккинг']},{n:'03',title:'Вернацца и Манарола',text:'Две деревни, вино Шакетрá.',tags:['Поезд','Дегустация']},{n:'04',title:'Корнилья и Риомаджоре',text:'Самые высокие и самые южные деревни.',tags:['Поезд','Гид']},{n:'05',title:'Портовенере и Леричи',text:'Замок и бухта поэтов.',tags:['Лодка','Гид']}],included:['Проживание 6 ночей','Завтраки','Cinque Terre Card','Гид','Медицинская страховка'],excluded:['Обеды и ужины','Дегустации','Личные расходы'],pricing:[{name:'Standard',desc:'Отель 3*, Ла-Специя',price:138000,note:'за человека при 2 гостях',features:['6 ночей','Завтраки','Cinque Terre Card'],featured:false},{name:'Sea View',desc:'Отель с видом на море',price:182000,note:'за человека при 2 гостях',features:['Вид на море','Полупансион','Лодка'],featured:true},{name:'Villa',desc:'Вилла в Портовенере',price:248000,note:'за человека при 4 гостях',features:['Вилла','Сады','Приватный гид'],featured:false}],manager:{name:'Ольга Морозова',role:'Менеджер направления Италия',phone:'+7 495 120-45-80',email:'olga@tourline.ru',avatar:'https://i.pravatar.cc/80?img=47'}},

  'istanbul-two-continents':{id:'istanbul-two-continents',
title:'Стамбул: два континента',country:'Турция',region:'Стамбул',type:'cities',season:'autumn',price:68000,days:'5 дней / 4 ночи',nights:4,group:'До 16 человек',meals:'Завтраки',transport:'Авиа + паром',rating:4.7,reviews:187,badge:'−15%',
       image:'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
          gallery:[
            'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
            'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&q=80',
            'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400&q=80',
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80',
            'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80'
                   ],
      shortDesc:'Два континента · 4 ночи',description:'Айя-София, Голубая мечеть, Гранд-базар и круиз по Босфору.',itinerary:[{n:'01',title:'Прилёт в Стамбул',text:'Заселение в Султанахмет, ужин у Босфора.',tags:['Трансфер','Ужин']},{n:'02',title:'Старый город',text:'Айя-София, Голубая мечеть и Цистерна Базилика.',tags:['Гид','Билеты']},{n:'03',title:'Топкапы и Гранд-базар',text:'Дворец султанов и рынок.',tags:['Гид','Шопинг']},{n:'04',title:'Босфор и два континента',text:'Круиз по Босфору, азиатская часть.',tags:['Паром','Гид']},{n:'05',title:'Свободное время',text:'Хаммам и трансфер в аэропорт.',tags:['Свободное время']}],included:['Проживание 4 ночи','Завтраки','Трансферы','Круиз по Босфору','Медицинская страховка'],excluded:['Обеды и ужины','Входные билеты','Хаммам'],pricing:[{name:'Standard',desc:'Отель 4*, Султанахмет',price:68000,note:'за человека при 2 гостях',features:['4 ночи','Завтраки','Круиз'],featured:false},{name:'Deluxe',desc:'Отель 5* с видом на Босфор',price:98000,note:'за человека при 2 гостях',features:['Вид на Босфор','Полупансион','Хаммам'],featured:true},{name:'Suite',desc:'Люкс в бутик-отеле',price:145000,note:'за человека при 2 гостях',features:['Люкс','Приватный гид','Ужин-дегустация'],featured:false}],manager:{name:'Светлана Дроздова',role:'Менеджер направления Турция',phone:'+7 495 120-45-80',email:'svetlana@tourline.ru',avatar:'https://i.pravatar.cc/80?img=32'}},

  'porto-wine-river':{id:'porto-wine-river',
title:'Порту: вино и река Дору',country:'Португалия',region:'Порту',type:'cities',season:'autumn',price:84000,days:'6 дней / 5 ночей',nights:5,group:'До 12 человек',meals:'Завтраки',transport:'Авиа + поезд',rating:4.8,reviews:92,badge:null,
        image:'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
           gallery:[
            'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
            'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80',
            'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&q=80',
            'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400&q=80',
            'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400&q=80'
                    ],
          shortDesc:'Вино и река Дору · 5 ночей',description:'Портвейн, лодки-рабéло, долина Дору и книжный магазин Livraria Lello.',itinerary:[{n:'01',title:'Прилёт в Порту',text:'Заселение, прогулка по Рибейре.',tags:['Трансфер']},{n:'02',title:'Погреба портвейна',text:'Дегустация в Вила-Нова-де-Гайя.',tags:['Дегустация','Гид']},{n:'03',title:'Долина Дору',text:'Круиз по реке и винодельни.',tags:['Круиз','Дегустация']},{n:'04',title:'Брага и Гимарайнш',text:'Средневековые города на поезде.',tags:['Поезд','Гид']},{n:'05',title:'Свободное время',text:'Книжный магазин, рынок Больян, фуду.',tags:['Свободное время']}],included:['Проживание 5 ночей','Завтраки','Дегустации','Круиз по Дору','Медицинская страховка'],excluded:['Обеды и ужины','Билеты в музеи','Личные расходы'],pricing:[{name:'Standard',desc:'Отель 4*, Рибейра',price:84000,note:'за человека при 2 гостях',features:['5 ночей','Завтраки','Дегустации'],featured:false},{name:'Deluxe',desc:'Отель с видом на Дору',price:118000,note:'за человека при 2 гостях',features:['Вид на Дору','Полупансион','Круиз'],featured:true},{name:'Quinta',desc:'Винодельческое поместье',price:172000,note:'за человека при 2 гостях',features:['Поместье','Ужины','Приватный гид'],featured:false}],manager:{name:'Ольга Морозова',role:'Менеджер направления Португалия',phone:'+7 495 120-45-80',email:'olga@tourline.ru',avatar:'https://i.pravatar.cc/80?img=47'}},

  'georgia-tbilisi-kakheti':{id:'georgia-tbilisi-kakheti',
title:'Грузия: Тбилиси и Кахетия',country:'Грузия',region:'Тбилиси · Кахетия',type:'excursion',season:'autumn',price:62000,days:'6 дней / 5 ночей',nights:5,group:'До 12 человек',meals:'Завтраки',transport:'Авиа + авто',rating:4.9,reviews:224,badge:'−18%',
          image:'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80',
              gallery:[
                'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80',
                'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=400&q=80',
                'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=400&q=80',
                'https://images.unsplash.com/photo-1602940659805-770d1b3b9911?w=400&q=80',
                'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80'
                       ],
            shortDesc:'Тбилиси и Кахетия · 5 ночей',description:'Старый Тбилиси, серные бани, монастыри и дегустации в Кахетии.',itinerary:[{n:'01',title:'Прилёт в Тбилиси',text:'Заселение в центре, ужин с вином.',tags:['Трансфер','Ужин']},{n:'02',title:'Старый Тбилиси',text:'Серные бани, крепость Нарикала, храм Метехи.',tags:['Гид','Прогулка']},{n:'03',title:'Кахетия: Сигнахи',text:'Город любви и монастырь Бодбе.',tags:['Авто','Гид']},{n:'04',title:'Винодельни Кахетии',text:'Три дегустации в квеври.',tags:['Дегустация']},{n:'05',title:'Мцхета и Джвари',text:'Древняя столица и храм на слиянии рек.',tags:['Гид','Билеты']}],included:['Проживание 5 ночей','Завтраки','Все трансферы','3 дегустации','Медицинская страховка'],excluded:['Обеды и ужины','Личные расходы','Чаевые'],pricing:[{name:'Standard',desc:'Бутик-отель 4*',price:62000,note:'за человека при 2 гостях',features:['5 ночей','Завтраки','3 дегустации'],featured:false},{name:'Comfort',desc:'Отель 5* в центре',price:88000,note:'за человека при 2 гостях',features:['Отель 5*','Полупансион','Приватный гид'],featured:true},{name:'Wine Tour',desc:'Тур для гурманов',price:124000,note:'за человека при 2 гостях',features:['5 дегустаций','Ужины шефа','Винный гид'],featured:false}],manager:{name:'Андрей Гущин',role:'Гид и тревел-эксперт',phone:'+7 495 120-45-80',email:'andrey@tourline.ru',avatar:'https://i.pravatar.cc/80?img=68'}},

  'seville-andalusia':{id:'seville-andalusia',
title:'Севилья и Андалусия: фламенко и апельсины',country:'Испания',region:'Андалусия',type:'cities',season:'autumn',price:98000,days:'7 дней / 6 ночей',nights:6,group:'До 14 человек',meals:'Завтраки',transport:'Авиа + поезд',rating:4.9,reviews:118,badge:null, 
          image:'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?w=800&q=80',
              gallery:[
                'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?w=800&q=80',
                'https://images.unsplash.com/photo-1509377130422-f0e5fdf4df02?w=400&q=80',
                'https://images.unsplash.com/photo-1558102822-da570eb113ed?w=400&q=80',
                'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=400&q=80',
                'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=400&q=80'
                         ],
            shortDesc:'Фламенко и апельсины · 6 ночей',description:'Севилья, Кордоба, Гранада — Альгамбра и настоящее фламенко.',itinerary:[{n:'01',title:'Прилёт в Севилью',text:'Заселение, вечернее фламенко-шоу.',tags:['Трансфер','Фламенко']},{n:'02',title:'Севилья: Алькасар и собор',text:'Дворец в мавританском стиле и Хиральда.',tags:['Гид','Билеты']},{n:'03',title:'Кордоба и Мескита',text:'Переезд на поезде, Мескита и квартал Худерия.',tags:['Поезд','Гид']},{n:'04',title:'Гранада и Альгамбра',text:'Главный мавританский дворец Испании.',tags:['Билеты','Гид']},{n:'05',title:'Ронда и белые города',text:'Ущелье Эль-Тахо и деревни Сьерра-Невады.',tags:['Авто','Гид']}],included:['Проживание 6 ночей','Завтраки','Поезда между городами','Билеты в Альгамбру','Медицинская страховка'],excluded:['Обеды и ужины','Фламенко-шоу','Личные расходы'],pricing:[{name:'Standard',desc:'Отели 3–4*',price:98000,note:'за человека при 2 гостях',features:['6 ночей','Завтраки','Поезда'],featured:false},{name:'Comfort',desc:'Отели 4* в центре',price:138000,note:'за человека при 2 гостях',features:['Центр','Полупансион','Фламенко-шоу'],featured:true},{name:'Parador',desc:'Исторические парадоры',price:198000,note:'за человека при 2 гостях',features:['Парадоры','Ужины','Приватный гид'],featured:false}],manager:{name:'Светлана Дроздова',role:'Менеджер направления Испания',phone:'+7 495 120-45-80',email:'svetlana@tourline.ru',avatar:'https://i.pravatar.cc/80?img=32'}},

  /* ==================== ЗИМА ==================== */

  'lapland-northern-lights':{id:'lapland-northern-lights',
title:'Лапландия: северное сияние и хаски',country:'Финляндия',region:'Лапландия',type:'mountains',season:'winter',price:218000,days:'6 дней / 5 ночей',nights:5,group:'До 8 человек',meals:'Полупансион',transport:'Авиа + авто',rating:4.9,reviews:87,badge:null,
          image:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80',
              gallery:[
                'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
                'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=400&q=80',
                'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=400&q=80',
                'https://images.unsplash.com/photo-1520769945061-0a448c463865?w=400&q=80',
                'https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=400&q=80'
                         ],
    shortDesc:'Сияние и хаски · 5 ночей',description:'Стеклянные иглу, хаски-сафари, оленья ферма и охота за северным сиянием.',itinerary:[{n:'01',title:'Прилёт в Рованиеми',text:'Трансфер в стеклянный иглу, ужин у камина.',tags:['Трансфер','Иглу']},{n:'02',title:'Хаски-сафари',text:'Упряжка на 10 км и обед у костра.',tags:['Хаски','Обед']},{n:'03',title:'Оленья ферма и Санта',text:'Деревня Санта-Клауса и оленья упряжка.',tags:['Олени','Санта']},{n:'04',title:'Охота за сиянием',text:'Вечерняя поездка с гидом-фотографом.',tags:['Сияние','Фото']},{n:'05',title:'Свободный день',text:'Снегоходы, ледяная рыбалка или сауна.',tags:['Свободное время']}],included:['Проживание 5 ночей в иглу','Полупансион','Тёплая одежда','Все активности','Медицинская страховка'],excluded:['Обеды в городе','Сувениры','Личные расходы'],pricing:[{name:'Glass Igloo',desc:'Стеклянный иглу',price:218000,note:'за человека при 2 гостях',features:['Иглу','Полупансион','Активности'],featured:false},{name:'Premium Igloo',desc:'Иглу с джакузи',price:268000,note:'за человека при 2 гостях',features:['Джакузи','Сауна','Приватный гид'],featured:true},{name:'Luxury Lodge',desc:'Люкс-лодж',price:348000,note:'за человека при 2 гостях',features:['Лодж','Всё включено','Вертолёт'],featured:false}],manager:{name:'Андрей Гущин',role:'Гид и тревел-эксперт',phone:'+7 495 120-45-80',email:'andrey@tourline.ru',avatar:'https://i.pravatar.cc/80?img=68'}},

  'dubai-desert-skyline':{id:'dubai-desert-skyline',
title:'Дубай: пустыня и небоскрёбы',country:'ОАЭ',region:'Дубай',type:'cities',season:'winter',price:112000,days:'6 дней / 5 ночей',nights:5,group:'До 16 человек',meals:'Завтраки',transport:'Авиа + авто',rating:4.7,reviews:246,badge:'−15%',
          image:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
              gallery:[
                'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
                'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80',
                'https://images.unsplash.com/photo-1546412414-e1885259563a?w=400&q=80',
                'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=400&q=80',
                'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80'
                      ],
    shortDesc:'Пустыня и небоскрёбы · 5 ночей',description:'Бурдж-Халифа, сафари в пустыне и пляжи Персидского залива.',itinerary:[{n:'01',title:'Прилёт в Дубай',text:'Заселение, вечерняя прогулка по Марине.',tags:['Трансфер']},{n:'02',title:'Бурдж-Халифа и Dubai Mall',text:'Смотровая площадка 124 этажа и фонтан.',tags:['Билеты','Гид']},{n:'03',title:'Сафари в пустыне',text:'Джипы по дюнам, катание на верблюдах, ужин.',tags:['Джип','Ужин']},{n:'04',title:'Старый Дубай',text:'Абра на реке, рынок специй и золота.',tags:['Лодка','Гид']},{n:'05',title:'Пляж и свободное время',text:'JBR Beach, аквапарк или шопинг.',tags:['Пляж','Свободное время']}],included:['Проживание 5 ночей','Завтраки','Сафари в пустыне','Билеты на Бурдж-Халифа','Медицинская страховка'],excluded:['Обеды и ужины','Личные расходы','Парки развлечений'],pricing:[{name:'Standard',desc:'Отель 4*, Даунтаун',price:112000,note:'за человека при 2 гостях',features:['5 ночей','Завтраки','Сафари'],featured:false},{name:'Deluxe',desc:'Отель 5*, вид на Бурдж',price:158000,note:'за человека при 2 гостях',features:['Вид на Бурдж','Полупансион','Бурдж-Халифа'],featured:true},{name:'Luxury',desc:'Резорт на Пальме',price:248000,note:'за человека при 2 гостях',features:['Резорт 5*','Пляж','Всё включено'],featured:false}],manager:{name:'Илья Бондарь',role:'Менеджер направления Ближний Восток',phone:'+7 495 120-45-80',email:'ilya@tourline.ru',avatar:'https://i.pravatar.cc/80?img=12'}},

  'maldives-water-villas':{id:'maldives-water-villas',
title:'Мальдивы: виллы над водой',country:'Мальдивы',region:'Атолл Мале',type:'beach',season:'winter',price:268000,days:'8 дней / 7 ночей',nights:7,group:'Индивидуально',meals:'Всё включено',transport:'Авиа + гидросамолёт',rating:4.9,reviews:164,badge:null,
          image:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
              gallery:[
                'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
                'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&q=80',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
                'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80',
                'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400&q=80'
                      ],
    shortDesc:'Виллы над водой · 7 ночей',description:'Вилла над лагуной, всё включено, дайвинг и наблюдение за дельфинами.',itinerary:[{n:'01',title:'Прилёт в Мале',text:'Перелёт на гидросамолёте, заселение в виллу.',tags:['Гидросамолёт','Вилла']},{n:'02',title:'Снорклинг на рифе',text:'Дом-риф и черепахи.',tags:['Снорклинг']},{n:'03',title:'Дайвинг',text:'Погружение с инструктором для начинающих.',tags:['Дайвинг']},{n:'04',title:'Спа и ужин',text:'Парный массаж и ужин на песке.',tags:['Спа','Ужин']},{n:'05',title:'Дельфины на закате',text:'Круиз с дельфинами и шампанским.',tags:['Круиз','Закат']}],included:['Проживание в вилле 7 ночей','Всё включено','Гидросамолёт','Снорклинг и дайвинг','Медицинская страховка'],excluded:['Алкоголь премиум','Спа-процедуры','Чаевые'],pricing:[{name:'Beach Villa',desc:'Вилла на пляже',price:268000,note:'за человека при 2 гостях',features:['Вилла','Всё включено','Гидросамолёт'],featured:false},{name:'Water Villa',desc:'Вилла над водой',price:348000,note:'за человека при 2 гостях',features:['Вилла над водой','Всё включено','Спа'],featured:true},{name:'Presidential',desc:'Президентская вилла',price:598000,note:'за человека при 2 гостях',features:['Президентская','Личный батлер','Приватный пляж'],featured:false}],manager:{name:'Ольга Морозова',role:'Менеджер направления Острова',phone:'+7 495 120-45-80',email:'olga@tourline.ru',avatar:'https://i.pravatar.cc/80?img=47'}},

  'swiss-alps-ski':{id:'swiss-alps-ski',
title:'Швейцария: Альпы и лыжи',country:'Швейцария',region:'Церматт',type:'mountains',season:'winter',price:198000,days:'7 дней / 6 ночей',nights:6,group:'До 10 человек',meals:'Полупансион',transport:'Авиа + поезд',rating:4.9,reviews:112,badge:null,
            image:'https://picsum.photos/seed/swiss-1/800/600',
                gallery:[
                  'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
                  'https://images.unsplash.com/photo-1471623432079-b009d30b6729?w=400&q=80',
                  'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=400&q=80',
                  'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=400&q=80',
                  'https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=400&q=80'
                         ],
    shortDesc:'Альпы и лыжи · 6 ночей',description:'Церматт и Маттерхорн, лыжные трассы, шале с камином и фондю.',itinerary:[{n:'01',title:'Прилёт в Цюрих',text:'Поезд в Церматт, заселение в шале.',tags:['Поезд','Шале']},{n:'02',title:'Маттерхорн',text:'Подъём на Горнерграт, смотровая площадка.',tags:['Поезд','Панорама']},{n:'03',title:'Лыжный день',text:'Инструктор и трассы любой сложности.',tags:['Лыжи','Инструктор']},{n:'04',title:'Свободный день',text:'Спа, шопинг или санки.',tags:['Свободное время']},{n:'05',title:'Фондю и вино',text:'Ужин-дегустация в горном ресторане.',tags:['Ужин','Дегустация']}],included:['Проживание в шале 6 ночей','Полупансион','Поезд Цюрих–Церматт','Ски-пасс','Медицинская страховка'],excluded:['Аренда снаряжения','Инструктор','Обеды на склоне'],pricing:[{name:'Standard',desc:'Отель 4* в Церматте',price:198000,note:'за человека при 2 гостях',features:['6 ночей','Полупансион','Ски-пасс'],featured:false},{name:'Chalet',desc:'Шале с камином',price:268000,note:'за человека при 2 гостях',features:['Шале','Камин','Приватный трансфер'],featured:true},{name:'Luxury',desc:'Отель 5* с спа',price:348000,note:'за человека при 2 гостях',features:['Отель 5*','Спа','Всё включено'],featured:false}],manager:{name:'Андрей Гущин',role:'Гид и тревел-эксперт',phone:'+7 495 120-45-80',email:'andrey@tourline.ru',avatar:'https://i.pravatar.cc/80?img=68'}},

  'thailand-phuket-islands':{id:'thailand-phuket-islands',
title:'Таиланд: Пхукет и острова',country:'Таиланд',region:'Пхукет · Пхи-Пхи',type:'beach',season:'winter',price:132000,days:'10 дней / 9 ночей',nights:9,group:'До 14 человек',meals:'Завтраки',transport:'Авиа + лодка',rating:4.8,reviews:312,badge:'−12%',
             image:'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80',
                 gallery:[
                    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',
                    'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80',
                    'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&q=80',
                    'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&q=80',
                    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=400&q=80'
                        ],
    shortDesc:'Пхукет и острова · 9 ночей',description:'Пляжи Пхукета, острова Пхи-Пхи, тайский массаж и уличная еда.',itinerary:[{n:'01',title:'Прилёт в Пхукет',text:'Заселение в отеле на пляже, вечерний рынок.',tags:['Трансфер','Рынок']},{n:'02',title:'Пляж Патонг и Биг-Будда',text:'Знакомство с островом.',tags:['Гид']},{n:'03',title:'Острова Пхи-Пхи',text:'Лодочная экскурсия, пляж Майя-Бэй.',tags:['Лодка','Пляж']},{n:'04',title:'Залив Пханг-Нга',text:'Джеймс-Бонд-Айленд и каяки.',tags:['Каяк','Гид']},{n:'05',title:'Свободные дни',text:'Массаж, спа и пляжи.',tags:['Свободное время']}],included:['Проживание 9 ночей','Завтраки','Трансферы','2 экскурсии','Медицинская страховка'],excluded:['Обеды и ужины','Массаж','Личные расходы'],pricing:[{name:'Standard',desc:'Отель 4* у пляжа',price:132000,note:'за человека при 2 гостях',features:['9 ночей','Завтраки','2 экскурсии'],featured:false},{name:'Deluxe',desc:'Резорт 5* с бассейном',price:186000,note:'за человека при 2 гостях',features:['Резорт 5*','Полупансион','Спа'],featured:true},{name:'Villa',desc:'Приватная вилла',price:268000,note:'за человека при 4 гостях',features:['Вилла','Бассейн','Приватный повар'],featured:false}],manager:{name:'Илья Бондарь',role:'Руководитель отдела Азии',phone:'+7 495 120-45-80',email:'ilya@tourline.ru',avatar:'https://i.pravatar.cc/80?img=12'}},

  'vienna-christmas-markets':{id:'vienna-christmas-markets',
title:'Вена: рождественские ярмарки',country:'Австрия',region:'Вена',type:'cities',season:'winter',price:82000,days:'5 дней / 4 ночи',nights:4,group:'До 12 человек',meals:'Завтраки',transport:'Авиа',rating:4.8,reviews:96,badge:null,
              image:'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&q=80',
                  gallery:[
                    'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
                    'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&q=80',
                    'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400&q=80',
                    'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80'
                         ],
    shortDesc:'Рождественские ярмарки · 4 ночи',description:'Ярмарки на Ратушной площади, глинтвейн, дворцы и кофе с тортом.',itinerary:[{n:'01',title:'Прилёт в Вену',text:'Заселение в центре, вечерняя ярмарка.',tags:['Трансфер','Ярмарка']},{n:'02',title:'Хофбург и Шёнбрунн',text:'Императорские дворцы.',tags:['Гид','Билеты']},{n:'03',title:'Ярмарки и глинтвейн',text:'Ратушная площадь и Бельведер.',tags:['Ярмарка','Дегустация']},{n:'04',title:'Кофейни и вальс',text:'Кофейня Central и вечер вальса.',tags:['Кофейни','Концерт']},{n:'05',title:'Свободное время',text:'Шопинг на Марияхильферштрассе.',tags:['Свободное время']}],included:['Проживание 4 ночи','Завтраки','Трансферы','Билеты в Шёнбрунн','Медицинская страховка'],excluded:['Обеды и ужины','Концерт','Личные расходы'],pricing:[{name:'Standard',desc:'Отель 4*, центр',price:82000,note:'за человека при 2 гостях',features:['4 ночи','Завтраки','Билеты'],featured:false},{name:'Comfort',desc:'Отель 5* у Оперы',price:118000,note:'за человека при 2 гостях',features:['5*','Полупансион','Концерт'],featured:true},{name:'Suite',desc:'Люкс в историческом отеле',price:178000,note:'за человека при 2 гостях',features:['Люкс','Ужин','Вальс-урок'],featured:false}],manager:{name:'Светлана Дроздова',role:'Менеджер направления Европа',phone:'+7 495 120-45-80',email:'svetlana@tourline.ru',avatar:'https://i.pravatar.cc/80?img=32'}}

};

window.TOURS = TOURS;