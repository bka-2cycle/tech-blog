const epTitleSubmitInput = document.querySelector("#ep-title-input");
const epContentSubmitInput = document.querySelector("#ep-content-input");
const saveEditBtn = document.querySelector("#ep-submit");
const id = document.querySelector("#my-blog").getAttribute("data-id");

const deletePostBtn = document.querySelector("#post-delete");

//EDITING AN EXISTING POST
function editBlogpost(event) {
  const inputVal = {
    title: epTitleSubmitInput.value,
    content: epContentSubmitInput.value,
  };

  fetch(`/api/blogpost/${id}`, {
    method: "PUT",
    body: JSON.stringify(inputVal),
    headers: { "Content-Type": "application/json" },
  });
}

saveEditBtn.addEventListener("click", editBlogpost);

//DELETE POST
function deleteBlogpost(event) {
  fetch(`/api/blogpost/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

deletePostBtn.addEventListener("click", deleteBlogpost);
