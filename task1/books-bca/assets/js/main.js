$(document).ready(function () {
  const user = JSON.parse(localStorage.getItem('users')).find((u) => u.isLogged === true);
  if (user) {
    $("#user-fullname").text(user.fname);
  } else {
    window.location.href = "/pages/login.html";
  }
  let bookList = JSON.parse(localStorage.getItem('bookList')) || [];

  function renderBookList() {
    const bookListElement = $("#book-list");
    bookListElement.empty();
    for (const book of bookList) {
      const bookItem = `
      <div class="col-lg-3 mx-lg-1 col-sm-8 mt-sm-3">
          <a href="./pages/detail-page2.html?slug=${book.slug}" class="catalog-group-link">
              <div class="catalog-group">
                <img class="img" src="../assets/img/${book.imageUrl}" alt="${book.title}" />
                <div class="dilan">
                  <div class="text-wrapper">${book.title}</div>
                  <p class="p">${book.description}</p>
                </div>
              </div>
          </a>  
      </div>
      `;

      bookListElement.append(bookItem);
    }
  }
  renderBookList();

  $("#add-book-trigger").click(function () {
    $("#add-book-modal").css("display", "block");
  });
  $("#close-modal, .modal").click(function () {
    $("#add-book-modal").css("display", "none");
  });
  $(".modal-content").click(function (e) {
    e.stopPropagation();
  });
  $("#menu-toggle").click(function () {
    $(".sidebar").toggleClass("close");
    $(this).toggleClass("close");
    $(".overlap").removeClass("overlap");
  });

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
  $("#save-button").click(function () {
    const imageUrl = $("#image-url").val();
    const title = $("#book-title").val();
    const description = $("#book-description").val();

    if (!imageUrl || !title || !description) {
      alert("Please fill in all the required fields.");
      return;
    }

    const slug = slugify(title);
    const book = {
      imageUrl,
      title,
      description,
      slug,
    };

    bookList.push(book);
    localStorage.setItem('bookList', JSON.stringify(bookList));
    renderBookList();
    $("#image-url").val("");
    $("#book-title").val("");
    $("#book-description").val("");
    $("#add-book-modal").css("display", "none");
  });

  $("#logout-link").click(function (event) {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users.find((user) => user.isLogged === true);

    if (loggedInUser) {
      loggedInUser.isLogged = false;
      localStorage.setItem('users', JSON.stringify(users));
    }
    window.location.href = "/pages/login.html";
  });
});