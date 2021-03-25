import { render, fireEvent } from "@testing-library/react";
import TextForm from "../text-form";

describe("textForm component", () => {
  it("matches snapshot", () => {
    const { baseElement } = render(
      <TextForm handleSubmit={jest.fn()} handleChange={jest.fn()} text={""} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it("calls handleChange function when input changes", () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <TextForm
        handleSubmit={jest.fn()}
        handleChange={handleChange}
        text={""}
      />
    );
    const input: HTMLInputElement = getByTestId(
      "text-input"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleSubmit function when submit button clicked", () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <TextForm
        handleSubmit={handleSubmit}
        handleChange={jest.fn()}
        text={""}
      />
    );
    fireEvent.submit(getByTestId("form"));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
