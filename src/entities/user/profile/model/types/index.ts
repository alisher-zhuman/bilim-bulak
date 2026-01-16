import { DictionaryItem, District, Organization } from "@/shared/types";

export interface ProfileResponse {
  id: number;
  phone: string;
  region: DictionaryItem;
  district: District;
  organizationType: DictionaryItem;
  organization: Organization;
}
