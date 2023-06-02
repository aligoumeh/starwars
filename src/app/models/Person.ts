export interface Person {
    id: string;
    name: string;
    gender: string;
    birth_year: string;
    url?: string;
    home_world_url?: string;
}

export interface StarWarspecies extends Person {
    home_name: string;
    population: string;
    rotation_period: string;
}