import heartBlue from '../../assets/icons/heart-blue.svg'
import heartFilledBlue from '../../assets/icons/heart-filled-blue.svg'
import cartBlue from '../../assets/icons/cart-blue.svg'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import list from '../../assets/icons/list.svg'

const icons = {
  HeartBlue: heartBlue,
  HeartFilledBlue: heartFilledBlue,
  CartBlue: cartBlue,
  ArrowLeft: arrowLeft,
  List: list
}

export const getIcons = (icon: keyof typeof icons) => (
  icons[icon]
)