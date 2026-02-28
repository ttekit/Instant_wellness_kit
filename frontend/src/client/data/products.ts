export type Product = {
  id: number
  name: string
  tagline: string
  desc: string
  price: number
  time: string
  items: number
  popular: boolean
  image: string
  contents: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Stress Relief',
    tagline: 'Breathe deep. Let go.',
    desc: 'A calming collection designed to melt away tension and restore your inner balance in minutes.',
    price: 34.99,
    time: '20–25 min',
    items: 5,
    popular: true,
    image: 'https://source.unsplash.com/500x300/?spa,wellness,candles',
    contents: ['Lavender essential oil', 'Guided breathing card', 'Dark chocolate square', 'Jade roller', 'Calming herbal tea sachet'],
  },
  {
    id: 2,
    name: 'Energy Boost',
    tagline: 'Power through your afternoon.',
    desc: 'Beat the midday slump with this energizing kit packed with natural pick-me-ups.',
    price: 29.99,
    time: '20–25 min',
    items: 5,
    popular: true,
    image: 'https://source.unsplash.com/500x300/?matcha,energy,supplements',
    contents: ['Cold brew coffee shot', 'Matcha green tea packet', 'B12 energy gummies', 'Electrolyte stick', 'Gratitude journal card'],
  },
  {
    id: 3,
    name: 'Outdoor Fitness',
    tagline: 'Your park is your gym.',
    desc: 'Everything you need for a spontaneous outdoor workout, delivered right to where you are.',
    price: 39.99,
    time: '25–30 min',
    items: 5,
    popular: false,
    image: 'https://source.unsplash.com/500x300/?fitness,workout,gym',
    contents: ['Resistance bands', 'Microfiber towel', 'Protein energy bar', 'Outdoor exercise guide', 'Electrolyte mix sachet'],
  },
  {
    id: 4,
    name: 'Sleep Reset',
    tagline: 'Wind down. Drift off.',
    desc: 'Prepare for the most restful sleep of your life with this soothing nighttime ritual kit.',
    price: 36.99,
    time: '20–25 min',
    items: 5,
    popular: false,
    image: 'https://source.unsplash.com/500x300/?sleep,pillow,night',
    contents: ['Chamomile tea sachets', 'Silk eye mask', 'Melatonin gummies', 'Pillow mist spray', 'Bedtime routine card'],
  },
  {
    id: 5,
    name: 'Mindful Focus',
    tagline: 'Clarity in a box.',
    desc: 'Sharpen your mind and reclaim your focus with this carefully curated concentration kit.',
    price: 32.99,
    time: '20–25 min',
    items: 5,
    popular: false,
    image: 'https://source.unsplash.com/500x300/?journal,notebook,focus',
    contents: ['Focus nootropic supplement', 'Essential oil roller', 'Mindfulness journal', 'Green tea packet', 'Focus timer card'],
  },
]