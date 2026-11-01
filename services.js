$(document).ready(function () {
    const bouquets = $(".products .box");
    function filterBouquets() {
        const searchText = $("#searchBouquet")
            .val()
            .trim()
            .toLowerCase();

        const category = $("#bouquetCategory").val();

        let count = 0;

        bouquets.each(function () {
            const bouquet = $(this);

            const title = bouquet.find("h3")
                .text()
                .toLowerCase();

            const bouquetCategory = bouquet.attr("data-category");

            const matchesSearch = title.includes(searchText);

            const matchesCategory =
                category === "all" ||
                bouquetCategory === category;

            if (matchesSearch && matchesCategory) {
                bouquet.show();
                count++;
            } else {
                bouquet.hide();
            }
        });

        $("#resultCount").text(count + " bouquets found");

        $("#noResults").prop("hidden", count !== 0);
    }

    $("#searchBouquet").on("input", filterBouquets);

    $("#bouquetCategory").on("change", filterBouquets);

    filterBouquets();
    function updateCount() {
        const count = $("#flowerList").children("li").length;

        $("#flowerCount").text(count + " flowers added");

        $("#emptyFavourites").toggle(count === 0);
    }

    function addFlower(name) {
        const item = $("<li>");

        const flowerName = $("<span>").text(name);

        const removeButton = $("<button>")
            .attr("type", "button")
            .addClass("remove-btn")
            .text("Remove");

        item.append(flowerName);
        item.append(removeButton);

        $("#flowerList").append(item);

        updateCount();
    }

    $("#flowerForm").on("submit", function (event) {
        event.preventDefault();

        const name = $("#flowerInput").val().trim();

        if (name === "") {
            $("#flowerError").text("Please enter a flower name.");
            $("#flowerInput")
                .attr("aria-invalid", "true")
                .trigger("focus");

            return;
        }

        $("#flowerError").text("");
        $("#flowerInput").removeAttr("aria-invalid");

        addFlower(name);

        $("#flowerInput").val("").trigger("focus");
    });

    $("#flowerInput").on("input", function () {
        $("#flowerError").text("");
        $(this).removeAttr("aria-invalid");
    });

    $(".favorite-btn").on("click", function () {
        const name = $(this)
            .closest(".box")
            .find("h3")
            .text();

        addFlower(name);
    });
    $("#flowerList").on("click", ".remove-btn", function () {
        const item = $(this).closest("li");
        const nextButton = item.next().find(".remove-btn");
        const previousButton = item.prev().find(".remove-btn");

        item.remove();

        updateCount();

        if (nextButton.length > 0) {
            nextButton.trigger("focus");
        } else if (previousButton.length > 0) {
            previousButton.trigger("focus");
        } else {
            $("#flowerInput").trigger("focus");
        }
    });

    updateCount();

});
