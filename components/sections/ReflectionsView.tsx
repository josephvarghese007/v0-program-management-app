'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BibleVerse {
  reference: string;
  text: string;
  verses: { book_name: string; chapter: number; verse: number; text: string }[];
}

const DAILY_READINGS = [
  'John+1:1-5',
  'Matthew+5:1-12',
  'Psalm+23:1-6',
  'Romans+8:31-39',
  'Philippians+4:4-7',
];

export function ReflectionsView() {
  const [reading, setReading] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const dayOfYear = Math.floor(
      (new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    const readingKey = DAILY_READINGS[dayOfYear % DAILY_READINGS.length];

    fetch(`https://bible-api.com/${readingKey}`)
      .then((res) => res.json())
      .then((data) => {
        setReading(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 pb-32">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-foreground">Daily Reflections</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/15 to-accent/5 rounded-full blur-3xl -z-10" />

        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-rounded text-3xl text-primary">menu_book</span>
          <h3 className="text-xl font-semibold text-foreground">Today's Reading</h3>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
        ) : error || !reading ? (
          <p className="text-muted-foreground">Unable to load today's reading. Please check your connection.</p>
        ) : (
          <div className="space-y-4">
            <h4 className="font-semibold text-primary">{reading.reference}</h4>
            <blockquote className="text-lg leading-relaxed text-foreground/90 italic border-l-4 border-primary/30 pl-4 py-2">
              {reading.text.trim()}
            </blockquote>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-3xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-rounded text-3xl text-secondary">history_edu</span>
          <h3 className="text-xl font-semibold text-foreground">Saint's Quote</h3>
        </div>
        <blockquote className="text-lg font-medium text-foreground/80 italic">
          "Pray, hope, and do not worry. Worry is useless. God is merciful and will hear your prayer."
        </blockquote>
        <p className="text-sm font-semibold text-secondary mt-4">- St. Padre Pio</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel rounded-3xl p-8 flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Audio Prayers</h3>
          <p className="text-sm text-muted-foreground">Listen to today's rosary.</p>
        </div>
        <button className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition">
          <span className="material-symbols-rounded text-3xl">play_arrow</span>
        </button>
      </motion.div>
    </div>
  );
}
