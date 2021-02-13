// https://locationiq.com/docs#search-forward-geocoding
export interface LocationResponse {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[]; // [ min lat, max lat, min lon, max lon ]
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
}
