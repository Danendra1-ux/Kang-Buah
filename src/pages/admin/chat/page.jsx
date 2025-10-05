"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./admin-chat.css"

const seedContacts = [
  { id: "c1", name: "Restoran Nusantara", last: "Perlu harga grosir cabe", unread: 2 },
  { id: "c2", name: "Cafe Hijau", last: "Konsultasi buah musiman", unread: 0 },
  { id: "c3", name: "Hotel Merdeka", last: "Order mingguan sayur", unread: 1 },
]

export default function AdminChatPage() {
  const router = useNavigate()
  const [contacts, setContacts] = useState(seedContacts)
  const [activeId, setActiveId] = useState(seedContacts[0].id)
  const [text, setText] = useState("")
  const [store, setStore] = useState({}) // { [contactId]: Message[] }
  const endRef = useRef(null)

  // Guard: admin only
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const role = localStorage.getItem("role")
    if (!loggedIn) router("/login", { replace: true })
    else if (role !== "admin") router("/catalog", { replace: true })
  }, [router])

  // Load messages
  useEffect(() => {
    const raw = localStorage.getItem("adminChats")
    if (raw) {
      try {
        setStore(JSON.parse(raw))
      } catch {
        setStore({})
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("adminChats", JSON.stringify(store))
  }, [store])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [store, activeId])

  const messages = useMemo(() => store[activeId] || [], [store, activeId])

  const send = () => {
    const msg = text.trim()
    if (!msg) return
    const next = { ...store, [activeId]: [...messages, { role: "admin", text: msg, at: new Date().toISOString() }] }
    setStore(next)
    setText("")
  }

  const simulateReply = () => {
    const replies = [
      "Terima kasih, akan kami cek.",
      "Boleh minta daftar harga terbaru?",
      "Kapan bisa kirim untuk pesanan berikutnya?",
    ]
    const reply = replies[Math.floor(Math.random() * replies.length)]
    const next = { ...store, [activeId]: [...messages, { role: "user", text: reply, at: new Date().toISOString() }] }
    setStore(next)
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("role")
    router("/login", { replace: true })
  }

  return (
    <div className="admin-chat-pagel">
      <header className="chat-headerl">
        <div className="maxwl">
          <div className="hdr-rowl">
            <Link to="/admin/catalog" className="logo-ansl">
              ANS
            </Link>
            <nav className="admin-navl">
              <Link to="/admin/catalog" className="nav-iteml">
                Katalog Admin
              </Link>
              <Link to="/admin/chat" className="nav-iteml active">
                Chat Admin
              </Link>
            </nav>
            <div className="rightl">
              <button className="logoutl" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="chat-main">
        <div className="maxw chat-layout">
          <aside className="sidebar">
            <div className="sidebar-head">Percakapan</div>
            <div className="contact-list">
              {contacts.map((c) => (
                <button
                  key={c.id}
                  className={`contact ${activeId === c.id ? "active" : ""}`}
                  onClick={() => setActiveId(c.id)}
                >
                  <div className="avatar">{c.name.slice(0, 1)}</div>
                  <div className="meta">
                    <div className="name">{c.name}</div>
                    <div className="last">{c.last}</div>
                  </div>
                  {c.unread > 0 && <span className="badge">{c.unread}</span>}
                </button>
              ))}
            </div>
          </aside>

          <section className="thread">
            <div className="thread-head">
              <div className="contact-title">
                <div className="avatar lg">{(contacts.find((c) => c.id === activeId)?.name || "U").slice(0, 1)}</div>
                <div>
                  <div className="name">{contacts.find((c) => c.id === activeId)?.name}</div>
                  <div className="status">online</div>
                </div>
              </div>
              <div className="thread-actions">
                <button className="sim" onClick={simulateReply}>
                  Simulasi Balasan
                </button>
              </div>
            </div>

            <div className="messages">
              {messages.map((m, idx) => (
                <div key={idx} className={`bubble ${m.role === "admin" ? "sent" : "recv"}`}>
                  <div className="text">{m.text}</div>
                  <div className="time">
                    {new Date(m.at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="composer">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tulis pesan..."
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button className="send" onClick={send}>
                Kirim
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
