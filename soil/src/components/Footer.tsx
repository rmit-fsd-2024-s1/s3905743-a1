import styled from "styled-components";

export default () => {
    return (
        <Container>
        <Row>
            <Col>
                <Label>Website</Label>
                <Value><a href="http://localhost" target="_blank">https://wwww.soil.com</a></Value>
            </Col>
            <Col>
                <Label>Email</Label>
                <Value><a href="mailto:soil@gmail.com">soil@gmail.com</a></Value>
            </Col>
            <Col>
                <Label>Phone</Label>
                <Value><a href="tel:123-456-7890">123-456-7890</a></Value>
            </Col>
        </Row>
        <Row>
            <Col>
                <Label>Address</Label>
                <Value>1234 Soil St, Soil City, Soil State, 12345</Value>
            </Col>
            <Col>
                <Label>Hours</Label>
                <Value>Mon-Fri: 9am-5pm</Value>
            </Col>
            <Col>
                <Label>Social</Label>
                <Value>
                    <a href="https://www.facebook.com" target="_blank">Facebook</a>
                    <a href="https://www.twitter.com" target="_blank">Twitter</a>
                    <a href="https://www.instagram.com" target="_blank">Instagram</a>
                </Value>
            </Col>
        </Row>
        </Container>
    )
}

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

const Col = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    text-align: left;
    width: 200px;
    
`

const Label = styled.div`
    display: inline;
    font-weight: bold;
`

const Value = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    font-size: 14px;
    font-weight: 400;
    color: lightslategray;
`

const Container = styled.div`
    margin-top: 30px;
    margin-bottom: 50px;
    background: #e8e8e8;
    padding: 20px;
`
