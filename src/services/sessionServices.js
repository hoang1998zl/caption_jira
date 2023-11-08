export const sessionService = {
  setItem: (data, constant) => {
    let dataJson = JSON.stringify(data);
    sessionStorage.setItem(constant, dataJson);
  },
  getItem: (constant) => {
    let dataJson = sessionStorage.getItem(constant);
    if (dataJson !== null) {
      return JSON.parse(dataJson);
    } else {
      return null;
    }
  },
  removeItem: (constant) => {
    sessionStorage.removeItem(constant);
  },
};
