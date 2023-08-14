import { client } from "./client";

// 주문 내역 출력
export const getSellListData = async () => {
  try {
    const response = await client.get(`/api/orderList/user`);
    const sellListData = response.data;
    return sellListData;
  } catch (error) {
    console.error("API 요청 중 오류 발생", error);
    return [];
  }
};

// 주문 내역 취소
export const cancelSellListData = async cancelSellListData => {
  try {
    const res = await client.put(
      `/api/orderList/cancel?orderId=${cancelSellListData}`,
    );
    console.log("res", res);
    const result = await res.data;
    console.log("주문이 취소 되었습니다", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 주문 내역 픽업완료
export const finishSellListData = async finishSellListData => {
  try {
    const res = await client.put(
      `/api/orderList/pickupFinish?orderId=${finishSellListData}`,
    );
    console.log("res", res);
    const result = await res.data;
    console.log("픽업 완료 되었습니다", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 주문 상세 내역
export const getdetailData = async numberValue => {
  try {
    const response = await client.get(
      `/api/orderList/detail?orderId=${numberValue}`,
    );
    const detailData = response.data;
    return detailData;
  } catch (error) {
    console.error("API 요청 중 오류 발생", error);
    return [];
  }
};

// 리뷰 등록
export const submitReview = async (orderDetailId, reviewLevel) => {
  try {
    const res = await client.post(`/api/payment/review`, {
      orderDetailId,
      reviewLevel,
    });
    console.log("리뷰가 성공적으로 제출되었습니다:");
    const result = await res.data;
    return result;
  } catch (error) {
    console.log("리뷰 제출 중 에러 발생:", error);
  }
};
