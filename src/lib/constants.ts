export const COMPANY_INFO = {
  name: 'Prescript Digital Solutions',
  tagline: 'We Build, Automate & Deploy AI Into Businesses',
  location: 'Lagos, Nigeria',
  timezone: 'WAT (UTC+1)',
  markets: ['Nigeria', 'Pan-Africa', 'North America', 'Europe'],
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+2347030057040',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'hello@prescriptdigital.com',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? 'https://www.instagram.com/prescriptdigital/',
  x: process.env.NEXT_PUBLIC_X ?? 'https://x.com/prescriptdigit1',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? 'https://www.facebook.com/prescriptdigital',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? 'https://linkedin.com/company/prescriptdigital',
}

export const MARKET_PILLS = [
  { flag: '🇳🇬', label: 'Nigeria' },
  { flag: '🌍', label: 'Pan-Africa' },
  { flag: '🇺🇸', label: 'North America' },
  { flag: '🇪🇺', label: 'Europe' },
]
