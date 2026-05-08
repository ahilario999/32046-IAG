import React from 'react'

export default function ContactWidget() {
  return (
    <div className="contact glass stagger-8">

      <div className="contact__title-pill">
        <span className="contact__title-plus">+</span>
        <span className="contact__title-text">Pour nous joindre</span>
      </div>

      <div className="contact__info">
        <span>ahilar@lacitec.on.ca</span>
        <span>613-742-2493 x2601</span>
      </div>

      <a
        className="contact__cta"
        href="https://bookings.cloud.microsoft/book/AntonioHilario@live.lacitec.on.ca/?ismsaljsauthenabled=true"
        target="_blank"
        rel="noopener noreferrer"
      >
        Prendre un rendez-vous
      </a>

    </div>
  )
}
