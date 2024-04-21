import styled from 'styled-components'
import Header from './components/Header'
import {
    cartItemsWithPersistence,
    showCartModal,
    storeItems,
    StoreItemType,
    userInfoWithPersistence,
    userReviews
} from './atoms/store'
import {useAtom, useAtomValue, useSetAtom} from 'jotai'
import { Link, useParams } from 'react-router-dom'
import StoreItem from './components/StoreItem'
import GoBackButton from './components/GoBackButton'
import {useEffect, useState} from "react";

export default () => {
    const items = useAtomValue(storeItems)
    const [reviews, setReviews] = useAtom(userReviews)
    const [userInfos, setUserInfos] = useAtom(userInfoWithPersistence)
    const setMyItems = useSetAtom(cartItemsWithPersistence)
    const setShowCartModal = useSetAtom(showCartModal)
    const { itemId } = useParams()
    const item = items.filter((item) => itemId && item.id === +itemId)[0]
    const review = reviews.filter((review) => review.productId === item.id)?.[0]
    const [updateReview, setUpdateReview] = useState(review?.review)
    const [stars, setStars] = useState(review?.stars || 1)

    const [notEdit, setNotEdit] = useState(true)

    const [hint, setHint] = useState<string>()

    const saveReview = () => {
            if(review) {
                setReviews(reviews.map((r) => {
                    if (r.productId === item.id) {
                        return {...r, review: updateReview!!, stars: stars, productId: item.id}
                    } else {
                        return r
                    }
                }))
                setNotEdit(true)
            } else {
                setReviews([...reviews, {productId: item.id, review: updateReview!!, stars: stars}])
                setNotEdit(true)
            }
    }

    useEffect(() => {
        if(hint) {
            setTimeout(() => setHint(''), 1000)
        }
    }, [hint]);


    return (
        <DetailContainer>
            <Header />
            <ContentContainer>
                <ProductDetail>
                    <ItemImage src={`/images/${item.image}`}></ItemImage>
                    <ItemSummary>
                        <GoBackButton path={'/'} left={15} top={-65} />
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>{`$${item.price}`}</ItemPrice>
                        <AddToCartButton
                            onClick={() => {
                                setMyItems((prev: StoreItemType[]) => {
                                    if (prev.filter((i) => i.id === item.id).length === 0) {
                                        return [...prev, item]
                                    } else {
                                        return prev
                                    }
                                })
                                setShowCartModal(true)
                            }}
                        >
                            <span>ADD TO CART</span>
                        </AddToCartButton>
                    </ItemSummary>
                </ProductDetail>
                <Comments>
                    {
                        review  && notEdit && (
                            <div>
                                <div>
                                Reviews: <textarea style={{padding: 30}} value={review.review}/>
                                </div>
                                <div style={{marginTop: 30}}>Stars: {stars}</div>
                                <div style={{display: "flex", justifyContent:"space-evenly", marginTop: 30}}>
                                <Edit onClick={() => {
                                    setNotEdit(false)
                                }}>Edit</Edit>
                                <Delete onClick={() => {
                                    setReviews(reviews.filter((r) => r.productId !== item.id))
                                    setUpdateReview('')
                                    setStars(1)
                                    setHint('Review deleted')
                                }}>Delete</Delete>
                                </div>
                            </div>
                        )
                    }
                    {
                        userInfos.name && (!notEdit || !review) && (
                            <div>
                                <div>
                                    <span>Review: </span>
                                    <textarea style={{padding: 40}} value={updateReview} onChange={(e) =>{
                                       // @ts-ignore
                                        setUpdateReview(e.target.value as string)
                                    }}/>
                                </div>
                                <div style={{marginTop: 30}}>
                                  <span>Stars:</span>
                                   <select  style={{marginLeft: 20}} onChange={(e) => {
                                        // @ts-ignore
                                       setStars(e.target.value)
                                   }}>
                                        <option selected={stars == 1} value={1}>1</option>
                                        <option selected={stars == 2} value={2}>2</option>
                                        <option selected={stars == 3} value={3}>3</option>
                                        <option selected={stars == 4} value={4}>4</option>
                                        <option selected={stars == 5} value={5}>5</option>
                                   </select>
                                </div>
                                    <SubmitButton onClick={() => {
                                        saveReview()
                                        setHint('Review saved')
                                    }}>
                                        Submit
                                    </SubmitButton>
                            </div>
                        )
                    }
                    {
                        hint && (
                            <div style={{color: 'green', marginTop: 30}}>
                                {hint}
                            </div>
                        )
                    }
                </Comments>
                <Recommendations>
                    <RecommendationHeader>Recommendations</RecommendationHeader>
                    <RecommendationItems>
                        {items.slice(0, 4).map((item) => (
                            <Link to={`/product/${item.id}`}>
                                <StoreItem {...item} />
                            </Link>
                        ))}
                    </RecommendationItems>
                </Recommendations>
            </ContentContainer>
        </DetailContainer>
    )
}

