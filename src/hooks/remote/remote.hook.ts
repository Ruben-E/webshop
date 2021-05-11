import { useEffect, useState } from "react";
import { RequestState } from "@webshop/models";

export const useRemote = <T>(urlOrRequest: RequestInfo, deps: any[] = []) => {
  const [requestState, setRequestState] = useState<RequestState<T>>({
    loading: true,
  });

  useEffect(() => {
    setRequestState({
      loading: true,
    });
    fetch(urlOrRequest)
      .then((res) => res.json())
      .then((data) =>
        setRequestState({
          loading: false,
          data,
        })
      )
      .catch((error) =>
        setRequestState({
          loading: false,
          error,
        })
      );
  }, deps);

  return requestState;
};
