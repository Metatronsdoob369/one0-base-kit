import axios from 'axios';
import * as cheerio from 'cheerio';
export class WebScraper {
    options;
    defaultOptions = {
        timeout: 30000,
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; PATHsassinBot/1.0; +https://github.com/pathsassin)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        },
        followRedirects: true,
        maxRetries: 3,
        delay: 1000,
    };
    constructor(options = {}) {
        this.options = options;
        this.options = { ...this.defaultOptions, ...options };
    }
    /**
     * Scrape a single webpage
     */
    async scrapePage(url, options = {}) {
        const mergedOptions = { ...this.options, ...options };
        try {
            console.log(`🔍 Scraping: ${url}`);
            const response = await this.makeRequest(url, mergedOptions);
            const $ = cheerio.load(response.data);
            // Clean up the HTML if requested
            if (mergedOptions.cleanHtml) {
                this.cleanHtml($);
            }
            if (mergedOptions.removeScripts) {
                $('script').remove();
            }
            if (mergedOptions.removeStyles) {
                $('style').remove();
            }
            const scrapedContent = {
                url,
                title: this.extractTitle($),
                content: mergedOptions.extractText !== false ? this.extractText($) : '',
                metadata: {
                    description: this.extractDescription($),
                    keywords: this.extractKeywords($),
                    author: this.extractAuthor($),
                    date: this.extractDate($),
                    language: this.extractLanguage($),
                    wordCount: this.countWords(this.extractText($)),
                    links: mergedOptions.extractLinks !== false ? this.extractLinks($, url) : [],
                    images: mergedOptions.extractImages !== false ? this.extractImages($, url) : [],
                },
                timestamp: new Date().toISOString(),
                status: response.status,
            };
            console.log(`✅ Successfully scraped: ${url} (${scrapedContent.metadata.wordCount} words)`);
            return scrapedContent;
        }
        catch (error) {
            console.error(`❌ Failed to scrape ${url}:`, error);
            throw new Error(`Failed to scrape ${url}: ${error}`);
        }
    }
    /**
     * Scrape multiple pages
     */
    async scrapePages(urls, options = {}) {
        const results = [];
        for (const url of urls) {
            try {
                const result = await this.scrapePage(url, options);
                results.push(result);
                // Add delay between requests to be respectful
                if (this.options.delay && urls.indexOf(url) < urls.length - 1) {
                    await this.delay(this.options.delay);
                }
            }
            catch (error) {
                console.error(`Failed to scrape ${url}:`, error);
                // Continue with other URLs even if one fails
            }
        }
        return results;
    }
    /**
     * Scrape a website and follow links to find related content
     */
    async scrapeWebsite(baseUrl, options = {}) {
        const { maxPages = 10, followInternalLinks = true, allowedDomains = [], excludePatterns = [], ...scrapingOptions } = options;
        const visited = new Set();
        const toVisit = [baseUrl];
        const results = [];
        while (toVisit.length > 0 && results.length < maxPages) {
            const url = toVisit.shift();
            if (visited.has(url))
                continue;
            visited.add(url);
            try {
                const content = await this.scrapePage(url, scrapingOptions);
                results.push(content);
                // Find new links to visit
                if (followInternalLinks && results.length < maxPages) {
                    const newLinks = this.findInternalLinks(content.metadata.links, baseUrl, allowedDomains, excludePatterns);
                    for (const link of newLinks) {
                        if (!visited.has(link) && !toVisit.includes(link)) {
                            toVisit.push(link);
                        }
                    }
                }
                // Add delay between requests
                if (this.options.delay) {
                    await this.delay(this.options.delay);
                }
            }
            catch (error) {
                console.error(`Failed to scrape ${url}:`, error);
            }
        }
        return results;
    }
    /**
     * Extract specific data from a webpage using CSS selectors
     */
    async extractData(url, selectors) {
        const content = await this.scrapePage(url);
        const $ = cheerio.load(content.content);
        const extracted = {};
        for (const [key, selector] of Object.entries(selectors)) {
            const elements = $(selector);
            extracted[key] = elements.map((_, el) => $(el).text().trim()).get();
        }
        return extracted;
    }
    /**
     * Scrape RSS feeds
     */
    async scrapeRSS(rssUrl) {
        const response = await this.makeRequest(rssUrl, this.options);
        const $ = cheerio.load(response.data, { xmlMode: true });
        const items = [];
        $('item').each((_, element) => {
            const $item = $(element);
            items.push({
                title: $item.find('title').text().trim(),
                description: $item.find('description').text().trim(),
                link: $item.find('link').text().trim(),
                pubDate: $item.find('pubDate').text().trim(),
                author: $item.find('author').text().trim() || undefined,
            });
        });
        return items;
    }
    /**
     * Scrape JSON APIs
     */
    async scrapeAPI(url, options = {}) {
        const mergedOptions = { ...this.options, ...options };
        const response = await this.makeRequest(url, mergedOptions);
        return response.data;
    }
    // Private helper methods
    async makeRequest(url, options) {
        let lastError;
        for (let attempt = 1; attempt <= options.maxRetries; attempt++) {
            try {
                const response = await axios.get(url, {
                    timeout: options.timeout,
                    headers: options.headers,
                    maxRedirects: options.followRedirects ? 5 : 0,
                });
                return response;
            }
            catch (error) {
                lastError = error;
                if (attempt < options.maxRetries) {
                    console.log(`Retry ${attempt}/${options.maxRetries} for ${url}`);
                    await this.delay(1000 * attempt); // Exponential backoff
                }
            }
        }
        throw lastError;
    }
    extractTitle($) {
        return $('title').text().trim() ||
            $('h1').first().text().trim() ||
            $('meta[property="og:title"]').attr('content') ||
            '';
    }
    extractText($) {
        // Remove script and style elements
        $('script, style, nav, footer, header, aside').remove();
        // Get text from body or main content area
        const text = $('body').text() || $('main').text() || $('article').text();
        // Clean up whitespace
        return text.replace(/\s+/g, ' ').trim();
    }
    extractDescription($) {
        return $('meta[name="description"]').attr('content') ||
            $('meta[property="og:description"]').attr('content') ||
            '';
    }
    extractKeywords($) {
        const keywords = $('meta[name="keywords"]').attr('content');
        return keywords ? keywords.split(',').map(k => k.trim()) : [];
    }
    extractAuthor($) {
        return $('meta[name="author"]').attr('content') ||
            $('meta[property="article:author"]').attr('content') ||
            '';
    }
    extractDate($) {
        return $('meta[property="article:published_time"]').attr('content') ||
            $('meta[name="date"]').attr('content') ||
            '';
    }
    extractLanguage($) {
        return $('html').attr('lang') ||
            $('meta[http-equiv="content-language"]').attr('content') ||
            'en';
    }
    extractLinks($, baseUrl) {
        const links = [];
        $('a[href]').each((_, element) => {
            const href = $(element).attr('href');
            if (href) {
                try {
                    const absoluteUrl = new URL(href, baseUrl).href;
                    links.push(absoluteUrl);
                }
                catch {
                    // Skip invalid URLs
                }
            }
        });
        return [...new Set(links)]; // Remove duplicates
    }
    extractImages($, baseUrl) {
        const images = [];
        $('img[src]').each((_, element) => {
            const src = $(element).attr('src');
            if (src) {
                try {
                    const absoluteUrl = new URL(src, baseUrl).href;
                    images.push(absoluteUrl);
                }
                catch {
                    // Skip invalid URLs
                }
            }
        });
        return [...new Set(images)]; // Remove duplicates
    }
    countWords(text) {
        return text.split(/\s+/).filter(word => word.length > 0).length;
    }
    cleanHtml($) {
        // Remove common unwanted elements
        $('script, style, noscript, iframe, embed, object').remove();
        // Remove elements with common ad/spam classes
        $('[class*="ad"], [class*="spam"], [class*="banner"], [id*="ad"], [id*="spam"]').remove();
        // Remove empty elements
        $('p, div, span').each((_, element) => {
            if ($(element).text().trim() === '') {
                $(element).remove();
            }
        });
    }
    findInternalLinks(links, baseUrl, allowedDomains, excludePatterns) {
        const baseDomain = new URL(baseUrl).hostname;
        return links.filter(link => {
            try {
                const url = new URL(link);
                // Check if it's an internal link
                const isInternal = url.hostname === baseDomain ||
                    allowedDomains.includes(url.hostname);
                // Check if it should be excluded
                const isExcluded = excludePatterns.some(pattern => link.includes(pattern) || url.pathname.includes(pattern));
                return isInternal && !isExcluded;
            }
            catch {
                return false;
            }
        });
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
// Export convenience functions
export const scrapePage = (url, options) => {
    const scraper = new WebScraper();
    return scraper.scrapePage(url, options);
};
export const scrapePages = (urls, options) => {
    const scraper = new WebScraper();
    return scraper.scrapePages(urls, options);
};
export const scrapeWebsite = (baseUrl, options) => {
    const scraper = new WebScraper();
    return scraper.scrapeWebsite(baseUrl, options);
};
export const extractData = (url, selectors) => {
    const scraper = new WebScraper();
    return scraper.extractData(url, selectors);
};
export const scrapeRSS = (rssUrl) => {
    const scraper = new WebScraper();
    return scraper.scrapeRSS(rssUrl);
};
export const scrapeAPI = (url, options) => {
    const scraper = new WebScraper();
    return scraper.scrapeAPI(url, options);
};
