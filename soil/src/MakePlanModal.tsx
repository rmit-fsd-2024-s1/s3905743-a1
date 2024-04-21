import styled from "styled-components";
import {useEffect, useRef } from "react";
import {useAtom, useAtomValue} from "jotai";
import {
    dietPlanWithPersistence,
    generatedPlanWithPersistence,
    showMakePlanModal, storeItems
} from "./atoms/store";

function selectRandomItems<T>(arr: T[], num: number) {
    return arr.sort(() => 0.5 - Math.random()).slice(0, num);
}

export default () => {
    const items = useAtomValue(storeItems)
    const [display, setDisplay] = useAtom(showMakePlanModal)
    const [dietPlan, setPlan] = useAtom(dietPlanWithPersistence)
    const [generatedPlan, setGeneratedPlan] = useAtom(generatedPlanWithPersistence)
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

    const makePlan = () => {
        const plan = selectRandomItems(items, 5)
        setGeneratedPlan(plan)
    }

    return (
        <Overlay show={display}>
            <ModalContent ref={ref as any}>
                <Container>
                    <CloseButton onClick={() => setDisplay(false)}>X</CloseButton>
                    <Form>
                        <h1>Diet Plan</h1>
                        <Section>
                            <h2>Personal Data</h2>
                            <Field>
                                <span>Age:</span>
                                <input type="number" value={dietPlan.current?.age} onChange={
                                    (e) => setPlan({...dietPlan, current: {...dietPlan.current, age: parseInt(e.target.value)}}
                                )}/>
                            </Field>
                            <Field>
                                <span>Height:</span>
                                <input type="number" value={dietPlan.current?.height} onChange={(e) => {
                                    setPlan({...dietPlan, current: {...dietPlan.current, height: parseInt(e.target.value)}})
                                }} />
                            </Field>
                            <Field>
                                <span>Weight:</span>
                                <input type="number" value={dietPlan.current?.weight} onChange={(e) => {
                                    setPlan({...dietPlan, current: {...dietPlan.current, weight: parseInt(e.target.value)}})
                                }} />
                            </Field>
                            <Field>
                                <span>Meal Preference:</span>
                                <select onChange={
                                    (e) => setPlan({...dietPlan, current: {...dietPlan.current, preference: e.target.value as any}}
                                )} >
                                    <option selected={dietPlan.current?.preference === 'vegan'} value={'vegan'}>Vegan</option>
                                    <option selected={dietPlan.current?.preference === 'vegetarian'} value={'vegetarian'}>Vegetarian</option>
                                    <option selected={dietPlan.current?.preference === 'paleo'} value={'paleo'}>Paleo</option>
                                    <option selected={dietPlan.current?.preference === 'keto'} value={'keto'}>Keto</option>
                                    <option selected={dietPlan.current?.preference === 'pescatarian'} value={'pescatarian'}>pescatarian</option>
                                </select>
                            </Field>
                        </Section>
                        <Section>
                            <h2>Goat</h2>
                            <Field>
                                <span>Weight:</span>
                                <input type="number" value={dietPlan.goat?.weight} onChange={(e) => {
                                    setPlan({...dietPlan, goat: {...dietPlan.goat, weight: parseInt(e.target.value)}})
                                }} />
                            </Field>
                            <Field>
                                <span>Muscle:</span>
                                <input type="number" value={dietPlan.goat?.muscle} onChange={(e) => {
                                    setPlan({...dietPlan, goat: {...dietPlan.goat, muscle: parseInt(e.target.value)}})
                                }} />
                            </Field>
                            <Field>
                                <span>BMI:</span>
                                <input type="number" value={dietPlan.goat?.bmi} onChange={(e) => {
                                    setPlan({...dietPlan, goat: {...dietPlan.goat, bmi: parseInt(e.target.value)}})
                                }} />
                            </Field>
                        </Section>

                        <ConfirmButton onClick={() => {
                            makePlan()
                        }}>Generate Plan</ConfirmButton>
                        <Section>
                            <h2>Plan</h2>
                            {generatedPlan?.map((item, index) => {
                                    return (
                                        <DayPlan key={item.id}>
                                            <h3>Day{index + 1}</h3>
                                            <h4>{item.name}</h4>
                                            <img src={`/images/${item.image}`}/>
                                        </DayPlan>
                                    )
                                })}
                        </Section>
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

    input, select {
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

const Section = styled.div``

const DayPlan = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
    img {
        width: 300px;
        height: 300px;
    }
`
