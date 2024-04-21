import styled from 'styled-components'

interface PropTypes {
    id: number
    image: string
    price: number
    name: string
}

export default ({ name, price, image }: PropTypes) => {
    return (
        <ItemContainer>
            <ItemImage src={`/images/${image}`}></ItemImage>
            <ItemSummary>
                <ItemPrice>{`$${price}`}</ItemPrice>
                <ItemName>{name}</ItemName>
            </ItemSummary>
        </ItemContainer>
    )
}

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 14px;
    cursor: pointer;
`

const ItemImage = styled.img`
    object-fit: cover;
    object-position: center center;
    height: 88px;
    width: 88px;
    display: block;
    margin-right: 20px;
`

const ItemSummary = styled.div`
    flex: 1 1 0%;
`

const ItemPrice = styled.h3`
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: 14px;
`

const ItemName = styled.p`
    color: #2a2a2a;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
`
