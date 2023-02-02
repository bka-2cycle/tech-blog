const commentSubmitInput = document.querySelector("#comment");
const commentSubmitButton = document.querySelector("#submit-comment");

function createComment(event) {
  console.log("LOOK HERE!");
  const inputVal = {
    postId: commentSubmitButton.value,
    content: commentSubmitInput.value,
  };

  fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify(inputVal),
    headers: { "Content-Type": "application/json" },
  });
}

commentSubmitButton.addEventListener("click", createComment);
