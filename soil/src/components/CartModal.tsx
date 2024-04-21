import styled from 'styled-components'
import { useAtomValue, useSetAtom } from 'jotai'
import { cartItemsWithPersistence, showCartModal } from '../atoms/store'
import CartItem from './CartItem'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TotalInfo from './TotalInfo'
import CheckButton from '../components/CheckButton'
import CartSummary from './CartSummary'

export default () => {
    const items = useAtomValue(cartItemsWithPersistence)
    const setShowCartModal = useSetAtom(showCartModal)
    const navigate = useNavigate()

    const ref = useRef()
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            // @ts-expect-error
            if (ref.current && !ref.current.contains(event.target)) {
                setShowCartModal(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setShowCartModal, ref])

    return (
        // @ts-expect-error
        <ModalContainer ref={ref}>
            <ModalHeader>My Cart</ModalHeader>
            <ModalContent>
                <CartItems>
                    {items.map((item) => (
                        <CartItem {...item} />
                    ))}
                </CartItems>
                <CartSummary />
                <TotalInfo />
                <CartViewButton
                    onClick={() => {
                        setShowCartModal(false)
                        navigate('/cart')
                    }}
                >
                    <span>VIEW CART</span>
                </CartViewButton>
                <CheckButton />
            </ModalContent>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    display: block;
    width: 349px;
    padding: 32px;
    position: absolute;
    right: 0px;
    transition: all 0.2s linear 0s;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 20%) 0px 0px 16px;
    box-sizing: border-box !important;
`

const ModalHeader = styled.div`
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
`

const ModalContent = styled.div`
    width: 285px;
`

const CartItems = styled.div`
    max-height: 296px;
    overflow: auto;
    margin-top: 30px;
    margin-bottom: 14px;
`

const CartViewButton = styled.button`
    border: 1px solid rgb(22, 20, 18);
    border-radius: 2px;
    width: 100%;
    color: #161412;
    padding: 6px 16px;
    background-color: #fff;
    align-items: center;
    display: inline-flex;
    cursor: pointer;
    margin-bottom: 8px;

    & span {
        width: 100%;
        font-weight: 600;
        line-height: 2.15;
        font-size: 16px;
    }
`
