declare namespace NodeJS {
  interface ProcessEnv {
    PLASMO_PUBLIC_ENV?: "development" | "production";
    PLASMO_GATEWAY_HOST?: string;
  }
}

declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
