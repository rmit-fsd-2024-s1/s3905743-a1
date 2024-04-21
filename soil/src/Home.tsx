import styled from 'styled-components'
import Header from './components/Header'
import { useAtom } from 'jotai'
import { storeItems } from './atoms/store'
import StoreItem from './components/StoreItem'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'


export default () => {
    const [items] = useAtom(storeItems)
    return (
        <HomeContainer>
            <Header />

            <Banner>
                <img src={'/images/banner.jpg'} alt={'banner'} />
                <h2>Welcome to SOIL organic Product Store</h2>
                <h2>Discover Fresh, Organic Goodness </h2>
                <small>Eat a variety of fruits, vegetables, lean proteins, and whole grains for balanced nutrition.</small>
                <small>Limit processed foods, added sugars, and unhealthy fats to maintain a healthy weight.</small>
                <small>Stay hydrated, practice portion control, and enjoy treats in moderation for overall wellness.</small>
            </Banner>
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
const Banner = styled.div`
    img {
        width: 100%;
        height: 200px;
    }
    small {
        display: block;
        font-size: 10px;
        color:lightslategray;
        font-style: italic;
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
