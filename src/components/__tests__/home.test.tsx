import {
  cleanup,
  findAllByRole,
  findByTestId,
  fireEvent,
  prettyDOM,
  queryByRole,
  queryByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { getKanyeQuote } from "../../api/quote";
import Home from "../home";

// Mock data
const testName = "test name";
const testListItem = "test list item";
const testEntryText = "test entry text";

// Mocks
jest.mock("../../api/quote", () => ({
  getKanyeQuote: jest.fn(),
}));

describe("Home component", () => {
  afterEach(() => {
    cleanup();
  });

  it("matches snapshot", () => {
    const { baseElement } = render(<Home name={testName} />);
    expect(baseElement).toMatchSnapshot();
  });

  describe("textForm submit", () => {
    it("adds text to list when full text submitted", async () => {
      const { getByTestId, findAllByText } = render(<Home name={testName} />);
      const input: HTMLInputElement = getByTestId(
        "text-input"
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: testEntryText } });
      fireEvent.submit(getByTestId("form"));
      const listItems = await findAllByText(testEntryText);
      expect(listItems).toHaveLength(1);
    });

    // extra test after 100% coverage
    it("adds multiple entries to list", async () => {
      const { getByTestId, findAllByText } = render(<Home name={testName} />);
      const input: HTMLInputElement = getByTestId(
        "text-input"
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: testEntryText } });
      fireEvent.submit(getByTestId("form"));
      fireEvent.change(input, { target: { value: testEntryText } });
      fireEvent.submit(getByTestId("form"));

      const listItems = await findAllByText(testEntryText);
      expect(listItems).toHaveLength(2);
    });

    // extra test after 100% coverage
    it("does nothing when empty text submitted", async () => {
      const { getByTestId, queryByRole } = render(<Home name={testName} />);
      const input: HTMLInputElement = getByTestId(
        "text-input"
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.submit(getByTestId("form"));
      const listItems = queryByRole("listitem");
      expect(listItems).toBe(null);
    });
  });

  describe("kanye time button", () => {
    afterEach(() => {
      cleanup();
    });

    it("adds quote to list", async () => {
      const { findAllByText } = render(<Home name={""} />);
      const kanyeButton = screen.getByRole("button", {
        name: /kanye time/i,
      });
      (getKanyeQuote as jest.Mock<any, any>).mockReturnValueOnce(testListItem);
      act(() => {
        kanyeButton.click();
      });
      const listItems = await findAllByText(testListItem);
      expect(getKanyeQuote).toHaveBeenCalled();
      expect(listItems).toBeTruthy();
      expect(listItems).toHaveLength(1);
    });

    // extra test after 100% coverage
    it("adds multiple quotes to list", async () => {
      const { queryAllByTestId } = render(<Home name={""} />);
      const kanyeButton = screen.getByRole("button", {
        name: /kanye time/i,
      });
      let listItems;

      (getKanyeQuote as jest.Mock<any, any>).mockReturnValueOnce(testListItem);
      fireEvent.click(kanyeButton);
      await waitFor(() => expect(queryAllByTestId("list-item")).not.toBeNull());
      (getKanyeQuote as jest.Mock<any, any>).mockReturnValueOnce(
        testListItem + " two"
      );
      fireEvent.click(kanyeButton);

      await waitFor(() => {
        listItems = expect(queryAllByTestId("list-item")).toHaveLength(2);
      });
      expect(getKanyeQuote).toHaveBeenCalledTimes(2);
    });
  });
});
