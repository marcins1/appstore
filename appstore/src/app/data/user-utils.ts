export interface AppListElement{
  appID: String,
  appName: String,
  purchaseDate: Date,
  price: Number,
  paymentMethod: String
}

export interface PremiumSubscription{
  subscriptionID: String,
  dateFrom: Date,
  dateTo: Date
}

export interface CartElement{
  appID: string
}

export interface User{
  userID: string,
  username: string,
  email: string,
  role: string,
  listOfApps: AppListElement[],
  premiumSubs: PremiumSubscription[],
  cart: CartElement[]
}

