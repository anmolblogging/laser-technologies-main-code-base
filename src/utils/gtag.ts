export const pageview = (url: string) => {
  window.gtag('config', 'AW-10959457755', {
    page_path: url,
  });
};