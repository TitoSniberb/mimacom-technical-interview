import { IconTypes } from '../models/enums'
import heartBlue from '../../assets/icons/heart-blue.svg'
import heartFilledBlue from '../../assets/icons/heart-filled-blue.svg'

const icons = {
  HeartBlue: heartBlue,
  HeartFilledBlue: heartFilledBlue
}

export const getIcons = (icon: keyof typeof IconTypes) => (
  icons[icon]
)