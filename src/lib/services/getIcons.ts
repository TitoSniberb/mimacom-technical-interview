import heartBlue from '../../assets/icons/heart-blue.svg'
import heartFilledBlue from '../../assets/icons/heart-filled-blue.svg'

const icons = {
  HeartBlue: heartBlue,
  HeartFilledBlue: heartFilledBlue
}

export const getIcons = (icon: keyof typeof icons) => (
  icons[icon]
)