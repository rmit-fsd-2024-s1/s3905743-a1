import styled from 'styled-components'
import { StoreItemType } from '../atoms/store'

export default ({ image, price, name }: StoreItemType) => {
    return (
        <ItemContainer>
            <ImageContainer>
                <ItemImage src={`/images/${image}`}></ItemImage>
            </ImageContainer>
            <ItemName>{name}</ItemName>
            <ItemPrice>{`$${price}`}</ItemPrice>
        </ItemContainer>
    )
}

const ImageContainer = styled.div`
    position: relative;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3); 
    width: 235px;
    height: 359px;
    cursor: pointer;

    @media only screen and (max-width: 1018px) {
        width: 350px;
        height: 538px;
    }
`

const ItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 100px;
    cursor: pointer;
`

const ItemImage = styled.img`
    width: 80%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`

const ItemName = styled.div`
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    margin-top: 16px;
    margin-bottom: 4px;
`

const ItemPrice = styled.div`
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
`
