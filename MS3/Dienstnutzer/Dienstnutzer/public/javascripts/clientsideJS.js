checkAnswer = (givenAnswer, correctAnswer) => {
    console.log("HILLLLLLLLLLLLLLLLLLFE");
    let myDOM;
    let count = 1;
    let correct = false;
    console.log(givenAnswer);
    console.log(correctAnswer);
    if (givenAnswer === correctAnswer) {

        //setPlayerScore(count, 10)
        //testi();

        console.log("DIE ANTWORT IST KORREKT");
        //this.style.backgroundColor ="green";
        correct = true;
        myDOM = document.getElementsByClassName("answers");
        myDOM[0].children[correctAnswer].style.backgroundColor = "green";

    } else {
        console.log("HILLLLLLLLLLLLLLLLLLFE");
        //setPlayerScore(count, -10)
        myDOM = document.getElementsByClassName("answers");
        let childrenLength = document.getElementsByClassName("answers");

        console.log("NÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖT" + childrenLength);
        correct = false;

        for (let i = 0; i < 4; i++) {
            myDOM[0].children[i].style.backgroundColor = "red";
        }
        myDOM[0].children[correctAnswer].style.backgroundColor = "green";
    }


}