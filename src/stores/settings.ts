import { useLocalStorage } from "@vueuse/core";

export const calamityGameStage = useLocalStorage("calamityGameStage", 0);
export const calamityPlayerClass = useLocalStorage("calamityPlayerClass", 0);

export const thoriumGameStage = useLocalStorage("thoriumGameStage", 0);
export const thoriumPlayerClass = useLocalStorage("thoriumPlayerClass", 0);

export const vanillaGameStage = useLocalStorage("vanillaGameStage", 0);
export const vanillaPlayerClass = useLocalStorage("vanillaPlayerClass", 0);
