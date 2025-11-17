import React, { useState } from 'react'
import emailjs from 'emailjs-com'

export default function ContactForm() {
  const [status, setStatus] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const service = import.meta.env.VITE_EMAILJS_SERVICE
      const template = import.meta.env.VITE_EMAILJS_TEMPLATE
      const user = import.meta.env.VITE_EMAILJS_USER
      await emailjs.sendForm(service, template, e.target, user)
      setStatus('sent')
      e.target.reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg">
      <div>
        <label>Name</label>
        <input name="from_name" required className="w-full p-2 border rounded" />
      </div>
      <div className="mt-2">
        <label>Email</label>
        <input name="reply_to" type="email" required className="w-full p-2 border rounded" />
      </div>
      <div className="mt-2">
        <label>Message</label>
        <textarea name="message" required className="w-full p-2 border rounded" />
      </div>
      <div className="mt-3">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </div>
      {status === 'sent' && <p className="text-green-600 mt-2">Message sent — thanks!</p>}
      {status === 'error' && <p className="text-red-600 mt-2">Failed to send message.</p>}
    </form>
  )
}
