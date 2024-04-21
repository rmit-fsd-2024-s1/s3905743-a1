import styled from 'styled-components'
import {useAtom, useSetAtom} from 'jotai'
import {
    showMakePlanModal,
    showProfileModal,
    userInfoWithPersistence
} from '../atoms/store'
import {useEffect, useRef, useState} from 'react'

export default () => {
    const [userInfo, setUserInfo] = useAtom(userInfoWithPersistence)
    const setShowProfileModal = useSetAtom(showProfileModal)
    const setShowMakePlanModal = useSetAtom(showMakePlanModal)


    const ref = useRef()
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            // @ts-expect-error
            if (ref.current && !ref.current.contains(event.target)) {
                setShowProfileModal(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setShowProfileModal, ref])

    const [editState, setEditState] = useState(false)
    const [emailEditState, setEmailEditState] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if(saved) {
            setTimeout(() => setSaved(false), 1000)
        }
        if(deleted) {
            setTimeout(() => setDeleted(false), 1000)
        }

    }, [saved, deleted]);
    return (
        // @ts-expect-error
        <ModalContainer ref={ref}>
            <ModalHeader>User Profile</ModalHeader>
            <ModalContent>
                <InfoItems>
                    <div>
                        <label>Name:</label>
                        {editState ?
                            <input onChange={(e) =>{
                                setUserInfo({...userInfo, name: e.target.value})
                            }} value={userInfo.name}/> : <span>{userInfo.name}</span>
                        }
                        {editState && <Save onClick={() => {
                            setEditState(false)
                            setSaved(true)
                        }}>Save</Save>}
                        <Edit onClick={() => setEditState(true)}>Edit</Edit>
                    </div>
                    <div>
                        <label>Email:</label>
                        {emailEditState ?
                            <input onChange={(e) =>{
                                setUserInfo({...userInfo, email: e.target.value})
                            }} value={userInfo.email}/> : <span>{userInfo.email}</span>
                        }
                        {emailEditState && <Save onClick={() => {
                            setEmailEditState(false)
                            setSaved(true)
                        }
                        }>Save</Save>}
                        <Edit onClick={() => setEmailEditState(true)}>Edit</Edit>
                    </div>
                    {userInfo.address &&
                    <div>
                        <label>Address:</label>
                        <span>{userInfo.address}</span>
                        <Delete onClick={() => {
                            setUserInfo({...userInfo, address: ''})
                            setDeleted(true)
                        }}>Delete</Delete>
                    </div>
                    }
                    <div>
                        <label>Sign Up Date:</label>
                        <span>{new Date(userInfo.signUpDate).toLocaleString()}</span>
                    </div>

                    {saved &&
                    <div style={{marginTop: 20}}>
                        <span style={{color: "green"}}>You have changed your profile</span>
                    </div>
                    }
                    {
                        deleted &&
                        <div style={{marginTop: 20}}>
                            <span style={{color: "red"}}>You have deleted your address</span>
                        </div>
                    }
                </InfoItems>
                <MakePlan onClick={() => {
                    setShowMakePlanModal(true)
                    setShowProfileModal(false)

                }}>
                    Make Diet Plan
                </MakePlan>
            </ModalContent>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    display: block;
    width: 449px;
    padding: 32px;
    position: absolute;
    right: 0px;
    transition: all 0.2s linear 0s;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 20%) 0px 0px 16px;
    box-sizing: border-box !important;
`

const ModalHeader = styled.div`
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
`

const ModalContent = styled.div`
    width: 385px;
    background-color: rgba(163, 159, 159, 0.29) !important;
`

const InfoItems = styled.div`
    padding: 10px;
    margin-top: 30px;
    margin-bottom: 14px;

    div {
        margin-top: 10px;
    }
`

const Edit = styled.div`
    margin-left: 10px;
    display: inline-block;
    color: rgba(11, 88, 186, 0.5);

    &hover {
        color: rgba(170, 40, 126, 0.8);
    }
`

const Save = styled.div`
    margin-left: 10px;
    display: inline-block;
    color: rgba(11, 88, 186, 0.5);
`

const Delete = styled.div`
    margin-left: 10px;
    display: inline-block;
    color: rgba(186, 11, 98, 0.5);
`

const MakePlan = styled.div`
    display: flex;
    justify-content: center;
    color: green;
    border: 1px solid green;
    border-radius: 6px;
    padding: 6px 16px;
    margin-top: 20px;
    cursor: pointer;
    margin-bottom: 20px;
`
