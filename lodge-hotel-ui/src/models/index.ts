// ---------------- COMMON ----------------
export interface Page<T> {
  content: T[];
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// ---------------- AUTH MODELS ----------------

export interface UserModel {
  id: number;
  username: string;
  password: string;
}

export interface AuthUserModel {
  user: string;
  role: string;
}

export interface LoginModel {
  user: AuthUserModel;
  access_token: string;
}

export interface LoginResponse {
  access_token: string;
  expiresAt: number;
}

//---------------- CABIN MODELS ----------------

export interface CabinModel {
  id: number;
  name: string;
  regularPrice: number;
  maxCapacity: number;
  createdAt: string;
  discount: number;
  description: string;
  image: string;
}

export interface CabinModelForm extends Omit<CabinModel, "image" | "id"> {
  image: FileList | string;
}

export interface CabinModelFormResult extends Omit<CabinModel, "image" | "id"> {
  image: File | string;
  id?: number;
}

export interface CabinModelPage extends Page<CabinModel> {}

export interface CabinRequest {
  id: number;
  name: string;
}

export interface CabinCartItem extends Pick<CabinModel, "id" | "name"> {}

//---------------- GUEST MODELS ----------------

export interface GuestModel {
  fullName: string;
  email: string;
  country: string;
  countryFlag: string;
  nationalId: string;
}

//---------------- BOOKING MODELS ----------------

export interface BookingModel {
  id: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: string;
  guest: GuestModel;
  cabins: CabinModel[];
  isPaid: boolean;
}

export interface BookingModelForm extends Omit<BookingModel, "id"> {
  image: FileList | string;
}

export interface BookingModelFormResult
  extends Omit<
    BookingModel,
    "createdAt" | "id" | "numNights" | "totalPrice" | "status" | "isPaid"
  > {
  id?: number;
  isPaid?: boolean;
  status?: string;
}

export interface BookingModelPage extends Page<BookingModel> {}

export interface BookingQuotationRequest {
  cabins: CabinRequest[];
  startDate: string;
  endDate: string;
}
