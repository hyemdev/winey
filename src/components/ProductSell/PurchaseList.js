/*
    작업자 : 최혜미
    노션 : https://www.notion.so/hyemdev
    깃허브 : https://github.com/hyemdev
*/
import React, { useEffect, useState } from "react";
import { PurchaseListWrap, TotalPrice } from "../../style/ProductSellStyle";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoImage from "../../assets/no_image.jpg";

const PurchaseList = ({
  productDirInfo,
  totalPrice,
  setTotalPrice,
  productCollect,
  setProductCollect,
}) => {
  console.log("productDirInfo", productDirInfo);

  // 이미지 없을 때 error처리
  const onImgError = e => {
    e.target.src = NoImage;
  };

  // 아이템 갯수 state
  // const numberArray = productCollect.map(item => item.number);
  // const [itemCount, setItemCount] = useState(numberArray);
  const [itemCount, setItemCount] = useState(1);

  // 수량 변경 핸들러
  // 수량 마이너스
  const handleCountMinus = option => {
    setItemCount(prevCounts => {
      return prevCounts.map((count, index) => {
        if (productCollect[index].productPK === option.productPK) {
          // 값이 0보다 작으면 0으로 제한
          return Math.max(parseInt(count) - 1, 1);
        } else {
          return count;
        }
      });
    });
  };
  // 수량 플러스
  const handleCountPlus = option => {
    setItemCount(prevCounts => {
      return prevCounts.map((count, index) => {
        if (productCollect[index].productPK === option.productPK) {
          // 값이 5보다 크면 5으로 제한
          return Math.min(parseInt(count) + 1, 5);
        } else {
          return count;
        }
      });
    });
  };

  // 합계 계산
  const calcTotalSum = () => {
    let itemtotal = 0;
    productCollect.forEach((option, index) => {
      itemtotal += parseInt(option.sellPrice) * parseInt(itemCount[index]);
    });
    return itemtotal;
  };

  useEffect(() => {
    setTotalPrice(calcTotalSum);
    console.log("totalPrice", totalPrice);
  }, [calcTotalSum]);

  useEffect(() => {
    const updatedProductCollect = productCollect.map((option, index) => {
      return {
        ...option,
        number: itemCount[index],
      };
    });

    setProductCollect(updatedProductCollect);
    console.log("productCollect", productCollect);
  }, [itemCount]);
  return (
    <div>
      <PurchaseListWrap>
        <p>선택한 상품</p>
        {productDirInfo.map((option, index) => (
          <div key={option.wineDetailVo.productId} className="WrapFlex">
            <div className="item-photo">
              <img
                src={`/img/${option.wineDetailVo.pic}`}
                alt={option.wineDetailVo.nmKor}
                onError={onImgError}
              />
            </div>
            <div className="item-desc">
              <strong>{option.wineDetailVo.nmKor}</strong>
              <span>{option.wineDetailVo.nmEng}</span>
              <p>{parseInt(option.selSale.salePrice).toLocaleString()} 원</p>
              <div>
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={() => handleCountMinus(option)}
                />
                <p>{itemCount[index]}</p>
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={() => handleCountPlus(option)}
                />
              </div>
            </div>
          </div>
        ))}
      </PurchaseListWrap>
      <TotalPrice>
        <div>
          <span>최종 결제금액</span>
          <strong> {calcTotalSum().toLocaleString()} 원</strong>
        </div>
      </TotalPrice>
    </div>
  );
};

export default PurchaseList;
