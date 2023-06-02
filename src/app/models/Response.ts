import { Person } from "./Person";
import { Planet } from "./Planet";

export interface PeopleApiResponse {
    count: number;
    results: Person[];
}

export interface PlanetApiResponse {
    count: number;
    results: Planet[];
}