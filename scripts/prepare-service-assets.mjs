import fs from "fs";
import path from "path";

const ROOT = path.resolve("public/assets");
const SERVICES_SRC = path.join(ROOT, "services");
const PROJECTS_OUT = path.join(ROOT, "projects");
const GALLERIES_OUT = path.join(ROOT, "galleries");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG"]);
const VIDEO_EXT = new Set([".mp4", ".MP4"]);
const SKIP_FILES = new Set([".DS_Store", "Thumbs.db"]);
const MAX_VIDEO_BYTES = 95 * 1024 * 1024;

/** Canonical display order — keep in sync with constants/service-order.ts */
const SERVICE_FOLDER_ORDER = [
  "Eyewear & Optical Retail",
  "Luxury Jewellery",
  "Footwear Stores",
  "Mobile & Electronics",
  "Fashion & Apparel",
  "Gift & Toy Stores",
  "Beauty & Cosmetics",
  "Watch & Lifestyle",
];

function sortServiceFolders(folders) {
  const rank = new Map(SERVICE_FOLDER_ORDER.map((name, i) => [name, i]));
  return [...folders].sort(
    (a, b) => (rank.get(a) ?? Number.MAX_SAFE_INTEGER) - (rank.get(b) ?? Number.MAX_SAFE_INTEGER)
  );
}

/** Optional slug overrides for stable URLs */
const PROJECT_SLUG_OVERRIDES = {
  "NAGPAL OPTICIANS, RUDARPUR": "nagpal-opticians-rudarpur",
  "NETHRA OPTICALS, Visakhapatnam": "nethra-opticals-visakhapatnam",
  "OPTICAL WORLD, BANGALORE": "optical-world-bangalore",
  "OPTISCH, BANGALORE": "optisch-bangalore",
  "OPTORIUM, HYDERABAD": "optorium-hyderabad",
  "THE OPTIKA, GURGAON": "the-optika-gurgaon",
  "aretto shoe": "aretto-shoe",
  "world of watch": "world-of-watch",
  "The Silver Studio": "the-silver-studio",
  "Tilakdhari Jewellers": "tilakdhari-jewellers",
  "the bear house": "the-bear-house",
  "nasher miles": "nasher-miles",
};

const PROJECT_TITLE_OVERRIDES = {
  ID: "ID",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(text) {
  return text
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function parseProjectMeta(folderName) {
  const commaIdx = folderName.lastIndexOf(",");
  if (commaIdx !== -1) {
    const title = folderName.slice(0, commaIdx).trim();
    const location = folderName.slice(commaIdx + 1).trim();
    return { title: titleCase(title), location: titleCase(location) };
  }
  return { title: titleCase(folderName), location: undefined };
}

/** Real project photos first; AI/mock filenames last. */
function sortGalleryFiles(files) {
  return [...files].sort((a, b) => {
    const score = (name) => {
      const lower = name.toLowerCase();
      if (lower.includes("chatgpt") || lower.includes("mock") || lower.includes("placeholder")) return 2;
      if (lower.includes("whatsapp")) return 0;
      return 1;
    };
    const diff = score(a) - score(b);
    return diff !== 0 ? diff : a.localeCompare(b);
  });
}

function listMedia(dir) {
  if (!fs.existsSync(dir)) return { images: [], videos: [] };
  const images = [];
  const videos = [];
  for (const file of fs.readdirSync(dir)) {
    if (SKIP_FILES.has(file)) continue;
    const ext = path.extname(file);
    const full = path.join(dir, file);
    if (!fs.statSync(full).isFile()) continue;
    if (IMAGE_EXT.has(ext)) images.push(file);
    if (VIDEO_EXT.has(ext)) {
      const size = fs.statSync(full).size;
      if (size > MAX_VIDEO_BYTES) {
        console.warn(`  ⚠ Skipping oversized video (${(size / 1024 / 1024).toFixed(1)} MB): ${file}`);
        continue;
      }
      videos.push(file);
    }
  }
  images.sort();
  videos.sort();
  return { images, videos };
}

function copyRenamed(srcDir, destDir, files, prefix, urlBase) {
  fs.mkdirSync(destDir, { recursive: true });
  const urls = [];
  files.forEach((file, i) => {
    const ext = path.extname(file).toLowerCase() || ".jpg";
    const destName = `${prefix}-${String(i + 1).padStart(2, "0")}${ext}`;
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, destName));
    urls.push(`${urlBase}/${destName}`);
  });
  return urls;
}

function ensureCleanDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
  fs.mkdirSync(dir, { recursive: true });
}

const services = [];
const projects = [];
const galleries = [];

