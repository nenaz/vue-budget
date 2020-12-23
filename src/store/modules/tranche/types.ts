import {
  Loan,
  Line,
  Offer,
  Card,
  ClientProfile,
  Errors,
} from '../../types';

// interface Profile {
//   id?: string;
// }
// interface Offer {
//   id?: string;
// }
// interface Line {
//   id?: string;
// }
interface Product {
  amount: {
    min: number;
    max: number;
  };
  termMonths: {
    min: number;
    max: number;
    maxDeferred: number;
  };
  percentYear: number;
}
// interface Card {
//   id?: string;
// }
// interface Loans {
//   id?: string;
// }

export enum TrancheStatuses {
  CREATED = 'created',
  EXPIRED = 'expire',
  ACTIVATED = 'activated',
  PREPARED = 'prepared',
  SCORED = 'scored',
  TUNED = 'tuned',
  BUILT = 'built',
  CONFIRMED = 'confirmed',
  SIGNED = 'signed',
  COMPLETED = 'completed',
}

export interface Sign {
  created: string;
  expired: string;
  key: string;
  uuid: string;
}

export interface Employment {
  income?: number;
  experience?: number;
  organization?: string;
  ownership?: string;
  sector?: string;
  specialization?: string;
  position?: string;
  address?: string;
  phone?: string;
}

export interface Document {
  uuid: string;
  title: string;
}

export interface Tranche {
  activated?: string;
  beginDate?: string;
  built?: string;
  card?: Card;
  closed?: string;
  completed?: string;
  confirmed?: string;
  scored?: string;
  tuned?: string;
  created?: string;
  employment?: Employment;
  errors?: Errors[];
  expire?: string;
  line?: Line;
  loans?: Loan[];
  offer?: Offer;
  prepared?: string;
  product?: Product;
  profile?: ClientProfile;
  sign?: any;
  newCard?: any;
  creditOffer?: any;
  agreementOffer?: any;
  creditRequest?: any;
  uuid: string;
  documents?: Document[];
  creditOffers?: any[];
}
