const dev = process.env.NODE_ENV !== "production";

export const jwt_secret = "ijwtkey";

export const server = dev
  ? "http://localhost:3000"
  : "https://next-intro.vercel.app";
