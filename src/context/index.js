import React, { Component, createContext } from "react";
import config from "../config";

const AppContext = createContext();

function updateToNewBookmarks(bookmarks) {
  return bookmarks.map(bookmark => {
    return {
      title: bookmark.title,
      link: bookmark.link,
      color: bookmark.color,
      icon: ""
    };
  });
}

class AppContextProvider extends Component {
  state = {
    bookmarks: [],
    editMode: false,
    photo: { name: "", link: "", location: "" }
  };

  fetchBookmarks = () => {
    try {
      // eslint-disable-next-line
      chrome.storage.sync.get("bookmarks", ({ bookmarks }) => {
        let _bookmarks = config.bookmarks.default;

        if (typeof bookmarks !== "undefined") {
          if (bookmarks.length !== 0) {
            // checking if Bookmarks are v1 object
            if (bookmarks[0].hasOwnProperty("id")) {
              _bookmarks = updateToNewBookmarks(bookmarks);
            } else {
              _bookmarks = bookmarks;
            }
          }
        }

        this.setState({ bookmarks: _bookmarks });
      });
    } catch (err) {
      this.setState({ bookmarks: config.bookmarks.personal });
    }
  };

  setBookmarks = _bookmarks => {
    let query = { bookmarks: _bookmarks };
    // eslint-disable-next-line
    chrome.storage.sync.set(query, res => this.setState(query));
  };

  setPhoto = details => this.setState({ photo: details });

  toggleEditMode = () => this.setState({ editMode: !this.state.editMode });

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
          setPhoto: this.setPhoto
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export { AppContext, AppContextProvider };
