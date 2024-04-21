import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export default ({ path, left, top }: { path: string; left: number; top: number }) => {
    const navigate = useNavigate()

    return (
        <GoBackButton left={left} top={top} onClick={() => navigate(path)}>
            <GoBackArrow src={'/images/arrow.svg'} />
            <GoBackText>Back</GoBackText>
        </GoBackButton>
    )
}

const GoBackButton = styled.button<{ left: number; top: number }>`
    position: absolute;
    top: -30px;
    left: 0px;
    padding: 6px 8px;
    border: 0;
    cursor: pointer;
    margin: 0;
    display: inline-flex;
    text-decoration: none;
    background-color: transparent;
    align-items: center;

    & span {
        width: 100%;
        color: #2a2a2a;
        font-weight: 500;
        line-height: 2.15;
        font-size: 16px;
    }

    &:hover {
        background-color: #f8f8f8;
    }

    @media only screen and (max-width: 1098px) {
        top: ${(props) => props.top}px;
        left: ${(props) => props.left}px;
    }
`
const GoBackArrow = styled.img``
const GoBackText = styled.p`
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    margin-left: 10px;
    margin-top: 0;
    margin-bottom: 0;
`
