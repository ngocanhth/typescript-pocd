export interface Category {
    uuid: string;
    name: string;
    slug: string;
    image_url: string,
    parent_category: string | null
}
  