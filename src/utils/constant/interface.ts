export interface UserAttributes {
    id?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;

}



export interface ItemAttributes {
    id?: string;
    userId: string;
    title?: string;
    description?: string;
    image?: string;
    startingBid: number;
    reservePrice: number;
    auctionEndTime: Date;

}