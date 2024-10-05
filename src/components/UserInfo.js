export class UserInfo {
  constructor(profileFormName, profileFormDescription, profilePicture) {
    this._profileFormName = profileFormName;
    this._profileFormDescription = profileFormDescription;
    this.profilePicture = profilePicture;
  }

  getUserInfo() {
    return {
      "name-input": `${this._profileFormName.textContent}`,
      "description-input": `${this._profileFormDescription.textContent}`,
      "profile-picture": `${this.profilePicture.src}`,
    };
  }

  setUserInfo(data) {
    this._profileFormName.textContent = data["name-input"];
    this._profileFormDescription.textContent = data["description-input"];
  }

  setProfilePicture(imageLink) {
    console.log(this.profilePicture);
    this.profilePicture.src = imageLink["image-url"];
    console.log(this.profilePicture.src);
  }
}
