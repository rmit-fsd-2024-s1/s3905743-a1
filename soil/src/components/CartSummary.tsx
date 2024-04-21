import SubtotalInfo from './SubtotalInfo'
import styled from 'styled-components'

export default () => {
    return (
        <CartSummary>
            <SubtotalInfo />
        </CartSummary>
    )
}

const CartSummary = styled.div`
    border-bottom: 1px solid rgb(228, 234, 238);
    flex-direction: column;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`
