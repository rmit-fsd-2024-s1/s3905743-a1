import styled from 'styled-components'
import Header from './components/Header'
import { useAtom } from 'jotai'
import {specialItems, storeItems} from './atoms/store'
import StoreItem from './components/StoreItem'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'
import SignIn from "./SignIn";


export default () => {
    const [items] = useAtom(specialItems)
    return (
        <HomeContainer>
            <Header />
            <SignIn />
            <Slider>
                <img src={'/images/special.jpg'} alt={'banner'} />
                <div>
                    <h2>SOIL organic Product Store Provide Specials Per Week</h2>
                    <h2>Organic Makes You Energetic</h2>
                    <small>Eat a variety of fruits, vegetables, lean proteins, and whole grains for balanced
                        nutrition.</small>
                    <small>Limit processed foods, added sugars, and unhealthy fats to maintain a healthy weight.</small>
                    <small>Stay hydrated, practice portion control, and enjoy treats in moderation for overall
                        wellness.</small>
                    <img src={"/images/special2.jpg"}/>
                    <img src={"/images/special3.jpg"}/>
                </div>
            </Slider>
            <ItemList>
            {items.map((item) => (
                    <Link to={`/product/${item.id}`}>
                        <StoreItem {...item} />
                    </Link>
                ))}
            </ItemList>
            <Footer />
        </HomeContainer>
    )
}

const HomeContainer = styled.div``
const Slider = styled.div`
    display: flex;
    > img {
        width: 70%;
        height: 80%;
    }
   
    
    small {
        display: block;
        font-size: 10px;
        color:lightslategray;
        font-style: italic;
    }
    div {
        margin-left: 30px;
        img {
            width: 100%;
            margin-top: 20px;
        }
    }
    margin-bottom: 50px;
`
const ItemList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media only screen and (max-width: 780px) {
        justify-content: center;
    }

    & a {
        all: unset;
    }
`
