import React from 'react';
import { Button } from '../components/Button/Button';
import { Chip } from '../components/Chip/Chip';
import { ImageDisplay } from '../components/ImageDisplay/ImageDisplay';
import { IconOpenExternal } from '../icons';
import { MVPHeader } from './MVPHeader';
import { formatMVPSessionDate } from './mvpLibraryData';
import type { MVPSavedDoodleSession } from './mvpLibraryTypes';
import './Prototype.css';
import './MVP.css';
import './MVPDoodleLibrary.css';

export interface MVPDoodleLibraryProps {
  sessions: MVPSavedDoodleSession[];
  onBack: () => void;
  onOpenNewDoodle: () => void;
  onOpenSession: (session: MVPSavedDoodleSession) => void;
}

export const MVPDoodleLibrary: React.FC<MVPDoodleLibraryProps> = ({
  sessions,
  onBack,
  onOpenNewDoodle,
  onOpenSession,
}) => {
  return (
    <div className="doodler-mvp-library">
      <MVPHeader
        onBack={onBack}
        onOpenNewDoodle={onOpenNewDoodle}
        onOpenLibrary={() => {}}
      />
      <div className="doodler-mvp-library__screen">
        {sessions.length === 0 ? (
          <p className="doodler-mvp-library__empty">Nog geen Doodles gemaakt.</p>
        ) : (
          <div className="doodler-mvp-library__sessions">
            {sessions.map((session) => (
            <article key={session.id} className="doodler-mvp-library__session-card">
              <div className="doodler-mvp-library__session-header">
                <div className="doodler-mvp-library__session-meta">
                  <h2 className="doodler-mvp-library__session-title">{session.activityName}</h2>
                  <p className="doodler-mvp-library__session-date">
                    Laatste sessie: {formatMVPSessionDate(session.lastSessionDate)}
                  </p>
                </div>
                <div className="doodler-mvp-library__session-actions">
                  <Button
                    variant="outline"
                    size="small"
                    startIcon={<IconOpenExternal size={16} />}
                    onClick={() => onOpenSession(session)}
                  >
                    Openen
                  </Button>
                </div>
              </div>
              <div className="doodler-mvp-library__preview-row">
                {session.sections.map((section) => (
                  <div key={section.title} className="doodler-mvp-library__section">
                    <div className="doodler-mvp-library__section-chip">
                      <Chip variant="secondary">{section.chip}</Chip>
                    </div>
                    <div className="doodler-mvp-library__image-display doodler-summary__image-display">
                      <ImageDisplay caption={section.caption} cards={section.cards} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
