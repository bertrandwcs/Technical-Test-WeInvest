import React, { useState } from "react";

/* interface for people array */

export interface People {
  id: number;
  name: string;
  avatar: string;
}

const FormAddPost = () => {
  /* Data's for the select in form */

  const people: People[] = [
    {
      id: 1,
      name: "Wade Cooper",
      avatar:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "Arlene Mccoy",
      avatar:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Devon Webb",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    },
    {
      id: 4,
      name: "Tom Cook",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 5,
      name: "Tanya Fox",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 6,
      name: "Hellen Schmidt",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 7,
      name: "Caroline Schultz",
      avatar:
        "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 8,
      name: "Mason Heaney",
      avatar:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 9,
      name: "Claudie Smitham",
      avatar:
        "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 10,
      name: "Emil Schaefer",
      avatar:
        "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

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
                      <option value={elem.name}>{elem.name}</option>
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
