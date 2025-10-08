export const PRODUCT_CATEGORIES = [
  {
    label: "Lacquered wood frame",
    value: "wood_frame" as const,
    bgColor: "bg-gradient-to-r from-[#0f172a] to-[#334155]",
    img: "/category_frame/b1.png",
    description: " frame with wood and lacquer , perfect for your memories.",
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
    bgColor: "bg-gradient-to-tl from-[#15803d] via-[#115e59] to-[#164e63]",
    img: "/category_frame/p1.png",
    description: " frame with plastic and lacquer , perfect for your memories.",

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
    bgColor: "bg-gradient-to-br from-[#ef4444] via-[#ea580c] to-[#92400e]",
    img: "/category_frame/g2.png",
    description: " frame with wood and lacquer , perfect for your memories.",

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
