import styled from 'styled-components'
import {useSetAtom} from 'jotai'
import {showCartModal, showCheckoutModal} from '../atoms/store'

export default () => {
    const setShowBuy = useSetAtom(showCheckoutModal)
    const setShowCartModal = useSetAtom(showCartModal)
    return (
        <CheckoutButton
            onClick={() => {
                setShowCartModal(false)
                setShowBuy(true)
            }}
        >
            <span>Buy</span>
        </CheckoutButton>
    )
}

const CheckoutButton = styled.button`
    border: 1px solid rgb(22, 20, 18);
    border-radius: 2px;
    margin-top: 0px;
    color: #fff;
    background-color: #161412;
    width: 100%;
    padding: 6px 16px;
    font-size: 16px;
    min-width: 64px;
    font-weight: 500;
    cursor: pointer;
    line-height: 2.15;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    & span {
        width: 100%;
        display: inherit;
        align-items: inherit;
        justify-content: inherit;
    }
`
