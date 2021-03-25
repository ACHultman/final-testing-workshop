import { render } from "@testing-library/react";
import ListItem from "../list-item";

describe("listItem component", () => {
  it("matches snapshot", () => {
    const { baseElement } = render(<ListItem text={"test text"} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("inserts placeholder", () => {
    const placeholder = "No entry";
    const { getByText } = render(<ListItem text={undefined} />); // maybe ?? not necessary
    getByText(placeholder);
  });
});
