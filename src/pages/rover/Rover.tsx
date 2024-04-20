import React from "react";
import { Spinner } from "@material-tailwind/react";
import {
  MarsRoverPhotosApi,
  RoverCameraType,
  RoverPhotoResult,
} from "../../services/mars-rover-photos.api.ts";
import { RoverPhotosGallery } from "./RoverPhotosGallery.tsx";
import {
  RoverApiForm,
  RoverApiFormOutput,
} from "./rover-api-form-controls/RoverApiForm.tsx";
import { format } from "date-fns";
import { Pagination } from "../../components/Pagination.tsx";
import { NavLink } from "react-router-dom";
import { NasaMediaApi } from "../../services/nasa-media.api.ts";

export interface RoverStateParams {
  photos: RoverPhotoResult[] | undefined;
  sol: number;
  loading: boolean;
  date: Date;
  page: number;
  camera: RoverCameraType;
}

export class Rover extends React.Component<undefined, RoverStateParams> {
  constructor(params: any) {
    super(params);

    this.state = {
      photos: [],
      sol: 4200,
      loading: true,
      page: 1,
      camera: RoverCameraType.All,
      date: new Date(2024, 0, 1),
    };
  }

  componentDidMount() {
    this.loadPhotos();
  }

  render() {
    const renderGallery = () => {
      if (this.state.loading) {
        return (
          <div className="flex justify-center">
            <Spinner className="h-12 w-12" />
          </div>
        );
      }

      if (this.state.photos?.length) {
        return <RoverPhotosGallery photos={this.state.photos} />;
      } else {
        return <div>No data</div>;
      }
    };

    return (
      <section className="flex flex-col h-full">
        <div className="flex items-center">
          <RoverApiForm
            onFormChange={this.onFormChange}
            date={this.state.date}
          />

          <NavLink to={`/favorites`} className="ml-auto text-yellow-900">
            Go To Favorites{" "}
            <i className="fa-solid fa-star text-yellow-900  cursor-pointer"></i>
          </NavLink>
        </div>
        <div className="my-2 flex-1 overflow-auto pr-3">{renderGallery()}</div>
        <div className="flex justify-center">
          <Pagination
            page={this.state.page}
            pageChange={this.pageChange}
          ></Pagination>
        </div>
      </section>
    );
  }

  private loadPhotos() {
    this.setState({
      loading: true,
    });
    MarsRoverPhotosApi.call({
      earth_date: format(this.state.date, "yyyy-MM-dd"),
      camera:
        this.state.camera === RoverCameraType.All
          ? undefined
          : this.state.camera,
      page: this.state.page,
    }).then((photos) => {
      this.setState({ ...photos, loading: false });
    });
  }

  private onFormChange = ({ camera, date }: RoverApiFormOutput) => {
    this.setState(
      {
        date,
        camera,
        page:
          this.state.date !== date || this.state.camera !== camera
            ? 1
            : this.state.page,
      },
      () => {
        this.loadPhotos();
      },
    );
  };

  private pageChange = (page: number) => {
    this.setState(
      {
        page,
      },
      () => {
        this.loadPhotos();
      },
    );
  };
}
