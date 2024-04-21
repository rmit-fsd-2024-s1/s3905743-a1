import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {useAtom} from "jotai";
import {cartItemsWithPersistence, showCheckoutModal} from "./atoms/store";
import {useNavigate} from "react-router-dom";

export default () => {
    const [display, setDisplay] = useAtom(showCheckoutModal)
    const [myItems, setMyItems] = useAtom(cartItemsWithPersistence)
    const navigate = useNavigate()
    const [creditCard, setCreditCard] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const ref = useRef()
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            // @ts-expect-error
            if (ref.current && !ref.current.contains(event.target)) {
                setDisplay(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setDisplay, ref])

    const validate = () => {
        const validCard = !(creditCard
                .replace(/\D/g, '')
                .split('')
                .reverse()
                .map((e: any, i: any) => e * (i % 2 + 1))
                .join('') //instead of if(d > 9)
                .split('') // d -=9
                .reduce((e: any, t:any) => t - 0 + e, 0)
            % 10)
        if(!validCard) {
            setError('Invalid credit card')
            return
        }
        setTimeout(() => setDisplay(false))
        setMyItems([])
        navigate('/payment-success')
    }

    return (
        <Overlay show={display}>
            <ModalContent ref={ref as any}>
                <Container>
                    <CloseButton onClick={() => setDisplay(false)}>X</CloseButton>
                    <Form>
                        <h1>Check Out</h1>
                        <Field>
                            <span>Credit Card:</span>
                            <input type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}"
                                   autoComplete="cc-number" maxLength={19}
                                   value={creditCard}
                                      onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').substring(0, 16)
                                        setCreditCard(value.replace(/(.{4})/g, '$1 ').trim())
                                      }}
                                   placeholder="xxxx xxxx xxxx xxxx" required/>
                        </Field>
                        <Field>
                            <span>Password:</span>
                            <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        </Field>
                        {error && <div style={{color: 'red'}}>{error}</div>}
                        <ConfirmButton onClick={() => {
                            validate()
                        }}>Pay</ConfirmButton>
                    </Form>

                </Container>
            </ModalContent>
        </Overlay>
    )
}

const Overlay = styled.div<{show: boolean}>`
    display: ${(props) => (props.show ? 'block' : 'none')};
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    overflow: auto;
`;

const ModalContent = styled.div`
    background-color: rgb(254, 254, 254);
    padding: 40px;
    margin: 20% auto;
    border: 1px solid rgba(136, 136, 136, 0.32);
    width: 80%;
    border-radius: 20px;
`;

const CloseButton = styled.span`
    color: rgba(170, 170, 170, 0.5);
    font-size: 18px;
    font-weight: bold;
    text-align: right;

    &:hover,
    &:focus {
        color: rgba(17, 1, 1, 0.4);
        text-decoration: none;
        cursor: pointer;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Form = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    margin: auto;
`

const Field = styled.div`
    margin-top: 10px;
    display: flex;
    align-content: center;
    justify-content: center;

    span {
        font-size: 14px;
        padding-right: 10px;
        padding-top: 15px;
        width: 80px;
        text-align: left;
    }

    input {
        padding: 12px 20px;
        margin: 8px 0;
        width: 200px;
        display: inline-block;
        border: 1px solid rgba(204, 204, 204, 0.64);
        box-sizing: border-box;
    }

`


const ConfirmButton = styled.div`
    border-radius: 2px;
    margin-top: 10px;
    color: #161412;
    background-color: white;
    padding: 6px 16px;
    font-size: 16px;
    min-width: 64px;
    font-weight: 500;
    line-height: 2.15;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        background-color: #d9d9d9;
        cursor: pointer;
    }

    text-align: center;
    width: 100%;
    border: 1px solid #fbcf61;
    border-radius: 5px;
    

`
