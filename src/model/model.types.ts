type RocketImageURL = string;
type Rocket = {
    flickr_images: RocketImageURL[];
    name: string;
    id: string;
};
export type Launch = {
    rocket: Rocket;
    details: string;
    name: string;
    date_unix: number;
    id: string;
};

export type ApiResponse = {
    docs: Launch[];
    totalPages: number;
};

export type ApiParams = {
    page: number;
    sortField?: keyof Launch;
    sortDirection?: 'asc' | 'desc';
};
