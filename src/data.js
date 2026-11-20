// Display systems, featured structures and copy for the atlas.
// Geometry + names come from BodyParts3D 4.0 and the HuBMAP female reference set (both CC BY 4.0),
// see public/ATTRIBUTION.md. Per-body copy lives in bodies.js.

export const SYSTEMS = [
  { id: 'skeletal', name: 'Skeleton', latin: 'Systema skeletale', color: '#e4dcc0', icon: 'bone',
    blurb: 'اسکلت، چارچوب نگهدارندهٔ بدن است؛ وزن بدن را تحمل می‌کند، از اندام‌های ظریف محافظت می‌کند، تکیه‌گاه ماهیچه‌هاست و در مغز استخوان آن سلول‌های خونی ساخته می‌شوند.' },
  { id: 'muscular', name: 'Muscles', latin: 'Systema musculare', color: '#a9584c', icon: 'muscle',
    blurb: 'ماهیچه‌های اسکلتی انرژی شیمیایی را به نیروی کششی تبدیل می‌کنند. این ماهیچه‌ها با همکاری جفت‌های مخالف در دو سوی مفصل‌ها، بدن را حرکت می‌دهند، وضعیت بدن را حفظ می‌کنند و به گرم‌ماندن آن کمک می‌کنند.' },
  { id: 'cardiac', name: 'Heart', latin: 'Cor', color: '#b9605a', icon: 'heart',
    blurb: 'قلب پمپی ماهیچه‌ای با چهار حفره است. نیمهٔ راست خون را به سوی ریه‌ها می‌فرستد و نیمهٔ چپ آن را به سراسر بدن پمپ می‌کند.' },
  { id: 'arterial', name: 'Arteries', latin: 'Arteriae', color: '#c24b3f', icon: 'vessel',
    blurb: 'رگ‌هایی ضخیم و کشسان که خون را با فشار از قلب دور می‌کنند و با شاخه‌شدن به رگ‌های باریک‌تر، به همهٔ بافت‌ها می‌رسند.' },
  { id: 'venous', name: 'Veins', latin: 'Venae', color: '#4f7aa0', icon: 'vessel',
    blurb: 'رگ‌هایی با فشار کمتر که خون را به قلب بازمی‌گردانند؛ دریچه‌های یک‌طرفه و انقباض ماهیچه‌های اطراف به حرکت خون در آن‌ها کمک می‌کند.' },
  { id: 'nervous', name: 'Nervous system', latin: 'Systema nervosum', color: '#d9b45f', icon: 'nerve',
    blurb: 'مغز، نخاع و عصب‌ها شبکهٔ ارتباطی بدن را می‌سازند و پیام‌های مربوط به حس، حرکت، اندیشه و تنظیم فعالیت‌های خودکار را منتقل می‌کنند.' },
  { id: 'respiratory', name: 'Respiratory', latin: 'Systema respiratorium', color: '#c08a93', icon: 'lungs',
    blurb: 'راه‌های هوایی به ریه‌ها می‌رسند؛ در سطح گستردهٔ حبابچه‌های ریز ریوی، با هر دم‌وبازدم اکسیژن وارد خون و دی‌اکسیدکربن از آن خارج می‌شود.' },
  { id: 'digestive', name: 'Digestive', latin: 'Systema digestorium', color: '#bb9068', icon: 'gut',
    blurb: 'دستگاه گوارش لوله‌ای بلند و پیچ‌خورده به‌همراه اندام‌های کمکی است که غذا را تجزیه می‌کند، مواد مغذی و آب را جذب می‌کند و باقی‌مانده را به جلو می‌راند.' },
  { id: 'urinary', name: 'Urinary', latin: 'Systema urinarium', color: '#b5775d', icon: 'kidney',
    blurb: 'کلیه‌ها خون را تصفیه می‌کنند و تعادل آب و نمک‌های بدن را تنظیم می‌کنند؛ ادرار از راه میزنای‌ها به مثانه می‌رسد.' },
  { id: 'sensory', name: 'Sense organs', latin: 'Organa sensuum', color: '#a9c6cd', icon: 'eye',
    blurb: 'اندام‌های تخصص‌یافتهٔ بینایی، شنوایی و تعادل که نور، صدا و حرکت را به پیام‌های عصبی تبدیل می‌کنند.' },
  { id: 'endocrine', name: 'Endocrine', latin: 'Systema endocrinum', color: '#c79f98', icon: 'gland',
    blurb: 'غده‌هایی که هورمون‌ها را وارد خون می‌کنند و رشد، سوخت‌وساز، پاسخ به فشارهای روانی و تولیدمثل را تنظیم می‌کنند.' },
  { id: 'lymphatic', name: 'Lymphatic', latin: 'Systema lymphaticum', color: '#86a07a', icon: 'node',
    blurb: 'رگ‌ها و اندام‌هایی که مایع میان‌بافتی را به خون بازمی‌گردانند و بخش مهمی از دستگاه ایمنی را در خود جای می‌دهند.' },
  { id: 'reproductive', name: 'Reproductive', latin: 'Systema genitale', color: '#bfa199', icon: 'gland',
    blurb: 'The male reproductive structures of this reference body: they produce and transport sperm and sex hormones.' },
  { id: 'connective', name: 'Connective tissue', latin: 'Textus connectivus', color: '#aac3b9', icon: 'link',
    blurb: 'غضروف‌ها، رباط‌ها و پرده‌هایی که ساختارهای بدن را به هم پیوند می‌دهند، ضربه‌ها را جذب می‌کنند و آن‌ها را از هم جدا می‌سازند.' },
  { id: 'integumentary', name: 'Body surface', latin: 'Integumentum', color: '#bc9c7e', icon: 'skin',
    blurb: 'سطح بیرونی بدن؛ پوششی که روی همهٔ ساختارهای زیرین قرار گرفته است.' },
  // Female body only, and hidden until switched on.
  { id: 'pregnancy', name: 'Pregnancy reference', latin: 'Graviditas', color: '#cf9aa0', icon: 'gland',
    blurb: 'Placenta, amnion and umbilical cord from the female reference set. They model a pregnancy rather than the body itself, so they start hidden.' },
]

