export interface Link {
    id?: string;
    name: string;
    url: string;
    tags: string[];
}

export type Tag = [string, string];

export interface Tile {
    id?: string;
    category: string;
    icon: string;
    link: string;
    name: string;
    priority: number;
}

