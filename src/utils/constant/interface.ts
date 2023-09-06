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
    userId?: string;
    title?: string;
    description?: string;
    image?: string;
    startingBid?: number;
    reservePrice?: number;
    auctionEndTime?: Date;

}


export interface BidderAttributes {
    id?: string;
    bidAmount?: number;
    timeStamp?: Date;
    itemId?: string;

}

export interface AuctionAttributes {
    id?: string;
    itemId?: string;
    highestBidder?: string;
    auctionStartTime?: Date;
    auctionEndTime?: Date;
}