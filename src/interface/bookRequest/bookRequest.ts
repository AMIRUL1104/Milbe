import { BookRequest } from "./checkRequest";
import { ApiResponse } from "@/interface/apiResponse";

export type BookRequestResponse = ApiResponse<BookRequest[]>;

export type BookRequestUpdateResponse = ApiResponse<null>;