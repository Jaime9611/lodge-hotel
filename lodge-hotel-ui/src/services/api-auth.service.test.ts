import { describe, it, expect } from "vitest";

import { afterAll } from "vitest";
import { apiAuth } from "@services";
import type { UserLoginModel } from "@models";
import { MOCK_USER } from "@mocks/login-handlers";
import { MOCK_PASSWORD } from "@mocks/login-handlers";

const mockDecodedToken = {
  role: "STAFF",
};

vi.mock("jwt-decode", () => ({
  jwtDecode: () => mockDecodedToken,
}));

describe("Auth Service", {}, () => {
  afterAll(() => {
    vi.resetAllMocks();
  });

  it("returns the correct object with user info", async () => {
    const mockUser: UserLoginModel = {
      username: MOCK_USER,
      password: MOCK_PASSWORD,
    };

    const response = await apiAuth.login(mockUser);

    await expect(response).toStrictEqual({
      access_token: "MY_TOKEN",
      user: {
        role: "S",
        user: "test",
      },
    });
  });
});
