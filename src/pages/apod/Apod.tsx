import { ApodApi, ApodApiResult } from "../../services/apod.api";
import { addDays, format } from "date-fns";
import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";

export interface ApodProps {
  list: ApodApiResult[];
}

export interface ApodState {
  list: ApodApiResult[] | undefined;
  displayedApod: ApodApiResult | undefined;
  currentWeekRange: number;
}

export interface ApodStateAction {
  payload: Partial<ApodState>;
  type: "setApods" | "setWeekRange" | "addApods";
}

function getWeekRange(weekRange: number = 1) {
  const from = addDays(new Date(), -6 * weekRange);
  return {
    from: from,
    to: addDays(from, 6),
  };
}

function reducer(state: ApodState, action: ApodStateAction): ApodState {
  switch (action.type) {
    case "setApods":
      return {
        ...state,
        list: action.payload.list,
        displayedApod: action.payload.displayedApod,
      };
    case "addApods":
      return {
        ...state,
        list: [...state.list!, ...action.payload.list!],
        currentWeekRange: action.payload.currentWeekRange!,
      };
    case "setWeekRange":
      return {
        ...state,
        currentWeekRange: action.payload.currentWeekRange!,
      };
  }
}

export function Apod({ list }: ApodProps) {
  const [state, setState] = useReducer(reducer, {
    list: list || [],
    displayedApod: undefined,
    currentWeekRange: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadApods(getWeekRange(state.currentWeekRange));
  }, []);

  const loadApods = async (range: { from: Date; to: Date }) => {
    const apods = await ApodApi.load({
      start_date: format(range.from, "yyyy-MM-dd"),
      end_date: format(range.to, "yyyy-MM-dd"),
      hd: true,
    });

    const list = apods.reverse();
    setLoading(false);
    setState({
      type: "setApods",
      payload: {
        list: list,
        displayedApod: list[0],
      },
    });
  };

  const renderMedia = (
    media: ApodApiResult | undefined,
    isMiniature: boolean,
  ) => {
    if (!media) {
      return;
    }

    if (media.media_type === "image") {
      return !isMiniature ? (
        <img className="h-full" src={media.url} alt="" />
      ) : (
        <img className="h-full" src={media.url} alt="" />
      );
    } else {
      return (
        <iframe
          className="w-full h-full aspect-video"
          src={media.url}
          allowFullScreen={true}
        ></iframe>
      );
    }
  };

  const handleReadMore = (item: ApodApiResult) => {
    setState({
      type: "setApods",
      payload: {
        displayedApod: item,
        list: state.list,
      },
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const loadMore = async () => {
    const range = getWeekRange(state.currentWeekRange + 1);

    const apods = await ApodApi.load({
      start_date: format(range.from, "yyyy-MM-dd"),
      end_date: format(range.to, "yyyy-MM-dd"),
      hd: true,
    });

    setState({
      type: "addApods",
      payload: {
        list: apods.reverse(),
        currentWeekRange: state.currentWeekRange + 1,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <section className="flex flex-col h-full">
      <div className="flex justify-center flex-1 relative">
        <div className="absolute flex justify-center w-full h-full left-0 top-0">
          <div className="h-full absolute">
            {renderMedia(state.displayedApod, false)}
            <div className="absolute  w-full z-20 bottom-0 left-0 text-gray-400 text-xs p-3 bg-black/50">
              {state.displayedApod?.explanation}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <Button onClick={() => loadMore()}>more</Button>
        {state.list!.map((item, index) => (
          <div
            key={index}
            onClick={() => handleReadMore(item)}
            className={
              "w-[100px] border-4 rounded-lg overflow-hidden " +
              (item.date === state.displayedApod?.date
                ? "border-gray-700"
                : "border-transparent")
            }
          >
            {renderMedia(item, true)}
          </div>
        ))}
      </div>
    </section>
  );
}
