import { API_KEY } from "../config";

export interface ApodApiParam {
  date?: string;
  start_date?: string;
  end_date?: string;
  count?: number;
  thumbs?: boolean;
  hd?: boolean;
}

export interface ApodApiResult {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
}
export const ApodApi = {
  baseKey: "https://api.nasa.gov/planetary/apod",

  load(params: ApodApiParam): Promise<ApodApiResult[]> {
    const urlParams = new URLSearchParams(params as URLSearchParams);
    return fetch(
      `${this.baseKey}?api_key=${API_KEY}&${urlParams.toString()}`,
    ).then((resp) => resp.json());
  },
};
