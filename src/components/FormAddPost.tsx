import React, { useState } from "react";
import { people } from "../utils/userDatas";

const FormAddPost = () => {
  /* input's form */
  const [title, setTitle] = useState<String>("");
  const [body, setBody] = useState<String>("");
  const [userName, setUserName] = useState<String>("");

  /* boolean popup */
  const [togglePopup, setTogglePopup] = useState<boolean>(false);

  /* toggle form */
  const handleAddpost = () => {
    setTogglePopup(!togglePopup);
  };
  /* Submit form */
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      title,
      body,
      userName,
      userId: 1,
    };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    alert("Post Added");
    setTogglePopup(!togglePopup);
  };

  return (
    <div className="container-addPost">
      <button onClick={handleAddpost}>New post</button>
      {togglePopup && (
        <div className="show-form-pop">
          <div className="form-content">
            <div className="head-container">
              <h3>New Post</h3>
              <h4>Publish a new post by filling the information below</h4>
              <button onClick={handleAddpost}>X</button>
            </div>
            <form className="form-grid-container" onSubmit={handleSubmit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e: any) => setTitle(e.target.value)}
              />
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                id="body"
                onChange={(e: any) => setBody(e.target.value)}
              />

              <label>Posted by</label>
              <option value="" />

              <select
                name="userName"
                id="userName"
                onChange={(e: any) => setUserName(e.target.value)}
              >
                {people.map((elem) => {
                  return (
                    <>
                      <option key={elem.id} value={elem.name}>
                        {elem.name}
                      </option>
                    </>
                  );
                })}
              </select>
              <button type="submit">Send</button>
            </form>

            <button className="button-exit" onClick={handleAddpost}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormAddPost;
