document.addEventListener('DOMContentLoaded', () => {
    const weatherForm =  document.querySelector('form');
    const search = document.querySelector('input');
    const msg_1 = document.querySelector('#msg_1');
    const msg_2 = document.querySelector('#msg_2');
    const msg_3 = document.querySelector('#msg_3');
    const msg_4 = document.querySelector('#msg_4');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = search.value;
        msg_1.textContent = 'Loading';
        msg_2.textContent = '';
        msg_3.textContent = '';
        msg_4.textContent = '';
        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    return msg_1.textContent = data.error;
                }
                msg_1.textContent = data.location;
                msg_2.textContent = data.weather;
                msg_3.textContent = data.forecast;
                msg_4.textContent = data.temperatureHiLow;
            });
        });
    });
});

