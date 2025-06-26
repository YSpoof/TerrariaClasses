import { ofetch } from "ofetch";
import type { GameStage } from "./types";
import { ref } from "vue";
export const data = ref<GameStage[]>([]);

export const noArmorIcon = "classamity/no-armor.png";
export const baseIconUrl = "https://kokasmark.github.io/";
const dataFileUrl =
  "https://raw.githubusercontent.com/kokasmark/classamity/refs/heads/main/src/data.json";

export const loadData = async () => {
  try {
    const response = await ofetch<GameStage[]>(dataFileUrl, {
      parseResponse: JSON.parse,
    });
    data.value = response;
  } catch (error: any) {
    alert(error.data || "Failed to load data");
    console.error("Failed to load data:", error);
    throw error;
  }
};
