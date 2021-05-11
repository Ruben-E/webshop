import { useRemote } from "../remote/remote.hook";

export const useRemoteGet = <T>(urlOrRequest: RequestInfo) =>
  useRemote<T>(urlOrRequest, [
    typeof urlOrRequest === "string" ? urlOrRequest : urlOrRequest.url,
  ]);
