import { useState } from "react";
import { Option, Select } from "@material-tailwind/react";
import { RoverCameraType } from "../../../services/mars-rover-photos.api.ts";
import { Calendar } from "../../../components/Calendar.tsx";
import { isFunction } from "lodash-es";

export interface RoverApiFormOutput {
  date: Date;
  camera: RoverCameraType;
}

export function RoverApiForm(props: {
  onFormChange?: (params: RoverApiFormOutput) => void;
  date: Date;
}) {
  const [camera, setCamera] = useState<RoverCameraType>(RoverCameraType.All);
  const [date, setDate] = useState<Date>(props.date);

  const cameraChange = (camera: string | undefined) => {
    setCamera(camera as RoverCameraType);
    if (isFunction(props.onFormChange)) {
      props.onFormChange({ camera: camera as RoverCameraType, date });
    }
  };

  const dateSelect = (date: Date) => {
    setDate(date);
    if (isFunction(props.onFormChange)) {
      props.onFormChange({ camera: camera as RoverCameraType, date });
    }
  };

  const cameraList = (
    <div className="w-72">
      <Select label="Camera View" value={camera} onChange={cameraChange}>
        {Object.keys(RoverCameraType).map((camera) => (
          <Option value={camera} key={camera}>
            {RoverCameraType[camera as keyof typeof RoverCameraType]}
          </Option>
        ))}
      </Select>
    </div>
  );
  return (
    <div className="flex gap-1">
      <div className="min-w-[200px]">
        <Calendar date={date} onSelect={dateSelect} />
      </div>
      {cameraList}
    </div>
  );
}
