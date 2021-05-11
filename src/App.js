import React, { Component } from "react";
import Header from "./components/Header";
import "./App.css";
import axios from "axios";
import UsersList from "./components/UsersList";

export default class App extends Component {
  state = {
    users: [],
    page: 0,
    isLoading: false,
    errorMsg: "",
  };

  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.loadUsers();
    }
  }

  loadUsers = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `https://randomuser.me/api/?page=${this.state.page}&results=10`
      );
      this.setState((prevState) => ({
        users: [...prevState.users, ...response.data.results],
        errorMsg: "",
      }));
    } catch (error) {
      console.log(error);
      this.setState({ errorMsg: "An error occurred while fetching users" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState((prevState, prevProps) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { users, isLoading, errorMsg } = this.state;
    return (
      <div className="main-section">
        <Header />
        <UsersList users={users} />
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}

        <div className="load-more">
          <button onClick={this.loadMore} className="btn-grad">
            {isLoading ? "Loading" : "Load More"}
          </button>
        </div>
      </div>
    );
  }
}
