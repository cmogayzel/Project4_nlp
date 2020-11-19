const errmessage = document.getElementById('error');
const nlpPolarity = document.getElementById('polarity');
const subject = document.getElementById('subjectivity');
const nlpConfidence = document.getElementById('confidence');


function handleSubmit(event) {
    event.preventDefault()


    let webUrl = document.getElementById('url').nodeValue;

    console.log("Web form submitted by user.");

    if(Client.checkForWebsite(webUrl)) {

        errmessage.style.display = 'none';

        nlpPolarity.innerHTML = '';
        subject.innerHTML = '';
        nlpConfidence.innerHTML = '';


        

    }
} 

    const webPost = async(url = '') => {
        const response = await fetch('http://localhost:8080/paper', {
            method: 'POST',
            credentials: 'same-origin',
            mode: "cors",
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        try {
            const newInfo = await response.json();
            console.log(newInfo);
            return newInfo
        } catch (error) {
            console.log('Error', error);
        } 
    } //webPost

    function updateSite(data) {
         console.log(data);

         nlpPolarity.innerHTML = "Polarity: " + polarityTest(data.score);
         nlpConfidence.innerHTML = `Confidence: ${data.confidence}`;
        subject.innerHTML = `Subject: ${data.subjectivity}`;
    }

    function polarityTest(score) {
        let result; 

        switch(score) {
            case "P+":
                result = "Positive is Strong";
            break;
            case "P":
                result = "Positive";
            break;
            case "NEU":
                result = "NEAUTRAL"
            break;
            case "N":
                result =  "Negative";
            break;
            case "N+":
                result = "Strong Negative";
            break;
            default: 
                result = "No Data";
        }

        return result;
    }


export { handleSubmit, polarityTest }
