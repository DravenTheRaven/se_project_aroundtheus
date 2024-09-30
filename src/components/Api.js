export class Api {
  constructor(options) {
    this.options = options;
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.handleLike = this.handleLike.bind(this);
    this.changeProfilePicture = this.changeProfilePicture.bind(this);
  }

  getCards() {
    return this._request(`${this.baseUrl}/cards`, {
      headers: this.headers,
    });
  }

  fetchUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }

  postUserInfo(userInfo) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: `${userInfo["name-input"]}`,
        about: `${userInfo["description-input"]}`,
      }),
    });
  }

  postCard(locationInfo) {
    return this._request(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: `${locationInfo.name}`,
        link: `${locationInfo.link}`,
      }),
    });
  }

  deleteCard(locationCardId) {
    return this._request(`${this.baseUrl}/cards/${locationCardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  handleLike(locationCardId, isLiked) {
    if (!isLiked) {
      return this._request(`${this.baseUrl}/cards/${locationCardId}/likes`, {
        method: "PUT",
        headers: this.headers,
      });
    } else {
      return this._request(`${this.baseUrl}/cards/${locationCardId}/likes`, {
        method: "DELETE",
        headers: this.headers,
      });
    }
  }

  changeProfilePicture(pictureLink) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: `${pictureLink["image-url"]}`,
      }),
    });
  }

  _checkResponse(res) {
    console.log(res.ok);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${url}`, options)
      .then(this._checkResponse)
      .then((data) => {
        console.log(data);
        return data;
      });
  }
}
