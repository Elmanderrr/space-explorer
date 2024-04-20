// const baseUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${key}`;

import {API_KEY} from "../config";

export interface MarsRoverPhotosApiParams {
  earth_date: string;
  camera?: RoverCameraType;
  page: number;
}

export interface RoverPhotoResult {
  img_src: string;
  earth_date: string;
  id: number;
  sol: number;
  rover: {
    id: number;
    landing_date: string;
    launch_date: string;
    max_date: string;
    max_sol: number;
    name: string;
    status: string;
    total_photos: number;
  };
  camera: {
    full_name: string;
    id: number;
    name: string;
    rover_id: number;
  };
}

export enum RoverCameraType {
  All = "All",
  FHAZ = "Front Hazard Avoidance Camera",
  RHAZ = "Rear Hazard Avoidance Camera",
  MAST = "Mast Camera",
  CHEMCAM = "Chemistry and Camera Complex",
  MAHLI = "Mars Hand Lens Imager",
  MARDI = "Mars Descent Imager",
  NAVCAM = "Navigation Camera",
  PANCAM = "Panoramic Camera",
  MINITES = "Miniature Thermal Emission Spectrometer (Mini-TES)",
}

export const MarsRoverPhotosApi = {
  call(
    params: MarsRoverPhotosApiParams,
  ): Promise<{ photos: RoverPhotoResult[] }> {
    const urlParams = new URLSearchParams({
      page: params.page.toString(),
      earth_date: params.earth_date,
    });

    if (params.camera) {
      urlParams.append("camera", params.camera);
    }

    return fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${API_KEY}&${urlParams.toString()}`,
    ).then((resp) => resp.json());
  },
};
