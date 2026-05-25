/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/web-design", destination: "/web-design-montreal", permanent: true },
      { source: "/technical-seo", destination: "/stillawake-times/what-is-technical-seo", permanent: true },
      { source: "/web-development-montreal", destination: "/stillawake-times/web-development-montreal", permanent: true },
      { source: "/ecommerce-web-design-montreal", destination: "/stillawake-times/ecommerce-web-design-montreal", permanent: true },
      { source: "/montreal-web-designer", destination: "/stillawake-times/montreal-web-designer", permanent: true },
      { source: "/web-design-agency-montreal", destination: "/stillawake-times/web-design-agency-montreal", permanent: true },
      { source: "/website-redesign-montreal", destination: "/stillawake-times/website-redesign-montreal", permanent: true },
      { source: "/blog/google-business-profile-optimization", destination: "/stillawake-times/google-business-profile-optimization", permanent: true },
      { source: "/blog/how-to-redesign-a-website-without-destroying-seo", destination: "/stillawake-times/how-to-redesign-a-website-without-destroying-seo", permanent: true },
      { source: "/stillawake-times/custom-coded-websites-outperform-templates", destination: "/stillawake-times/why-custom-coded-websites-outperform-templates", permanent: true },
    ];
  },
};

export default nextConfig;
