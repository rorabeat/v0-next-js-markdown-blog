/** @type {import('next').NextConfig} */
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1]
const isUserOrOrgPages = repositoryName?.endsWith(".github.io")
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (repositoryName && !isUserOrOrgPages ? `/${repositoryName}` : "")

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
