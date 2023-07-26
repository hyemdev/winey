/*
  작업자 : 김아영
  노션 : https://www.notion.so/kimaydev
  깃허브 : https://github.com/kimaydev
*/
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BackBtn, HeaderTitle, HeaderWrap } from "../style/GlobalComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const location = useLocation();
  // 스크롤 감지 state
  const [scrollPosition, setScrollPosition] = useState(0);
  // 헤더 클래스 토글 설정 state
  const [isActive, setIsActive] = useState(false);
  // 서브페이지 헤더 페이지 타이틀 state
  const [pageTitle, setPageTitle] = useState("");
  // 서브페이지 헤더 페이지 위치 state
  const [pagePath, setPagePath] = useState("");
  let activeScroll = () => {
    setScrollPosition(window.scrollY);
  };
  // 헤더 스크롤 이벤트
  useEffect(() => {
    window.addEventListener("scroll", activeScroll);
    if (scrollPosition !== 0) {
      // console.log("스크롤 이벤트 나왔다.");
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    return () => {
      window.removeEventListener("scroll", activeScroll);
    };
  }, [scrollPosition]);
  // 페이지별 타이틀
  const pageName = [
    {
      title: "와인가이드",
      path: "/windeguide",
    },
    {
      title: "구매하기",
      path: "/productsell",
    },
    {
      title: "구매완료",
      path: "/productcomplete",
    },
    {
      title: "로그인",
      path: "/login",
    },
    {
      title: "회원가입",
      path: "/join",
    },
    {
      title: "마이페이지",
      path: "/mypageList",
    },
    {
      title: "장바구니",
      path: "/cart",
    },
    {
      title: "주문내역",
      path: "/selllist",
    },
    {
      title: "선호 키워드 변경",
      path: "/keywordselectedit",
    },
    {
      title: "와인 가이드",
      path: "/windeguide",
    },
    {
      title: "정보수정",
      path: "/joinedit",
    },
    {
      title: "만든사람들",
      path: "/about",
    },
    {
      title: "오픈소스",
      path: "/opensource",
    },
  ];
  useEffect(() => {
    const findPath = pageName.find(item => item.path === location.pathname);
    if (findPath) {
      setPageTitle(findPath.title);
      setPagePath(findPath.path);
    }
    // console.log("현재위치:", location.pathname);
    // console.log("실시간타이틀", pageTitle);
    // console.log("실시간위치", pagePath);
  });

  return (
    <>
      <HeaderWrap
        className={location.pathname === "/" && isActive ? "active" : ""}
        mainBgc={location.pathname === "/"}
      >
        <ul>
          <li>
            {location.pathname === "/" ? (
              // 네비게이션 메뉴 보기 버튼
              <button>
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon_navbtn_1.svg`}
                  alt="메뉴보기"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon_navbtn_2.svg`}
                  alt="메뉴보기"
                />
              </button>
            ) : (
              // 서브페이지 헤더 뒤로가기 버튼
              <BackBtn>
                <i>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </i>
              </BackBtn>
            )}
          </li>
          <li>
            <h1>
              {location.pathname === "/" ? (
                // 헤더 로고
                <Link to="/">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/logo_1.svg`}
                    alt="로고"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/images/logo_2.svg`}
                    alt="로고"
                  />
                </Link>
              ) : (
                // 서브페이지 헤더 페이지 이름 출력
                <HeaderTitle>
                  {location.pathname === pagePath ? pageTitle : ""}
                </HeaderTitle>
              )}
            </h1>
          </li>
          <li>
            <ol>
              <li>
                <button className="search">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon_search_1.svg`}
                    alt="검색"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon_search_2.svg`}
                    alt="검색"
                  />
                </button>
              </li>
              <li>
                <button className="cart">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon_cart_1.svg`}
                    alt="장바구니"
                  />
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
