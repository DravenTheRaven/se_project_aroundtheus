export class Api {
  constructor(options) {
    this.options = options;
  }

  getCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "c6945e47-b548-4e1c-b20e-926f9841fa5f",
      },
    }).then((res) => {
      if (res.ok) {
        //console.log(res.json());
        return res.json();
      }
    });
  }

  getUserInfo() {
    const userInfo = this._makeRequest(
      "https://around-api.en.tripleten-services.com/v1/users/me"
    );
  }

  setUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "c6945e47-b548-4e1c-b20e-926f9841fa5f",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    });
  }

  _makeRequest(url) {
    return fetch(`${url}`, {
      headers: {
        authorization: "c6945e47-b548-4e1c-b20e-926f9841fa5f",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }
}
