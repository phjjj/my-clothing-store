import styled from "styled-components"
import { FaRegUser } from "react-icons/fa"
import { FaBagShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"

function Header() {
  const { setIsLoggedIn, isLoggedIn } = useAuthStore()
  const handleClickLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <HeaderStyle>
      <div className="header">
        <h1 className="logo">Soo Closet 🍃</h1>
        <nav>
          <Link to={isLoggedIn ? "/mypage" : "/login"}>
            <FaRegUser />
          </Link>
          <Link to="/cart">
            <FaBagShopping />
          </Link>
          {isLoggedIn && (
            <button className="logout-btn" onClick={handleClickLogout}>
              로그아웃
            </button>
          )}
        </nav>
      </div>
      <ul className="category">
        <li>
          <Link to="/">New</Link>
        </li>
        <li>
          <Link to="/">Outer</Link>
        </li>
        <li>
          <Link to="/">Top</Link>
        </li>
        <li>
          <Link to="/">Bottom</Link>
        </li>
        <li>
          <Link to="/">Acc</Link>
        </li>
      </ul>
    </HeaderStyle>
  )
}
const HeaderStyle = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  position: relative;

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px 40px;

    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: ${({ theme }) => theme.heading.large.fontSize};
    }

    nav {
      display: flex;
      gap: 20px;
      svg {
        font-size: ${({ theme }) => theme.heading.medium.fontSize};
      }
    }
  }

  .logout-btn {
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${({ theme }) => theme.heading.small.fontSize};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .category {
    display: flex;
    gap: 20px;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 10px 0 0 0;
    li {
      list-style: none;
      a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
        font-size: ${({ theme }) => theme.heading.small.fontSize};
        font-weight: bold;
      }
    }
  }
`

export default Header
