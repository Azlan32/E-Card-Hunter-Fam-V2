"use client";

import { useEffect, useMemo, useState } from "react";

const BASE_PATH = "/E-Card-Hunter-Fam-V2";
const asset = (name: string) => `${BASE_PATH}/${name}`;
const EVENT_START = new Date("2026-09-04T12:20:00+07:00").getTime();

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number; finished: boolean };

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, EVENT_START - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
    finished: distance === 0,
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const units = useMemo(() => [["วัน", timeLeft?.days], ["ชั่วโมง", timeLeft?.hours], ["นาที", timeLeft?.minutes], ["วินาที", timeLeft?.seconds]] as const, [timeLeft]);
  if (timeLeft?.finished) return <div className="countdown-finished" role="status">SEE YOU ON THE FAIRWAY</div>;
  return <div className="countdown" aria-label="นับถอยหลังสู่เวลาเริ่มกิจกรรม">{units.map(([label, value]) => <div className="countdown-unit" key={label}><strong>{value == null ? "--" : String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>;
}

function SectionIndex({ number, label }: { number: string; label: string }) {
  return <div className="section-index reveal"><span>{number}</span><i aria-hidden="true" /><strong>{label}</strong></div>;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("cover");
  useEffect(() => {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach(node => revealObserver.observe(node));
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { threshold: [0.3, 0.55, 0.75] });
    document.querySelectorAll("main > section[id]").forEach(node => sectionObserver.observe(node));
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  const sections = [["cover", "00"], ["countdown", "01"], ["schedule", "02"]];

  return <main>
    <div className="grain" aria-hidden="true" />
    <header className="topbar">
      <a className="brand" href="#cover" aria-label="กลับไปหน้าแรก">
        <img src={asset("hunter-patch.png")} alt="The Hunter 231 TAC.FTR.SQN. patch" width={51} height={51} />
        <span><b>HUNTER FAMILY</b><small>GOLF DAY · PARTY NIGHT</small></span>
      </a>
      <div className="event-stamp"><span>04</span><i /> <span>09</span><i /> <span>69</span></div>
    </header>
    <nav className="section-rail" aria-label="สารบัญหน้า">{sections.map(([id, number]) => <a className={activeSection === id ? "active" : ""} href={`#${id}`} key={id} aria-label={`ไปส่วนที่ ${number}`}><span>{number}</span></a>)}</nav>

    <section className="hero" id="cover">
      <div className="hero-number" aria-hidden="true">HF</div><div className="hero-slash" aria-hidden="true" />
      <div className="lion-stage" aria-hidden="true"><img src={asset("hunter-lion-red.png")} alt="" /></div>
      <div className="radar radar-one" aria-hidden="true" /><div className="radar radar-two" aria-hidden="true" />
      <div className="hero-copy reveal is-visible">
        <p className="eyebrow"><span /> HUNTER FAMILY ขอเชิญร่วมกิจกรรม</p>
        <h1><span className="outline-word">GOLF</span><span className="solid-word">DAY</span><small>&amp; PARTY NIGHT</small></h1>
        <p className="hero-thai">กีฬาเชื่อมสัมพันธ์ · งานเลี้ยงสังสรรค์</p>
        <div className="hero-date"><div><small>DATE</small><b>04 SEP 2026</b></div><div><small>FIRST T‑OFF</small><b>12:20 HRS</b></div></div>
        <a className="open-card" href="#countdown"><span>เปิดการ์ดเชิญ</span><i aria-hidden="true">↓</i></a>
      </div>
      <div className="aircraft-stage" aria-hidden="true">
        <div className="speed-lines" />
        <img src={asset("hunter-a-jet.png")} alt="" width={1080} height={1514} />
        <div className="aircraft-tag"><span>A‑JET</span><small>HUNTER FAMILY</small></div>
      </div>
      <div className="hero-golf-mark" aria-hidden="true"><span>⛳</span><small>TO THE FAIRWAY</small></div>
    </section>

    <section className="finale-section" id="countdown">
      <SectionIndex number="01" label="SEE YOU THERE" /><div className="finale-ring" aria-hidden="true" />
      <div className="finale-content reveal">
        <img src={asset("hunter-patch.png")} alt="The Hunter 231 TAC.FTR.SQN. patch" width={180} height={180} />
        <p>HUNTER FAMILY · 04 SEPTEMBER 2026</p>
        <h2>SEE YOU<br /><span>ON THE FAIRWAY</span><small>&amp; AFTER DARK.</small></h2>
        <div className="finale-details"><span>⛳ 12:20—13:10</span><i /><span>🥂 18:00—22:00</span></div>
        <div className="finale-countdown"><div className="countdown-heading"><span>COUNTDOWN</span><small>ถึงเวลาเริ่ม T‑OFF รอบแรก</small></div><Countdown /></div>
      </div>
      <footer><span>HUNTER FAMILY · 04 SEPTEMBER 2026</span><span>04 / 09 / 69</span></footer>
    </section>

    <section className="schedule-section" id="schedule">
      <SectionIndex number="02" label="DAY TO NIGHT" /><div className="spotlight left" aria-hidden="true" /><div className="spotlight right" aria-hidden="true" /><div className="golf-orbit orbit-a" aria-hidden="true" /><div className="golf-orbit orbit-b" aria-hidden="true" />
      <div className="confetti" aria-hidden="true">{Array.from({ length: 22 }).map((_, index) => <i key={index} />)}</div>
      <div className="schedule-heading reveal"><p>04 SEPTEMBER 2026 · HUNTER FAMILY</p><h2>ONE DAY. <span>TWO SESSIONS.</span></h2></div>
      <div className="schedule-layout">
        <div className="event-card schedule-card golf-card reveal">
          <div className="card-no">01 / SPORT</div><div className="session-mark" aria-hidden="true">⛳</div><span className="emoji-label">ON THE FAIRWAY</span>
          <div className="time-lockup"><span>12:20</span><i>—</i><span>13:10</span></div><p className="time-note">เริ่ม T‑OFF ตามช่วงเวลา</p>
          <h2>สนามกอล์ฟ<br /><em>ธูปะเตมีย์</em></h2>
          <div className="venue-line"><span aria-hidden="true">⌖</span><p>ศูนย์พัฒนากีฬากองทัพอากาศธูปะเตมีย์<br /><small>(สนามกอล์ฟธูปะเตมีย์)</small></p></div>
          <a className="map-button" href="https://www.google.com/maps/search/?api=1&query=Dhupatemiya%20Golf%20Course%2C%2014%20Moo%208%2C%20Khu%20Khot%2C%20Lam%20Luk%20Ka%2C%20Pathum%20Thani%2012130" target="_blank" rel="noopener noreferrer" aria-label="เปิดแผนที่สนามกอล์ฟธูปะเตมีย์ใน Google Maps"><span aria-hidden="true">⌖</span><b>เปิดใน Google Maps</b><i aria-hidden="true">↗</i></a>
          <div className="dress-note"><span>🏌️</span> READY · SET · T‑OFF</div>
        </div>
        <div className="event-card schedule-card party-card reveal">
          <div className="card-no">02 / CELEBRATION</div><div className="session-mark" aria-hidden="true">🥂</div><span className="emoji-label">AFTER DARK</span>
          <div className="time-lockup"><span>18:00</span><i>—</i><span>22:00</span></div><p className="time-note">งานเลี้ยงสังสรรค์</p><h2>PARTY<br /><em>NIGHT</em></h2>
          <div className="venue-line"><span aria-hidden="true">⌖</span><p>ห้องนภาภิรมย์ ชั้น 1</p></div>
          <p className="party-note">วางไม้กอล์ฟ แล้วมาชนแก้วกัน<br />ร่วมปิดท้ายวันดี ๆ ด้วยมิตรภาพและเสียงหัวเราะ</p><div className="party-chips"><span>🎉 CELEBRATE</span><span>🥂 TOGETHER</span></div>
        </div>
      </div>
    </section>
  </main>;
}
