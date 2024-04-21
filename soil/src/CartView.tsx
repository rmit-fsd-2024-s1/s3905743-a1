import styled from 'styled-components'
import { useAtom } from 'jotai'
import Header from './components/Header'
import { cartItemsWithPersistence, StoreItemType } from './atoms/store'
import { useNavigate } from 'react-router-dom'
import TotalInfo from './components/TotalInfo'
import CheckButton from './components/CheckButton'
import CartSummary from './components/CartSummary'

export default () => {
    const [myItems, setMyItems] = useAtom(cartItemsWithPersistence)
    const navigate = useNavigate()

    if (myItems.length === 0) {
        return (
            <PageContainer>
                <Header />
                <CartViewContainer>
                    <ViewHeader>My cart</ViewHeader>
                    <EmptyContent>
                        <img src={'/images/cart.svg'} />
                        <h3>Your cart is empty</h3>
                        <p>Once you have added items to your cart, you can check from here.</p>
                        <ContinueShoppingButton onClick={() => navigate('/')}>
                            <span>Continue shopping</span>
                        </ContinueShoppingButton>
                    </EmptyContent>
                </CartViewContainer>
            </PageContainer>
        )
    } else {
        return (
            <PageContainer>
                <Header />
                <CartViewContainer>
                    <ViewHeader>My cart</ViewHeader>
                    <ViewContent>
                        <CartItems>
                            {myItems.map((item) => (
                                <CartItem>
                                    <ItemImage src={`/images/${item.image}`} />
                                    <ItemInfo>
                                        <ItemName>{item.name}</ItemName>
                                        <ItemPrice>{`${item.price} ETH`}</ItemPrice>
                                        <ItemRemoveButton
                                            onClick={() => {
                                                setMyItems((prev: StoreItemType[]) =>
                                                    prev.filter((i) => i.id !== item.id),
                                                )
                                            }}
                                        >
                                            <img src={'/images/close.svg'} />
                                        </ItemRemoveButton>
                                    </ItemInfo>
                                </CartItem>
                            ))}
                        </CartItems>
                        <CartSummarySec>
                            <SummaryHeader>Summary</SummaryHeader>
                            <SummaryContainer>
                                <CartSummary />
                                <TotalInfo />
                                <CheckButton />
                            </SummaryContainer>
                        </CartSummarySec>
                    </ViewContent>
                </CartViewContainer>
            </PageContainer>
        )
    }
}

const PageContainer = styled.div``

const CartViewContainer = styled.div``

const ViewHeader = styled.h1`
    margin-bottom: 16px;
    color: #2a2a2a;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.25;
`

const EmptyContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ViewContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 100px;

    @media only screen and (max-width: 1098px) {
        flex-direction: column;
    }
`

const CartItems = styled.div`
    width: 100%;
`

const CartSummarySec = styled.div`
    padding-top: 32px;
`

const CartItem = styled.div`
    display: flex;
    padding: 32px 0px;
    width: 90%;
`

const ItemImage = styled.img`
    object-fit: cover;
    object-position: center center;
    height: 120px;
    width: 120px;
`
const ContinueShoppingButton = styled.button`
    border-radius: 2px;
    margin-top: 32px;
    max-width: 284px;
    color: #fff;
    background-color: #161412;
    padding: 6px 16px;
    font-size: 16px;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-weight: 500;
    cursor: pointer;

    & span {
        width: 100%;
        display: inherit;
        align-items: inherit;
        justify-content: inherit;
        font-size: 16px;
        font-weight: 600;
        line-height: 2.15;
    }
`
const ItemInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 24px;
    width: 100%;
`
const ItemName = styled.h3`
    width: 136px;
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    margin-top: 0;
`

const ItemPrice = styled.h3`
    width: 106px;
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    margin-top: 0;
`

const ItemRemoveButton = styled.div`
    height: 16px;
    width: 16px;
    flex: 0 0 auto;
    color: rgba(0, 0, 0, 0.54);
    cursor: pointer;
    overflow: visible;
    font-size: 1.5rem;
    text-align: center;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 50%;
`

const SummaryHeader = styled.h2`
    color: #2a2a2a;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.25;
    margin-top: initial;
    margin-bottom: 32px;
`

const SummaryContainer = styled.div`
    width: 285px;
    @media only screen and (max-width: 665px) {
        width: 100%;
    }
`
