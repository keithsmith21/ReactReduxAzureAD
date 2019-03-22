const requestWeatherForecastsType = "REQUEST_WEATHER_FORECASTS";
const receiveWeatherForecastsType = "RECEIVE_WEATHER_FORECASTS";
const initialState = { forecasts: [], isLoading: false };

export const actionCreators = {
  requestWeatherForecasts: startDateIndex => async (dispatch, getState) => {
    if (startDateIndex === getState().weatherForecasts.startDateIndex) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    const { oidc } = getState();

    dispatch({ type: requestWeatherForecastsType, startDateIndex });

    const url = `api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${oidc.user.access_token}`
      }
    };

    const response = await fetch(url, options);
    const forecasts = await response.json();

    dispatch({ type: receiveWeatherForecastsType, startDateIndex, forecasts });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestWeatherForecastsType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      isLoading: true
    };
  }

  if (action.type === receiveWeatherForecastsType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      forecasts: action.forecasts,
      isLoading: false
    };
  }

  return state;
};
