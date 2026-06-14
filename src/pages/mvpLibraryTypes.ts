import type { SummarySection } from '../components/Summary/Summary';

export interface MVPSavedDoodleSession {
  id: number;
  lastSessionDate: Date;
  activityName: string;
  sections: SummarySection[];
}
