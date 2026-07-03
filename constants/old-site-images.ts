const BASE = "https://www.avrretail.com";

export function oldImage(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${normalized}`;
}

export const OLD_SITE_IMAGES = {
  hero: {
    banner1: oldImage("/assets/image/banner/banner-1.jpg"),
    banner2: oldImage("/assets/image/banner/banner-2.jpg"),
    banner3: oldImage("/assets/image/banner/banner-3.jpg"),
    video: oldImage("/assets/video/video11.mp4"),
  },
  about: {
    banner: oldImage("/assets/images/about-banner.jpg"),
    mission: oldImage("/assets/images/mission.jpg"),
  },
  services: {
    banner: oldImage("/assets/images/service-banner.jpg"),
    retailInterior: oldImage("/assets/images/retail-stores-interior-design.png"),
    port1: oldImage("/assets/images/port1.jpg"),
    porte1: oldImage("/assets/images/porte1.jpg"),
    porte2: oldImage("/assets/images/porte2.jpg"),
    porte3: oldImage("/assets/images/porte3.jpg"),
  },
  categories: {
    optical: oldImage("/AvrRetailImages/CategoryImages/opticalsthe-fan-studio.jpg"),
    jewellery: oldImage("/AvrRetailImages/CategoryImages/jewellery-showroomthe-fan-studio.jpg"),
    shoe: oldImage("/AvrRetailImages/CategoryImages/shoe-showroomthe-fan-studio.jpg"),
    mobile: oldImage("/AvrRetailImages/CategoryImages/mobile-showroomthe-fan-studio.jpg"),
  },
  team: {
    ramesh: "/assets/team/Ramesh-Jangir-Founder-and-CEO.png",
    sharmila: "/assets/team/Sharmila-Director.png",
    yashpal: "/assets/team/Yashpal.png",
    satish: "/assets/team/Satish.png",
    yogender: "/assets/team/Yogender.png",
    yogesh: "/assets/team/Yogesh.png",
  },
  clients: [
    { name: "Reddy Opticals", src: oldImage("/assets/images/client/Reddy-Opticals.jpg") },
    { name: "Optical Palace", src: oldImage("/assets/images/client/Optical-place.jpg") },
    { name: "Luxottica", src: oldImage("/assets/images/client/Luxottica.jpg") },
    { name: "Ray-Ban", src: oldImage("/assets/images/client/Ray-ban.jpg") },
    { name: "Safilo", src: oldImage("/assets/images/client/Safilo.jpg") },
    { name: "Titan Eyewear", src: oldImage("/assets/images/client/Titan-Eyewear.jpg") },
    { name: "Hardev Opticals", src: oldImage("/assets/images/client/Hardev-Opticals.jpg") },
    { name: "See More Optical", src: oldImage("/assets/images/client/See-More-Optical.jpg") },
    { name: "Wizopt", src: oldImage("/assets/images/client/Wizopt.jpg") },
    { name: "Vivo", src: oldImage("/assets/images/client/Vivo.jpg") },
    { name: "Cashify", src: oldImage("/assets/images/client/Cashifye.jpg") },
    { name: "Agarwal", src: oldImage("/assets/images/client/agarwal.jpg") },
  ],
  gallery: {
    ajantaOptical: {
      cover: oldImage("/AvrRetailImages/GalleryImage/ajanta-optical-avr-retail.jpg"),
      photos: [
        "portfolio-image-1-ajanta-optical.jpg",
        "portfolio-image-2-ajanta-optical.jpg",
        "portfolio-image-3-ajanta-optical.jpg",
        "portfolio-image-4-ajanta-optical.jpg",
        "portfolio-image-5-ajanta-optical.jpg",
      ].map((f) => oldImage(`/AvrRetailImages/GalleryImage/${f}`)),
    },
    asianOptical: {
      cover: oldImage("/AvrRetailImages/GalleryImage/asian-avr-retail.jpg"),
      photos: [
        "portfolio-image-12-asian.jpg",
        "portfolio-image-13-asian.jpg",
        "portfolio-image-14-asian.jpg",
        "portfolio-image-15-asian.jpg",
        "portfolio-image-16-asian.jpg",
        "portfolio-image-17-asian.jpg",
      ].map((f) => oldImage(`/AvrRetailImages/GalleryImage/${f}`)),
    },
    betterVision: {
      cover: oldImage("/AvrRetailImages/GalleryImage/butter-vision-avr-retail.jpg"),
      photos: [
        "portfolio-image-6-better-vision.jpg",
        "portfolio-image-7-better-vision.jpg",
        "portfolio-image-8-better-vision.jpg",
        "portfolio-image-9-better-vision.jpg",
        "portfolio-image-57-better-vision.jpg",
      ].map((f) => oldImage(`/AvrRetailImages/GalleryImage/${f}`)),
    },
    daulatOptical: {
      cover: oldImage("/AvrRetailImages/GalleryImage/daulat-optical-avr-retail.jpg"),
      photos: [
        "portfolio-image-19-daulat-optical.jpg",
        "portfolio-image-20-daulat-optical.jpg",
        "portfolio-image-22-daulat-optical.jpg",
        "portfolio-image-23-daulat-optical.jpg",
      ].map((f) => oldImage(`/AvrRetailImages/GalleryImage/${f}`)),
    },
    extraVision: {
      cover: oldImage("/AvrRetailImages/GalleryImage/extra-vision-avr-retail.jpg"),
      photos: [
        "portfolio-image-24-extra-vision.jpg",
        "portfolio-image-25-extra-vision.jpg",
        "portfolio-image-26-extra-vision.jpg",
        "portfolio-image-178-extra-vision.jpg",
      ].map((f) => oldImage(`/AvrRetailImages/GalleryImage/${f}`)),
    },
    guptaEyeCareSirsa: {
      cover: oldImage("/AvrRetailImages/GalleryImage/gupta-eye-care-sirsa-avr-retail.jpg"),
      photos: [
        "portfolio-image-27-gupta-eye-care-sirsa.jpg",
        "portfolio-image-28-gupta-eye-care-sirsa.jpg",
        "portfolio-image-29-gupta-eye-care-sirsa.jpg",
        "portfolio-image-33-gupta-eye-care-sirsa.jpg",
      ].map((f) => oldImage(`/AvrRetailImages/GalleryImage/${f}`)),
    },
  },
} as const;
