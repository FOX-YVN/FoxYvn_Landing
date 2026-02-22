// Load Umami analytics dynamically if configured
export function initAnalytics() {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

  if (endpoint && websiteId) {
    const baseUrl = endpoint.endsWith("/") ? endpoint.slice(0, -1) : endpoint;
    const script = document.createElement('script');
    script.defer = true;
    script.src = `${baseUrl}/umami`;
    script.setAttribute('data-website-id', websiteId);
    document.head.appendChild(script);
  }
}
