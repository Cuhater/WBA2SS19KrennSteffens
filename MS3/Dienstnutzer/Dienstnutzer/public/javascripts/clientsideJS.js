if (window.location.href.match('dashboard') != null) {

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


testit = () =>{

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


startTimer = (correctAnswer) => {

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


checkAnswer = (givenAnswer, correctAnswer, count) => {

    let quizScore = 0;

    let myDOM;
    let correct = false;
    console.log(givenAnswer);
    console.log(correctAnswer);
    alert('COUNT OLD' + count)
    count ++;
    alert('COUNT NEW' + count)
    if (givenAnswer === correctAnswer) {

        //setPlayerScore(count, 10)
        //testi();

        console.log("DIE ANTWORT IST KORREKT");
        //this.style.backgroundColor ="green";
        correct = true;
        myDOM = document.getElementsByClassName("answers");
        myDOM[0].children[correctAnswer].style.backgroundColor = "green";

        document.getElementById('aRight').style.display = "block";
        document.getElementById('points').style.display = "block";
        document.getElementById('points').innerHTML = "+ 10 ";

        if (window.location.href.match('quiz') != null) {
            quizScore += 10;
            setTimeout(function () {
            window.location.href =  '/quiz?question=' + count;
            }, 3000); // 5 seconds

        }
        else
        {
            setTimeout(function () {
                window.location.href = "/dashboard?score=10";
            }, 3000); // 5 seconds
        }

        /*  WORKAROUND HREF TO NODE JS AND CALL METHOD */


    } else {

        wrongAnswer(correctAnswer);

    }


}

getDashboard = () => {
    window.location.href = "/dashboard?score=100";
}
wrongAnswer = (correctAnswer) => {
    let myDOM = document.getElementsByClassName("answers");
    let childrenLength = document.getElementsByClassName("answers");
    let correct = false;

    for (let i = 0; i < 4; i++) {
        myDOM[0].children[i].style.backgroundColor = "red";
    }
    myDOM[0].children[correctAnswer].style.backgroundColor = "green";

    document.getElementById('aWrong').style.display = "block";
    document.getElementById('points').style.display = "block";
    document.getElementById('points').innerHTML = "- 10 ";
    setTimeout(function () {
        window.location.href = "/dashboard?score=-10";
    }, 3000); // 5 seconds
    //updatePlayerScore(-10);
}

function openCity(evt, cityName) {
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

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}