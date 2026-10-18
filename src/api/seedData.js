/** Seed vans & demo host for the client-side mock API */

const VAN_IMAGES = {
  modest:
    "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80",
  beach:
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
  reliable:
    "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
  dream:
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
  cruiser:
    "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80",
  green:
    "https://images.unsplash.com/photo-1533591380348-14193f1b2b5f?auto=format&fit=crop&w=800&q=80",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
};

export const DEMO_PASSWORD = "password123";

export const seedUsers = [
  {
    id: 1,
    first_name: "Bob",
    last_name: "Host",
    email: "host@vanlife.com",
    password: DEMO_PASSWORD,
    picture_url: VAN_IMAGES.avatar,
  },
];

export const seedVans = [
  {
    id: 1,
    user_id: 1,
    name: "Modest Explorer",
    price: 60,
    description:
      "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!",
    image: VAN_IMAGES.modest,
    type: "simple",
  },
  {
    id: 2,
    user_id: 1,
    name: "Beach Bum",
    price: 80,
    description:
      "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool amenities in it like a comfy sleeping bed, a fridge, and hot water.",
    image: VAN_IMAGES.beach,
    type: "rugged",
  },
  {
    id: 3,
    user_id: 1,
    name: "Reliable Red",
    price: 100,
    description:
      "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.",
    image: VAN_IMAGES.reliable,
    type: "luxury",
  },
  {
    id: 4,
    user_id: 1,
    name: "Dreamfinder",
    price: 65,
    description:
      "Dreamfinder is the perfect van to travel in and ensure you wake up in the wilderness. We have all you need for every terrain in the wild. Travel with Dreamfinder and find true peace.",
    image: VAN_IMAGES.dream,
    type: "simple",
  },
  {
    id: 5,
    user_id: 1,
    name: "The Cruiser",
    price: 120,
    description:
      "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious living area and plenty of storage, you'll never feel like you're in a van.",
    image: VAN_IMAGES.cruiser,
    type: "luxury",
  },
  {
    id: 6,
    user_id: 1,
    name: "Green Wonder",
    price: 70,
    description:
      "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who love outdoor adventures.",
    image: VAN_IMAGES.green,
    type: "rugged",
  },
];
