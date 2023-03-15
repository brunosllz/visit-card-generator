import { invert } from 'polished'

import Image from 'next/image'

import QrCodeImage from '../assets/qr-code.svg'

interface CardPreviewProps {
  cardColor: string
  textColor: string
}

export function CardPreview({ cardColor, textColor }: CardPreviewProps) {
  return (
    <div
      className="flex flex-col items-center justify-between w-full h-[297px] p-6 rounded-md"
      style={{ backgroundColor: cardColor }}
    >
      <div className="flex flex-col gap-3 items-center">
        <div
          className="p-3 rounded-md"
          style={{ backgroundColor: invert(cardColor) }}
        >
          😊
        </div>
        <span className="text-lg" style={{ color: textColor }}>
          Your name
        </span>
      </div>

      <Image src={QrCodeImage} width={80} height={80} alt="qrcode" />
    </div>
  )
}
