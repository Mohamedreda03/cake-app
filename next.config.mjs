import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mopnmduzmqcmrrfsjbnj.supabase.co", "res.cloudinary.com"],
  },
};

export default withNextIntl(nextConfig);
