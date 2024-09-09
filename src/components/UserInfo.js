export class UserInfo {
  constructor(profileFormName, profileFormDescription) {
    this._profileFormName = profileFormName;
    this._profileFormDescription = profileFormDescription;
  }

  getUserInfo() {
    return {
      "name-input": `${this._profileFormName.textContent}`,
      "description-input": `${this._profileFormDescription.textContent}`,
    };
  }

  setUserInfo(data) {
    this._profileFormName.textContent = data["name-input"];
    this._profileFormDescription.textContent = data["description-input"];
  }
}
