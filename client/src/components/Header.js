import "./Header.css"

export default function Header() {
    return (
        <div class="menu-bar">
        <h1 class="logo">Accounts<span>Management.</span></h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Pages <i class="fas fa-caret-down"></i></a>
              <div class="dropdown-menu">
                  <ul>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">Portfolio</a></li>
                    <li>
                      <a href="#">Team <i class="fas fa-caret-right"></i></a>
                      
                      <div class="dropdown-menu-1">
                        <ul>
                          <li><a href="#">Team-1</a></li>
                          <li><a href="#">Team-2</a></li>
                          <li><a href="#">Team-3</a></li>
                          <li><a href="#">Team-4</a></li>
                        </ul>
                      </div>
                    </li>
                    <li><a href="#">FAQ</a></li>
                  </ul>
                </div>
          </li>
          <li><a href="#">Blog</a>
          </li>
          <li><a href="#">Contact us</a></li>
        </ul>
      </div>
  
    )
}
