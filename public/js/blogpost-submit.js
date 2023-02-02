const bpTitleSubmitInput = document.querySelector("#bp-title-input");
const bpContentSubmitInput = document.querySelector("#bp-content-input");
const submitBtn = document.querySelector("#blogpost-submit");

function submitBlogpost(event) {
  const inputVal = {
    title: bpTitleSubmitInput.value,
    content: bpContentSubmitInput.value,
  };

  fetch("/api/blogpost", {
    method: "POST",
    body: JSON.stringify(inputVal),
    headers: { "Content-Type": "application/json" },
  });
}

submitBtn.addEventListener("click", submitBlogpost);
