import "./Form.css";




export default function Form() {
  return (
    <div className="form-container">
      <div className="form-div">
        <div>
          <h1>Account Info</h1>
        </div>
        <form className="form">
            <div className="inputs">
              <label>Account Title</label>
              <input type="text" />
            </div>
            <div className="inputs">
                <label>Account Type</label>
                <select>
                  <option>Assets</option>
                  <option>Liability</option>
                  <option>Owner Capital / Owner Withdrawal</option>
                  <option>Revenue</option>
                  <option>Expenses</option>
                </select>
            </div>
            <div className="inputs">
              <label>Amount</label>
              <input inputmode="numeric" min="1" />
            </div>

            <input className="inputs" type="submit" />
          
        </form>
      </div>
    </div>
  );
}