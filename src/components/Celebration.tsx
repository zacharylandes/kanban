import confetti from 'canvas-confetti'
import { useEffect, useRef } from 'react'

type CelebrationProps = {
  trigger: number
}

export function Celebration({ trigger }: CelebrationProps) {
  const seen = useRef(0)

  useEffect(() => {
    if (trigger === 0 || trigger === seen.current) {
      return
    }

    seen.current = trigger

    void confetti({
      particleCount: 70,
      spread: 62,
      startVelocity: 28,
      origin: { y: 0.72 },
      ticks: 160,
      scalar: 0.9,
      colors: ['#2eaadc', '#37352f', '#e8e6e1', '#6b6b6b'],
    })
  }, [trigger])

  return null
}
