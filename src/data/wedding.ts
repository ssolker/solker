export interface WeddingScheduleItem {
  time: string;
  label: string;
  description?: string;
}

export interface WeddingHotel {
  name: string;
  address?: string;
  phone?: string;
  url?: string;
  mapUrl?: string;
  groupCode?: string;
  bookBy?: string;
  notes?: string;
}

export interface WeddingRegistryLink {
  name: string;
  url: string;
}

export interface WeddingFaqItem {
  question: string;
  answer: string;
}

export interface WeddingMealOption {
  value: string;
  label: string;
  description?: string;
  details?: string;
}

export const weddingMeta = {
  headline: 'Shuaib & Hanna',
  dateLabel: 'Saturday, October 10, 2026',
  locationLabel: 'London, Ontario',
  /** Ceremony start — used for countdown (America/Toronto). */
  eventDateIso: '2026-10-10T15:00:00-04:00',
  venueName: 'Bellamere Winery & Event Centre',
  venueAddress: '1260 Gainsborough Rd, London, ON N6H 5K8',
  venueUrl: 'https://www.bellamere.com/',
  venueMapUrl:
    'https://www.google.com/maps/search/?api=1&query=1260+Gainsborough+Rd,+London,+ON+N6H+5K8',
  /** Google Maps embed (Share → Embed a map). No API key needed in the site. */
  venueMapEmbedUrl:
    'https://www.google.com/maps?q=1260+Gainsborough+Rd,+London,+ON+N6H+5K8&hl=en&z=14&output=embed',
  guestDetailsPath: '/wedding/guest-details',
  guestDetailsCta: 'Fill in your guest details',
} as const;

export const story = {
  paragraphs: [
    "Hanna and Shuaib's story began 12 years ago at Huron Park High School, where mutual friends and shared activities first brought their paths together. What started as a simple friendship soon grew into something much more. Between classes, school events, and countless moments spent together, it was on the soccer field where they truly got to know one another. Through every practice, game, and conversation, their connection grew stronger, laying the foundation for a love that has only deepened over the years.",
    "Since those high school days, they have experienced life's many milestones side by side, supporting one another through every challenge, celebrating every success, and creating countless memories along the way. Their relationship has been built on friendship, laughter, trust, and an unwavering commitment to each other.",
    'Today, they are overjoyed to be surrounded by their favorite people as they celebrate this next chapter, grateful for the journey that brought them here and excited for all the adventures that still lie ahead together.',
  ],
  proposal:
    'On their 10-year anniversary, Shuaib proposed to Hanna at the docks at Pittock Conservation, the very place where their story had truly begun years before. What Hanna believed was a special anniversary photoshoot, captured by one of Shuaib\u2019s childhood friends, quickly became so much more. As the familiar setting filled with memories of the past decade, Shuaib got down on one knee and asked Hanna to spend forever with him. The surprise proposal marked the beginning of an exciting new chapter in their journey, turning a celebration of ten unforgettable years into the start of a lifetime together.',
} as const;

export const schedule: WeddingScheduleItem[] = [
  { time: '2:30 PM', label: 'Guest arrival' },
  { time: '3:00 PM', label: 'Ceremony begins', description: 'Gazebo at Bellamere' },
  {
    time: '3:30 PM',
    label: "Cocktail hour and hors d'oeuvres",
    description: 'Bar opens after the ceremony',
  },
  { time: '5:30 PM', label: 'Dinner' },
  { time: '8:00 PM', label: 'Dancing' },
  { time: '10:30 PM', label: 'First shuttle' },
  { time: '11:30 PM', label: 'Second shuttle' },
  { time: '12:00 AM', label: 'Evening ends' },
];

export const dressCode = {
  label: 'Semi-Formal',
  description:
    'We invite you to dress up for the occasion. Semi-formal attire is requested — think cocktail dresses, suits, or dressy separates.',
} as const;

export const accommodations: { busingNote: string; hotels: WeddingHotel[] } = {
  busingNote:
    'We will be using VOYAGO transportation to shuttle guests from the venue back to the Lamplighter Inn in two runs, at 10:30 PM and 11:30 PM.',
  hotels: [
    {
      name: 'Lamplighter Inn',
      address: '591 Wellington Rd, London, ON N6C 4R3',
      url: 'https://www.guestreservations.com/best-western-plus-lamplighter-inn-conference-centre-london/booking',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Best+Western+Plus+Lamplighter+Inn+591+Wellington+Rd,+London,+ON+N6C+4R3',
      notes:
        'If you selected yes to needing a hotel for the night of the wedding in the guest details questionnaire, Hanna will send you a link and information via email so you can book with our wedding group and receive the group discounted rates.',
    },
  ],
};

export const registry = {
  presenceNote:
    "Your love, laughter, and presence on our special day are the greatest gifts we could ever ask for. If you wish to honor us with a gift, a contribution toward our future together would be sincerely appreciated as we begin this next chapter. For those who prefer, we've also created a registry with a few items to help us build our home together. Whatever you choose, please know that your kindness and generosity mean the world to us.",
  links: [
    {
      name: 'Amazon Registry',
      url: 'https://www.amazon.ca/wedding/guest-view/10KQ03E2YPOX5',
    },
  ] as WeddingRegistryLink[],
} as const;

export const faq: WeddingFaqItem[] = [
  {
    question: 'Is there parking at the venue?',
    answer:
      'Yes — there is parking at Bellamere, and you are welcome to leave your car there overnight.',
  },
  {
    question: 'Is there a shuttle back to the hotel?',
    answer:
      'Yes — VOYAGO transportation will run two shuttles from Bellamere to the Lamplighter Inn, at 10:30 PM and 11:30 PM.',
  },
  {
    question: 'Question',
    answer: 'Answer.',
  },
  {
    question: 'Hanna',
    answer: 'Fill this in!!',
  },
];

export const mealOptions: WeddingMealOption[] = [
  {
    value: 'chicken',
    label: 'Oven-Roasted Chicken',
    details:
      'Juicy chicken breast, seared to perfection, topped with microgreens. Served with seasonal vegetables and garlic mashed potatoes.',
  },
  {
    value: 'steak',
    label: 'Signature Steak',
    details:
      'Tender steak topped with onion frites. Served with seasonal vegetables and garlic mashed potatoes.',
  },
  {
    value: 'vegan',
    label: 'Vegan / Vegetarian Cottage Pie',
    details:
      'Tender mushrooms, chickpeas, and root vegetables in a savoury rosemary-thyme sauce, topped with silky garlic mashed potatoes and oven-roasted to a golden brown.',
  },
  {
    value: 'kids',
    label: "Kids' Meal",
    description: 'Ages 12 and under',
    details: 'Breaded chicken fillets with French fries.',
  },
];

export const mealMenuNote =
  'All food served is halal. Please note any allergies or dietary restrictions for each guest.';

export const guestFormLimits = {
  maxPartySize: 10,
  maxNameLength: 150,
  maxEmailLength: 254,
  maxDietaryLength: 500,
  maxHotelRooms: 10,
} as const;
