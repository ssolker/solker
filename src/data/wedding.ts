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
  howWeMet:
    'We met through friends and quickly knew we had something special. Our story is still being written — more to come.',
  proposal: "He asked, she said yes. We're so excited to celebrate with you.",
} as const;

export const schedule: WeddingScheduleItem[] = [
  { time: '2:30 PM', label: 'Guest arrival' },
  { time: '3:00 PM', label: 'Ceremony', description: 'Gazebo at Bellamere' },
  { time: '3:30 PM', label: 'Cocktails', description: 'Bar opens after the ceremony' },
  { time: '5:30 PM', label: 'Dinner' },
  { time: '8:00 PM', label: 'Dancing' },
  { time: '12:00 AM', label: 'Evening ends' },
];

export const dressCode = {
  label: 'Semi-Formal',
  description:
    'We invite you to dress up for the occasion. Semi-formal attire is requested — think cocktail dresses, suits, or dressy separates.',
} as const;

export const accommodations: { busingNote: string; hotels: WeddingHotel[] } = {
  busingNote: 'Busing will be provided to and from the hotel block.',
  hotels: [
    {
      name: 'Hotel block — coming soon',
      notes: 'We are finalizing hotel recommendations for out-of-town guests. Details will be posted here when available.',
    },
    {
      name: 'Additional options — coming soon',
      notes: 'More accommodation suggestions will be added closer to the date.',
    },
  ],
};

export const registry = {
  presenceNote:
    'Your presence is the greatest gift. If you wish to honor us with a contribution, we will share registry links here when they are ready.',
  links: [] as WeddingRegistryLink[],
} as const;

export const faq: WeddingFaqItem[] = [
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