export const SYSTEM_BY_ID = Object.fromEntries(SYSTEMS.map((s) => [s.id, s]))

// Muscles and skin hide the organs, so they start switched off.
export const DEFAULT_VISIBLE = [
  'skeletal', 'cardiac', 'arterial', 'venous', 'nervous', 'respiratory', 'digestive',
  'urinary', 'sensory', 'endocrine', 'lymphatic', 'reproductive', 'connective',
]

export const FEATURED = [
  { key: 'skull', title: 'Skull', latin: 'Cranium', concepts: ['skull'], system: 'skeletal',
    tags: ['Bones', 'Protection'],
    text: 'A helmet of tightly jointed bones that encloses the brain and frames the face, the eyes, the nose and the jaw.',
    facts: [['layers', 'Bones', '22 (excl. ear bones)'], ['link', 'Movable joint', 'Only the jaw']],
    caption: 'Twenty-two bones, fitted like a puzzle.' },
  { key: 'spine', title: 'Spine', latin: 'Columna vertebralis', concepts: ['vertebral column'], system: 'skeletal',
    tags: ['Bones', 'Support'],
    text: 'A flexible column of stacked vertebrae that carries the head and trunk and guards the spinal cord running through it.',
    facts: [['layers', 'Vertebrae', '33 (some fused)'], ['link', 'Curves', 'Four']],
    caption: 'Strong enough to carry you, supple enough to bend.' },
  { key: 'femur', title: 'Femur', latin: 'Os femoris', concepts: ['femur'], system: 'skeletal',
    tags: ['Bone', 'Lower limb'],
    text: 'The thigh bone — the longest and strongest bone in the body, linking the hip to the knee.',
    facts: [['ruler', 'Share of height', '≈ 26%'], ['spark', 'Strength', 'Stronger than concrete']],
    caption: 'The longest bone you own.' },
]

