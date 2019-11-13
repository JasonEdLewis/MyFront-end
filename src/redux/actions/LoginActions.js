


fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(this.state)
  })
    .then(r => r.json())
    .then(user => {
      user.token ? this.props.history.push("/home")
        : this.props.history.push("/");
      localStorage.setItem("token", user.token);
    });  