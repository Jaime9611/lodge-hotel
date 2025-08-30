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

// export interface CabinModel {
//   id: number;
//   created_at?: string;
//   name: string;
//   maxCapacity: number;
//   regularPrice: number;
//   discount: number;
//   description: string;
//   image: string;
// }

export interface CabinModelForm extends Omit<CabinModel, "image" | "id"> {
  image: FileList | string;
}

export interface CabinModelFormResult extends Omit<CabinModel, "image" | "id"> {
  image: File | string;
  id?: number;
}

export interface CabinModelPage extends Page<CabinModel> {}

//---------------- GUEST MODELS ----------------

export interface GuestModel {
  fullName: string;
  email: string;
  country: string;
  countryFlag: string;
  nationalID: string;
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
  cabin: CabinModel;
  cabinPrice: number;
  extrasPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
}

export interface BookingModelPage extends Page<BookingModel> {}
