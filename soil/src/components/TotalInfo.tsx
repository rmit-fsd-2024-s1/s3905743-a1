import styled from 'styled-components'
import { useAtomValue } from 'jotai'
import { cartItemsWithPersistence } from '../atoms/store'

export default () => {
    const myItems = useAtomValue(cartItemsWithPersistence)

    return (
        <Total>
            <TotalLabel>Total</TotalLabel>
            <TotalNum>{`$${myItems
                .map((item) => item.price)
                .reduce((a, b) => a + b, 0)}`}</TotalNum>
        </Total>
    )
}

const Total = styled.div`
    margin-top: 16px;
    display: flex;
    margin-bottom: 32px;
    justify-content: space-between;
`

const TotalLabel = styled.p`
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    margin: 0;
`

const TotalNum = styled.p`
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    margin: 0;
`
