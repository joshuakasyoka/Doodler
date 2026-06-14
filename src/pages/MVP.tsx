import React, { useRef, useState } from 'react';
import { LoadingOverlay } from '../components/LoadingOverlay/LoadingOverlay';
import { MVPNewContactModal } from './MVPNewContactModal';
import { MVPDoodleFlow } from './MVPDoodleFlow';
import { MVPDoodleLibrary } from './MVPDoodleLibrary';
import { MVPHeader } from './MVPHeader';
import type { SummarySection } from '../components/Summary/Summary';
import type { MVPSavedDoodleSession } from './mvpLibraryTypes';
import './MVP.css';

export interface MVPProps {
  onBack?: () => void;
}

export const MVP: React.FC<MVPProps> = ({ onBack }) => {
  const [showFlow, setShowFlow] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [flowSessionKey, setFlowSessionKey] = useState(0);
  const [librarySessions, setLibrarySessions] = useState<MVPSavedDoodleSession[]>([]);
  const [activeSession, setActiveSession] = useState<MVPSavedDoodleSession | undefined>();
  const currentSessionIdRef = useRef<number | null>(null);
  const currentActivityNameRef = useRef<string>('Adviesgesprek');

  const handleConfirmDoodle = (selectedActivity?: string) => {
    currentActivityNameRef.current = selectedActivity || 'Adviesgesprek';
    setActiveSession(undefined);
    setIsModalOpen(false);
    setIsGenerating(true);
    window.setTimeout(() => {
      setIsGenerating(false);
      setShowFlow(true);
      setShowLibrary(false);
      currentSessionIdRef.current = null;
      setFlowSessionKey((key) => key + 1);
    }, 1500);
  };

  const handleBackToEntry = () => {
    setShowFlow(false);
    setShowLibrary(false);
    setIsGenerating(false);
    setActiveSession(undefined);
    setIsModalOpen(true);
  };

  const handleOpenSession = (session: MVPSavedDoodleSession) => {
    currentSessionIdRef.current = session.id;
    currentActivityNameRef.current = session.activityName;
    setActiveSession(session);
    setShowLibrary(false);
    setShowFlow(true);
    setFlowSessionKey((key) => key + 1);
  };

  const handleSaveSession = (sections: SummarySection[]) => {
    setLibrarySessions((prev) => {
      const sessionId =
        currentSessionIdRef.current ?? Math.max(0, ...prev.map((item) => item.id)) + 1;
      currentSessionIdRef.current = sessionId;

      const savedSession: MVPSavedDoodleSession = {
        id: sessionId,
        lastSessionDate: new Date(),
        activityName: currentActivityNameRef.current,
        sections,
      };

      const existingIndex = prev.findIndex((item) => item.id === sessionId);
      if (existingIndex === -1) {
        return [savedSession, ...prev];
      }

      const updated = [...prev];
      updated[existingIndex] = savedSession;
      return updated;
    });
  };

  const handleOpenLibrary = () => setShowLibrary(true);

  const handleOpenNewDoodle = () => {
    setShowLibrary(false);
    setIsModalOpen(true);
  };

  const modalOverlay = isModalOpen ? (
    <div
      className="doodler-mvp__overlay"
      onClick={() => (showFlow ? setIsModalOpen(false) : onBack?.())}
    >
      <MVPNewContactModal
        preselectedActivity="Adviesgesprek"
        onClose={() => (showFlow ? setIsModalOpen(false) : onBack?.())}
        onConfirm={handleConfirmDoodle}
      />
    </div>
  ) : null;

  if (showLibrary) {
    return (
      <>
        <MVPDoodleLibrary
          sessions={librarySessions}
          onBack={handleBackToEntry}
          onOpenNewDoodle={handleOpenNewDoodle}
          onOpenSession={handleOpenSession}
        />
        {modalOverlay}
        <LoadingOverlay isVisible={isGenerating} />
      </>
    );
  }

  if (showFlow) {
    return (
      <>
        <MVPDoodleFlow
          key={flowSessionKey}
          initialSession={activeSession}
          onBack={handleBackToEntry}
          onOpenNewDoodle={handleOpenNewDoodle}
          onOpenLibrary={handleOpenLibrary}
          onSaveSession={handleSaveSession}
        />
        {modalOverlay}
        <LoadingOverlay isVisible={isGenerating} />
      </>
    );
  }

  return (
    <div className="doodler-mvp">
      <MVPHeader
        onBack={handleBackToEntry}
        onOpenNewDoodle={handleOpenNewDoodle}
        onOpenLibrary={handleOpenLibrary}
        logoClassName="doodler-mvp__logo"
        showBackButton={false}
      />
      {modalOverlay}
      <LoadingOverlay isVisible={isGenerating} />
    </div>
  );
};
