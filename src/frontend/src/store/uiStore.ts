import { create } from "zustand";
import { AiModel as AiModelEnum } from "../backend";
import type { AiModel } from "../types";

interface UIState {
  sidebarOpen: boolean;
  activeModel: AiModel;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setActiveModel: (model: AiModel) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeModel: AiModelEnum.gpt4o,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActiveModel: (model) => set({ activeModel: model }),
}));
