//get the controls of all the required HTML elements 
var letterInput = document.getElementById("letterinput");
var totalGuessesElement = document.getElementById("totalguesses");
var guess = document.getElementById("guess");
var nextWord = document.getElementById("nextword");
var restart = document.getElementById("restart");
var guessWord = document.getElementById("guessword");
var looseValue = document.getElementById("looseValue");
var winValue = document.getElementById("winValue");
var message = document.getElementById("msg");
var imagediv = document.getElementById("imgdiv");
var wordInfo = document.getElementById("wordinfo");
var wrongGuesses = document.getElementById("wrongguesses");
letterInput.focus();

//create the logic inside the function
var runScript = function () {
    
    //hangman object 
    var hangman = {
        words: [
            { name: "Thor", image: "assets/images/thor.jpg", info: "God Of Thunder" },
            { name: "captainamerica", image: "assets/images/captainamerica.png", info: "Man of the match" },
            { name: "ironman", image: "assets/images/Iron-Man.png", info: "Man of Steel" },
            { name: "BlackPanther", image: "assets/images/blackpanther.jpg", info: "King Of Wauconda" },
            { name: "BlackWidow", image: "assets/images/blackwidow.jpg", info: "The Spy Lady" },
            { name: "AquaMan", image: "assets/images/aquaman.jpg", info: "King Of Water" },
            { name: "SpiderMan", image: "assets/images/spiderman.JPG", info: "Friendly Neighbourhood" },
            { name: "Hulk", image: "assets/images/hulk.jpg", info: "Green Monster" },
            { name: "Wolverine", image: "assets/images/wolverine.jpg", info: "Man with Claws" },
            { name: "DoctorStrange", image: "assets/images/drstrange.jpg", info: "Mystic Art" }
        ],
        randomguessedword: "",
        correctGuessedLetters: [],
        wrongGuessedLetters: [],
        wrongguessedvaluesString: "",
        totalGuesses: 12,
        filledpositions: 0,
        wins: 0,
        looses: 0,
        nextWordIndex: 0,
    };


    var getRandomWordFromArray = function () {
        //used to generate the index when there are many words in the list.
        // var randomindex = Math.floor(Math.random() * hangman.words.length);
        // return hangman.words[randomindex];

        //to avoid the repeatition, i am using a loop to make sure each word appears once
        if (hangman.nextWordIndex < hangman.words.length) {
            return hangman.words[hangman.nextWordIndex++];
        }
        else {
            hangman.nextWordIndex = 0;
            return hangman.words[hangman.nextWordIndex];
        }
    };

    //Create the spans(underscores) inside the guessword div 
    var createLetterSpans = function () {
        totalGuessesElement.innerText = hangman.totalGuesses;
        for (var j = 0; j < hangman.randomguessedword.name.length; j++) {
            var newGuessLetterDisplay = document.createElement("span");
            newGuessLetterDisplay.setAttribute("class", "placeword");
            guessWord.append(newGuessLetterDisplay);
        }
    };

    //restart the game setting all elements to base value
    restart.onclick = function () {
        nextWord.click();
        hangman.wins = 0;
        hangman.looses = 0;
        winValue.innerText = hangman.wins;
        looseValue.innerText = hangman.looses;
        letterInput.disabled = false;
        letterInput.focus();
    }

    //craetae a click event for the guess button
    guess.onclick = function () {
        if (hangman.totalGuesses < 0) {
            letterInput.disabled = true;
            message.innerText = "You have no more guesses.Try next word";
        }
        else {
            var guessedletter = letterInput.value.toUpperCase();
            console.log("guessed letter : " + guessedletter);
            if (hangman.wrongGuessedLetters.indexOf(guessedletter) === -1 && hangman.correctGuessedLetters.indexOf(guessedletter) === -1 && guessedletter !== '' && guessedletter.match(/[a-zA-Z]/i)) {
                var spanchildren = guessWord.getElementsByClassName("placeword");
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
                    wrongGuesses.innerText = hangman.wrongguessedvaluesString;
                }
                
                hangman.totalGuesses--;

                //check if the totalguesses are completed
                if (hangman.totalGuesses === 0) {
                    letterInput.disabled = true;
                    letterInput.style.backgroundColor = "white";
                    hangman.looses++;
                    looseValue.innerText = hangman.looses;
                    msg.style.color = "red";
                    message.innerText = "Sorry!! You Lost";
                    wordInfo.innerText = "You can't gues anymore.Please Try next word";
                    imagediv.setAttribute("src", "assets/images/oops.png");
                }
                totalGuessesElement.innerText = hangman.totalGuesses;

                //check if the user guessed the word 
                if (hangman.filledpositions === hangman.randomguessedword.name.length) {
                    letterInput.disabled = true;
                    letterInput.style.backgroundColor = "white";
                    hangman.wins++;
                    message.style.color = "green";
                    message.innerText = "Congratulations!!  You Won";
                    imagediv.setAttribute("src", hangman.randomguessedword.image);
                    wordInfo.innerText = hangman.randomguessedword.name.toUpperCase() + "-" + hangman.randomguessedword.info;
                    winValue.innerText = hangman.wins;

                }

            }

        }
        letterInput.value="";
        letterInput.focus();
    };


    //next word button click event 
    nextWord.onclick = function () {
        guessWord.innerHTML = "";
        hangman.totalGuesses = 12;
        totalGuessesElement.innerText = hangman.totalGuesses;
        hangman.randomguessedword = getRandomWordFromArray();
        createLetterSpans();
        hangman.wrongGuessedLetters = [];
        hangman.correctGuessedLetters = [];
        hangman.wrongguessedvaluesString = "";
        document.getElementById("wrongguesses").innerText = hangman.wrongguessedvaluesString;
        hangman.filledpositions = 0;
        msg.innerText = "";
        imagediv.removeAttribute("src");
        wordInfo = "";
        letterInput.disabled = false;
        letterInput.style.backgroundColor = "aqua";
        letterInput.focus();
    };

    //start the game here
    restart.click();

};

//an equivalent enter key event for guess button click
document.onkeyup = function (event) {
    if (event.key === "Enter") {
        console.log(event.key);
        guess.click();
    }
};

//triggers the execution
runScript();





