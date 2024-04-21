import React from 'react'
import './App.css'
import Home from './Home'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductDetail  from './ProductDetail'
import CartView from './CartView'
import { Provider } from 'jotai'
import PaymentSuccess from "./PaymentSuccess";
import Special from "./Special"
import Farming from "./Farming"

const App = () => (
        <Provider>
            <AppContainer>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/product/:itemId" element={<ProductDetail/>}/>
                        <Route path="/cart" element={<CartView/>}/>
                        <Route path="/special" element={<Special/>}/>
                        <Route path="/farming" element={<Farming/>}/>
                        <Route path="/payment-success" element={<PaymentSuccess/>} />
                    </Routes>
                </BrowserRouter>
            </AppContainer>
        </Provider>
);

const AppContainer = styled.div`
    width: 85%;
    margin: auto;
    max-width: 1150px;

    @media only screen and (max-width: 996px) {
        width: 90%;
    }
`

export default App
