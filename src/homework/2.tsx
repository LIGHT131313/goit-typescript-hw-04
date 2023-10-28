import React, { useReducer } from "react";

type RequestStep = "start" | "pending" | "finished" | "idle";

type State = {
  isRequestInProgress: boolean;
  requestStep: RequestStep;
};

type Action =
  | { type: "START_REQUEST" }
  | { type: "PENDING_REQUEST" }
  | { type: "FINISH_REQUEST" }
  | { type: "RESET_REQUEST" };

const initialState: State = {
  isRequestInProgress: false,
  requestStep: "idle",
};

function requestReducer(s: State, a: Action): State {
  switch (a.type) {
    case "START_REQUEST":
      return { ...s, isRequestInProgress: true, requestStep: "start" };
    case "PENDING_REQUEST":
      return { ...s, isRequestInProgress: true, requestStep: "pending" };
    case "FINISH_REQUEST":
      return { ...s, isRequestInProgress: false, requestStep: "finished" };
    case "RESET_REQUEST":
      return { ...s, isRequestInProgress: false, requestStep: "idle" };
    default:
      return s;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(
    requestReducer,
    initialState
  );

  const startRequest = () => {
    requestDispatch({ type: "START_REQUEST" });
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: "PENDING_REQUEST" });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: "FINISH_REQUEST" });
      }, 2000);
    }, 2000);
  };

  const resetRequest = () => {
    requestDispatch({ type: "RESET_REQUEST" });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
