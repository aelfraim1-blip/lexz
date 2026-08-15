import { MemoryPhoto, BucketListItem, LoveReason } from '../types';

export const FALLBACK_PHOTO = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80';

export const INITIAL_PHOTOS: MemoryPhoto[] = [
  {
    id: 'photo-1',
    url: '/photos/photo1.jpg',
    title: 'Secret Kisses in the Dark',
    date: 'Unforgettable Night',
    location: 'Just You & Me 🌌',
    caption: 'Hiding our blushing faces and sharing sweet kisses under the night breeze. I love you more than words could ever describe.',
    vibeTag: 'Forever & Always 💍',
    rotation: -2.5,
    sticker: '🌙',
  },
  {
    id: 'photo-2',
    url: '/photos/photo2.jpg',
    title: 'Dressed Up & Feeling Fine',
    date: 'Special Date Night',
    location: 'Mirror Selfie Spot ✨',
    caption: 'Look at how gorgeous you are! I swear I am the luckiest guy in the whole world every time I get to walk beside you.',
    vibeTag: 'Stunning You 👑',
    rotation: 2.2,
    sticker: '✨',
  },
  {
    id: 'photo-3',
    url: '/photos/photo3.jpg',
    title: 'Car Cuddles & Soft Sunshine',
    date: 'Roadtrip Adventure',
    location: 'In the Front Seat 🚗',
    caption: 'Forehead kisses, golden sunshine, holding hands, and being silly with our favorite plush toy.',
    vibeTag: 'Golden Rays ☀️',
    rotation: -1.8,
    sticker: '☀️',
  },
  {
    id: 'photo-4',
    url: '/photos/photo4.jpg',
    title: 'Double Trouble & Silly Faces',
    date: 'Goofy Moments',
    location: 'Endless Laughter 😂',
    caption: 'Matching striped shirts and sticking our tongues out. You match my goofy energy every single time!',
    vibeTag: 'Pure Joy 🥰',
    rotation: 2.7,
    sticker: '👅',
  },
  {
    id: 'photo-5',
    url: '/photos/photo5.jpg',
    title: 'Kisses Under The Night Sky',
    date: 'Moonlit Evening',
    location: 'Late Night Adventures 🌙',
    caption: 'The world gets so quiet at night, and in that stillness, holding you and kissing your cheek is my absolute happiest place.',
    vibeTag: 'Pure Romance 💖',
    rotation: -3.1,
    sticker: '💖',
  },
  {
    id: 'photo-6',
    url: '/photos/photo6.jpg',
    title: 'Cafe Goofiness & Purple Jersey',
    date: 'Cafe Hangout',
    location: 'Favorite Cafe Spot 💜',
    caption: 'No matter where we go or what we wear, having you by my side makes everything a thousand times more fun.',
    vibeTag: 'Partner in Crime 👯',
    rotation: 1.5,
    sticker: '💜',
  },
  {
    id: 'photo-7',
    url: '/photos/photo7.jpg',
    title: 'Night Garden & Cute Beret',
    date: 'Evening Walk',
    location: 'Under the Greenery 🌿',
    caption: 'Cute beret hat and goofy poses among the leafy greenery. My favorite person forever.',
    vibeTag: 'Goofy Vibes 😜',
    rotation: -2.0,
    sticker: '🌻',
  },
  {
    id: 'photo-8',
    url: '/photos/photo8.jpg',
    title: 'Cozy Cafe Smiles & Winks',
    date: 'A Cozy Afternoon',
    location: 'Our Favorite Spot ☕',
    caption: 'Sitting close together under the warm cafe lights, smiling and winking at the camera. Every second with you feels like home.',
    vibeTag: 'Sweet Moment 💕',
    rotation: 2.8,
    sticker: '☕',
  },
];

