import MODELS from './organ-models.json'

// Organs that open a detailed OrganUI model. `concepts` are the BodyParts3D
// concepts that make up the organ inside the whole-body model; clicking any of
// their meshes opens the deep-dive. Order matters: earlier organs win shared meshes.
export const ORGANS = {
  eye: {
    title: 'چشم', latin: 'Oculus', system: 'sensory', concepts: ['left eyeball', 'right eyeball'],
    tags: ['Sense organ', 'Vision'],
    text: "اندامی تقریباً کروی و پر از مایع است. قرنیه و عدسی نور را روی شبکیه متمرکز می‌کنند و شبکیه آن را به پیام‌های عصبی برای مغز تبدیل می‌کند.",
    facts: [['ruler', 'Diameter', '≈ 24 mm'], ['layers', 'Wall layers', 'Three'], ['link', 'Muscles moving it', 'Six']],
    caption: "دوربینی که با هر پلک‌زدن تازه می‌شود.",
  },
  gallbladder: {
    title: 'کیسهٔ صفرا', latin: 'Vesica biliaris', system: 'digestive', concepts: ['gallbladder'],
    tags: ['Organ', 'Bile store'],
    text: "کیسه‌ای کوچک و گلابی‌شکل در زیر کبد است. صفرا را ذخیره و غلیظ می‌کند و پس از خوردن غذای چرب، آن را به روده می‌فرستد.",
    facts: [['flow', 'Holds', '≈ 50 mL of bile'], ['ruler', 'Length', '≈ 8 cm']],
    caption: "کیسه‌ای کوچک برای نگهداری صفرا.",
  },
  larynx: {
    title: 'حنجره', latin: 'Larynx', system: 'respiratory',
    concepts: ['thyroid cartilage', 'cricoid cartilage', 'epiglottis', 'muscle of larynx', 'ligament of larynx'],
    tags: ['Airway', 'Voice box'],
    text: "حنجره در بالای نای قرار دارد و جعبهٔ صوتی بدن است. غضروف‌ها آن را باز نگه می‌دارند، دریچهٔ نای هنگام بلع از راه هوایی محافظت می‌کند و ارتعاش تارهای صوتی صدا می‌سازد.",
    facts: [['layers', 'Main cartilages', 'Nine'], ['pulse', 'Vocal fold vibration', '100–250 Hz']],
    caption: "جایی که جریان هوا به صدا تبدیل می‌شود.",
  },
  esophagus: {
    title: 'مری', latin: 'Oesophagus', system: 'digestive', concepts: ['esophagus'],
    tags: ['Digestive tract', 'Muscle tube'],
    text: "لوله‌ای ماهیچه‌ای است که حلق را به معده وصل می‌کند و پشت نای و قلب قرار دارد. موج‌های انقباض ماهیچه‌ای لقمه را به سوی معده می‌رانند.",
    facts: [['ruler', 'Length', '≈ 25 cm'], ['flow', 'Food transit', '≈ 8 seconds']],
    caption: "هر بلع، با موجی از انقباض پیش می‌رود.",
  },
  stomach: {
    title: 'معده', latin: 'Gaster', system: 'digestive', concepts: ['stomach'],
    tags: ['Organ', 'Digestion'],
    text: "کیسه‌ای ماهیچه‌ای و خمیده در زیر دنده‌های چپ است. غذا را با اسید و آنزیم‌ها مخلوط و تجزیه می‌کند و سپس آن را به رودهٔ باریک می‌فرستد.",
    facts: [['flow', 'Capacity', '≈ 1–1.5 L'], ['spark', 'Acidity', 'pH 1.5–3.5']],
    caption: "محفظه‌ای برای مخلوط‌کردن و گوارش غذا.",
  },
  pancreas: {
    title: 'لوزالمعده', latin: 'Pancreas', system: 'digestive', concepts: ['pancreas'],
    tags: ['Gland', 'Digestion', 'Hormones'],
    text: "غده‌ای کشیده در پشت معده است. آنزیم‌های گوارشی را به روده می‌فرستد و هورمون‌های انسولین و گلوکاگون را وارد خون می‌کند.",
    facts: [['ruler', 'Length', '≈ 15 cm'], ['flow', 'Juice per day', '≈ 1.5 L']],
    caption: "دو وظیفه: کمک به گوارش و تنظیم قند خون.",
  },
  spleen: {
    title: 'طحال', latin: 'Lien', system: 'lymphatic', concepts: ['spleen'],
    tags: ['Organ', 'Blood filter', 'Immunity'],
    text: "اندامی تقریباً به اندازهٔ مشت در زیر دنده‌های چپ است. خون را پالایش می‌کند، گلبول‌های قرمز پیر را بازیافت می‌کند و به دستگاه ایمنی در شناسایی عفونت‌ها کمک می‌کند.",
    facts: [['ruler', 'Length', '≈ 11 cm'], ['spark', 'Role', 'Filter + immune hub']],
    caption: "پالایشگر آرام خون در بدن.",
  },
  bladder: {
    title: 'مثانه', latin: 'Vesica urinaria', system: 'urinary', concepts: ['urinary bladder'],
    tags: ['Organ', 'Urinary tract'],
    text: "مخزنی ماهیچه‌ای و کشسان در لگن است. ادرار را از میزنای‌ها دریافت می‌کند و از راه پیشابراه تخلیه می‌کند.",
    facts: [['flow', 'Capacity', '≈ 400–600 mL'], ['link', 'Fed by', 'Two ureters']],
    caption: "برای نگهداری ادرار باز می‌شود و برای تخلیه منقبض می‌شود.",
  },
  kidneys: {
    title: 'کلیه‌ها', latin: 'Renes', system: 'urinary', concepts: ['kidney'],
    tags: ['Organ', 'Filter'],
    text: "دو اندام لوبیایی‌شکل در بخش پشتی شکم هستند. آن‌ها خون را بارها در روز پالایش می‌کنند و تعادل آب و نمک‌های بدن را حفظ می‌کنند.",
    facts: [['flow', 'Filtered per day', '≈ 180 L'], ['ruler', 'Length', '≈ 11 cm each']],
    caption: "دو پالایشگر کوچک برای تصفیهٔ خون.",
  },
  liver: {
    title: 'کبد', latin: 'Hepar', system: 'digestive', concepts: ['liver'],
    tags: ['Organ', 'Metabolism'],
    text: "بزرگ‌ترین اندام داخلی بدن است و زیر دیافراگم در سمت راست قرار دارد. مواد مغذی را پردازش می‌کند، صفرا و پروتئین می‌سازد و مواد زیان‌آور را از خون پاک‌سازی می‌کند.",
    facts: [['ruler', 'Mass', '≈ 1.5 kg'], ['spark', 'Jobs', '500+ functions'], ['flow', 'Superpower', 'Regrows itself']],
    caption: "کارخانهٔ شیمیایی بدن.",
  },
  intestines: {
    title: 'روده‌ها', latin: 'Intestina', system: 'digestive', concepts: ['small intestine', 'large intestine'],
    tags: ['Digestive tract', 'Absorption'],
    text: "لوله‌هایی چندمتری و پیچ‌خورده در شکم هستند. رودهٔ باریک مواد مغذی را جذب می‌کند و رودهٔ بزرگ آب را بازجذب کرده و مواد دفعی را شکل می‌دهد.",
    facts: [['ruler', 'Small intestine', '≈ 6 m'], ['ruler', 'Large intestine', '≈ 1.5 m']],
    caption: "لوله‌ای بلند که برای جاگرفتن در شکم تاخورده است.",
  },
  brain: {
    title: 'مغز', latin: 'Encephalon', system: 'nervous', concepts: ['brain'],
    tags: ['Organ', 'Control centre'],
    text: "مرکز فرماندهی دستگاه عصبی است. بخش‌های چین‌خورده، ساختارهای عمقی و ساقهٔ مغز در ادراک، حرکت، حافظه، زبان و تنظیم فعالیت‌های حیاتی نقش دارند.",
    facts: [['spark', 'Neurons', '≈ 86 billion'], ['ruler', 'Mass', '≈ 1.4 kg'], ['flow', 'Power use', '≈ 20 W']],
    caption: "اندامی که دانش و تجربه‌های ما را ممکن می‌کند.",
  },
  heart: {
    title: 'قلب', latin: 'Cor', system: 'cardiac', concepts: ['heart'], idle: 'heartbeat',
    tags: ['Organ', 'Muscle', 'Pump'],
    text: "پمپی ماهیچه‌ای به اندازهٔ مشت و پشت جناغ است. دو دهلیز خون را دریافت می‌کنند و دو بطن آن را به ریه‌ها و سراسر بدن می‌فرستند.",
    facts: [['pulse', 'Beats per day', '≈ 100,000'], ['layers', 'Chambers', 'Four'], ['flow', 'Output at rest', '≈ 5 L / min']],
    caption: "چهار حفره، یک ریتم و ضربانی پیوسته.",
  },
  lungs: {
    title: 'ریه‌ها', latin: 'Pulmones', system: 'respiratory', concepts: ['left lung', 'right lung'], idle: 'breath',
    tags: ['Organ', 'Gas exchange'],
    text: "دو اندام اسفنجی در قفسهٔ سینه هستند که به لوب‌ها و بخش‌هایی تقسیم شده‌اند. هوا از راه نایژه‌ها به حبابچه‌های ریز می‌رسد و تبادل اکسیژن و دی‌اکسیدکربن در آنجا انجام می‌شود.",
    facts: [['layers', 'Lobes', '3 right · 2 left'], ['ruler', 'Exchange surface', '≈ 70 m²'], ['pulse', 'Breaths per day', '≈ 20,000']],
    caption: "سطحی گسترده برای تبادل گازها در قفسهٔ سینه.",
  },
}

for (const [key, organ] of Object.entries(ORGANS)) organ.model = MODELS[key]

// Quick picks along the top of the stage. Organs open the deep-dive; bones select in place.
export const PICKS = [
  { organ: 'heart' }, { organ: 'brain' }, { organ: 'lungs' }, { organ: 'liver' }, { organ: 'kidneys' },
  { organ: 'stomach' }, { organ: 'eye' }, { featured: 'skull' }, { featured: 'spine' }, { featured: 'femur' },
]
