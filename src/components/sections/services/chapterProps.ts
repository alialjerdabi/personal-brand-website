import type { ServiceDetail } from "@/data/services";

/** Shared prop shape for every chapter component. */
export interface ChapterProps {
  service: ServiceDetail;
  index: number;
  scopeLabel: string;
  assetLabel: string;
}
