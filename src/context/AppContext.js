import React, { Component, createContext } from "react";
import config from "../config";
import classes from "../elements/BookmarksModal/Bookmarks.module.css";

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
    modalShown: false,
    modalDetails: { title: "", link: "", color: "", icon: "" }
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
    try {
      // eslint-disable-next-line
      chrome.storage.sync.set(query, res => this.setState(query));
    } catch (err) {
      this.setState(query);
    }
  };

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  toggleModal = () => {
    let c = document.getElementsByClassName(classes.Container)[0];
    let m = document.getElementsByClassName(classes.Modal)[0];

    if (this.state.modalShown) {
      // close
      /* eslint-disable */
      gsap.to(m, 0.3, { autoAlpha: 0, top: 15 });
      gsap.to(c, 0.3, { autoAlpha: 0 });
      /* eslint-enable */
      this.setState({ modalShown: false });
    } else {
      // open
      /* eslint-disable */
      gsap.to(c, 0.3, { autoAlpha: 1 });
      gsap.fromTo(m, 0.3, { autoAlpha: 0, top: 15 }, { autoAlpha: 1, top: 0 });
      /* eslint-enable */
      this.setState({ modalShown: true });
    }
  };

  setModal = bookmark => {
    if (bookmark) {
      if ("link" in bookmark) {
        this.setState({ modalDetails: bookmark });
      } else {
        let d = { title: "", link: "", color: "", icon: "" };
        this.setState({ modalDetails: d });
      }
    }
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          editMode: this.state.editMode,
          bookmarks: this.state.bookmarks,
          modalDetails: this.state.modalDetails,

          fetchBookmarks: this.fetchBookmarks,
          setBookmarks: this.setBookmarks,
          toggleModal: this.toggleModal,
          toggleEditMode: this.toggleEditMode,
          setModal: this.setModal
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export { AppContext, AppContextProvider };
