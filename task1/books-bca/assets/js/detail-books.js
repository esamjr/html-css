$(document).ready(function () {
    $("#edit-books").click(function () {
        $("#edit-book-modal").css("display", "block");
    });
    $("#hapus-books").click(function () {
        $("#hapus-book-modal").css("display", "block");
    });
    $("#close-modal, .modal").click(function () {
        $("#edit-book-modal").css("display", "none");
    });
    $("#close-modal-hapus").click(function () {
        const bookIndex = bookList.findIndex((b) => slugify(b.slug) === slug);
        if (bookIndex !== -1) {
            bookList.splice(bookIndex, 1);
            localStorage.setItem('bookList', JSON.stringify(bookList));
            location.reload();
        }
        $("#hapus-book-modal").css("display", "none");
        window.location.href = "../index.html";
    });
    $(".modal-content").click(function (e) {
        e.stopPropagation();
    });
    $(".back-button").click(function () {
        window.history.back();
    });
    function getSlugFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('slug');
    }
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
    const slug = getSlugFromUrl();
    const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
    const book = bookList.find((b) => slugify(b.slug) === slug);
    // console.log(book);

    if (book) {
        $("#book-cover").attr("src", "../assets/img/" + book.imageUrl);
        // $("#book-preview").attr("src", book.imageUrl);
        $("#book-title").text(book.title);
        $("#book-genre").text("Novel");
        $("#book-description").text(book.description);
        $("#book-date").text("30 Juni 2019");
    }
    if (book) {
        $("#edit-image-url").val(book.imageUrl);
        $("#edit-book-title").val(book.title);
        $("#edit-book-description").val(book.description);

        $("#edit-books").click(function () {
            $("#edit-book-modal").css("display", "block");
        });

        $("#update-button").click(function () {
            book.imageUrl = $("#edit-image-url").val();
            book.title = $("#edit-book-title").val();
            book.description = $("#edit-book-description").val();
            localStorage.setItem('bookList', JSON.stringify(bookList));
            location.reload();
            $("#edit-book-modal").css("display", "none");
        });
    }
});