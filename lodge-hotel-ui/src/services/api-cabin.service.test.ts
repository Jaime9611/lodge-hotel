import { describe, it, expect } from "vitest";

import { afterAll } from "vitest";
import { apiCabin } from "@services";
import { MOCK_CABINS } from "@mocks/cabin-handlers";
import type { CabinModelFormResult } from "@models";

describe("Cabin Service", {}, () => {
  afterAll(() => {
    vi.resetAllMocks();
  });

  it("returns the cabin data", async () => {
    const response = await apiCabin.getAll();

    await expect(response).toStrictEqual(MOCK_CABINS);
  });

  it("returns the cabin data with parms", async () => {
    const response = await apiCabin.getAll({ field: "id", direction: "asc" });

    await expect(response).toStrictEqual(MOCK_CABINS);
  });

  it("return cabins by Capacity", async () => {
    const response = await apiCabin.getAllByCapacity(2, 3);

    await expect(response.length).toBe(1);
  });

  it("return cabin by id", async () => {
    const response = await apiCabin.getCabin(1);

    await expect(response).toStrictEqual(MOCK_CABINS.content[0]);
  });

  it("return Error when bad request for cabin by id", async () => {
    await expect(() => apiCabin.getCabin(2)).rejects.toThrowError(
      "Error Getting Cabin"
    );
  });

  it("should create cabin", async () => {
    const mockCabin: CabinModelFormResult = {
      name: "cabin test",
      createdAt: "2014-14-1",
      description: "",
      maxCapacity: 4,
      image: "",
      regularPrice: 200,
      discount: 0,
    };
    const response = await apiCabin.createEditCabin(mockCabin);

    await expect(response).toBeTruthy();
  });

  it("should update cabin with id", async () => {
    const mockCabin: CabinModelFormResult = {
      id: 1,
      name: "cabin test",
      createdAt: "2014-14-1",
      description: "",
      maxCapacity: 4,
      image: "",
      regularPrice: 200,
      discount: 0,
    };
    const response = await apiCabin.createEditCabin(mockCabin, mockCabin.id);

    await expect(response).toBeTruthy();
  });

  it("should throw Error on bad update request", async () => {
    const mockCabin: CabinModelFormResult = {
      id: 100,
      name: "cabin test",
      createdAt: "2014-14-1",
      description: "",
      maxCapacity: 4,
      image: "",
      regularPrice: 200,
      discount: 0,
    };

    await expect(() =>
      apiCabin.createEditCabin(mockCabin, mockCabin.id)
    ).rejects.toThrowError("Cabin could not be created.");
  });

  it("deletes cabin by id", async () => {
    const response = await apiCabin.deleteCabin(1);

    await expect(response).toBeTruthy();
  });
  it("return Error when bad request for delete cabin by id", async () => {
    await expect(() => apiCabin.deleteCabin(2000)).rejects.toThrowError(
      "Cabin could not be deleted"
    );
  });
});
