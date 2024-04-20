export type MediaType = "image" | "video" | "audio";

export const NasaMediaApi = {
  baseUrl: "https://images-api.nasa.gov",
  search(query: string, type?: MediaType) {
    const urlParams = new URLSearchParams({
      q: query,
    });

    if (type) {
      urlParams.append("media_type", type);
    }
    return fetch(`${this.baseUrl}/search?${urlParams.toString()}`).then(
      (resp) => resp.json(),
    );
  },
};
