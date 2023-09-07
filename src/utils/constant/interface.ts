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
  auctionId?: string;
  auctionEndTime?: Date;
}

export interface BidderAttributes {
  id?: string;
  userId?: string;
  auction?: string;
  bidAmount?: number;
  isPaid?: boolean;
  timeStamp?: Date;
}

export interface AuctionAttributes {
  id?: string;
  userId?: string;
  item?: ItemAttributes;
  highestBidder?: string;
  auctionStartTime?: Date;
  auctionEndTime?: Date;
}
