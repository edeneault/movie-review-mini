
// Movie Mini App - jQuerry  //

$(function () {
   
    const toggleSwitch = document.querySelector('input[type="checkbox"]');  // Dark Mode Selector
    const movies = JSON.parse(localStorage.getItem("movies")) || [];    //retrieve movie-items from memory

    // FUNCTIONS //
    
    function checkMemoryDarkMode() {
        // Check if Dark mode is enables in Memory //
        if (localStorage.getItem('darkModeEnabled')) {
            document.body.className = 'dark';
            toggleSwitch.checked = true;
            }
    };

    function darkMode() {
        // When we click the switch, update local storage & change the className on the body //
        toggleSwitch.addEventListener('click', function (e) {
        const { checked } = toggleSwitch;
        if (checked) {
            localStorage.setItem('darkModeEnabled', true);
        } else {
            localStorage.removeItem('darkModeEnabled');
        }
        document.body.className = checked ? 'dark' : ''

        });
    };
    
    function loadMovies() {
        // load movies into mark-up //
        if (movies.length > 0) {
            for (let movie of movies) {
                addRetrievedMovies(movie);
            }
        }
      
    }

    function addRetrievedMovies(movie) {
        // Bulids mark-up movie item (li)
        $("<li>").addClass("card-title col-4 col-sm-3  p-2 ")
        .text(`${ movie.name }`)
        .appendTo("#movie-list");
    
        $("<p>").addClass("card-text col-12 col-sm-12")
            .text(`${ movie.review }`)
            .appendTo("li:last-Child");
        
        $("<p>").addClass("card-text col-12 col-sm-4")
            .text(`${movie.stars}`)
            .appendTo("li:last-Child");
        
        $("<button>").addClass("col-12 col-sm-3  align-self-start remove btn btn-danger far fa-trash-alt")
            .appendTo("li:last-child");
    }
   
    // removes movie from memory array by index
    function removeByIndex(arr, index) {
        // const index = arr.indexOf(str);
        if (index > -1) {arr.splice(index, 1)} return (arr);
    }

    // finds index of obj in array based in property name-value
    function findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    ////////////
    //  MAIN  //
    ////////////

    checkMemoryDarkMode();
    darkMode();
    loadMovies();
    

    $("form").submit(function (e) {
        e.preventDefault();
        console.log($(e));
        
        let $star = ($("#star-rating input:radio:checked").val());
        
        $("<li>").addClass("card-title col-4 col-sm-3  p-2")
            .text(`${ $("#movie-name").val() }`)
            .appendTo("#movie-list");
        
        $("<p>").addClass("card-text col-12 col-sm-12")
            .text(`${ $("#movie-review").val() }`)
            .appendTo("li:last-Child");
        
        $("<p>").addClass("card-text col-12 col-sm-4")
            .text(`${$star}`)
            .appendTo("li:last-Child");
        
        $("<button>").addClass(" col-12 col-sm-3 align-self-startremove btn btn-danger far fa-trash-alt")
            .appendTo("li:last-child");
        
        let $movieVal = {
            name: $("#movie-name").val(),
            review: $("#movie-review").val(),
            stars: $("#star-rating input:radio:checked").val()
        };
       
        movies.push($movieVal);
        localStorage.setItem("movies", JSON.stringify(movies));
        $(this).closest('form').find("input[type=text], textarea").val(""); // empty fields
        
    });
    
    $('#movie-list').on("click", function (e) {
        let attr = "name";
        $el = $(e.target).parent();
        let text = $el[0].childNodes[0].nodeValue;


        for (let i = 0; i < movies.length; i++) {
     
            if (movies[i].name === text) {
                movieName = (movies[i].name)
             
                let index = findWithAttr(movies, attr, text)
            
                removeByIndex(movies, index)
             
                $(e.target).parentsUntil($('#movie-list')).remove();
            }
        }
    
        localStorage.setItem("movies", JSON.stringify(movies));
    
    });
});

