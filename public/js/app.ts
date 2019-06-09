


const searchForm : HTMLFormElement = <HTMLFormElement> document.getElementById('weatherForm');

searchForm.addEventListener('submit', ($event : Event) => {
    $event.preventDefault();

    const searchInput : HTMLInputElement = <HTMLInputElement> document.getElementById('searchInput');
    const location : string = searchInput.value;

    const errorMessage : HTMLParagraphElement = <HTMLParagraphElement> document.querySelector('#error-message');
    const successMessage : HTMLParagraphElement = <HTMLParagraphElement> document.querySelector('#success-message');

    errorMessage.textContent = 'Loading...';
    successMessage.textContent = '';


    fetch(`/weather?address=${location}`).then((response : Response) => {
        response.json().then((data : any) => {
            if(data.error) {
                return errorMessage.textContent = data.error;
            }

            errorMessage.textContent = '';
            successMessage.innerHTML = `
            Location : ${data.location}. <br /> <br />
            Forecast : ${data.forecast}`;
        });
    });
})