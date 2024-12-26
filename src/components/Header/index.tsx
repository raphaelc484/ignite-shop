import logoImg from '../../assets/logo.svg'
import Image from 'next/image'
import { HeaderContainer } from './styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Cart } from '../Cart'

export default function Header() {
  const { pathname } = useRouter()

  const showCartButton = pathname !== '/success'

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      {showCartButton && <Cart />}
    </HeaderContainer>
  )
}
