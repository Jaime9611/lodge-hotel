export class ROUTES {
  static readonly dashboard = "dashboard";
  static readonly dashboard_path = `/${this.dashboard}`;

  static readonly login = "login";
  static readonly login_path = `/${this.login}`;

  static readonly cabins = "cabins";
  static readonly cabins_path = `/${this.cabins}`;

  static readonly bookings = "bookings";
  static readonly bookings_path = `/${this.bookings}`;
  static readonly bookingId_path = `${this.bookings}/:bookingId`;

  static readonly users = "users";
  static readonly users_path = `/${this.users}`;

  static readonly settings = "settings";
  static readonly settings_path = `/${this.settings}`;
}

export const PAGE_SIZE = 5;

export const ROLE = {
  USER: "ROLE_USER",
  STAFF: "ROLE_STAFF",
  MANAGER: "ROLE_MANAGER",
};
