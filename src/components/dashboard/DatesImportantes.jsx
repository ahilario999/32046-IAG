import React from 'react'

// TODO: Connecter à Supabase pour données dynamiques
const DATES_DATA = [
  {
    date: '28 août 2026',
    label: "Journée d'accueil à La Cité",
  },
  {
    date: '1er septembre 2026',
    label: "Début de la session d'automne",
  },
  {
    date: '18 septembre 2026',
    label: "Date limite — retrait de cours",
  },
]

function generateICS(date, label) {
  const d = new Date(date)
  const pad = (n) => String(n).padStart(2, '0')
  const dateStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${dateStr}`,
    `SUMMARY:${label}`,
    'DESCRIPTION:Design Graphique - La Cité',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `rappel-${dateStr}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

/* Ornements SVG uniques pour chaque date */
const ornaments = [
  // Starburst 8 branches — spin
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" key="o1" className="ornament-interactive">
    <line x1="18" y1="1" x2="18" y2="35" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    <line x1="1" y1="18" x2="35" y2="18" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    <line x1="5.3" y1="5.3" x2="30.7" y2="30.7" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    <line x1="30.7" y1="5.3" x2="5.3" y2="30.7" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    <circle cx="18" cy="18" r="2" fill="rgba(255,255,255,0.25)" className="ornament-center-dot"/>
  </svg>,
  // Cercles concentriques — pulse
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" key="o2" className="ornament-interactive">
    <circle cx="18" cy="18" r="15" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
    <circle cx="18" cy="18" r="8" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
    <circle cx="18" cy="18" r="2" fill="rgba(255,255,255,0.3)" className="ornament-center-dot"/>
  </svg>,
  // Losange — float
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" key="o3" className="ornament-interactive">
    <rect x="18" y="3" width="21.2" height="21.2" rx="0" transform="rotate(45 18 3)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none"/>
    <circle cx="18" cy="18" r="2" fill="rgba(255,255,255,0.25)" className="ornament-center-dot"/>
  </svg>,
]

const animClasses = [
  'date-ornament--spin',
  'date-ornament--pulse',
  'date-ornament--float',
]

export default function DatesImportantes() {
  return (
    <div className="header-dates glass stagger-3">
      <div className="dates-header">
        <span className="dates-header__label">Calendrier</span>
        <span className="dates-header__rule" />
        <span className="dates-header__dot" />
      </div>

      {DATES_DATA.map((item, i) => (
        <div className="date-item" key={i}>
          <div className={`date-item__ornament ${animClasses[i]}`}>
            {ornaments[i]}
          </div>
          <div className="date-item__content">
            <div className="date-item__label">{item.label}</div>
            <div className="date-item__meta">
              <span className="date-item__date">{item.date}</span>
              <button
                className="date-item__rappel"
                onClick={() => generateICS(item.date, item.label)}
              >
                + rappel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
