import {ApodApi, ApodApiResult} from "../../services/apod.api";
import {addDays, format} from "date-fns";
import {useEffect, useReducer} from "react";

export interface ApodState {
  list: ApodApiResult[] | undefined;
  displayedApod: ApodApiResult | undefined;
}

export interface ApodStateAction {
  payload: Partial<ApodState>;
  type: 'setList' | 'setDisplayedApod';
}
function reducer(state: ApodState, action: ApodStateAction) {
  switch (action.type) {
    case "setDisplayedApod":
      return {
        ...state,
        ...action.payload
      }
    case "setList":
      return {
        ...state,
        list: action.payload.list
      }
  }
}

export function Apod () {
  const [state, setState]  = useReducer(reducer, {
    list: [],
    displayedApod: undefined
  })

  useEffect(() => {
    ApodApi.load({
      start_date:format(addDays(new Date(), -7), "yyyy-MM-dd"),
    }).then(apods => {
      setState({
        type: 'setList',
        payload: {
          list: apods
        }
      })
    })
  }, []);


  return (
    <div>{state.list.length}</div>
  )
}
