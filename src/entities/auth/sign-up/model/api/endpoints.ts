import { api } from "@/shared/api";
import { RegisterPayload } from "../types";
import {
  AuthResponse,
  DictionaryItem,
  District,
  Organization,
} from "@/shared/types";

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
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
};
