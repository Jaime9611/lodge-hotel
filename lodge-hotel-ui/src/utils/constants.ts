export class ROUTES {
  static readonly user_cabins = "cabins";
  static readonly user_cabins_path = `/${this.user_cabins}`;
  static readonly user_cabinId_path = `/${this.user_cabins}/:cabinId`;

  static readonly about = "about";
  static readonly about_path = `/${this.about}`;

  static readonly user_account = "account";
  static readonly user_account_path = `/${this.user_account}`;

  static readonly user_profile = "profile";
  static readonly user_profile_path = `/${this.user_account}/${this.user_profile}`;

  static readonly user_reservations = "reservations";
  static readonly user_reservations_path = `/${this.user_reservations}`;

  static readonly dashboard = "dashboard";
  static readonly dashboard_path = `/${this.dashboard}`;

  static readonly login = "login";
  static readonly login_path = `/${this.login}`;

  static readonly signup = "signup";
  static readonly signup_path = `/${this.signup}`;

  static readonly cabins = "cabins";
  static readonly cabins_path = `/${this.dashboard}/${this.cabins}`;
  static readonly cabinId_path = `/${this.dashboard}/${this.cabins}/:cabinId`;

  static readonly bookings = "bookings";
  static readonly bookings_path = `/${this.dashboard}/${this.bookings}`;
  static readonly bookingId_path = `/${this.dashboard}/${this.bookings}/:bookingId`;

  static readonly checkin = "checkin";
  static readonly booking_checkin = `${this.checkin}/:bookingId`;
  static readonly booking_checkin_path = `/${this.dashboard}/${this.checkin}`;

  static readonly users = "users";
  static readonly users_path = `/${this.dashboard}/${this.users}`;

  static readonly settings = "settings";
  static readonly settings_path = `/${this.dashboard}/${this.settings}`;
}

export const PAGE_SIZE = 5;

export const ROLE = {
  USER: "ROLE_USER",
  STAFF: "ROLE_STAFF",
  MANAGER: "ROLE_MANAGER",
};
