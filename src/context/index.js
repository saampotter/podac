import React, { Component, createContext } from "react";
import config from "../config";

const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    bookmarks: [],
    editMode: false,
    modalOpen: false,
    photo: { name: "", link: "", location: "" }
  };

  componentDidMount() {
    window.addEventListener("keydown", this._handleKeyPress, false);
  }

  _handleKeyPress = ({ key }) => {
    const { editMode, modalOpen } = this.state;
    if (key === "Escape" && editMode && !modalOpen) {
      this.toggleEditMode();
    }
  };

  fetchBookmarks = () => {
    try {
      // eslint-disable-next-line
      chrome.storage.sync.get("bookmarks", ({ bookmarks }) => {
        let _bookmarks = config.bookmarks.default;

        if (typeof bookmarks !== "undefined") {
          if (bookmarks.length !== 0) {
            _bookmarks = bookmarks;
          }
        }

        this.setState({ bookmarks: _bookmarks });
      });
    } catch (err) {
      this.setState({ bookmarks: config.bookmarks.default });
    }
  };

  setBookmarks = _bookmarks => {
    let query = { bookmarks: _bookmarks };
    try {
      // eslint-disable-next-line
      chrome.storage.sync.set(query, res => this.setState(query));
    } catch (err) {
      console.error(err);
    }
  };

  setPhoto = details => this.setState({ photo: details });

  toggleEditMode = () => this.setState({ editMode: !this.state.editMode });

  toggleModalOpen = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    return (
      <AppContext.Provider
        value={{
          bookmarks: this.state.bookmarks,
          fetchBookmarks: this.fetchBookmarks,
          setBookmarks: this.setBookmarks,
          editMode: this.state.editMode,
          toggleEditMode: this.toggleEditMode,
          photo: this.state.photo,
          setPhoto: this.setPhoto,
          modalOpen: this.state.modalOpen,
          toggleModalOpen: this.toggleModalOpen
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export { AppContext, AppContextProvider };