const Recommendations = styled.div``

const RecommendationHeader = styled.h3`
    text-align: center;
    margin-bottom: 48px;
    color: #2a2a2a;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
`

const RecommendationItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & a {
        all: unset;
    }
`

const DetailContainer = styled.div``

const ContentContainer = styled.div`
    margin: 0px auto 100px;
    padding: 0px;
`

const ProductDetail = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 140px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    @media only screen and (max-width: 1098px) {
        flex-direction: column;
    }
`

const ItemImage = styled.img`
    filter: drop-shadow(rgba(22, 37, 51, 0.32) 0px 24px 38px);
    margin-top: 0px;

    @media only screen and (max-width: 1098px) {
        width: 90%;
        margin: auto;
    }
`

const ItemSummary = styled.div`
    width: 416px;
    position: relative;
    margin-left: 30px;

    @media only screen and (max-width: 1098px) {
        position: unset;
        width: 100%;
    }
`

const ItemName = styled.h1`
    margin-top: 25px;
    @media only screen and (max-width: 1098px) {
        margin-top: 50px;
    }
`

const ItemPrice = styled.h1`
    color: #2a2a2a;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.25;
    margin-top: 32px;
`

const AddToCartButton = styled.button`
    border-radius: 2px;
    margin-top: 32px;
    color: #fff;
    background-color: #161412;
    padding: 6px 16px;
    font-size: 16px;
    min-width: 64px;
    width: 100%;

    & span {
        font-size: 16px;
        font-weight: 500;
        line-height: 2.15;
        color: #fff;
    }
`



const Comments = styled.div`
    display: flex;
    justify-content: center;
   textarea {
       width: 300px;
       height: 300px;
   }    
    
    margin-bottom: 200px;
`

const SubmitButton = styled.div`
    border-radius: 2px;
    color: #161412;
    background-color: white;
    padding: 6px 16px;
    font-size: 16px;
    min-width: 64px;
    font-weight: 500;
    line-height: 2.15;
    box-sizing: border-box;
    cursor: pointer;
    
    margin-left: auto;
    margin-right: auto;
    
    margin-top: 30px;

    &:hover {
        background-color: #d9d9d9;
        cursor: pointer;
    }

    text-align: center;
    width: 200px;
    border: 1px solid #fbcf61;
    border-radius: 5px;

`

const Edit = styled.div`
    margin-left: 10px;
    display: inline-block;
    color: rgba(11, 88, 186, 0.5);
    cursor: pointer;

    &hover {
        color: rgba(170, 40, 126, 0.8);
    }
    `
const Delete = styled.div`
    margin-left: 10px;
    display: inline-block;
    color: rgba(11, 88, 186, 0.5);

    cursor: pointer;
    &hover {
        color: rgba(170, 40, 126, 0.8);
    }
    `
