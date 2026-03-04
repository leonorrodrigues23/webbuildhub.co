// ╔═══════════════════════════════════════════════════════════════╗
// ║  👤 AUTHOR SYSTEM - Automatic author selection for articles   ║
// ╚═══════════════════════════════════════════════════════════════╝

export interface Author {
  name: string;
  title: string;
  image: string;
  bio: string;
}

// Author database - matched with available images in /public/images/Authors images of the review articles/
const authors: Record<string, Author> = {
  // Web Design & Development Authors
  'sarah-chen': {
    name: 'Sarah Chen',
    title: 'Senior Web Design Editor',
    image: '/images/Authors images of the review articles/sarah-chen.jpg',
    bio: 'Former web developer turned consumer tech advocate with over 10 years of experience building and reviewing websites. Sarah has helped thousands of small business owners and entrepreneurs choose the right website builder for their needs.'
  },
  'david-kim': {
    name: 'David Kim',
    title: 'Senior Tech Editor',
    image: '/images/Authors images of the review articles/david-kim.jpg',
    bio: 'Tech enthusiast and product reviewer with over 10 years of experience testing website builders, e-commerce platforms, and web design tools.'
  },
  'james-wilson': {
    name: 'James Wilson',
    title: 'Web Technology Editor',
    image: '/images/Authors images of the review articles/james-wilson.jpg',
    bio: 'Former software engineer turned tech journalist. James brings a unique technical perspective to website builder reviews and web development guides.'
  },
  // E-commerce & Business Authors
  'emily-johnson': {
    name: 'Emily Johnson',
    title: 'E-commerce Editor',
    image: '/images/Authors images of the review articles/emily-johnson.jpg',
    bio: 'E-commerce strategist and digital marketing expert who has launched over 200 online stores. Emily specializes in helping entrepreneurs find the best platform for their business.'
  },
  'michael-rodriguez': {
    name: 'Michael Rodriguez',
    title: 'Business Technology Analyst',
    image: '/images/Authors images of the review articles/michael-rodriguez.jpg',
    bio: 'Business technology consultant with 15 years of experience helping companies build their digital presence. Michael specializes in platform analysis and helping businesses understand complex web technologies.'
  },
  // Design & UX Authors
  'jessica-martinez': {
    name: 'Jessica Martinez',
    title: 'UX & Design Editor',
    image: '/images/Authors images of the review articles/jessica-martinez.jpg',
    bio: 'UX designer and web design expert with a passion for helping people create beautiful, functional websites without coding knowledge.'
  }
};

// Category to author mapping
const categoryAuthors: Record<string, string[]> = {
  'website builders': ['sarah-chen', 'david-kim', 'james-wilson'],
  'web design': ['sarah-chen', 'jessica-martinez', 'david-kim'],
  'e-commerce': ['emily-johnson', 'sarah-chen', 'michael-rodriguez'],
  'tech': ['david-kim', 'james-wilson'],
  'web development': ['james-wilson', 'david-kim'],
  'business': ['michael-rodriguez', 'emily-johnson'],
  'seo': ['james-wilson', 'sarah-chen'],
  'design': ['jessica-martinez', 'sarah-chen'],
  'default': ['sarah-chen', 'david-kim']
};

/**
 * Get an author based on article category and keywords
 */
export function getAuthorByCategory(
  category: string,
  title: string = '',
  keywords: string[] = []
): Author {
  const normalizedCategory = category.toLowerCase();
  const normalizedTitle = title.toLowerCase();
  const normalizedKeywords = keywords.map(k => k.toLowerCase());

  // Check for website builder related content
  if (
    normalizedCategory.includes('website') ||
    normalizedCategory.includes('web') ||
    normalizedTitle.includes('website') ||
    normalizedTitle.includes('builder') ||
    normalizedKeywords.some(k => k.includes('website') || k.includes('builder'))
  ) {
    const webAuthors = categoryAuthors['website builders'];
    const authorKey = webAuthors[0];
    return authors[authorKey] || authors['sarah-chen'];
  }

  // Check for e-commerce content
  if (
    normalizedCategory.includes('ecommerce') ||
    normalizedCategory.includes('e-commerce') ||
    normalizedTitle.includes('shop') ||
    normalizedTitle.includes('store') ||
    normalizedKeywords.some(k => ['ecommerce', 'shop', 'store', 'selling'].includes(k))
  ) {
    const authorKey = categoryAuthors['e-commerce'][0];
    return authors[authorKey] || authors['emily-johnson'];
  }

  // Check for tech-related content
  if (
    normalizedCategory.includes('tech') ||
    normalizedTitle.includes('seo') ||
    normalizedTitle.includes('performance') ||
    normalizedKeywords.some(k => ['tech', 'development', 'coding'].includes(k))
  ) {
    const authorKey = categoryAuthors['tech'][0];
    return authors[authorKey] || authors['david-kim'];
  }

  // Check category mapping
  for (const [key, authorKeys] of Object.entries(categoryAuthors)) {
    if (normalizedCategory.includes(key)) {
      return authors[authorKeys[0]] || authors['sarah-chen'];
    }
  }

  // Default author for unknown categories
  return authors['sarah-chen'];
}

/**
 * Get a specific author by their key
 */
export function getAuthorByKey(authorKey: string): Author {
  return authors[authorKey] || authors['sarah-chen'];
}

/**
 * Get all available authors
 */
export function getAllAuthors(): Record<string, Author> {
  return authors;
}
