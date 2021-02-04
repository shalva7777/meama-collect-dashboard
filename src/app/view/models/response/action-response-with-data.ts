import {ActionResponse} from "./action-response";

export class ActionResponseWithData<T> extends ActionResponse {
  constructor() {
    super();
  }

  public data: T;
}
