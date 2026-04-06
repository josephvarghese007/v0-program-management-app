'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait a bit before showing the prompt so it's not jarring
      setTimeout(() => setShowPrompt(true), 2000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 glass-panel-strong rounded-2xl p-4 flex gap-4 items-start border border-primary/20 shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)]"
        >
          <div className="bg-primary/20 p-2 rounded-xl text-primary flex-shrink-0 mt-1">
            <Download size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground font-display text-base">Install Jesus Youth App</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-3">Install for a faster, offline-capable experience.</p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition flex-1"
              >
                Install
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/30 transition flex-1"
              >
                Later
              </button>
            </div>
          </div>
          <button 
            onClick={() => setShowPrompt(false)}
            className="text-muted-foreground hover:text-foreground absolute top-2 right-2 p-1"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
