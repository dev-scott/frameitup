export const PRODUCT_CATEGORIES = [
  {
    label: "Lacquered wood frame",
    value: "wood_frame" as const,
    featured: [
      {
        name: "Favorite Frame Picks",
        href: `/products?category=wood_frame`,
        imageSrc: "/nav/frames/1.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=wood_frame&sort=desc",
        imageSrc: "/nav/frames/2.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=wood_frame&sort=desc&limit=8",
        imageSrc: "/nav/frames/3.jpg",
      },
    ],
  },
  {
    label: "Plastic frame",
    value: "plastic_frame" as const,
    featured: [
      {
        name: "Favorite Frame Picks",
        href: `/products?category=plastic_frame`,
        imageSrc: "/nav/frames/4.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=plastic_frame&sort=desc",
        imageSrc: "/nav/frames/5.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=plastic_frame&sort=desc&limit=8",
        imageSrc: "/nav/frames/6.jpg",
      },
    ],
  },
  {
    label: "Bordered frame",
    value: "bordered_frame" as const,
    featured: [
      {
        name: "Favorite Frame Picks",
        href: `/products?category=bordered_frame`,
        imageSrc: "/nav/frames/7.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=bordered_frame&sort=desc",
        imageSrc: "/nav/frames/8.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=bordered_frame&sort=desc&limit=8",
        imageSrc: "/nav/frames/9.png",
      },
    ],
  },
];
