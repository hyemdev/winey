import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { ConfigProvider, Select } from "antd";
import {
  ProductListWrap,
  ProductMainItemWrap,
} from "../../style/ProductListStyle";
import { Gradation } from "../../style/GlobalStyle";
import { ContentsListItemWrap } from "../../style/GlobalComponents";
import { ProductListItem } from "../../style/ProductStyle";
import NoImage from "../../assets/no_image.jpg";
import { getTotalCountry } from "../../api/patchproduct";
import ProductListSkeleton from "../../components/skeleton/ProductListSkeleton";

const ProductMainList = () => {
  const { pathname } = useLocation();
  // pathname에서 /productmainlist/ 는 제외처리
  const listPathName = pathname.slice(17);
  // console.log(listPathName);
  // 이미지 없을 때 error처리
  const onImgError = e => {
    e.target.src = NoImage;
  };
  // 로딩 더미데이터
  const productListSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // 로딩 state
  const [isLoading, setIsLoading] = useState(true);
  // 상품 총 갯수 카운트 state
  const [totalCount, setTotalCount] = useState("");
  // 상품 페이징 처리 state
  const [listScroll, setListScroll] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const observerTargetEl = useRef(null);
  const getListData = async () => {
    //상품리스트 전체보기 - 음식별 와인리스트 GET
    await getTotalCountry(setListScroll, setHasNextPage, page);
  };
  useEffect(() => {
    if (!observerTargetEl.current || !hasNextPage) return;

    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        getListData();
      }
    });
    io.observe(observerTargetEl.current);

    return () => {
      io.disconnect();
    };
  }, [getListData, hasNextPage]);
  // 상품 더미 데이터
  // const foodItem = [
  //   {
  //     productId: 22,
  //     categoryId: 2,
  //     featureId: 110,
  //     countryId: 2,
  //     aromaId: 110,
  //     nmKor: "슈샤르조프버거 리슬링 스패틀레스",
  //     nmEng: "Scharzhofberger Riesling Spätlese",
  //     price: 15600,
  //     quantity: 30,
  //     pic: "wine/22/NwRt7c2oQF6-mdBgs9gSLQ_pb_x960.png",
  //     promotion: 0,
  //     beginner: 0,
  //     alcohol: 8,
  //     sale: 10,
  //     salePrice: 30644,
  //   },
  // ];
  // useEffect(() => {
  //   getTotalCountry(setTotalList);
  // }, [location.pathname]);
  useEffect(() => {
    setTotalCount(listScroll.length);
    // console.log("상품 총 갯수", totalCount);
  }, [listScroll]);
  useEffect(() => {
    // 2초 뒤에 인트로 화면 사라짐
    const introTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(introTimeout);
  }, []);
  // 상품 정렬 옵션
  const options = [
    {
      value: "최신등록순",
      label: "최신등록순",
    },
    {
      value: "높은가격순",
      label: "높은가격순",
    },
    {
      value: "낮은가격순",
      label: "낮은가격순",
    },
  ];
  // console.log("상품 정렬 옵션 첫번째", options[0]);
  // 상품 정렬 선택
  const handleChange = value => {
    // console.log(`selected ${value}`);
  };
  return (
    <ProductListWrap>
      {/* 상품리스트 목록 */}
      <ProductMainItemWrap>
        <ul>
          <li>
            {/* 상품 총 갯수 */}총 <span>{totalCount}</span>개
          </li>
          <li>
            {/* 상품 정렬 */}
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: Gradation.wineD,
                  borderRadius: 4,
                  fontSize: 12,
                  controlHeight: 24,
                  colorBorder: "transparent",
                  colorPrimaryHover: "transparent",
                  fontFamily:
                    '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
                },
              }}
            >
              <Select
                defaultValue={options[0]}
                onChange={handleChange}
                options={options}
              />
            </ConfigProvider>
          </li>
        </ul>
        <ContentsListItemWrap>
          {isLoading ? (
            // 로딩 화면 출력
            productListSkeleton.map(index => <ProductListSkeleton key={v4()} />)
          ) : (
            // 상품 리스트
            <>
              {listScroll?.map((item, index) => (
                <ProductListItem key={v4()}>
                  <Link to={`/productdetail/${item.productId}`}>
                    <div className="img">
                      <img
                        src={`/img/${item.pic}`}
                        alt={item.nmKor}
                        onError={onImgError}
                      />
                      {/* 장바구니 버튼 */}
                      <button>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon_cart_2.svg`}
                          alt="장바구니에 담기"
                        />
                      </button>
                    </div>
                    <div className="txt">
                      <div className="badge">
                        {item.promotion === 1 && (
                          <span className="recommend">추천상품</span>
                        )}
                        {item.beginner === 1 && (
                          <span className="beginner">입문자추천</span>
                        )}
                      </div>
                      <div className="title">{item.nmKor}</div>
                      <ul className="price">
                        <li>
                          <span>
                            {item.salePrice === null
                              ? item.price.toLocaleString()
                              : item.salePrice.toLocaleString()}
                          </span>
                          원
                        </li>
                        <li>
                          <span>{item.price.toLocaleString()}원</span>
                        </li>
                      </ul>
                    </div>
                  </Link>
                </ProductListItem>
              ))}
              <div ref={observerTargetEl}></div>
            </>
          )}
        </ContentsListItemWrap>
      </ProductMainItemWrap>
    </ProductListWrap>
  );
};

export default ProductMainList;
