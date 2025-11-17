import React from 'react'

export default function Avatar({ src, alt = 'avatar', size = 32 }) {
  const fallback = '/public/avatar-placeholder.png'
  const style = { width: size, height: size, borderRadius: 9999 }
  return <img src={src || fallback} alt={alt} style={style} />
}
