import { create } from "apisauce";

export const api = create({
  baseURL: "http://www.adoredieu.com/mobility",
  headers: { Accept: "application/json" }
});