export const INITIAL_BUCKET_LIST: BucketListItem[] = [
  {
    id: 'b-1',
    title: 'Watch the sunrise together from a quiet hilltop with hot chocolate',
    category: 'Dates',
    completed: true,
    emoji: '🌅',
    notes: 'One of the prettiest views, but you were still prettier!',
  },
  {
    id: 'b-2',
    title: 'Build a giant cozy blanket fort and binge-watch our favorite movies all night',
    category: 'Cozy',
    completed: true,
    emoji: '🎪',
    notes: 'Complete with fairy lights, popcorn, and tons of pillows!',
  },
  {
    id: 'b-3',
    title: 'Go on a late night convenience store ramen run at 2 AM',
    category: 'Food',
    completed: true,
    emoji: '🍜',
    notes: 'Late night cravings hits different with you.',
  },
  {
    id: 'b-4',
    title: 'Travel to Japan together to see cherry blossoms and eat fluffy pancakes',
    category: 'Travel',
    completed: false,
    emoji: '🌸',
  },
  {
    id: 'b-5',
    title: 'Spend a whole rainy afternoon baking strawberry treats and messy pastry decorating',
    category: 'Food',
    completed: false,
    emoji: '🍓',
  },
  {
    id: 'b-6',
    title: 'Go on a romantic beach trip, watch the sunset, and write our names in the sand',
    category: 'Travel',
    completed: false,
    emoji: '🏖️',
  },
  {
    id: 'b-7',
    title: 'Dress up super fancy just to go eat fast food or casual diner food together',
    category: 'Dates',
    completed: false,
    emoji: '👗',
  },
  {
    id: 'b-8',
    title: 'Stargaze on a pickup truck / picnic mat in the middle of nowhere',
    category: 'Dates',
    completed: false,
    emoji: '🌌',
  },
  {
    id: 'b-9',
    title: 'Adopt a cute fluffy puppy or kitten together and give them a goofy name',
    category: 'Future',
    completed: false,
    emoji: '🐾',
  },
  {
    id: 'b-10',
    title: 'Have our own cozy home with fairy lights, plant jungle, and endless cuddles',
    category: 'Future',
    completed: false,
    emoji: '🏡',
  },
  {
    id: 'b-11',
    title: 'Get matching silly pajamas for lazy Sunday mornings',
    category: 'Cozy',
    completed: false,
    emoji: '☀️',
  },
  {
    id: 'b-12',
    title: 'Take photo-booth strips in every single city we visit together',
    category: 'Travel',
    completed: false,
    emoji: '📸',
  },
];

export const LOVE_REASONS: LoveReason[] = [
  { id: 1, reason: "The adorable way your eyes crinkle when you're laughing genuinely at my silly jokes.", emoji: "✨", tag: "Your Smile" },
  { id: 2, reason: "How you hold my hand tightly and swing our arms when we walk together.", emoji: "🤝", tag: "Little Things" },
  { id: 3, reason: "Your random bursts of goofy energy that make even the most ordinary day feel like an adventure.", emoji: "🌻", tag: "Personality" },
  { id: 4, reason: "The way you look at me when you think I'm not noticing.", emoji: "👀", tag: "Romance" },
  { id: 5, reason: "How comfortable and safe I feel simply resting my head beside you.", emoji: "☀️", tag: "Comfort" },
  { id: 6, reason: "Your sweet voice when you say 'I love you' out of nowhere.", emoji: "💖", tag: "Sweet Words" },
  { id: 7, reason: "The way you always share your favorite snacks with me (even the best last bite!).", emoji: "🍓", tag: "Thoughtfulness" },
  { id: 8, reason: "How you make me feel like the most loved, handsome, and capable person alive.", emoji: "👑", tag: "Confidence" },
  { id: 9, reason: "The cute faces you make when we take selfies together.", emoji: "📸", tag: "Fun Moments" },
  { id: 10, reason: "Your big, beautiful, compassionate heart that cares so deeply about everything.", emoji: "🌸", tag: "Your Soul" },
  { id: 11, reason: "The feeling of hugging you after not seeing each other for even just a few hours.", emoji: "🫂", tag: "Warmth" },
  { id: 12, reason: "The way you fall asleep and look like a little angel while sleeping.", emoji: "😴", tag: "Cuteness" },
  { id: 13, reason: "Our inside jokes that no one else in the entire world would ever understand.", emoji: "🤫", tag: "Our Bond" },
  { id: 14, reason: "How you always know how to cheer me up whenever I am having a tough day.", emoji: "🌈", tag: "Support" },
  { id: 15, reason: "Simply because you are YOU, and I would choose you in every lifetime.", emoji: "💍", tag: "Forever" },
];

export const DEFAULT_LOVE_LETTER = `My Dearest Love,

From the moment you came into my life, everything turned into brighter colors, softer moments, and a warmth I never knew I was missing. 

Looking back through all of our pictures together—from our silly goofy faces in the garden, to quiet coffee dates, long car rides, and sweet kisses in the dark—I am constantly reminded of how incredibly blessed I am to call you mine.

You have this magical way of making even the simplest moments feel like unforgettable adventures. When you laugh, my whole heart skips a beat. When you hold my hand, every worry just melts away. You are my best friend, my favorite silly teammate, my biggest supporter, and the love of my life.

I built this little diary for you so that you'll always have a place to look back on how much you mean to me. No matter where life takes us, or how busy days get, please remember that my heart is always yours.

Here's to ticking off every single item on our bucket list, taking thousands more goofy pictures, and loving you more and more each passing day.

Forever & Always Yours,
With all my love and endless kisses 💕
Your Boy ✨`;
