if (window.location.href.match('more') != null || window.location.href.match('/') != null) {

    setTimeout(function () {
        if (document.readyState === "complete") {
            let mainContent = document.getElementsByClassName("tabcontent");
            mainContent[0].style.display = "block";
        } else {
            console.log("RISS");
            alert("aaaaaaaa")
        }
    }, 500); // 5 seconds
}
if (window.location.href.match('dashboard') != null) {

    setTimeout(function () {
        if (document.readyState === "complete") {
            let mainContent = document.getElementsByClassName("outertabcontent");
            mainContent[0].style.display = "block";
            let secondContent = document.getElementsByClassName("innertabcontent");
            secondContent[0].style.display = "block";

        } else {
            console.log("RISS");
            alert("aaaaaaaa")
        }
    }, 500); // 5 seconds
}


goToDashboard = () => {
    window.location.href = '/more';
}
showDashboard = () => {
    window.location.href = '/dashboard';
}
showLogin = () => {
    window.location.href = '/';
}
showEditEntry = () => {
    let entry = document.getElementById("customStatus")
    entry.style.display = "block";
}

testit = () => {
    startLoading();
}

startLoading = () => {
    let loadingObject = document.getElementsByClassName("loading")
    loadingObject[0].style.display = "block";
}

stopLoading = () => {
    let loadingObject = document.getElementsByClassName("loading")
    loadingObject[0].style.display = "none";
}

getSingleQuestion = (query) => {
    startLoading();
    let myLocation = '/question ${query}'
    console.log('/questions' + query + "\n\n\n SHIIIIIIIIIIIIIIIED")
    window.location.href = '/question?type=' + query;
}

getSingleQuiz = (query) => {
    startLoading();
    let myLocation = '/quiz ${query}'
    console.log('/questions' + query + "\n\n\n SHIIIIIIIIIIIIIIIED")
    window.location.href = '/quiz?type=' + query;
}


checkDifficulty = () => {
    alert("HALLO?");

    return 20;
}

startTimer = (correctAnswer) => {

    let difficultyObject = document.getElementById('difficulty')
    let timerLength;
    let baseTime = 20;
    let counterObject = document.getElementById('counter');
    //alert("testi" +difficultyObject.innerText)
    //alert("a8uch n testi" + difficultyObject.innerHTML)
    if(difficultyObject.innerHTML === 'easy')
    {
        timerLength = baseTime;

    }
    else if(difficultyObject.innerHTML === 'normal')
    {
        timerLength = baseTime * 2;

    }
    else if(difficultyObject.innerHTML === 'hard')
    {
        timerLength = baseTime * 3;
    }
    else
    {
        timerLength = baseTime;
    }
    counterObject.innerHTML = timerLength;



    let mainContent = document.getElementsByClassName("questionContent");
    let theContent = mainContent[0];
    theContent.style.display = "block";
    let startButtonClass = document.getElementsByClassName('start')
    let startButton = startButtonClass[0];
    startButton.style.display = "none";

    let timerId = setTimeout(function tick() {
        let counter = parseInt(document.getElementById("counter").textContent);
        document.getElementById("counter").textContent = counter - 1;
        if (counter > 1)
            timerId = setTimeout(tick, 1000);
        console.log("MYTEST :O " + counter)
        if (counter === 1) {
            console.log("RASTE AUS TIMER OVER");
            wrongAnswer(correctAnswer);
        }
    }, 1000);
}


checkAnswer = (givenAnswer, correctAnswer, count, quizScore) => {

    let myDOM;
    let baseScore = 10;
    count++;

    if(document.getElementById('difficulty').innerHTML === 'easy')
    {

    }
    else if(document.getElementById('difficulty').innerHTML === 'normal')
    {
        baseScore = baseScore * 2;
    }
    else if(document.getElementById('difficulty').innerHTML === 'hard')
    {
        baseScore = baseScore * 3;
    }
    document.getElementById('points').innerHTML = "+ " + baseScore;


    if (givenAnswer === correctAnswer) {
        console.log("DIE ANTWORT IST KORREKT");
        myDOM = document.getElementsByClassName("answers");
        myDOM[0].children[correctAnswer].style.backgroundColor = "green";
        document.getElementById('aRight').style.display = "block";
        document.getElementById('points').style.display = "block";

        // Normale Frage - Erhöhe playerscore um 10
        if (window.location.href.match('question') != null){

            setTimeout(function () {
                window.location.href = "/dashboard?score=" + baseScore;
            }, 3000); // 5 seconds
        }
        // Wenn es sich um eine Quizfrage handelt
        if (window.location.href.match('quiz') != null) {
            let qScore = parseInt(quizScore);
            qScore += baseScore
            setTimeout(function () {
                window.location.href = '/quiz?question=' + count + "&score=" + qScore;
            }, 3000); // 5 seconds
        }




    } else {
        console.log("DIE ANTWORT IST NICHT KORREKT");
        // Wenn es sich um eine Quizfrage handelt
            wrongAnswer(correctAnswer, quizScore, baseScore, count);
    }


};

wrongAnswer = (correctAnswer, quizScore, baseScore, count) => {
    let myDOM = document.getElementsByClassName("answers");
    let childrenLength = document.getElementsByClassName("answers");
    let correct = false;

    for (let i = 0; i < 4; i++) {
        myDOM[0].children[i].style.backgroundColor = "red";
    }
    myDOM[0].children[correctAnswer].style.backgroundColor = "green";

    document.getElementById('aWrong').style.display = "block";
    document.getElementById('points').style.display = "block";
    document.getElementById('points').innerHTML = "- " + baseScore;

    if (window.location.href.match('quiz') != null) {
        let qScore = parseInt(quizScore);
        qScore -= baseScore;
        setTimeout(function () {
            window.location.href = '/quiz?question=' + count + "&score=" + qScore;
        }, 3000); // 5 seconds
    }
    else
    {
        setTimeout(function () {
            window.location.href = "/dashboard?score=-" + baseScore;
        }, 3000); // 5 seconds
    }
}

getDashboard = () => {
    window.location.href = "/dashboard?score=100";
}


function openCity2(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    /*    tabcontent = document.getElementsByClassName("innertabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("innertablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }*/
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("outertabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    /*    tabcontent = document.getElementsByClassName("innertabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("innertablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }*/
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openCity1(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("innertabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("innertablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}