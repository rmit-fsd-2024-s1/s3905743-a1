import styled from 'styled-components'
import Header from './components/Header'
import { useAtom } from 'jotai'
import { storeItems } from './atoms/store'
import StoreItem from './components/StoreItem'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'
import SignIn from "./SignIn";


export default () => {
    const [items] = useAtom(storeItems)
    return (
        <HomeContainer>
            <Header />
            <SignIn />
            <Banner>
                <img src={'/images/farming.jpg'} alt={'banner'} />
                <h2>Want to farm and grow smaller vegetables in their backyard?</h2>
                <h2>Checkout below instructions</h2>
            </Banner>
            <ul>
                <li><h3>Choose the Right Varieties:</h3>
                   Select vegetable varieties that are suitable for small-scale farming. Look for compact or dwarf varieties of vegetables such as cherry tomatoes, mini bell peppers, dwarf beans, and baby carrots. These varieties are typically well-suited for small spaces and can produce high yields.
                </li>
                <li>
                    <h3>Optimize Space:</h3> Utilize your space efficiently by practicing intensive planting techniques such as square foot gardening or vertical gardening. Planting in raised beds, containers, or hanging baskets can also maximize space usage. Consider companion planting to make the most of your available area and encourage healthy growth.
                </li>
                <li>
                    <h3>Provide Adequate Care: </h3>
                    Small vegetables still require proper care to thrive. Ensure they receive sufficient sunlight, water, and nutrients. Regularly monitor soil moisture levels and fertilize as needed to support healthy growth. Keep an eye out for pests and diseases, and take prompt action to address any issues to prevent them from spreading.
                </li>
                <li>
                    <h3>Harvest at the Right Time: </h3>
                    Harvest small vegetables at the peak of ripeness to enjoy the best flavor and texture. Since these vegetables are often harvested when they are young, it's important to monitor them closely and harvest them as soon as they reach maturity. Regular harvesting also encourages continued production throughout the growing season.
                </li>
            </ul>

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
