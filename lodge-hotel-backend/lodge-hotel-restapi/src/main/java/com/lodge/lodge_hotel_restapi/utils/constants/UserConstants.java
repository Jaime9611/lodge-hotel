package com.lodge.lodge_hotel_restapi.utils.constants;

public class UserConstants {

  public static final String ROLE_USER = "ROLE_USER";
  public static final String ROLE_STAFF = "ROLE_STAFF";
  public static final String ROLE_MANAGER = "ROLE_MANAGER";

  public static final String MANAGER_ACCESS = "hasAnyRole('" + ROLE_MANAGER + "')";
  public static final String EMPLOYEE_ACCESS = "hasAnyRole('" + ROLE_MANAGER + "', '" + ROLE_STAFF + "')";
  public static final String AUTH_ACCESS = "hasAnyRole('" + ROLE_MANAGER + "', '" + ROLE_STAFF + "', '" + ROLE_USER + "')";
}
