import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {useAtom, useSetAtom} from "jotai";
import {showSignIn, userInfoWithPersistence} from "./atoms/store";

export default () => {
    const [display, setDisplay] = useAtom(showSignIn)
    const setUserInfo = useSetAtom(userInfoWithPersistence)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [address, setAddress] = useState('')
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
        if(name === '' || password === '' || confirmPassword === '' || email === '') {
            setError('All fields are required')
            return
        }
        if(password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        if(password.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }
        if(password === name) {
            setError('Password must be different from name')
            return
        }
        const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')
        if(!passwordRegex.test(password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
            return
        }
        if(!email.includes('@')) {
            setError('Invalid email')
            return
        }
        setError('')
        setUserInfo({name, password, email, signUpDate: Date.now(), address})
        setSuccess('Sign In successful')
        setTimeout(() => setDisplay(false))
    }

    return (
        <Overlay show={display}>
            <ModalContent ref={ref as any}>
                <Container>
                    <CloseButton onClick={() => setDisplay(false)}>X</CloseButton>
                    <Form>
                        <h1>Sign In</h1>
                         <Field>
                             <span>Name:</span>
                             <input name="name" onChange={(e) => setName(e.target.value)} value={name}/>
                         </Field>
                        <Field>
                            <span>Password:</span>
                            <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        </Field>
                        <Field>
                            <span>Confirm Password:</span>
                            <input name="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                        </Field>
                        <Field>
                            <span>Email:</span>
                            <input name="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        </Field>
                        <Field>
                            <span>Address:</span>
                            <input name="address"  onChange={(e) => setAddress(e.target.value)} value={address}/>
                        </Field>
                        {error && <div style={{color: 'red'}}>{error}</div>}
                        {success && <div style={{color: 'green'}}>{success}</div>}
                        <ConfirmButton onClick={() => {
                            validate()
                        }}>Sign In</ConfirmButton>
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
