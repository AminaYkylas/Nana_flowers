$(document).ready(function () {
    const savedSearch = localStorage.getItem('lastSearch');
    const savedCategory = localStorage.getItem('lastCategory');
    if (savedSearch) $("#searchBouquet").val(savedSearch);
    if (savedCategory) $("#bouquetCategory").val(savedCategory);
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
        
        localStorage.setItem('lastSearch', searchText);
        
        localStorage.setItem('lastCategory', category);
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
    let cart = JSON.parse(localStorage.getItem('nanaCart')) || [];
    updateCartCounter();
    $('.btn-group .button').not('.favorite-btn').on('click', function() {
        const bouquetName = $(this).closest('.box').find('h3').text();
        cart.push(bouquetName);
        localStorage.setItem('nanaCart', JSON.stringify(cart));
        updateCartCounter();
        const originalText = $(this).text();
        $(this).text('Added!').css('background-color', '#2E7D5B').css('color', '#FFF');
    
        setTimeout(() => {
            $(this).text(originalText).css('background-color', '').css('color', '');
        }, 1500);
});


    function updateCartCounter() {
        const count = cart.length;
        $('#cartCounter').text(`Cart (${count})`);
    }
});


function applyTheme(theme) {
    if (theme === 'dark') {
        $('body').addClass('dark-theme');
        $('#themeToggle').text('Light mode').attr('aria-pressed', 'true');
    } else {
        $('body').removeClass('dark-theme');
        $('#themeToggle').text('Dark mode').attr('aria-pressed', 'false');
    }
}
applyTheme(localStorage.getItem('theme') || 'light');

$('#themeToggle').on('click', function () {
    const isDark = $('body').hasClass('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});