if (fs.existsSync(PROJECTS_OUT)) fs.rmSync(PROJECTS_OUT, { recursive: true });
if (fs.existsSync(GALLERIES_OUT)) fs.rmSync(GALLERIES_OUT, { recursive: true });
fs.mkdirSync(PROJECTS_OUT, { recursive: true });
fs.mkdirSync(GALLERIES_OUT, { recursive: true });

const serviceFolders = sortServiceFolders(
  fs
    .readdirSync(SERVICES_SRC, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
);

for (const serviceFolder of serviceFolders) {
  const serviceSlug = slugify(serviceFolder);
  const serviceDir = path.join(SERVICES_SRC, serviceFolder);
  const entries = fs.readdirSync(serviceDir, { withFileTypes: true });
  const subdirs = entries.filter((e) => e.isDirectory());
  const flatImages = sortGalleryFiles(
    entries
      .filter((e) => e.isFile() && IMAGE_EXT.has(path.extname(e.name)) && !SKIP_FILES.has(e.name))
      .map((e) => e.name)
  );

  const serviceProjects = [];
  let serviceGallery = null;

  if (subdirs.length > 0) {
    for (const sub of subdirs) {
      const folderName = sub.name;
      const srcDir = path.join(serviceDir, folderName);
      const { images, videos } = listMedia(srcDir);
      if (images.length === 0) {
        console.warn(`No images for ${serviceFolder} / ${folderName}`);
        continue;
      }

      const slug = PROJECT_SLUG_OVERRIDES[folderName] ?? slugify(folderName);
      const meta = parseProjectMeta(folderName);
      if (PROJECT_TITLE_OVERRIDES[folderName]) meta.title = PROJECT_TITLE_OVERRIDES[folderName];
      const destDir = path.join(PROJECTS_OUT, slug);
      ensureCleanDir(destDir);

      const urlBase = `/assets/projects/${slug}`;
      const imageUrls = copyRenamed(srcDir, destDir, images, slug, urlBase);
      const videoUrls = videos.length
        ? copyRenamed(srcDir, destDir, videos, `${slug}-video`, urlBase)
        : [];

      const project = {
        serviceSlug,
        slug,
        title: meta.title,
        location: meta.location,
        coverImage: imageUrls[0],
        galleryImages: imageUrls,
        galleryVideos: videoUrls,
      };

      projects.push(project);
      serviceProjects.push(project);
      console.log(`✓ ${serviceFolder} / ${meta.title}: ${imageUrls.length} images, ${videoUrls.length} videos`);
    }
  }

  if (flatImages.length > 0) {
    const destDir = path.join(GALLERIES_OUT, serviceSlug);
    ensureCleanDir(destDir);
    const urlBase = `/assets/galleries/${serviceSlug}`;
    const imageUrls = copyRenamed(serviceDir, destDir, flatImages, serviceSlug, urlBase);

    serviceGallery = {
      serviceSlug,
      coverImage: imageUrls[0],
      galleryImages: imageUrls,
    };
    galleries.push(serviceGallery);
    console.log(`✓ ${serviceFolder} gallery: ${imageUrls.length} images`);
  }

  services.push({
    slug: serviceSlug,
    title: serviceFolder,
    coverImage:
      serviceProjects[0]?.coverImage ?? serviceGallery?.coverImage ?? "",
    projectCount: serviceProjects.length,
    galleryCount: serviceGallery?.galleryImages.length ?? 0,
  });
}

const outFile = path.resolve("constants/service-assets.generated.ts");
const content = `// Auto-generated by scripts/prepare-service-assets.mjs — do not edit manually

export type GeneratedServiceProject = {
  serviceSlug: string;
  slug: string;
  title: string;
  location?: string;
  coverImage: string;
  galleryImages: string[];
  galleryVideos: string[];
};

export type GeneratedServiceGallery = {
  serviceSlug: string;
  coverImage: string;
  galleryImages: string[];
};

export type GeneratedService = {
  slug: string;
  title: string;
  coverImage: string;
  projectCount: number;
  galleryCount: number;
};

export const SERVICES: GeneratedService[] = ${JSON.stringify(services, null, 2)};

export const SERVICE_PROJECTS: GeneratedServiceProject[] = ${JSON.stringify(projects, null, 2)};

export const SERVICE_GALLERIES: GeneratedServiceGallery[] = ${JSON.stringify(galleries, null, 2)};

export function getProjectsForService(serviceSlug: string): GeneratedServiceProject[] {
  return SERVICE_PROJECTS.filter((p) => p.serviceSlug === serviceSlug);
}

export function getGalleryForService(serviceSlug: string): GeneratedServiceGallery | undefined {
  return SERVICE_GALLERIES.find((g) => g.serviceSlug === serviceSlug);
}
`;

fs.writeFileSync(outFile, content);
console.log(`\nWrote ${outFile}`);
console.log(`  ${services.length} services, ${projects.length} projects, ${galleries.length} galleries`);
