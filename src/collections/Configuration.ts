import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    user: {
      equals: user?.id,
    },
  };
};

export const Configuration: CollectionConfig = {
  slug: "configuration",
  admin: {
    useAsTitle: "Your configuration",
    description: "Your custum frame.",
  },
  access: {
    read: yourOwn,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
    create: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: true,
      },
      relationTo: "users",
      required: false,
    },
    {
      name: "phone",
      type: "number",
      required: false,
    },
    {
      name: "address",
      type: "text",
      required: false,
    },
    {
      name: "width",
      type: "number",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: false,
      },
      required: true,
    },
    {
      name: "height",
      type: "number",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: false,
      },
      required: true,
    },
    {
      name: "imageUrl",
      type: "text",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: false,
      },
      required: true,
    },

    {
      name: "material",
      type: "text",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: false,
      },
      required: false,
    },
    {
      name: "croppedImageUrl",
      type: "text",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: false,
      },
      required: false,
    },
    {
      name: "color",
      type: "text",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: false,
      },
      required: false,
    },
  ],
};
