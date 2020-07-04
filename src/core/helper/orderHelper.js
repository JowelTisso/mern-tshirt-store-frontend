const { API } = require("../../backend");

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserOrders = (userId, token) => {
  return fetch(`${API}/orders/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const creteOrderSummary = () => {
  let orderSummary = [];
  if (typeof window !== undefined) {
    if (!localStorage.getItem("orderSummary")) {
      localStorage.setItem("orderSummary", JSON.stringify(orderSummary));
    }
  }
};

export const getOrderSummary = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("orderSummary")) {
      return JSON.parse(localStorage.getItem("orderSummary"));
    }
  }
};

export const emptyOrderSummary = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("orderSummary")) {
      localStorage.removeItem("orderSummary");
      let orderSummary = [];
      localStorage.setItem("orderSummary", JSON.stringify(orderSummary));
    }
  }
};
