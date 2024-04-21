import styled from 'styled-components'
import Header from './components/Header'
import {useNavigate} from "react-router-dom";

export default () => {
    const navigate = useNavigate()

    return (
      <PageContainer>
          <Header />
          <ContentContainer>
              <ThankyouHeader >
                  Thanks for your order!
              </ThankyouHeader>
              <ThankyouHint >
                  Your payment is complete!
              </ThankyouHint>
              <BackButton onClick={() => {
                  navigate("/")
              }}>
                  <span>Continue to shop</span>
              </BackButton>
          </ContentContainer>

      </PageContainer>
    )

}

const PageContainer = styled.div``


const ContentContainer = styled.div`
  width: 100%;
  max-width: 540px;
  text-align: center;
  margin: auto;
  padding-bottom: 48px;
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 16px 0px, rgb(0 0 0 / 8%) 0px 0px 16px 0px;
`


const ThankyouHeader = styled.h1`
  color: #2A2A2A;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.25;
  margin: 40px auto 24px;
`

const ThankyouHint = styled.h6`
  margin-bottom: 40px;
  color: #54545E;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  margin-top: 0;
`

const BackButton = styled.button`
    border-radius: 6px;
    height: 40px;
    line-height: normal;
    border: 1px solid rgb(87, 212, 108);
    font-size: 14px;
    font-weight: bold;
    padding: 6px 16px;
    background-color: rgb(61, 255, 47);
    color: rgb(255, 255, 255);
    box-shadow: none;
    width: auto;
    margin: 0px;
    cursor: pointer;

    & span {
        text-transform: none;
        width: 100%;
        font-size: 14px;
        font-weight: bold;
        color: rgb(255, 255, 255);
    }
`
