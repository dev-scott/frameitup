export const PRODUCT_CATEGORIES = [
  {
    label: "Lacquered wood frame",
    value: "wood_frame" as const,
    featured: [
      {
        name: "Favorite Frame Picks",
        href: `/products?category=photo_frames`,
        imageSrc: "/nav/photo-frames/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=photo_frames&sort=desc",
        imageSrc: "/nav/photo-frames/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=photo_frames",
        imageSrc: "/nav/photo-frames/purple.jpg",
      },
    ],
  },
  {
    label: "Plastic frame",
    value: "plastic_frame" as const,
    featured: [
      {
        name: "Favorite Icon Picks",
        href: `/products?category=phone_cases`,
        imageSrc: "/nav/phone-cases/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=phone-cases&sort=desc",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
  {
    label: "Bordered frame",
    value: "bordered_frame" as const,
    featured: [
      {
        name: "Favorite Icon Picks",
        href: `/products?category=phone_cases`,
        imageSrc: "/nav/phone-cases/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=phone-cases&sort=desc",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];
