import type { Metadata } from 'next'
import NetworkBuilderGame from './NetworkBuilderGame'

export const metadata: Metadata = {
  title: 'Network Builder — John Connor Project',
  description:
    'Interactive home network education game. Go from zero to confident home network operator through guided tutorials, hands-on architecture exercises, and real-world troubleshooting scenarios.',
}

export default function NetworkBuilderPage() {
  return <NetworkBuilderGame />
}
