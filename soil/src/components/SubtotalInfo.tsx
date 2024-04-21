import styled from 'styled-components'
import { useAtom } from 'jotai'
import { cartItemsWithPersistence } from '../atoms/store'

export default () => {
    const [myItems] = useAtom(cartItemsWithPersistence)
    return (
        <Subtotal>
            <SubtotalLabel>Subtotal</SubtotalLabel>
            <SubtotalNum>
                {' '}
                {`$${myItems.map((item) => item.price).reduce((a, b) => a + b, 0)}`}
            </SubtotalNum>
        </Subtotal>
    )
}

const Subtotal = styled.div`
    color: rgb(84, 84, 94);
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`

const SubtotalLabel = styled.p`
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    line-height: 1.5;
`

const SubtotalNum = styled.p`
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    margin: 0;
`
