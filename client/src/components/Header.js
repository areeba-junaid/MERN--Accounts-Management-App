import "./Header.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <nav className="menu-bar">
      <h1 className="logo">
        Accounts<span>Management.</span>
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/transaction">Transactions</Link>
        </li>
        <li>
          <Link>
            Financial Statements <i className="fas fa-caret-down"></i>
          </Link>
          <div className="dropdown-menu">
            <ul>
              <li>
                <Link to="income">Income</Link>
              </li>
              <li>
                <Link to="owner-equity">Owner Equity</Link>
              </li>
              <li>
                <Link to="balance-sheet">
                  Balance sheet<i className="fas fa-caret-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Link to="TrialBalance">TrialBalance</Link>
        </li>
      </ul>
    </nav>
  );
}
