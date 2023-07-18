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
