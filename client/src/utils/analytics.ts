// Load Umami analytics dynamically if configured
export function initAnalytics() {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

  if (endpoint && websiteId) {
    const script = document.createElement('script');
    script.defer = true;
    script.src = `${endpoint}/umami`;
    script.setAttribute('data-website-id', websiteId);
    document.head.appendChild(script);
  }
}
