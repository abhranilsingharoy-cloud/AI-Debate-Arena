import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-debate-arena.vercel.app' // Replace with production URL

  // Static routes
  const routes = ['', '/topics', '/agents', '/leaderboard', '/archive', '/about', '/create'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    })
  )

  return routes
}
