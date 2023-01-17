/**
 * @jest-environment jsdom
 */

import _modal from "jquery-modal";

import "@testing-library/jest-dom";

import { fireEvent, screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";

import { ROUTES, ROUTES_PATH } from "../constants/routes";

import { localStorageMock } from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store";

import router from "../app/Router.js";

jest.mock("../app/Store", () => mockStore);

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then the new buill model should be visisble", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      expect(screen.getByTestId("expense-type")).toBeTruthy();
    });

    describe("Given I am connected as an employee", () => {
      test("Then I change media on form", () => {
        Object.defineProperty(window, "localStorage", {
          value: localStorageMock,
        });
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            type: "Employee",
          })
        );
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname });
        };
        const file = new File(["hello"], "hello.png", { type: "image/png" });
        const store = mockStore;
        const inputFile = screen.getByTestId("file");
        const newbill = new NewBill({
          document,
          onNavigate,
          store,
          localStorage: window.localStorage,
        });
        const handle = jest.fn((e) => newbill.handleChangeFile(e));
        inputFile.addEventListener("change", handle);
        userEvent.upload(inputFile, file);
        expect(handle).toHaveBeenCalled();
      });

      test("then I provides aull fields and click on submit", () => {
        Object.defineProperty(window, "localStorage", {
          value: localStorageMock,
        });
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            type: "Employee",
          })
        );
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname });
        };
        const store = null;
        const form = screen.getByTestId("form-new-bill");
        const submitform = document.querySelector("#btn-send-bill");
        const newbill = new NewBill({
          document,
          onNavigate,
          store,
          localStorage: window.localStorage,
        });
        const handle = jest.fn(() => newbill.handleAcceptSubmit);
        submitform.addEventListener("click", handle);
        userEvent.click(submitform);
        expect(handle).toHaveBeenCalled();
      });
    });

    describe("When an error occurs on API", () => {
      beforeEach(() => {
        jest.spyOn(mockStore, "bills");
        Object.defineProperty(window, "localStorage", {
          value: localStorageMock,
        });
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            type: "Employee",
            email: "a@a",
          })
        );
        const root = document.createElement("div");
        root.setAttribute("id", "root");
        document.body.appendChild(root);
        router();
      });

      test("fetches messages from an API and fails with 500 message error", async () => {
        jest.spyOn(console, "error").mockImplementation(() => {});
        Object.defineProperty(window, "location", {
          value: { hash: ROUTES_PATH["NewBill"] },
        });
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            type: "Employee",
          })
        );
        document.body.innerHTML = `<div id='root'></div>`;
        router();
        mockStore.bills.mockImplementationOnce(() => {
          return {
            update: () => {
              return Promise.reject(new Error("Erreur 500"));
            },
          };
        });
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname });
        };
        const store = null;
        const newbill = new NewBill({
          document,
          onNavigate,
          store,
          localStorage: window.localStorage,
        });
        const form = screen.getByTestId("form-new-bill");
        const submitform = document.querySelector("#btn-send-bill");
        const handle = jest.fn(() => newbill.handleAcceptSubmit);
        submitform.addEventListener("click", handle);
        userEvent.click(submitform);
        await new Promise(process.nextTick);
        expect(console.error).toHaveBeenCalled();
      });
    });
  });

  describe("When I am on NewBill Page", () => {
    test("Then the new bill should submit the value", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;

      const Typededepense = screen.getByTestId("expense-type");
      fireEvent.change(Typededepense, {
        target: { value: "Restaurants et bars" },
      });
      expect(Typededepense.value).toBe("Restaurants et bars");

      const expenseName = screen.getByTestId("expense-name");
      fireEvent.change(expenseName, { target: { value: "test Expense" } });
      expect(expenseName.value).toBe("test Expense");

      const datepickerr = screen.getByTestId("datepicker");
      expect(datepickerr).toBeTruthy();
      fireEvent.click(datepickerr, { target: { value: "2020-01-01" } });
      expect(datepickerr.value).toEqual("2020-01-01");

      const amount = screen.getByTestId("amount");
      fireEvent.change(amount, { target: { value: "123" } });
      expect(amount.value).toBe("123");

      const vat = screen.getByTestId("vat");
      fireEvent.change(vat, { target: { value: "5" } });
      expect(vat.value).toBe("5");

      const pct = screen.getByTestId("pct");
      fireEvent.change(pct, { target: { value: "12" } });
      expect(pct.value).toBe("12");

      const commentary = screen.getByTestId("commentary");
      fireEvent.change(commentary, { target: { value: "hello commentary" } });
      expect(commentary.value).toBe("hello commentary");

      const someValues = [{ name: "teresa teng" }];
      const str = JSON.stringify(someValues);
      const blob = new Blob([str]);
      const file = new File([blob], "values.json", {
        type: "application/JSON",
      });
      File.prototype.text = jest.fn().mockResolvedValueOnce(str);
      const input = screen.getByTestId("file");
      userEvent.upload(input, file);
      waitFor(() => expect(screen.queryByTestId("input")).toBeTruthy());
      const form = screen.getByTestId("form-new-bill");
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      let PREVIOUS_LOCATION = "";
      const store = jest.fn();
      const newBill = new NewBill({
        document,
        onNavigate,
        store,
        localStorage,
      });

      const handleSubmit = jest.fn(newBill.handleSubmit);
      newBill.updateBill = jest.fn().mockResolvedValue({});
      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
