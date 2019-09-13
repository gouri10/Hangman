$(document).ready(function () {
    $("#letterinput").val('').focus();
    var hangman = {
        words: [
            { name: "Thor", image: "assets/images/thor.jpg", info: "God Of Thunder"},
            { name: "captainamerica", image: "assets/images/captainamerica.png", info: "Man of the match" },
            { name: "ironman", image: "assets/images/Iron-Man.png", info: "Man of Steel" },
            { name: "BlackPanther", image: "assets/images/blackpanther.jpg", info: "King Of Wauconda" },
            { name: "BlackWidow", image: "assets/images/blackwidow.jpg", info: "The Spy Lady" },
            { name: "AquaMan", image: "assets/images/aquaman.jpg", info: "King Of Water" },
            { name: "SpiderMan", image: "assets/images/spiderman.JPG", info: "Friendly Neighbourhood" },
            { name: "Hulk", image: "assets/images/hulk.jpg", info: "Green Monster" },
            { name: "Wolverine", image: "assets/images/wolverine.jpg", info: "Man with Claws" },
            {name : "DoctorStrange" , image:"assets/images/drstrange.jpg" ,info:"Mystic Art"}
        ],
        randomguessedword: "",
        correctGuessedLetters: [],
        wrongGuessedLetters: [],
        wrongguessedvaluesString: "",
        totalGuesses: 12,
        filledpositions: 0,
        wins: 0,
        looses: 0,
        nextWordIndex:0,
    };


    var getRandomWordFromArray = function () {
        //can be used this to generate the index when theer are many words in the list.
        // var randomindex = Math.floor(Math.random() * hangman.words.length);
        // return hangman.words[randomindex];

        //to avoid the repeatition, i am using a loop to make sure each word appears once
        if(hangman.nextWordIndex<hangman.words.length)
        {
        return hangman.words[hangman.nextWordIndex++];        
        }
        else{
            hangman.nextWordIndex=0;
            return hangman.words[hangman.nextWordIndex];
        }

        
    };
    var createLetterSpans = function () {
        $("#totalguesses").text(hangman.totalGuesses);
        for (var j = 0; j < hangman.randomguessedword.name.length; j++) {
            var newGuessLetterDisplay = $("<span class='placeword'>");
            $("#guessword").append(newGuessLetterDisplay);
        }
    };

    $("#restart").on("click", function () {
        $("#nextword").click();
        hangman.wins = 0;
        hangman.looses = 0;
        $("#winValue").text(hangman.wins);
        $("#looseValue").text(hangman.looses);
        $("#letterinput").prop("disabled", false);
        $("#letterinput").val('').focus();
    });

    $("#guess").on("click", function () {
        if (hangman.totalGuesses < 0) {
            $("#letterinput").prop("disabled", true);
            $("#msg").text("You have no more guesses.Try next word");
        }
        else {
            var guessedletter = $("#letterinput").val().toUpperCase();
            console.log("guessed letter : " + guessedletter);
            if (jQuery.inArray(guessedletter, hangman.wrongGuessedLetters) === -1 && jQuery.inArray(guessedletter, hangman.correctGuessedLetters) === -1 && guessedletter !== '' && guessedletter.match(/[a-zA-Z]/i)) {
                var spanchildren = $("#guessword").children(".placeword");
                var letterfoundAtIndices = [];
                for (var n = 0; n < hangman.randomguessedword.name.length; n++) {
                    if (hangman.randomguessedword.name[n].toUpperCase() === guessedletter) {
                        letterfoundAtIndices.push(n);
                    }
                }
                if (letterfoundAtIndices.length > 0) {
                    hangman.correctGuessedLetters.push(guessedletter);
                    for (var lcv = 0; lcv < letterfoundAtIndices.length; lcv++) {
                        spanchildren[letterfoundAtIndices[lcv]].innerText = guessedletter;
                        hangman.filledpositions++;
                    }
                }
                else {
                    hangman.wrongGuessedLetters.push(guessedletter);
                    hangman.wrongguessedvaluesString = hangman.wrongguessedvaluesString + guessedletter + ', ';
                    $("#wrongguesses").text(hangman.wrongguessedvaluesString);
                }

                hangman.totalGuesses--;
                if (hangman.totalGuesses === 0) {
                    $("#letterinput").prop("disabled", true);
                    $("#letterinput").css("background-color","white");
                    hangman.looses++;                    
                    $("#looseValue").text(hangman.looses);
                    $("#msg").css('color', 'red');
                    $("#msg").text("Sorry!! You Lost");
                    $("#wordinfo").text("You can't gues anymore.Please Try next word");
                    $("#imgdiv").attr("src", "assets/images/oops.png");
                }
                $("#totalguesses").text(hangman.totalGuesses);
                if (hangman.filledpositions === hangman.randomguessedword.name.length) {
                    $("#letterinput").prop("disabled", true);
                    $("#letterinput").css("background-color","white");
                    hangman.wins++;
                    $("#msg").css('color', 'green');
                    $("#msg").text("Congratulations!!  You Won");
                    $("#imgdiv").attr("src", hangman.randomguessedword.image);
                    $("#wordinfo").text(hangman.randomguessedword.name.toUpperCase() + "-" + hangman.randomguessedword.info);
                    $("#winValue").text(hangman.wins);

                }

            }

        }

        $("#letterinput").val('').focus();
    });

    $("#nextword").on("click", function () {
        $("#guessword").empty(); 
        hangman.totalGuesses = 12;
        $("#totalguesses").text(hangman.totalGuesses);
        hangman.randomguessedword = getRandomWordFromArray();
        createLetterSpans();
        hangman.wrongGuessedLetters = [];
        hangman.correctGuessedLetters = [];
        hangman.wrongguessedvaluesString = "";
        $("#wrongguesses").text(hangman.wrongguessedvaluesString);
        hangman.filledpositions = 0;
        $("#msg").text("");
        $("#imgdiv").attr("src", "");
        $("#wordinfo").text("");
        $("#letterinput").prop("disabled", false);               
        $("#letterinput").css("background-color","aqua");
        $("#letterinput").val('').focus();
    });


    $("#restart").click();

});

