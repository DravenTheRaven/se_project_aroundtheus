export class UserInfo {
  constructor(
    profileFormName,
    profileFormDescription,
    newProfileFormName,
    newProfileFormDescription
  ) {
    this.profileFormName = profileFormName;
    this.profileFormDescription = profileFormDescription;
    this.newProfileFormName = newProfileFormName;
    this.newProfileFormDescription = newProfileFormDescription;
  }

  getUserInfo() {
    this.newProfileFormDescription.value = `${this.profileFormDescription.textContent}`;
    this.newProfileFormName.value = `${this.profileFormName.textContent}`;
  }

  setUserInfo(data) {
    this.profileFormName.textContent = data["name-input"];
    this.profileFormDescription.textContent = data["description-input"];
  }
}
