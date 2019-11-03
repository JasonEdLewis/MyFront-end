

export const postComment = (id, content, fId) => {
    return fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        post_id: id,
        content: content,
        followee_id: fId
      })
    });
  };