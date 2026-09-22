// reviews/reviewsData.ts
import { Review } from "./types";

// Replace with data fetched from your API layer / database
export const REVIEWS: Review[] = [
  {
    id: "r1",
    customerName: "Farhana Akter",
    initials: "FA",
    rating: 5,
    productName: "Wireless ANC Headphones",
    comment:
      "Sound quality is excellent and the battery easily lasts two days. Delivery was faster than expected too.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop",
    ],
    date: "2026-09-14",
    verified: true,
    reply: {
      text: "Thank you for the kind words, Farhana! Glad the battery life is working well for your routine.",
      date: "2026-09-15",
    },
  },
  {
    id: "r2",
    customerName: "Tanvir Hasan",
    initials: "TH",
    rating: 4,
    productName: "Smart Fitness Band",
    comment:
      "Good value for the price. The strap felt a bit stiff on day one but it's fine now after a week of use.",
    date: "2026-09-11",
    verified: true,
  },
  {
    id: "r3",
    customerName: "Mst. Sultana Razia",
    initials: "SR",
    rating: 2,
    productName: "Portable Blender",
    comment:
      "Motor sound is louder than I expected and one accessory piece was missing from the box.",
    date: "2026-09-08",
    verified: true,
  },
  {
    id: "r4",
    customerName: "Rakibul Islam",
    initials: "RI",
    rating: 5,
    productName: "Wireless ANC Headphones",
    comment:
      "Best purchase this year. Noise cancellation is genuinely impressive for this price range.",
    date: "2026-09-03",
    verified: false,
  },
  {
    id: "r5",
    customerName: "Nusrat Jahan",
    initials: "NJ",
    rating: 3,
    productName: "Smart Fitness Band",
    comment: "App sync is occasionally slow. Hardware itself feels solid.",
    date: "2026-08-29",
    verified: true,
  },
  {
    id: "r6",
    customerName: "Imran Kabir",
    initials: "IK",
    rating: 1,
    productName: "Portable Blender",
    comment: "Received a used-looking unit, packaging was already opened. Requesting a refund.",
    date: "2026-08-26",
    verified: true,
    flagged: true,
  },
  {
    id: "r7",
    customerName: "Sadia Islam",
    initials: "SI",
    rating: 5,
    productName: "Smart Fitness Band",
    comment: "Accurate step counting and the app is genuinely easy to use. Highly recommend.",
    date: "2026-08-20",
    verified: true,
  },
];