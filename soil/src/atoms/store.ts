import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import exp from "node:constants";

export interface StoreItemType {
    id: number
    name: string
    price: number
    image: string
}

export interface UserInfo {
    name: string
    password: string
    email: string
    signUpDate:number
    address?: string
}


export const specialItems = atomWithStorage('specialItems', [
 {
    id: 3,
    name: 'Organic Avocado',
    price: 15,
    image: 'food3.jpg',
}, {
    id: 4,
    name: 'Organic Strawberries',
    price: 10,
    image: 'food4.jpg',
}, {
    id: 5,
    name: 'Organic Blueberries',
    price: 12,
    image: 'food5.jpg',
}, {
    id: 6,
    name: 'Organic Mango',
    price: 9,
    image: 'food6.jpg',
}, {
    id: 8,
    name: 'Organic Papaya',
    price: 10,
    image: 'food8.jpg',
}] as StoreItemType[])

export interface DietPlanData {
    current: {
        age: number
        weight: number
        height: number
        preference: 'vegan' | 'vegetarian' | 'pescatarian' | 'keto' | 'paleo'
    },
    goat: {
        weight: number
        muscle: number
        bmi: number
    },
}


export interface Reviews {
    productId: number
    review: string
    stars: number
}

export const showSignIn = atom(false)
export const showCartModal = atom(false)
export const showCheckoutModal = atom(false)
export const showProfileModal = atom(false)
export const showMakePlanModal= atom(false)
export const cartItemsWithPersistence = atomWithStorage('cartItems', [] as StoreItemType[])
export const userReviews = atomWithStorage('userReviews', [] as Reviews[])
export const dietPlanWithPersistence = atomWithStorage('dietPlan', {} as DietPlanData)
export const generatedPlanWithPersistence = atomWithStorage('generatedPlan', [] as StoreItemType[])
export const userInfoWithPersistence= atomWithStorage('userInfo', {} as UserInfo)
export const storeItems = atom([{
    id: 1,
    name: 'Organic Bananas',
    price: 12,
    image: 'food1.jpg',
}, {
    id: 2,
    name: 'Organic Apples',
    price: 8,
    image: 'food2.jpg',
}, {
    id: 3,
    name: 'Organic Avocado',
    price: 15,
    image: 'food3.jpg',
}, {
    id: 4,
    name: 'Organic Strawberries',
    price: 10,
    image: 'food4.jpg',
}, {
    id: 5,
    name: 'Organic Blueberries',
    price: 12,
    image: 'food5.jpg',
}, {
    id: 6,
    name: 'Organic Mango',
    price: 9,
    image: 'food6.jpg',
}, {
    id: 7,
    name: 'Organic Pineapple',
    price: 8,
    image: 'food7.jpg',
}, {
    id: 8,
    name: 'Organic Papaya',
    price: 10,
    image: 'food8.jpg',
}] as StoreItemType[])

