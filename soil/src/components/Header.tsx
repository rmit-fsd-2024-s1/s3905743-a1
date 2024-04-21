import styled from 'styled-components'
import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import {
    showCartModal,
    cartItemsWithPersistence,
    userInfoWithPersistence,
    showSignIn,
    showProfileModal
} from '../atoms/store'
import CartModal from './CartModal'
import ProfileModal from "./ProfileModal";
import {Link} from 'react-router-dom'
import SignIn from "../SignIn";
import CreditCard from "../CreditCard";
import MakePlanModal from "../MakePlanModal";

export default () => {
    const myItems = useAtomValue(cartItemsWithPersistence)
    const [showCart, setShowCart] = useAtom(showCartModal)
    const userInfo = useAtomValue(userInfoWithPersistence)
    const [showProfile, setShowProfile] = useAtom(showProfileModal)
    const setSignModal = useSetAtom(showSignIn)

    return (
        <>
            <SignIn />
            <CreditCard/>
            <HeaderSpacer />
            <MakePlanModal />
            <HeaderWrapper>
                <HeaderContainer>
                    <Link to='/'>
                        <Logo>SOIL Product Store</Logo>
                    </Link>
                    <Link to='/special'>
                        <Nav>Specials</Nav>
                    </Link>
                    <Link to='/farming'>
                        <Nav>Farming</Nav>
                    </Link>
                    <div style={{display: "flex"}}>
                        {!userInfo.email ?
                        <SignButton onClick={() => {
                            setSignModal(true)
                        }}>
                            SignIn
                        </SignButton> : <UserProfile> <UserInfoIcon src={'/images/userInfo.svg'}
                                                      onClick={() => setShowProfile(true)}

                            ></UserInfoIcon>

                                {showProfile &&  <ProfileModal />}
                            </UserProfile>
                        }
                    <ShopCart>
                        <CartIcon
                            src={'/images/cart.svg'}
                            onClick={() => myItems.length > 0 && setShowCart((prev) => !prev)}
                        />
                        {myItems.length > 0 && <CartNum>{myItems.length}</CartNum>}
                        {showCart && <CartModal />}
                    </ShopCart>
                    </div>
                </HeaderContainer>
            </HeaderWrapper>
        </>
    )
}

const HeaderSpacer = styled.div`
    height: 150px;
`
const ShopCart = styled.div`
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 4px;
    margin-left: 30px;
    cursor: pointer;

    &:hover {
        background-color: #d9d9d9;
    }
`

const UserProfile= styled.div`
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 4px;
    margin-left: 30px;
    cursor: pointer;

    &:hover {
        background-color: #d9d9d9;
    }
`

const CartNum = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 18px;
    background: rgb(22, 20, 18);
`

const CartIcon = styled.img``
const UserInfoIcon = styled.img`
    cursor: pointer;
    width: 34px;
    height: 34px;
    
    & :hover {
        background-color: #d9d9d9;
        cursor: pointer;
    }
`

const HeaderWrapper = styled.div`
    height: 80px;
    padding: 0px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    top: 0px;
    width: 100%;
    margin: 0px auto;
    display: flex;
    background: white;
    justify-content: space-between;
    align-items: center;
    & a {
        all: unset;
    }
`
const HeaderContainer = styled.div`
    height: 80px;
    padding: 0px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    top: 0px;
    max-width: 1150px;
    width: 85%;
    margin: 0px auto;
    display: flex;
    background: white;
    justify-content: space-between;
    align-items: center;

    & a {
        all: unset;
    }

    @media only screen and (max-width: 996px) {
        width: 90%;
    }
`

const Logo = styled.h2`
    cursor: pointer;
`

const SignButton = styled.button`
    border: 1px solid rgb(22, 20, 18);
    border-radius: 2px;
    margin-top: 0px;
    color: #161412;
    background-color: white;
    width: 100px;
    padding: 6px 16px;
    font-size: 16px;
    min-width: 64px;
    font-weight: 500;
    line-height: 2.15;
    box-sizing: border-box;

    cursor: pointer;
    &:hover {
        background-color: #d9d9d9;
        cursor: pointer;
    }
`

const Nav = styled.h3`
    cursor: pointer;
    margin-left: 30px;
    margin-right: 30px;
    &:hover {
        color: #d9d9d9;
    }
`
