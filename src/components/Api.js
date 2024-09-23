export class Api {
  constructor(options) {
    this.options = options;
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    });
  }

  fetchUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }

  postUserInfo(userInfo) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: `${userInfo["name-input"]}`,
        about: `${userInfo["description-input"]}`,
      }),
    });
  }

  postCard(locationInfo) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: `${locationInfo.name}`,
        link: `${locationInfo.link}`,
      }),
    });
  }

  deleteCard(locationCardId) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/" + locationCardId,
      {
        method: "DELETE",
        headers: {
          authorization: "c6945e47-b548-4e1c-b20e-926f9841fa5f",
        },
      }
    );
  }

  handleLike(locationCardId, isLiked) {
    if (!isLiked) {
      return fetch(
        "https://around-api.en.tripleten-services.com/v1/cards/" +
          locationCardId +
          "/likes",
        {
          method: "PUT",
          headers: {
            authorization: "c6945e47-b548-4e1c-b20e-926f9841fa5f",
          },
        }
      );
    } else {
      return fetch(
        "https://around-api.en.tripleten-services.com/v1/cards/" +
          locationCardId +
          "/likes",
        {
          method: "DELETE",
          headers: {
            authorization: "c6945e47-b548-4e1c-b20e-926f9841fa5f",
          },
        }
      );
    }
  }

  changeProfilePicture(pictureLink) {
    console.log(pictureLink["image-url"]);
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar: `${pictureLink["image-url"]}`,
        }),
      }
    );
  }
}
