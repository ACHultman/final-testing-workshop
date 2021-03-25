import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/home", () => "mocked-home");

describe("App component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders home text", async () => {
    render(<App />);
    const linkElement = screen.getByText(/home/i);

    expect(linkElement).toBeInTheDocument();
  });

  it("contains mocked home", () => {
    const { baseElement } = render(<App />);
    const mockedHome = baseElement.querySelector("mocked-home");

    expect(mockedHome).toBeTruthy();
    expect(mockedHome?.getAttribute("name")).toBe("John Johnson");
  });
});
