/**
 * @jest-environment jsdom
 */

import { screen, waitFor, fireEvent, user } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js";
import router from "../app/Router.js";
import { ROUTES_PATH } from "../constants/routes.js";
import userEvent from '@testing-library/user-event'
import { ROUTES } from "../constants/routes";
describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then the new buill model should be visisble", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(screen.getByTestId("expense-type")).toBeTruthy();
    })

    test("Then Message icon in vertical layout should be highlighted", async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.NewBill)
      await waitFor(() => screen.getByTestId('icon-mail'))
      const windowIcon = screen.getByTestId('icon-mail')
      expect(windowIcon.classList.contains('active-icon')).toBeTruthy();
    })
  })

  describe("When I am on NewBill Page", () => {
    test("Then the new bill should submit the value", () => {
      const html = NewBillUI()
      document.body.innerHTML = html

      const Typededepense = screen.getByTestId("expense-type");
      fireEvent.change(Typededepense, { target: { value: "Restaurants et bars" } });
      expect(Typededepense.value).toBe("Restaurants et bars");


      const expenseName = screen.getByTestId("expense-name");
      fireEvent.change(expenseName, { target: { value: "test Expense" } });
      expect(expenseName.value).toBe("test Expense");


      const datepickerr = screen.getByTestId("datepicker");
      expect(datepickerr).toBeTruthy()
      fireEvent.click(datepickerr, { target: { value: '2020-01-01' } });
      expect(datepickerr.value).toEqual('2020-01-01');

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

      const someValues = [{ name: 'teresa teng' }];

      const str = JSON.stringify(someValues);
      const blob = new Blob([str]);
      const file = new File([blob], 'values.json', {
        type: 'application/JSON',
      });
      File.prototype.text = jest.fn().mockResolvedValueOnce(str);
      const input = screen.getByTestId('file');


      userEvent.upload(input, file);
      waitFor(() => expect(screen.queryByTestId('input')).toBeTruthy());
      const form = screen.getByTestId("form-new-bill");

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      let PREVIOUS_LOCATION = "";

      const store = jest.fn();


      const newBill = new NewBill({
        document, onNavigate, store, localStorage
      });

      const handleSubmit = jest.fn(newBill.handleSubmit);
      newBill.updateBill = jest.fn().mockResolvedValue({});
      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
})
