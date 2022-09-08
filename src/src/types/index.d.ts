export {};

declare global {
  interface Window {
    gtag: any; // 👈️ turn off type checking
  }
}