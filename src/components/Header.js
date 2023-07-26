/*
  작업자 : 김아영
  노션 : https://www.notion.so/kimaydev
  깃허브 : https://github.com/kimaydev
*/
import React from "react";
import { Link } from "react-router-dom";
import { HeaderWrap } from "../style/GlobalComponents";

const Header = () => {
  return (
    <>
      <HeaderWrap>
        <ul>
          <li>
            <button>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon_navbtn_2.svg`}
                alt="메뉴보기"
              />
            </button>
          </li>
          <li>
            <h1>
              <Link to="/">
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo_2.svg`}
                  alt="로고"
                />
              </Link>
            </h1>
          </li>
          <li>
            <ol>
              <li>
                <button className="search">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon_search_2.svg`}
                    alt="검색"
                  />
                </button>
              </li>
              <li>
                <button className="cart">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon_cart_2.svg`}
                    alt="장바구니"
                  />
                  <span>0</span>
                </button>
              </li>
            </ol>
          </li>
        </ul>
      </HeaderWrap>
    </>
  );
};

export default Header;
