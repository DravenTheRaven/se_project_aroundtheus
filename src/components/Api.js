export class Api {
  constructor(options) {
    this.options = options;
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.handleLike = this.handleLike.bind(this);
    this.changeProfilePicture = this.changeProfilePicture.bind(this);
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((data) => data);
  }

  fetchUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }

  postUserInfo(userInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: `${userInfo["name-input"]}`,
        about: `${userInfo["description-input"]}`,
      }),
    });
  }

  postCard(locationInfo) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: `${locationInfo.name}`,
        link: `${locationInfo.link}`,
      }),
    });
  }

  deleteCard(locationCardId) {
    return fetch(`${this.baseUrl}/cards/${locationCardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  handleLike(locationCardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this.baseUrl}/cards/${locationCardId}/likes`, {
        method: "PUT",
        headers: this.headers,
      });
    } else {
      return fetch(`${this.baseUrl}/cards/${locationCardId}/likes`, {
        method: "DELETE",
        headers: this.headers,
      });
    }
  }

  changeProfilePicture(pictureLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: `${pictureLink["image-url"]}`,
      }),
    });
  }
}
