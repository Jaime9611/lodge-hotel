import { describe, it, expect } from "vitest";

import { afterAll } from "vitest";
import { apiUser } from "@services";
import type { UserModel, UserModelFormResult } from "@models";

describe("User Service", {}, () => {
  afterAll(() => {
    vi.resetAllMocks();
  });

  it("returns the user data", async () => {
    const response = await apiUser.getData();

    await expect(response.username).toBe("test");
    await expect(response.id).toBe(1);
  });

  it("returns Employees", async () => {
    const response = await apiUser.getEmployees();

    await expect(response[0].username).toBe("test");
    await expect(response[0].id).toBe(1);
    await expect(response).length(1);
  });

  it("should create Employee", async () => {
    const mockUser: Omit<UserModel, "id"> = {
      username: "test",
      email: "test@email.com",
      phone: "12345",
      fullName: "test name",
      image: "image.jpg",
      password: "123",
    };

    const response = await apiUser.createEditEmployee(mockUser);

    await expect(response).toBe(true);
  });

  it("should update Employee", async () => {
    const mockUser: UserModelFormResult = {
      id: 1,
      username: "test",
      email: "test@email.com",
      phone: "12345",
      fullName: "test name",
      image: "image.jpg",
      password: "123",
    };

    const response = await apiUser.createEditEmployee(mockUser, mockUser.id);

    await expect(response).toBe(true);
  });

  it("should update throw Error on bad request", async () => {
    const mockUser: UserModelFormResult = {
      id: 2,
      username: "test",
      email: "test@email.com",
      phone: "12345",
      fullName: "test name",
      image: "image.jpg",
      password: "123",
    };

    await expect(() =>
      apiUser.createEditEmployee(mockUser, mockUser.id)
    ).rejects.toThrowError("Employee could not be created.");
  });

  it("should Delete user", async () => {
    const response = await apiUser.deleteEmployee(1);

    await expect(response).toBe(true);
  });

  it("should throw Error on Delete fails", async () => {
    await expect(() => apiUser.deleteEmployee(2)).rejects.toThrowError(
      "Employee could not be deleted"
    );
  });
});
