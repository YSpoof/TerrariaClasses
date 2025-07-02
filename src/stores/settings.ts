import { useLocalStorage } from "@vueuse/core";

export const gameStage = useLocalStorage("gameStage", 0);
export const playerClass = useLocalStorage("playerClass", 0);
