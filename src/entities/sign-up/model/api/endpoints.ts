import { api } from "@/shared/api";
import {
  DictionaryItem,
  District,
  Organization,
  RegisterPayload,
  RegisterResponse,
} from "../types";

export const getRegions = async (): Promise<DictionaryItem[]> => {
  const { data } = await api.get("/dictionaries/regions");
  return data;
};

export const getDistricts = async (regionId: number): Promise<District[]> => {
  const { data } = await api.get("/dictionaries/districts", {
    params: { regionId },
  });
  return data;
};

export const getOrganizationTypes = async (): Promise<DictionaryItem[]> => {
  const { data } = await api.get("/dictionaries/organization-types");
  return data;
};

export const getOrganizations = async (params: {
  districtId: number;
  organizationTypeId: number;
}): Promise<Organization[]> => {
  const { data } = await api.get("/dictionaries/organizations", { params });
  return data;
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>("/auth/register", payload);
  return data;
};
