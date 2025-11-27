import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Table from "./table.component";

describe("Table Component", {}, () => {
  beforeAll(() => {
    vi.mock("../../../features/authentication/use-user.hook", () => ({
      useUser: () => ({ user: {}, isLoading: false }),
    }));
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders passed children", () => {
    render(<Table columns={"1fr 1fr"}>data</Table>);

    expect(screen.getByText("data")).toBeInTheDocument();
  });

  it("renders subcomponents", () => {
    render(
      <Table columns={"1fr 1fr"}>
        <Table.Header>
          <div>id</div>
          <div>name</div>
          <div>price</div>
        </Table.Header>
        <Table.Body
          data={[{ id: 1, name: "test", price: 200 }]}
          render={(item) => (
            <Table.Row>
              <p>{item.id}</p>
              <p>{item.name}</p>
              <p>{item.price}</p>
            </Table.Row>
          )}
        />
        <Table.Footer>
          <div>Table Footer</div>
        </Table.Footer>
      </Table>
    );

    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("price")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("Table Footer")).toBeInTheDocument();
  });
});