// "Find the …" quiz. Each round asks for one structure; a click on any of its meshes counts.
export const QUIZ = [
  { title: 'Femur', concepts: ['femur'], system: 'skeletal', hint: 'The long bone of the thigh.' },
  { title: 'Sternum', concepts: ['sternum'], system: 'skeletal', hint: 'The flat breastbone where the ribs meet in front.' },
  { title: 'Clavicle', concepts: ['clavicle'], system: 'skeletal', hint: 'The collarbone, between breastbone and shoulder.' },
  { title: 'Scapula', concepts: ['scapula'], system: 'skeletal', hint: 'The shoulder blade, on the back of the ribcage.' },
  { title: 'Humerus', concepts: ['humerus'], system: 'skeletal', hint: 'The single bone of the upper arm.' },
  { title: 'Tibia', concepts: ['tibia'], system: 'skeletal', hint: 'The shin bone — the thicker of the two lower-leg bones.' },
  { title: 'Fibula', concepts: ['fibula'], system: 'skeletal', hint: 'The slender bone on the outer side of the lower leg.' },
  { title: 'Patella', concepts: ['patella'], system: 'skeletal', hint: 'The kneecap.' },
  { title: 'Mandible', concepts: ['mandible'], system: 'skeletal', hint: 'The lower jaw — the skull’s only movable bone.' },
  { title: 'Sacrum', concepts: ['sacrum'], system: 'skeletal', hint: 'A triangular bone at the base of the spine, wedged between the hips.' },
  { title: 'Hyoid bone', concepts: ['hyoid bone'], system: 'skeletal', hint: 'A small U-shaped bone in the neck, under the jaw.' },
  { title: 'Calcaneus', concepts: ['calcaneus'], system: 'skeletal', hint: 'The heel bone.' },
  { title: 'Heart', concepts: ['heart'], system: 'cardiac', hint: 'Behind the breastbone, tipped to the left.' },
  { title: 'Liver', concepts: ['liver'], system: 'digestive', hint: 'Under the right ribs, just below the diaphragm.' },
  { title: 'Stomach', concepts: ['stomach'], system: 'digestive', hint: 'Under the left ribs, J-shaped.' },
  { title: 'Kidney', concepts: ['kidney'], system: 'urinary', hint: 'Against the back wall of the abdomen, one each side of the spine.' },
  { title: 'Urinary bladder', concepts: ['urinary bladder'], system: 'urinary', hint: 'Low in the pelvis, behind the pubic bone.' },
  { title: 'Spleen', concepts: ['spleen'], system: 'lymphatic', hint: 'Tucked under the left ribs, behind the stomach.' },
  { title: 'Trachea', concepts: ['trachea'], system: 'respiratory', hint: 'The windpipe, running down the front of the neck.' },
  { title: 'Aorta', concepts: ['aorta'], system: 'arterial', hint: 'The body’s largest artery, arching out of the heart.' },
  { title: 'Spinal cord', concepts: ['spinal cord'], system: 'nervous', hint: 'Runs inside the vertebral column.' },
  { title: 'Brain', concepts: ['brain'], system: 'nervous', hint: 'Inside the skull.' },
]

// FMA concept names are lower-case ("femur"); show them sentence-cased.
export const pretty = (name) => name.charAt(0).toUpperCase() + name.slice(1)

// The second way in, after systems: the body cut into four regions, like an atlas.
export const REGIONS = [
  { id: 'head', name: 'Head & neck', latin: 'Caput et collum', icon: 'head',
    blurb: 'The skull and the brain it guards, the sense organs of the face, and the neck that carries the airway, the gullet and the great vessels to and from the head.' },
  { id: 'trunk', name: 'Trunk', latin: 'Truncus', icon: 'trunk',
    blurb: 'Chest, abdomen and pelvis around the spine: the heart and lungs behind the ribs, the digestive organs below the diaphragm, and the kidneys against the back wall.' },
  { id: 'upper', name: 'Upper limbs', latin: 'Membra superiora', icon: 'arm',
    blurb: 'Shoulder, arm, forearm and hand — a long chain of joints built for reach and fine grip, with the muscles, vessels and nerves that run its length.' },
  { id: 'lower', name: 'Lower limbs', latin: 'Membra inferiora', icon: 'leg',
    blurb: 'Hip to toes: the body’s largest bones and strongest muscles, made to carry the whole weight of the body and move it.' },
]
export const REGION_BY_ID = Object.fromEntries(REGIONS.map((r) => [r.id, r]))

// Height of the male body the region cuts below were measured on.
export const REFERENCE_HEIGHT = 1.73

// Hip and thigh structures that sit as far out as the hanging arms (wider hips put more of them there).
const HIP = /fasciae latae|glute|femor|iliac|iliotibial|thigh|\bhip\b|inguinal|obturator|piriformis|sartorius/i

/** Region of a structure from the centre of its bounds (metres, feet at y = 0, facing +z), scaled to the body's height; the name settles hip vs hand. */
export function regionIdOf(bounds, height = REFERENCE_HEIGHT, name = '') {
  const [min, max] = bounds
  const cx = (min[0] + max[0]) / 2
  const cy = ((min[1] + max[1]) / 2) * (REFERENCE_HEIGHT / height)
  if (cy > 1.42) return 'head'
  // Arms hang at the sides, so the hands sit lower than the hips: test width first.
  if (Math.abs(cx) > 0.17 && cy > 0.55 && !(cy < 1.05 && HIP.test(name))) return 'upper'
  if (cy < 0.86) return 'lower'
  return 'trunk'
}

