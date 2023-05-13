import "./Header.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <nav class="menu-bar">
      <h1 class="logo">
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
            Financial Statements <i class="fas fa-caret-down"></i>
          </Link>
          <div class="dropdown-menu">
            <ul>
              <li>
                <Link to="income">Income</Link>
              </li>
              <li>
                <Link to="owner-equity">Owner Equity</Link>
              </li>
              <li>
                <Link to="balance-sheet">
                  Balance sheet<i class="fas fa-caret-right"></i>
                </Link>
              </li>
              <li>
                <Link to="cash-flow">Cash Flow</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
        <li>
          <a href="#">Contact us</a>
        </li>
      </ul>
    </nav>
  );
}
