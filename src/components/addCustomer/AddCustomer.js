import React from "react";
import "./addCustomer.scss";

function AddCustomer() {
  return (
    <>
      <div class="add-customer-parent parent">
        <div class="container add-customer-cont">
          <form class="row g-3 add-customer-form  ">
            <div class="col-md-12">
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Name"
              />
            </div>
            <div class="col-md-12">
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="Address"
              />
            </div>
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Mobile No."
              />
            </div>
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Email"
              />
            </div>
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="Booking amount"
              />
            </div>
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control" id="inputZip" />
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control" id="inputZip" />
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control" id="inputZip" />
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control" id="inputZip" />
            </div>

            <div class="col-md-3">
              <input type="text" class="form-control" id="inputZip" />
            </div>
            <div class="col-6 d-flex gap-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label class="form-check-label" for="gridCheck">
                  Cheque
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label class="form-check-label" for="gridCheck">
                  Cash
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label class="form-check-label" for="gridCheck">
                  Online
                </label>
              </div>

              <div class="form-check col-4 ">
                <label class="form-check-label" for="gridCheck">
                  Payment Process
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label class="form-check-label" for="gridCheck">
                  Online
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label class="form-check-label" for="gridCheck">
                  EMI
                </label>
              </div>
            </div>

            <div className="col-6">
              <input type="text" className="form-control" />
            </div>

            <div className="col-6">
              <input type="text" className="form-control" />
            </div>

            <div className="col-3">
              <input type="text" className="form-control" />
            </div>
            <div className="col-3">
              <input type="text" className="form-control" />
            </div>
            <div className="col-3">
              <input type="text" className="form-control" />
            </div>
            <div className="col-3">
              <input type="text" className="form-control" />
            </div>
            <div class="col-md-4">
              <select id="inputState" class="form-select">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div class="col-12">
              <button type="submit" class="btn ">
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCustomer;
