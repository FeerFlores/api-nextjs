export interface ProductBlog {
  id: string;
  slug: string;
  title: string;
  description: string;
  img: string;
  github: string;
  shop: string;
  first_steps: string; // PDF Datasheet, etc
  projects: string[]; // Lista de proyectos relacionados con el producto
  part_number: PartNumber;
  basic_info: BasicInfo;
  chapters: Chapter[];
}

export interface PartNumber {
  sku: string;
  ue: string;
}

export interface BasicInfo {
  manual: string | null;
  schematic: string | null;
  pinout: string | null;
  dimensions: string | null;
}

export interface Chapter {
  id: string;
  slug: string;
  title: string;
  content: string; // Markdown
}